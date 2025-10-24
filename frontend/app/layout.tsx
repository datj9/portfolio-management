import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./design-system.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { DesignSystemProvider } from "@/contexts/DesignSystemContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dat Nguyen - Portfolio",
  description: "My professional portfolio and blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesignSystemProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </DesignSystemProvider>
      </body>
    </html>
  )
}
