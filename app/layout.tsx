import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enterprise Business Platform - Complete Business Solution',
  description: 'All-in-one business platform with CRM, projects, invoicing, AI assistant, and enterprise security',
  keywords: 'business platform, CRM, project management, invoicing, AI assistant, enterprise software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}