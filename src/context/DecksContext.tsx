import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "@react-native-firebase/auth";
import { createDeckWithCards, subscribeToDecks } from "../services/firebase/decks";
import { CardDraft, Deck, DeckDraftInfo } from "../types/deck";

interface DecksContextValue {
  decks: Deck[];
  loading: boolean;
  createDeck: (draft: DeckDraftInfo, cards: CardDraft[]) => Promise<string>;
}

const DecksContext = createContext<DecksContextValue | undefined>(undefined);

export const DecksProvider = ({ children }: { children: React.ReactNode }) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      setDecks([]);
      setLoading(false);
      return;
    }

    // Firestore reflects pending writes to this listener immediately (before the
    // round-trip completes), so a newly created deck appears in `decks` right away.
    const unsubscribe = subscribeToDecks(
      uid,
      list => {
        setDecks(list);
        setLoading(false);
      },
      () => setLoading(false),
    );

    return unsubscribe;
  }, []);

  const createDeck = async (draft: DeckDraftInfo, cards: CardDraft[]) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) throw new Error("You must be signed in to create a deck.");
    return createDeckWithCards(draft, cards, uid);
  };

  return (
    <DecksContext.Provider value={{ decks, loading, createDeck }}>
      {children}
    </DecksContext.Provider>
  );
};

export const useDecks = () => {
  const ctx = useContext(DecksContext);
  if (!ctx) throw new Error("useDecks must be used within a DecksProvider");
  return ctx;
};
