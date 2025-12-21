import { useState } from "react";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VILLAGES } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { login, register } = useStore();
  
  const [pin, setPin] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerVillage, setRegisterVillage] = useState("");
  const [registerPin, setRegisterPin] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      setLocation("/");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "Please check your PIN and try again.",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerVillage || !registerPin) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all fields.",
      });
      return;
    }
    register(registerName, registerVillage, registerPin);
    toast({
      title: "Registration Successful",
      description: "Welcome to ASHA Care. You are now logged in.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">ASHA Care</h1>
        <p className="text-muted-foreground">Community Health Management System</p>
      </div>

      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Worker Login</CardTitle>
              <CardDescription>Enter your PIN to access the dashboard.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pin">Enter PIN</Label>
                  <Input 
                    id="pin" 
                    type="password" 
                    pattern="[0-9]*" 
                    inputMode="numeric" 
                    placeholder="****" 
                    className="text-center text-2xl tracking-widest" 
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>New Worker Registration</CardTitle>
              <CardDescription>
                Create a local offline account. 
                <br/>
                <span className="text-xs text-muted-foreground bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-2 inline-block">
                   Data is stored locally on this device.
                </span>
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Sunita Devi" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="village">Assigned Village</Label>
                  <Select onValueChange={setRegisterVillage} required>
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

                <div className="space-y-2">
                  <Label htmlFor="reg-pin">Create PIN (4 digits)</Label>
                  <Input 
                    id="reg-pin" 
                    type="password" 
                    pattern="[0-9]*" 
                    inputMode="numeric" 
                    placeholder="****" 
                    className="text-center text-xl tracking-widest" 
                    maxLength={4}
                    value={registerPin}
                    onChange={(e) => setRegisterPin(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Register & Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-xs">
        Note: This is an offline-first demo application. Clearing browser data will reset the application state.
      </p>
    </div>
  );
}
