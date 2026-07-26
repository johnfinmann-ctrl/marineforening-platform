import { getCurrentRoles, hasRole } from '../../lib/auth';
import { redirect } from 'next/navigation';

// Kræver login/roller ved hvert kald — skal ikke statisk genereres ved build-tid.
export const dynamic = 'force-dynamic';

/**
 * Bestyrelsesportal — kræver rollen 'board_member' eller 'admin'.
 * Adgangskontrol her er en ekstra UX-sikring; den reelle sikkerhed
 * håndhæves af Row Level Security i Supabase (supabase/policies.sql).
 */
export default async function BestyrelsePage() {
  const roles = await getCurrentRoles();
  if (!hasRole(roles, 'board_member')) {
    redirect('/');
  }

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="font-display text-2xl text-navy-dark mb-6">Bestyrelsens dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* <StatCard label="Medlemmer" /> <StatCard label="Kontingent betalt" /> ... */}
      </div>
      <div className="border border-gray-200 p-6">
        <h2 className="font-semibold mb-2">Tilmeldinger — kommende arrangement</h2>
        <p className="text-sm text-mute mb-4">
          Digitale og manuelt registrerede tilmeldinger vises samlet (kilde-kolonnen viser
          digital / telefon / seddel / mail).
        </p>
        {/* <RegistrationsTable eventId={...} /> */}
      </div>
    </main>
  );
}
