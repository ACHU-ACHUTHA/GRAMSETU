import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function EmergencyButton() {
  const handleEmergency = () => {
    // In a real app, this would trigger a call or SMS
    toast({
      variant: "destructive",
      title: "Emergency Alert Sent",
      description: "Calling emergency services and sending SMS to medical officer.",
      duration: 5000,
    });
    
    // Simulate mobile dialer
    // window.location.href = "tel:108";
  };

  return (
    <Button 
      variant="destructive" 
      size="lg"
      className="gap-2 font-bold shadow-lg animate-pulse hover:animate-none w-full sm:w-auto"
      onClick={handleEmergency}
      data-testid="button-emergency"
    >
      <AlertTriangle className="h-5 w-5" />
      EMERGENCY
    </Button>
  );
}
