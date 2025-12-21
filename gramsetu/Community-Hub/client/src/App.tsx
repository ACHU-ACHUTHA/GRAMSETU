import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "@/lib/store";
import NotFound from "@/pages/not-found";

import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import PatientList from "@/pages/patient-list";
import PatientForm from "@/pages/patient-form";
import PatientDetails from "@/pages/patient-details";
import AlertsPage from "@/pages/alerts";

function Router() {
  const { user } = useStore();

  if (!user?.isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/patients" component={PatientList} />
      <Route path="/add-patient" component={PatientForm} />
      <Route path="/patient/:id" component={PatientDetails} />
      <Route path="/alerts" component={AlertsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
