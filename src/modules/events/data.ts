import { supabase } from '../../lib/supabaseClient';

export interface RegistrationInput {
  eventId: string;
  memberId?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  guestsCount?: number;
  mealChoice?: string;
  note?: string;
  /**
   * 'digital' når medlemmet selv tilmelder sig via hjemmesiden/PWA.
   * 'phone' | 'paper' | 'email' når bestyrelsen registrerer en tilmelding
   * modtaget uden for platformen — se hybridmodellen i produktdesign-dokumentet.
   */
  source: 'digital' | 'phone' | 'paper' | 'email';
  registeredBy?: string; // bestyrelsesmedlemmets member_id ved manuel registrering
}

/**
 * Opretter en tilmelding — bruges identisk af både arrangement-modulet
 * og frivillig-modulet (samme tabel, samme regler for venteliste).
 */
export async function createRegistration(input: RegistrationInput) {
  const { data: event } = await supabase
    .from('events')
    .select('capacity')
    .eq('id', input.eventId)
    .single();

  const { count } = await supabase
    .from('registrations')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', input.eventId)
    .eq('status', 'confirmed');

  const isFull = event?.capacity != null && (count ?? 0) >= event.capacity;

  return supabase.from('registrations').insert({
    event_id: input.eventId,
    member_id: input.memberId ?? null,
    contact_name: input.contactName ?? null,
    contact_phone: input.contactPhone ?? null,
    contact_email: input.contactEmail ?? null,
    guests_count: input.guestsCount ?? 1,
    meal_choice: input.mealChoice ?? null,
    note: input.note ?? null,
    source: input.source,
    status: isFull ? 'waitlist' : 'confirmed',
    registered_by: input.registeredBy ?? null,
  });
}
