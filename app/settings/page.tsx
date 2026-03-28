import { auth0 } from '@/lib/auth0'
import { SettingsContent } from '@/components/settings-content'

async function isGoogleConnected() {
  try {
    await auth0.getAccessTokenForConnection({ connection: 'google-oauth2' })
    return true
  } catch {
    return false
  }
}

export default async function SettingsPage() {
  const isGoogleDriveConnected = await isGoogleConnected()

  return <SettingsContent isGoogleConnected={isGoogleDriveConnected} />
}
