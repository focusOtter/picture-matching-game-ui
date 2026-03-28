import { auth0 } from '@/lib/auth0'
import { AuthButtonClient } from './auth-button-client'

export async function AuthButton() {
  const session = await auth0.getSession()
  
  return <AuthButtonClient user={session?.user ?? null} />
}
