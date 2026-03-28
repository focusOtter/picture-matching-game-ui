import Link from 'next/link'
import { Settings, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthButton } from './auth-button'

export function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Brain className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">MemoryMatch</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <AuthButton />
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
