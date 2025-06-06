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
      <div className="container mx-auto py-10">
        <div className="flex w-full justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <main className="flex-1">
          <ChangePassword />
        </main>
      </div>
    </DashboardLayout>
  );
} 