import { supabase } from '../../lib/supabaseClient';

export interface CalendarEvent {
  id: string;
  title: string;
  event_date: string;
  event_time: string | null;
  location: string | null;
  type: 'event' | 'volunteer';
}

/** Henter kommende, offentliggjorte arrangementer og frivilligopgaver. */
export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, event_date, event_time, location, type')
    .eq('status', 'published')
    .gte('event_date', new Date().toISOString().slice(0, 10))
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Kunne ikke hente arrangementer', error);
    return [];
  }
  return data ?? [];
}
