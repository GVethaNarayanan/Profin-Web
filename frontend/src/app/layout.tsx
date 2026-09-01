import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/profin/Sidebar";
import MarketTicker from "@/components/profin/MarketTicker";
import CommandPalette from "@/components/profin/CommandPalette";

import SpiderWebBackground from "@/components/profin/SpiderWebBackground";

export const metadata: Metadata = {
  title: "PROFIN WEB — Live Financial Intelligence",
  description: "Connect the signals. Understand the decision. A living financial intelligence platform powered by multi-agent AI.",
  keywords: ["PROFIN", "AI", "finance", "multi-agent", "intelligence", "investment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "var(--bg-deep)" }}>
        
        {/* Cinematic Spiderman Background */}
        <div 
          className="fixed inset-0 pointer-events-none z-[-2]"
          style={{
            backgroundImage: "url('/hero-spiderman.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            opacity: 0.15,
            mixBlendMode: "luminosity"
          }}
        />

        {/* Background Spider Web Pattern */}
        <SpiderWebBackground />

        {/* Hanging Spider Animation */}
        <div className="hanging-spider-container">
          <div className="spider-thread"></div>
          <div className="spider-icon">🕷️</div>
        </div>

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Command Palette (Ctrl+K) */}
        <CommandPalette />

        {/* Main Content Area */}
        <div className="profin-page">
          {/* Market Ticker Strip */}
          <MarketTicker />

          {/* Page Content */}
          <main className="px-6 py-6 lg:px-8 xl:px-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
