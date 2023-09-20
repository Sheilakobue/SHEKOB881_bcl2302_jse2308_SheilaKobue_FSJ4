//renders a list of featured events
import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function HomePage(props) {
  return (
    <div>
    <Head>
  {/**Head component to set metadata for the HTML document*/}
    <title>NextJS Events</title>
    <meta name = "description" content= "Find great events that allow you to evolve..."/>
    </Head>
      <EventList items={props.events} />
    </div>
  );
}

//this function is used to fetch data (featured events)
export async function getStaticProps(){
 const featuredEvents= await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    //The page is configured to be regenerated every 1800 seconds (30 minutes) to ensure the data remains up-to-date
    revalidate: 1800,
  };
}


