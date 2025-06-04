import React, { useState } from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChangePassword from './component/ChangePassword';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header"

export default function SettingsPage() {
  const [date, setDate] = useState<Date>(new Date())
  return (
    <DashboardLayout>
      <Header date={date} setDate={setDate} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
            <ChangePassword />

      </div>
    </DashboardLayout>
  );
} 