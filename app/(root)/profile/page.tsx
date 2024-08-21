import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import Collection from '@/components/shared/Collection';
import { currentUser } from '@clerk/nextjs/server';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
async function ProfilePage({searchParams}:SearchParamProps) {
    const user = await currentUser()
    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;
    const userId:any = user?.publicMetadata.userId
    const organizedEvents = await getEventsByUser({userId,page:eventsPage})
    
    const orders = await getOrdersByUser({userId,page:ordersPage})
    const orderedEvents = await orders?.data.map((order:IOrder) => order.event) || []
  return (
   <>
   {/* my tickets */}
   <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
    <div className='wrapper flex items-center justify-center sm:justify-between'>
        <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
        <Button asChild>
            <Link href="/#events" className='button hidden sm:flex'>
                Explore More Events
            </Link>
        </Button>
    </div>
   </section>

   <section className='wrapper my-8'>
   <Collection 
   data={orderedEvents} 
   emptyTitle="No Event tickets purchased yet" 
   emptyStateSubtext="No worries - plenty of exciting events to explore!" 
   collectionType="My_Tickets" 
   limit={6} 
   page={ordersPage} 
   urlParamName='ordersPage'
   totalPages={orders?.totalPages}/>

   </section>

   {/* events organized */}
   <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
    <div className='wrapper flex items-center justify-center sm:justify-between'>
        <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
        <Button asChild>
            <Link href="/events/create" className='button hidden sm:flex'>
                Create New Event
            </Link>
        </Button>
    </div>
   </section>

   <section className='wrapper my-8'>
   <Collection 
   data={organizedEvents?.data} 
   emptyTitle="No Events have been created yet" 
   emptyStateSubtext="Go create some" 
   collectionType="Events_Organized" 
   limit={6} 
   page={eventsPage} 
   totalPages={organizedEvents?.totalPages}/>

   </section>
   </>
  )
}

export default ProfilePage;