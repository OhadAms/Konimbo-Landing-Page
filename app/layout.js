import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Konimbo — Contact Us',
  description: 'Get in touch with our team',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  )
}