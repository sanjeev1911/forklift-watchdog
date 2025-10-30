import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Detection {
  label: string;
  confidence: number;
  box: number[];
}

interface DetectionResultsProps {
  personDetected: boolean;
  detections: Detection[];
}

export const DetectionResults = ({
  personDetected,
  detections,
}: DetectionResultsProps) => {
  return (
    <div className="space-y-6">
      {/* Alert Card */}
      <Card
        className={`p-6 ${
          personDetected
            ? "bg-destructive/10 border-destructive"
            : "bg-primary/10 border-primary"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              personDetected ? "bg-destructive/20" : "bg-primary/20"
            }`}
          >
            {personDetected ? (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {personDetected
                ? "Person Detected - Automatic Brake Activated"
                : "No Person Detected - Safe to Operate"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {personDetected
                ? "The system has detected a person in the forklift's vicinity. Automatic braking system has been triggered for safety."
                : "No personnel detected in the immediate area. Forklift operation is safe to proceed."}
            </p>
          </div>
        </div>
      </Card>

      {/* Detections List */}
      <Card className="p-6 bg-card shadow-md">
        <h4 className="text-md font-semibold text-foreground mb-4">
          Detection Details
        </h4>
        <div className="space-y-3">
          {detections.length > 0 ? (
            detections.map((detection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      detection.label === "person" ? "destructive" : "secondary"
                    }
                    className="capitalize"
                  >
                    {detection.label}
                  </Badge>
                  <span className="text-sm text-foreground">
                    Confidence: {(detection.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  [{detection.box.map((v) => v.toFixed(0)).join(", ")}]
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No objects detected in this frame
            </p>
          )}
        </div>
      </Card>

      {/* JSON Output */}
      <Card className="p-6 bg-card shadow-md">
        <h4 className="text-md font-semibold text-foreground mb-4">
          Raw JSON Response
        </h4>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">
          {JSON.stringify({ personDetected, detections }, null, 2)}
        </pre>
      </Card>
    </div>
  );
};
