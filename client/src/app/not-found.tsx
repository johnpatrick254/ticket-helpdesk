import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>There was a problem</h2>
      <p>Could not find requested resource</p>
      <p><Link href="/">Return to dashboard</Link></p>
      
    </div>
  )
}