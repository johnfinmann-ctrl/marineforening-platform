/**
 * Frivillig-modulet er bevidst en tynd genbrug af events-modulet:
 * samme datamodel (events + registrations), samme tilmeldingsflow.
 * Kun UI-labels ("Meld mig" i stedet for "Tilmeld dig") og felter
 * (ingen madvalg) varierer — se docs/product-design-document.md.
 */
export { createRegistration } from '../events/data';
export type { RegistrationInput } from '../events/data';
