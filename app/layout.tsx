// app/layout.tsx
import "./globals.css"
import { Providers } from "./providers" // make sure path matches
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your App",
  description: "Your description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
