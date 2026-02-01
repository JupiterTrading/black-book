import './globals.css'

export const metadata = {
  title: 'Epstein Files',
  description: 'Public access to the DOJ Epstein Library',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
