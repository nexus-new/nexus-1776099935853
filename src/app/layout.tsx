```javascript
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ob-havo Sayti',
  description: 'Ob-havoni ko\'rsatadigan sayt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
```