import { Shield, Code, Server, Zap, Clock, FileText, Bug, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Our Web Vulnerability Scanner</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A powerful, modern web application security testing platform built with cutting-edge technology
        </p>
      </div>

      {/* Overview Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-500" />
            Platform Overview
          </CardTitle>
          <CardDescription>
            Our web vulnerability scanner is designed to help security professionals and developers identify and fix security issues in web applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Built on top of OWASP ZAP (Zed Attack Proxy), our platform provides a modern, user-friendly interface for conducting comprehensive security assessments. 
            The system combines automated scanning capabilities with detailed reporting features to help you maintain a secure web presence.
          </p>
        </CardContent>
      </Card>

      {/* Tech Stack Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-500" />
              Backend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Node.js with TypeScript</li>
              <li>• Express.js framework</li>
              <li>• PostgreSQL database</li>
              <li>• RESTful API architecture</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• OWASP ZAP in Docker</li>
              <li>• Automated spider scanning</li>
              <li>• Active vulnerability scanning</li>
              <li>• Real-time scan monitoring</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              Frontend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• React with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Shadcn UI components</li>
              <li>• Responsive design</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Features Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-6 w-6 text-blue-500" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Two-Stage Scanning</h3>
                  <p className="text-muted-foreground">
                    Comprehensive security assessment through spider and active scanning phases
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Detailed Reports</h3>
                  <p className="text-muted-foreground">
                    In-depth vulnerability reports with risk levels and remediation guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Session Management</h3>
                  <p className="text-muted-foreground">
                    Track and manage multiple scanning sessions with detailed progress monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Security First</h3>
                  <p className="text-muted-foreground">
                    Built with security best practices and proper input validation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Considerations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-500" />
            Security Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Input Validation</h3>
              <p className="text-muted-foreground">
                All user inputs are thoroughly validated to prevent injection attacks and ensure data integrity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Container Isolation</h3>
              <p className="text-muted-foreground">
                Scanner runs in isolated Docker containers to prevent any potential impact on the host system.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">API Security</h3>
              <p className="text-muted-foreground">
                Optional API key authentication for enhanced security and access control.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Enhancements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" />
            Future Enhancements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Scheduled Scans</h3>
              <p className="text-muted-foreground">
                Automate security assessments with configurable scan schedules.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Report Export</h3>
              <p className="text-muted-foreground">
                Export vulnerability reports in various formats (PDF, CSV, JSON).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integration Options</h3>
              <p className="text-muted-foreground">
                Connect with bug bounty platforms and CI/CD pipelines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 