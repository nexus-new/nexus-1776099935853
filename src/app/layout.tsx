```javascript
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AbdulazizNexus Notes',
  description: 'Notes app created by AbdulazizNexus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
```