import { getUpcomingEvents } from '../../modules/calendar/data';

// Denne side henter live data fra Supabase og skal ikke forsøges
// statisk genereret ved build-tid.
export const dynamic = 'force-dynamic';

export default async function KalenderPage() {
  const events = await getUpcomingEvents();

  return (
    <main className="max-w-5xl mx-auto px-8 py-12">
      <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Kalender</p>
      <h1 className="font-display text-2xl text-navy-dark mb-6">Kommende arrangementer</h1>

      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event.id} className="py-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-navy-dark">{event.title}</div>
              <div className="text-sm text-mute">
                {event.event_date} {event.event_time ? `· kl. ${event.event_time}` : ''}{' '}
                {event.location ? `· ${event.location}` : ''}
              </div>
            </div>
            <a href={`/kalender/${event.id}`} className="text-navy font-semibold text-sm">
              Se detaljer →
            </a>
          </li>
        ))}
        {events.length === 0 && (
          <li className="py-8 text-center text-mute">Ingen kommende arrangementer endnu.</li>
        )}
      </ul>
    </main>
  );
}
