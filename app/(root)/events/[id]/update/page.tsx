import EventForm from '@/components/shared/EventForm'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getEventById } from '@/lib/actions/event.actions'

type UpdateEventProps = {
    params:{
        id:string
    }
}
async function UpdateEvent({params:{id}}:UpdateEventProps) {
    const user = await currentUser()
    const userId:any = user?.publicMetadata.userId
    const event = await getEventById(id)
    console.log(event)
    
    if(!user){
        return <h1>Loading.......</h1>
    }
    
  return (
    <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
        </section>

        <div className="wrapper my-8">
            <EventForm type="Update" eventId={event._id} event={event} userId={userId}/>
        </div>
    </>
    
  )
}

export default UpdateEvent