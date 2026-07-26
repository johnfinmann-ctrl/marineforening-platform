/**
 * club.config.ts
 *
 * Dette er den ENESTE fil, der skal ændres for at genbruge platformen
 * til en anden forening (golfklub, veteranforening, grundejerforening m.fl.).
 *
 * Ret navn, farver, logo og hvilke moduler der er aktive — resten af
 * kodebasen er forenings-agnostisk.
 */

export const clubConfig = {
  name: 'Ebeltoft Marineforening',
  tagline: 'Tradition · Kammeratskab · Fællesskab',
  logo: '/logo.png',

  colors: {
    navyDark: '#15294A',
    navy: '#3B5D82',
    navyPale: '#EAF0F7',
    gold: '#B08D57',
    accent: '#B0223A',
    ink: '#2B3648',
    mute: '#6B7484',
    surface: '#F5F5F3',
  },

  contact: {
    address: 'Havnevej 6, 8400 Ebeltoft',
    email: 'info@ebeltoftmarineforening.dk',
  },

  /**
   * Moduler kan slås til/fra pr. forening. Et modul, der er slået fra,
   * fjernes fra navigation og ruter uden at kodebasen skal ændres.
   */
  modules: {
    news: true,
    calendar: true,
    events: true,
    volunteers: true,
    members: true,
    payments: true,
    documents: true,
    board: true,
    // udvidelser — slås til når foreningen er klar:
    pushNotifications: false,
    sponsorPortal: false,
    onlineVoting: false,
    booking: false,
  },

  navigation: [
    { label: 'Forside', href: '/' },
    { label: 'Nyheder', href: '/nyheder' },
    { label: 'Kalender', href: '/kalender' },
    { label: 'Aktiviteter', href: '/aktiviteter' },
    { label: 'Galleri', href: '/galleri' },
    { label: 'Historie', href: '/dokumenter' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
} as const;

export type ClubConfig = typeof clubConfig;
