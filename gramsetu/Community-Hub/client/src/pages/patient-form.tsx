import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { useStore, calculateRisk } from "@/lib/store";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { VILLAGES, SYMPTOMS_LIST, RiskLevel } from "@/lib/types";
import { RiskBadge } from "@/components/risk-badge";
import { toast } from "@/hooks/use-toast";

export default function PatientForm() {
  const [, setLocation] = useLocation();
  const { addPatient } = useStore();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [village, setVillage] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [feverDays, setFeverDays] = useState("");
  const [notes, setNotes] = useState("");
  
  const [calculatedRisk, setCalculatedRisk] = useState<RiskLevel>("Low");

  // Auto-calculate risk when symptoms change
  useEffect(() => {
    const risk = calculateRisk(symptoms, Number(feverDays) || 0);
    setCalculatedRisk(risk);
  }, [symptoms, feverDays]);

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !village) {
       toast({
         variant: "destructive",
         title: "Missing Information",
         description: "Please fill in Name, Age and Village.",
       });
       return;
    }

    addPatient({
      name,
      age: parseInt(age),
      village,
      riskLevel: calculatedRisk,
      symptoms,
      feverDays: parseInt(feverDays) || 0,
      notes
    });

    toast({
      title: "Patient Added",
      description: `${name} has been added successfully.`,
    });

    setLocation("/");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold">Add New Patient</h2>
          <p className="text-muted-foreground">Record symptoms to auto-assess risk level.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
               <CardTitle>Patient Information</CardTitle>
               <div className="flex items-center gap-2">
                 <span className="text-sm text-muted-foreground">Assessed Risk:</span>
                 <RiskBadge level={calculatedRisk} />
               </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name *</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="village">Village *</Label>
                  <Select onValueChange={setVillage} value={village}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Village" />
                    </SelectTrigger>
                    <SelectContent>
                      {VILLAGES.map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-3">
                <Label>Symptoms</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border p-4 rounded-md">
                   {SYMPTOMS_LIST.map(symptom => (
                     <div key={symptom} className="flex items-center space-x-2">
                       <Checkbox 
                         id={`symptom-${symptom}`} 
                         checked={symptoms.includes(symptom)}
                         onCheckedChange={() => toggleSymptom(symptom)}
                       />
                       <Label 
                        htmlFor={`symptom-${symptom}`}
                        className="font-normal cursor-pointer"
                       >
                         {symptom}
                       </Label>
                     </div>
                   ))}
                </div>
              </div>

              {/* Specific Questions */}
              {symptoms.includes('Fever') && (
                <div className="space-y-2 bg-red-50 p-4 rounded-md border border-red-100 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="feverDays" className="text-red-900">How many days of fever?</Label>
                  <Input 
                    id="feverDays" 
                    type="number" 
                    value={feverDays} 
                    onChange={e => setFeverDays(e.target.value)}
                    className="bg-white"
                  />
                  <p className="text-xs text-red-600">More than 3 days increases risk level.</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any other observations..." 
                />
              </div>

            </CardContent>
            <CardFooter className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setLocation("/")}>Cancel</Button>
              <Button type="submit" size="lg">Save Patient</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  );
}
