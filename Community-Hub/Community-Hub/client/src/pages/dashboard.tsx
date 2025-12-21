import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, AlertCircle, Plus, Activity, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PatientCard } from "@/components/patient-card";

export default function Dashboard() {
  const { patients, user } = useStore();

  const totalPatients = patients.length;
  const highRiskPatients = patients.filter(p => p.riskLevel === 'High');
  const mediumRiskPatients = patients.filter(p => p.riskLevel === 'Medium');
  const highRiskCount = highRiskPatients.length;
  
  // Get recent patients (last 3)
  const recentPatients = [...patients]
    .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Namaste, {user?.name.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">
            Here is the summary for <span className="font-medium text-foreground">{user?.village}</span> village.
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
            </CardContent>
          </Card>
          
          <Card className={highRiskCount > 0 ? "border-destructive/50 bg-destructive/5" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-destructive">High Risk</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{highRiskCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Medium Risk</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mediumRiskPatients.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground col-span-2 md:col-span-1">
             <Link href="/add-patient" className="h-full w-full flex flex-col items-center justify-center p-4 hover:bg-white/10 transition-colors cursor-pointer">
                <Plus className="h-8 w-8 mb-2" />
                <span className="font-bold">Add New Patient</span>
             </Link>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* High Risk Alerts */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  High Risk Alerts
                </h3>
                <Link href="/alerts">
                  <Button variant="link" className="text-sm h-auto p-0 text-muted-foreground">View All</Button>
                </Link>
              </div>
              
              {highRiskPatients.length === 0 ? (
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Activity className="h-8 w-8 mb-2 opacity-50" />
                    <p>No high risk patients found.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {highRiskPatients.slice(0, 2).map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              )}
           </div>

           {/* Recent Visits */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Recent Visits
                </h3>
                <Link href="/patients">
                  <Button variant="link" className="text-sm h-auto p-0 text-muted-foreground">View All</Button>
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentPatients.map(patient => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
                {recentPatients.length === 0 && (
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Users className="h-8 w-8 mb-2 opacity-50" />
                      <p>No patients recorded yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}
