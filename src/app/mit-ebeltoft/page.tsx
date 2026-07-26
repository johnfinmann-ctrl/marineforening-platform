/**
 * "Mit Ebeltoft" — medlemsområde. Kræver login (Supabase Auth).
 * I den fulde implementering beskyttes ruten af middleware, der
 * tjekker for en gyldig session, jf. src/lib/auth.ts.
 */
export default function MitEbeltoftPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="font-display text-2xl text-navy-dark mb-6">Mit Ebeltoft</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 p-6">
          <h2 className="font-semibold mb-2">Mine arrangementer</h2>
          {/* <MyRegistrations /> */}
        </div>
        <div className="border border-gray-200 p-6">
          <h2 className="font-semibold mb-2">Mit kontingent</h2>
          {/* <MyPaymentStatus /> */}
        </div>
      </div>
    </main>
  );
}
