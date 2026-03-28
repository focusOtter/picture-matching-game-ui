import { auth0 } from '@/lib/auth0'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { token } = await auth0.getAccessTokenForConnection({
      connection: 'google-oauth2'
    })

    const searchParams = request.nextUrl.searchParams
    const folderName = searchParams.get('folder')
    const folderId = searchParams.get('folderId')



    // If we have a folder name, search for it
    if (folderName) {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(folderName)}'+and+mimeType='application/vnd.google-apps.folder'&fields=files(id,name)`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const data = await res.json()
      return NextResponse.json(data)
    }



  } catch (error) {
    console.error('Google Drive API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Google Drive' },
      { status: 500 }
    )
  }
}
