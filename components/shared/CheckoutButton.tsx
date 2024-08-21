'use client'
import { IEVENT } from '@/lib/database/models/event.model'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/clerk-react'
import Checkout from './Checkout'
function CheckoutButton({event}:{event:IEVENT}) {
    const hasEventFinished = new Date(event.endDateTime) < new Date()
    const {user} = useUser()
   const userId = user?.publicMetadata.userId as string



  return (
    <div className='flex items-center'>
        {hasEventFinished ? (
            <p className='p-2 text-red-400'>Sorry ,Tickets are no longer available.</p>
        ):(
            <>
           <SignedOut>
            <Button asChild className='button rounded-full' size="lg"> 
                <Link href="/sign-in">
                    Get Tickets
                </Link>
            </Button>
           </SignedOut>

           <SignedIn>
            <Checkout event={event} userId={userId}></Checkout>
           </SignedIn>
            </>
        )}
        
    </div>
  )
}

export default CheckoutButton