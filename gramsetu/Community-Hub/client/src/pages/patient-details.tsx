import { useRoute, Link } from "wouter";
import { useStore } from "@/lib/store";
import { Layout } from "@/components/layout";
import { RiskBadge } from "@/components/risk-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Phone, Activity, FileText, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { EmergencyButton } from "@/components/emergency-button";

export default function PatientDetails() {
  const [, params] = useRoute("/patient/:id");
  const { patients } = useStore();
  
  const patient = patients.find(p => p.id === params?.id);

  if (!patient) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Patient Not Found</h2>
          <Link href="/">
             <Button variant="link">Go Back Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const advice = {
    High: "Immediate referral to PHC required. Monitor vitals every 4 hours. Keep patient hydrated.",
    Medium: "Monitor closely for next 24 hours. If fever persists > 3 days, refer to PHC. Paracetamol 500mg SOS.",
    Low: "Maintain hygiene. Drink plenty of water. Eat nutritious food. Rest."
  }[patient.riskLevel];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/patients">
          <Button variant="ghost" className="pl-0 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </Button>
        </Link>

        {/* Header Profile */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-card p-6 rounded-xl border shadow-sm">
           <div className="flex gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-4 border-white shadow-sm">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold">{patient.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                   <div className="flex items-center gap-1">
                     <Calendar className="h-4 w-4" />
                     {patient.age} years
                   </div>
                   <div className="flex items-center gap-1">
                     <MapPin className="h-4 w-4" />
                     {patient.village}
                   </div>
                </div>
              </div>
           </div>
           
           <div className="flex flex-col items-start md:items-end gap-3">
             <RiskBadge level={patient.riskLevel} className="text-lg px-4 py-1.5" />
             <div className="text-sm text-muted-foreground">
               Last Visit: {format(new Date(patient.lastVisit), "PPP")}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Current Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {patient.symptoms.map(s => (
                    <div key={s} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {s}
                    </div>
                  ))}
                  {patient.symptoms.length === 0 && <span className="text-muted-foreground">No active symptoms recorded.</span>}
                </div>
                
                {patient.feverDays && patient.feverDays > 0 && (
                   <div className="bg-red-50 text-red-800 px-4 py-2 rounded-md inline-block text-sm font-medium border border-red-100">
                     Fever duration: {patient.feverDays} days
                   </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Clinical Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {patient.notes || "No notes added by health worker."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {patient.riskLevel === 'High' && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
                 <h3 className="text-destructive font-bold text-lg mb-2 flex items-center gap-2">
                   <AlertCircle className="h-5 w-5" />
                   High Risk Alert
                 </h3>
                 <p className="text-sm text-destructive/80 mb-4">
                   This patient shows critical symptoms. Immediate action is recommended.
                 </p>
                 <EmergencyButton />
              </div>
            )}

            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Recommended Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground">{advice}</p>
              </CardContent>
            </Card>
            
          </div>

        </div>
      </div>
    </Layout>
  );
}
