import EventForm from '@/components/shared/EventForm'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
async function CreateEvent() {
    const user = await currentUser()
    
    if(!user){
        return <h1>Loading.......</h1>
    }
    const userId:any = user.publicMetadata.userId
    console.log()
  return (
    <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>
        </section>

        <div className="wrapper my-8">
            <EventForm userId={userId} type="Create" />
        </div>
    </>
    
  )
}

export default CreateEvent