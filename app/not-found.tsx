import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
          Go to Homepage
        </Button>
      </Link>
    </div>
  )
}