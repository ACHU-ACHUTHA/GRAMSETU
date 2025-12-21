import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RiskLevel } from "@/lib/types";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <Badge
      className={cn(
        "font-medium uppercase tracking-wide border-0 px-3 py-1",
        level === 'High' && "bg-[hsl(var(--risk-high))] text-[hsl(var(--risk-high-foreground))] hover:bg-[hsl(var(--risk-high))]/90",
        level === 'Medium' && "bg-[hsl(var(--risk-medium))] text-[hsl(var(--risk-medium-foreground))] hover:bg-[hsl(var(--risk-medium))]/90",
        level === 'Low' && "bg-[hsl(var(--risk-low))] text-[hsl(var(--risk-low-foreground))] hover:bg-[hsl(var(--risk-low))]/90",
        className
      )}
    >
      {level} Risk
    </Badge>
  );
}
