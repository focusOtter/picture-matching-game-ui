'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, CloudOff, FolderOpen, HardDrive, Check, Loader2, ImageIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameStore, DEFAULT_IMAGES } from '@/lib/game-store'

// Mock images that simulate Google Drive images
const MOCK_DRIVE_IMAGES = [
  'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=200&h=200&fit=crop',
]

export default function SettingsPage() {
  const {
    isGoogleDriveConnected,
    googleDriveFolderName,
    connectGoogleDrive,
    disconnectGoogleDrive,
    setGoogleDriveFolderName,
    customImages,
    setCustomImages,
  } = useGameStore()

  const [folderInput, setFolderInput] = useState(googleDriveFolderName)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate OAuth flow delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    connectGoogleDrive()
    setIsConnecting(false)
  }

  const handleDisconnect = () => {
    disconnectGoogleDrive()
    setFolderInput('')
  }

  const handleLoadImages = async () => {
    if (!folderInput.trim()) return
    
    setIsLoadingImages(true)
    setGoogleDriveFolderName(folderInput)
    
    // Simulate loading images from Google Drive
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Use mock images
    setCustomImages(MOCK_DRIVE_IMAGES)
    setIsLoadingImages(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-8 text-2xl font-bold">Settings</h1>
        {/* Google Drive Connection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Google Drive</h2>
              <p className="text-sm text-muted-foreground">
                Connect your Google Drive to use custom images from your folders
              </p>
            </div>
          </div>

          {!isGoogleDriveConnected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button 
                onClick={handleConnect} 
                disabled={isConnecting}
                className="w-full gap-2"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Connect Google Drive
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                This is a demo. No actual Google account connection will be made.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Connected Status */}
              <div className="flex items-center gap-2 rounded-lg bg-game-success/10 px-4 py-3 text-sm">
                <Check className="h-4 w-4 text-game-success" />
                <span className="text-game-success">Google Drive Connected</span>
              </div>

              {/* Folder Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Folder Name
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FolderOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={folderInput}
                      onChange={(e) => setFolderInput(e.target.value)}
                      placeholder="Enter folder name (e.g., Game Photos)"
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    onClick={handleLoadImages}
                    disabled={!folderInput.trim() || isLoadingImages}
                  >
                    {isLoadingImages ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Load'
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Enter the name of a folder in your Google Drive containing images
                </p>
              </div>

              {/* Loaded Images Preview */}
              {customImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-medium">
                      <ImageIcon className="h-4 w-4" />
                      Loaded Images ({customImages.length})
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCustomImages([])}
                      className="h-8 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Clear
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {customImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={img}
                          alt={`Custom image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Disconnect Button */}
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <CloudOff className="h-4 w-4" />
                Disconnect Google Drive
              </Button>
            </motion.div>
          )}
        </motion.section>

        {/* Default Images Preview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold">Default Game Images</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {isGoogleDriveConnected && customImages.length > 0
              ? 'These images will be used as fallback if custom images are unavailable.'
              : 'These images are used in the game. Connect Google Drive to use your own!'}
          </p>
          <div className="grid grid-cols-7 gap-2">
            {DEFAULT_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={img}
                  alt={`Default image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
