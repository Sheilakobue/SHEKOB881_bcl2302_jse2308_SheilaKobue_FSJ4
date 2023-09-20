// Function to fetch all events from a remote data source

export async function getAllEvents() {
  const response = await fetch(
    // Use the 'fetch' function to make a request to the specified UR
    "https://events-app-f399f-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  // Initialize an empty array to store the events
  const events = [];

  // Iterate through the data retrieved and transform it into the desired format
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  // Return the array of events
  return events;
}

// Function to retrieve only featured events from all events
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

// Function to retrieve an event by its unique 'id'
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

// Function to filter events based on a date filter (year and month)
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  // Filter the events based on the year and month of the event date
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  // Return the filtered events
  return filteredEvents;
}
