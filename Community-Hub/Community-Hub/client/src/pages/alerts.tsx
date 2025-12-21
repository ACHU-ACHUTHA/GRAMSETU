import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { PatientCard } from "@/components/patient-card";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AlertsPage() {
  const { patients } = useStore();
  const highRiskPatients = patients.filter(p => p.riskLevel === 'High');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-heading font-bold text-destructive flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            High Risk Alerts
          </h2>
          <p className="text-muted-foreground">Patients requiring immediate attention or referral.</p>
        </div>

        <div className="grid gap-4">
          {highRiskPatients.length > 0 ? (
            highRiskPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))
          ) : (
             <Card className="bg-muted/30 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                     <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No High Risk Alerts</h3>
                  <p>All patients are currently stable.</p>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
