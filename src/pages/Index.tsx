import { useState } from "react";
import { Shield, Zap, Eye } from "lucide-react";
import { VideoUploader } from "@/components/VideoUploader";
import { DetectionResults } from "@/components/DetectionResults";
import { useToast } from "@/hooks/use-toast";

interface Detection {
  label: string;
  score: number;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

interface DetectionResponse {
  person_detected: boolean;
  detections: Detection[];
  frame?: string;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<DetectionResponse | null>(null);
  const { toast } = useToast();

  const handleVideoUpload = async (result: DetectionResponse) => {
    setIsProcessing(true);
    setResults(result);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Forklift Safety AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Intelligent Person Detection System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-card shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Real-time Detection
            </h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI analyzes video frames to detect people near forklifts
              instantly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Automatic Braking
            </h3>
            <p className="text-sm text-muted-foreground">
              System triggers automatic brake when a person is detected in the
              danger zone.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Enhanced Safety
            </h3>
            <p className="text-sm text-muted-foreground">
              Prevent workplace accidents with intelligent hazard detection and
              response.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <VideoUploader
            onUpload={handleVideoUpload}
            isProcessing={isProcessing}
          />
        </div>

        {/* Results Section */}
        {results && (
          <div className="animate-in fade-in-50 duration-500">
            {results.person_detected && (
              <div className="mb-6 p-1 rounded-xl bg-gradient-to-r from-destructive to-destructive/80 animate-pulse">
                <div className="bg-background rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-destructive mb-2">
                    ⚠️ ALERT: Person Detected
                  </h2>
                  <p className="text-muted-foreground">
                    Automatic braking system activated
                  </p>
                </div>
              </div>
            )}
            <DetectionResults
              personDetected={results.person_detected}
              detections={results.detections}
              frame={results.frame}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Forklift Safety AI - Protecting Workers Through Intelligent Detection
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
