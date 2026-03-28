'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LogIn, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AuthButtonClientProps {
  user: {
    name?: string
    email?: string
    picture?: string
  } | null
}

export function AuthButtonClient({ user }: AuthButtonClientProps) {
  if (!user) {
    return (
      <a href="/auth/login">
        <Button variant="outline" size="sm" className="gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </a>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name || 'User avatar'}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
          <span className="hidden sm:inline">{user.name || user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/auth/logout" className="flex cursor-pointer items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Sign Out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
