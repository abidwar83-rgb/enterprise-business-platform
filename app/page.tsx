import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users, BarChart, Bot, Lock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enterprise Platform
          </h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Complete Business Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to run your business - CRM, projects, invoicing, AI assistant, and more. All in one secure platform.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Free Trial
            <ArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Bot className="w-12 h-12 text-blue-600" />}
            title="AI Assistant"
            description="Smart AI that helps with analytics, automation, and insights"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-purple-600" />}
            title="Enterprise Security"
            description="Bank-level encryption, 2FA, and compliance ready"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-yellow-600" />}
            title="Lightning Fast"
            description="Real-time updates and blazing fast performance"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-green-600" />}
            title="Team Collaboration"
            description="Work together seamlessly with your entire team"
          />
          <FeatureCard
            icon={<BarChart className="w-12 h-12 text-red-600" />}
            title="Advanced Analytics"
            description="Deep insights and predictive analytics for your business"
          />
          <FeatureCard
            icon={<Lock className="w-12 h-12 text-indigo-600" />}
            title="Data Privacy"
            description="GDPR compliant with complete data ownership"
          />
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Everything You Need</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature text="Customer Relationship Management (CRM)" />
            <Feature text="Project & Task Management" />
            <Feature text="Invoice & Billing with Stripe" />
            <Feature text="Team Collaboration & Chat" />
            <Feature text="Document Management" />
            <Feature text="Inventory Tracking" />
            <Feature text="AI-Powered Analytics" />
            <Feature text="Automated Workflows" />
            <Feature text="Calendar & Scheduling" />
            <Feature text="Email Integration" />
            <Feature text="Mobile Apps (iOS & Android)" />
            <Feature text="API Access" />
            <Feature text="Custom Reports" />
            <Feature text="Role-Based Permissions" />
            <Feature text="Audit Logs" />
            <Feature text="24/7 Support" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using our platform
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 text-center text-gray-600">
        <p>&copy; 2025 Enterprise Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  )
}