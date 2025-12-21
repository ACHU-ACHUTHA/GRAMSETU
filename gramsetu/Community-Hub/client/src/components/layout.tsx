import { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { EmergencyButton } from "./emergency-button";
import { LogOut, Globe, Menu, Home, Users, AlertCircle, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  showEmergency?: boolean;
}

export function Layout({ children, showEmergency = true }: LayoutProps) {
  const { user, logout, language, setLanguage } = useStore();
  const [location] = useLocation();

  if (!user?.isAuthenticated) {
    return <div className="min-h-screen bg-background p-4 flex items-center justify-center">{children}</div>;
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/patients", label: "All Patients", icon: Users },
    { href: "/add-patient", label: "Add Patient", icon: PlusCircle },
    { href: "/alerts", label: "High Risk", icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary/80">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="p-6 bg-primary text-primary-foreground">
                  <h2 className="text-xl font-heading font-bold">ASHA Care</h2>
                  <p className="text-sm opacity-90 mt-1">Worker: {user.name}</p>
                  <p className="text-xs opacity-75">Village: {user.village}</p>
                </div>
                <nav className="flex flex-col p-4 gap-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium",
                        location === item.href 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}>
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <Button variant="ghost" className="justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <div className="flex flex-col cursor-pointer">
                <h1 className="font-heading font-bold text-xl leading-none">ASHA Care</h1>
                <span className="text-xs opacity-80 hidden sm:inline-block">Community Health Platform</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {showEmergency && <div className="hidden sm:block"><EmergencyButton /></div>}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-muted' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('local')} className={language === 'local' ? 'bg-muted' : ''}>
                  Local (Hindi/Regional)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex flex-col items-end text-sm mr-2">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs opacity-80">{user.village}</span>
            </div>
            
            <Button variant="ghost" size="icon" className="hidden md:flex text-primary-foreground hover:bg-primary/80" onClick={() => logout()}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {showEmergency && <div className="sm:hidden mb-6"><EmergencyButton /></div>}
        {children}
      </main>
    </div>
  );
}
