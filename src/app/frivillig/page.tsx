/**
 * Frivillig-siden bruger samme UI-mønster som kalender/arrangementer
 * (kort + "Meld mig"-knap, der åbner samme tilmeldingskomponent som
 * arrangementer bruger). Se src/modules/volunteers/data.ts.
 */
export default function FrivilligPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 py-12">
      <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Frivillig</p>
      <h1 className="font-display text-2xl text-navy-dark mb-6">Bliv frivillig</h1>
      <p className="text-mute mb-8">
        Se listen af opgaver, foreningen mangler hjælp til, og meld dig med samme
        enkle tilmelding som ved arrangementer.
      </p>
      {/* <VolunteerTaskList /> renderes her i den fulde implementering */}
    </main>
  );
}
