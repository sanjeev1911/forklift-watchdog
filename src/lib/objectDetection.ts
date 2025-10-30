import { pipeline, env } from '@huggingface/transformers';

// Configure to use local models
env.allowLocalModels = false;

let detector: any = null;

export interface Detection {
  label: string;
  score: number;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

export interface DetectionResult {
  person_detected: boolean;
  detections: Detection[];
  frame?: string; // base64 image
}

const CONFIDENCE_THRESHOLD = 0.4;

export async function initializeDetector() {
  if (!detector) {
    console.log('Loading object detection model...');
    detector = await pipeline(
      'object-detection',
      'Xenova/detr-resnet-50',
      { device: 'webgpu' }
    );
    console.log('Model loaded successfully');
  }
  return detector;
}

export async function detectObjectsInFrame(
  imageData: string | HTMLImageElement | HTMLCanvasElement
): Promise<DetectionResult> {
  const model = await initializeDetector();
  
  // Run detection
  const results = await model(imageData, {
    threshold: CONFIDENCE_THRESHOLD,
    percentage: false,
  });

  // Process detections
  const detections: Detection[] = results.map((det: any) => ({
    label: det.label,
    score: det.score,
    box: {
      xmin: det.box.xmin || 0,
      ymin: det.box.ymin || 0,
      xmax: det.box.xmax || 0,
      ymax: det.box.ymax || 0,
    },
  }));

  console.log('Detections:', detections); // Debug log

  // Check if person detected
  const person_detected = detections.some(
    (det) => det.label === 'person' && det.score > CONFIDENCE_THRESHOLD
  );

  return {
    person_detected,
    detections,
  };
}

export async function processVideoFirstFrame(videoFile: File): Promise<DetectionResult> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);

    video.onloadeddata = async () => {
      // Seek to first frame
      video.currentTime = 0;
    };

    video.onseeked = async () => {
      try {
        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw first frame to canvas
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get frame as image
        const frameData = canvas.toDataURL('image/jpeg');

        // Run detection on frame
        const result = await detectObjectsInFrame(canvas);
        result.frame = frameData;

        // Cleanup
        URL.revokeObjectURL(video.src);
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
    };
  });
}

export function drawDetectionsOnCanvas(
  canvas: HTMLCanvasElement,
  detections: Detection[],
  personDetected: boolean
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw bounding boxes
  detections.forEach((det) => {
    if (!det.box) return; // Safety check
    
    const { xmin, ymin, xmax, ymax } = det.box;
    const width = xmax - xmin;
    const height = ymax - ymin;

    // Draw rectangle
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(xmin, ymin, width, height);

    // Draw label background
    const label = `${det.label} ${(det.score * 100).toFixed(0)}%`;
    ctx.font = '16px Arial';
    const textMetrics = ctx.measureText(label);
    
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(xmin, ymin - 25, textMetrics.width + 10, 25);

    // Draw label text
    ctx.fillStyle = '#000000';
    ctx.fillText(label, xmin + 5, ymin - 7);
  });

  // Red overlay if person detected (BRAKES TRIGGERED)
  if (personDetected) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw "BRAKES TRIGGERED!" text
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    
    const text = 'BRAKES TRIGGERED!';
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = 80;
    
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }
}
