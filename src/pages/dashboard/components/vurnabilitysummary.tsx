"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function VulnerabilitySummary() {
  const [progress] = useState(78)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Security Score</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <CardDescription>Overall security rating</CardDescription>
              <span className="font-medium text-green-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-green-100">
              <div className="h-2 bg-green-500" style={{ width: `${progress}%` }} />
            </Progress>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 dark:border-yellow-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Warnings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <CardDescription>Issues requiring attention</CardDescription>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-yellow-500">12</span>
              <span className="text-xs ml-1 text-muted-foreground">issues</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="text-yellow-500 font-medium">4 new</span> issues detected in the last scan
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">Critical Threats</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <CardDescription>High priority vulnerabilities</CardDescription>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-red-500">3</span>
              <span className="text-xs ml-1 text-muted-foreground">threats</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="text-red-500 font-medium">Immediate action</span> recommended
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
