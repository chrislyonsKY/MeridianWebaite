import { useTriggerPipeline } from "@/hooks/use-stories";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const triggerMutation = useTriggerPipeline();

  if (authLoading) return null;
  
  // Basic protection - in a real app, verify a role claim
  if (!user) {
    return <Redirect to="/api/login" />;
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-12">System controls and pipeline management.</p>

        <div className="bg-card border border-border p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-full">
              <Activity className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">News Pipeline Trigger</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Manually trigger the ingestion, clustering, and AI neutralization pipeline. 
                This process consumes API credits and may take a few minutes to complete.
              </p>
              
              <Button 
                onClick={() => triggerMutation.mutate()} 
                disabled={triggerMutation.isPending}
                className="font-serif rounded-none px-6"
              >
                {triggerMutation.isPending ? "Pipeline Running..." : "Run Pipeline Now"}
              </Button>

              {triggerMutation.isSuccess && (
                <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Pipeline triggered successfully. Feed will update shortly.
                </div>
              )}

              {triggerMutation.isError && (
                <div className="mt-4 flex items-center text-sm text-destructive font-medium">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Failed to trigger pipeline. See console for details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
