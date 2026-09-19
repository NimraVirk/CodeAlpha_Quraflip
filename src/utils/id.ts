// Lightweight client-side id generator for drafts that don't exist in Firestore yet
// (avoids pulling in a uuid dependency just for temporary React keys).
export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
