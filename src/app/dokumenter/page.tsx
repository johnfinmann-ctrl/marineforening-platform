import { supabase } from '../../lib/supabaseClient';

// Henter live data fra Supabase — skal ikke statisk genereres ved build-tid.
export const dynamic = 'force-dynamic';

export default async function DokumenterPage() {
  const { data: documents } = await supabase
    .from('documents')
    .select('id, title, category, file_url')
    .eq('visible_to_role', 'public')
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="font-display text-2xl text-navy-dark mb-6">Historie og dokumenter</h1>
      <ul className="divide-y divide-gray-200">
        {(documents ?? []).map((doc) => (
          <li key={doc.id} className="py-3 flex justify-between">
            <span>{doc.title}</span>
            <a href={doc.file_url} className="text-navy font-semibold text-sm">
              Åbn →
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
