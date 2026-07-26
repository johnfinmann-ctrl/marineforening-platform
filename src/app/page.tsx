import { clubConfig } from '../../config/club.config';

/**
 * Forside — offentlig side.
 * Henter i en færdig implementering seneste nyheder og næste arrangement
 * via modulerne i src/modules/news og src/modules/events.
 */
export default function ForsidePage() {
  return (
    <main>
      <header className="border-b border-gray-200 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          {/* logo hentes fra /public/logo.png i en rigtig deployment */}
          <span className="font-display font-bold text-navy-dark">{clubConfig.name}</span>
        </div>
        <nav className="flex gap-6 text-sm">
          {clubConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-navy-dark">
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="bg-navy-dark text-white text-center py-20 px-6">
        <h1 className="font-display text-3xl mb-2">Velkommen til {clubConfig.name}</h1>
        <p className="text-navy-pale mb-8">{clubConfig.tagline}</p>
        <div className="flex gap-4 justify-center">
          <a href="/mit-ebeltoft" className="bg-gold text-navy-dark px-6 py-3 font-semibold">
            Bliv medlem
          </a>
          <a href="/kalender" className="border border-white px-6 py-3 font-semibold">
            Se aktiviteter
          </a>
        </div>
      </section>

      {/* I en fuld implementering: <NewsList /> og <NextEvent /> fra modulerne */}
    </main>
  );
}
