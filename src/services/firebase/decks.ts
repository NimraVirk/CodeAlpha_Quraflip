import {
  getFirestore,
  collection,
  doc,
  writeBatch,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import { Card, CardDraft, Deck, DeckDraftInfo } from "../../types/deck";

const decksCollection = () => collection(getFirestore(), "decks");
const cardsCollection = (deckId: string) => collection(getFirestore(), "decks", deckId, "cards");

/** Live list of the current user's decks, newest first. */
export const subscribeToDecks = (
  userId: string,
  onChange: (decks: Deck[]) => void,
  onError?: (error: Error) => void,
) => {
  const q = query(decksCollection(), where("userId", "==", userId));

  return onSnapshot(
    q,
    snapshot => {
      const decks = snapshot.docs.map(docSnap => {
        const data = docSnap.data({ serverTimestamps: "estimate" }) as any;
        return { id: docSnap.id, ...data, _createdAtMillis: data.createdAt?.toMillis?.() ?? 0 };
      });
      decks.sort((a, b) => b._createdAtMillis - a._createdAtMillis);
      onChange(decks.map(({ _createdAtMillis, ...deck }) => deck as Deck));
    },
    error => onError?.(error),
  );
};

/** Live single deck document (title/category/totalCards etc). */
export const subscribeToDeck = (
  deckId: string,
  onChange: (deck: Deck | null) => void,
) => {
  const ref = doc(getFirestore(), "decks", deckId);
  return onSnapshot(ref, snap => {
    if (!snap.exists()) {
      onChange(null);
      return;
    }
    onChange({ id: snap.id, ...(snap.data({ serverTimestamps: "estimate" }) as any) } as Deck);
  });
};

/** Live cards for a deck, in the order they were added. */
export const subscribeToCards = (
  deckId: string,
  onChange: (cards: Card[]) => void,
) => {
  const q = query(cardsCollection(deckId), orderBy("order", "asc"));
  return onSnapshot(q, snapshot => {
    const cards = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Card));
    onChange(cards);
  });
};

/** One-off fetch of a deck's cards (for building a quiz session, not live UI). */
export const fetchCardsOnce = async (deckId: string): Promise<Card[]> => {
  const q = query(cardsCollection(deckId), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Card));
};

/** Atomically creates the deck doc and all of its cards. Returns the new deck id. */
export const createDeckWithCards = async (
  draft: DeckDraftInfo,
  cards: CardDraft[],
  userId: string,
) => {
  const firestore = getFirestore();
  const batch = writeBatch(firestore);
  const deckRef = doc(decksCollection());

  batch.set(deckRef, {
    ...draft,
    userId,
    totalCards: cards.length,
    masteredCards: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  cards.forEach((card, index) => {
    const cardRef = doc(cardsCollection(deckRef.id));
    batch.set(cardRef, {
      frontText: card.frontText,
      backText: card.backText,
      order: index,
      difficulty: "medium",
      reviewsCount: 0,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
  return deckRef.id;
};

export const updateDeckInfo = (deckId: string, data: Partial<DeckDraftInfo>) => {
  return updateDoc(doc(getFirestore(), "decks", deckId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const updateCardText = (
  deckId: string,
  cardId: string,
  data: Pick<CardDraft, "frontText" | "backText">,
) => {
  return updateDoc(doc(getFirestore(), "decks", deckId, "cards", cardId), data);
};

export const deleteCard = async (deckId: string, cardId: string, remainingCount: number) => {
  await deleteDoc(doc(getFirestore(), "decks", deckId, "cards", cardId));
  await updateDoc(doc(getFirestore(), "decks", deckId), {
    totalCards: remainingCount,
    updatedAt: serverTimestamp(),
  });
};
