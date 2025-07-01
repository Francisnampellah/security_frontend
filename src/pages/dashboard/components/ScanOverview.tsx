import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ScanSession } from "@/type";

interface ScanOverviewProps {
  totalScans: number;
  totalVulnerabilities: number;
  recentScans: ScanSession[];
}

export const ScanOverview: React.FC<ScanOverviewProps> = ({ totalScans, totalVulnerabilities, recentScans }) => {
  const safeRecentScans = Array.isArray(recentScans) ? recentScans : [];
  const successfulScans = safeRecentScans.filter(session =>
    session.spiderStatus === 100 && session.activeStatus === 100
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVulnerabilities}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulScans}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vulnerabilities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeRecentScans.slice(0, 5).map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.url}</TableCell>
                  <TableCell>{new Date(session.startedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      session.spiderStatus === 100 && session.activeStatus === 100 ? 'bg-green-100 text-green-800' :
                      session.spiderStatus === -1 || session.activeStatus === -1 ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.spiderStatus === 100 && session.activeStatus === 100 ? 'completed' :
                       session.spiderStatus === -1 || session.activeStatus === -1 ? 'failed' :
                       'in progress'}
                    </span>
                  </TableCell>
                  <TableCell>{Array.isArray(session.activeResults) ? session.activeResults.length : 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}; 