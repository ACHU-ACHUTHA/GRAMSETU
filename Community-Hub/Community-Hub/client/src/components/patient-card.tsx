import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Patient } from "@/lib/types";
import { RiskBadge } from "./risk-badge";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-l-4" style={{
      borderLeftColor: 
        patient.riskLevel === 'High' ? 'hsl(var(--risk-high))' : 
        patient.riskLevel === 'Medium' ? 'hsl(var(--risk-medium))' : 
        'hsl(var(--risk-low))'
    }}>
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarFallback className="bg-primary/10 text-primary font-heading font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-heading font-semibold text-lg leading-none text-foreground">{patient.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{patient.age} years</p>
          </div>
        </div>
        <RiskBadge level={patient.riskLevel} />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4" />
          {patient.village}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Visited {formatDistanceToNow(new Date(patient.lastVisit))} ago
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-muted/20">
        <Link href={`/patient/${patient.id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between hover:bg-background group">
            View Details
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
