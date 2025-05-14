import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Shield, Zap, BarChart3, Lock, ArrowRight, CheckCircle2, Users, Globe, Clock, AlertTriangle, Code, Network, Database, Webhook, FileSearch, Bug } from "lucide-react"

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900/20 via-blue-800/20 to-background">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        </div>

        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-x" />

        <div className="container mx-auto px-4 py-32 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo and Badge */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="text-blue-400 font-medium">VulnGuard Security Platform</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl font-bold tracking-tight">
                Secure Your Digital Assets with{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Advanced Vulnerability Testing
                </span>
              </h1>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                Comprehensive security scanning and vulnerability assessment platform
                to protect your applications from potential threats.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/login")} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="border-blue-500/20 text-blue-100 hover:bg-blue-500/10"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 pt-8 text-blue-100/60">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>50+ Countries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-card rounded-xl border p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="bg-card rounded-xl border p-6 text-center">
            <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="bg-card rounded-xl border p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">Monitoring</div>
          </div>
          <div className="bg-card rounded-xl border p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">1M+</div>
            <div className="text-sm text-muted-foreground">Threats Detected</div>
          </div>
        </div>
      </div>

      {/* Testing Types Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Security Testing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            VulnGuard offers a wide range of security testing capabilities to protect your applications
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Static Application Security Testing (SAST)</h3>
            <p className="text-muted-foreground">
              Analyze source code for security vulnerabilities without executing the application.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Code analysis for common vulnerabilities
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Early detection in development
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Network className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dynamic Application Security Testing (DAST)</h3>
            <p className="text-muted-foreground">
              Test running applications for security vulnerabilities from the outside.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Real-world attack simulation
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Runtime vulnerability detection
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Database Security Testing</h3>
            <p className="text-muted-foreground">
              Identify and fix database vulnerabilities and misconfigurations.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                SQL injection detection
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Access control verification
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Webhook className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">API Security Testing</h3>
            <p className="text-muted-foreground">
              Comprehensive testing of API endpoints and security controls.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Authentication testing
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Authorization checks
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dependency Scanning</h3>
            <p className="text-muted-foreground">
              Identify vulnerabilities in third-party dependencies and libraries.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Known vulnerability detection
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                License compliance checking
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Bug className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Penetration Testing</h3>
            <p className="text-muted-foreground">
              Simulated attacks to identify exploitable vulnerabilities.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Manual security testing
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Exploit verification
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose VulnGuard?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides everything you need to secure your applications and protect your business
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Scanning</h3>
            <p className="text-muted-foreground">
              Continuous monitoring and instant detection of security vulnerabilities
              in your applications.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
            <p className="text-muted-foreground">
              Quick and thorough security assessments without compromising on accuracy
              or coverage.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive reports and insights to help you understand and address
              security risks.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security with regular updates and dedicated support
              for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with VulnGuard in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up for a free account and get instant access to our security platform.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
          </div>
          <div className="relative">
            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Configure Scans</h3>
              <p className="text-muted-foreground">
                Set up your scanning preferences and define your security requirements.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
          </div>
          <div>
            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Monitor & Protect</h3>
              <p className="text-muted-foreground">
                Receive real-time alerts and detailed reports to keep your applications secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose VulnGuard?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Advanced Threat Detection</h3>
                    <p className="text-muted-foreground">
                      State-of-the-art algorithms to identify and prevent security threats.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Real-time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Continuous security monitoring with instant alerts and notifications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Expert Support</h3>
                    <p className="text-muted-foreground">
                      24/7 access to security experts and comprehensive documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of organizations that trust VulnGuard for their security needs.
              </p>
              <Button size="lg" onClick={() => navigate("/login")} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Your Security Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 