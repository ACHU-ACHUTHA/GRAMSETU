import { useState } from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { PatientCard } from "@/components/patient-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VILLAGES, RiskLevel } from "@/lib/types";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientList() {
  const { patients } = useStore();
  const [search, setSearch] = useState("");
  const [villageFilter, setVillageFilter] = useState<string | "all">("all");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesVillage = villageFilter === "all" || p.village === villageFilter;
    const matchesRisk = riskFilter === "all" || p.riskLevel === riskFilter;
    return matchesSearch && matchesVillage && matchesRisk;
  });

  const clearFilters = () => {
    setSearch("");
    setVillageFilter("all");
    setRiskFilter("all");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-heading font-bold">Patient List</h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredPatients.length} patients
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-card p-4 rounded-lg shadow-sm border">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-3">
             <Select value={villageFilter} onValueChange={setVillageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Village" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Villages</SelectItem>
                  {VILLAGES.map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
             </Select>
          </div>

          <div className="md:col-span-3">
             <Select value={riskFilter} onValueChange={(val: any) => setRiskFilter(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                </SelectContent>
             </Select>
          </div>

          <div className="md:col-span-2">
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="grid gap-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border-dashed border-2">
              <p className="text-muted-foreground">No patients found matching your criteria.</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">Clear filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
