export type Difficulty = "easy" | "medium" | "hard";

// A card while it's still being edited in the Add Cards screen, before it exists in Firestore.
export interface CardDraft {
  id: string;
  frontText: string;
  backText: string;
}

// A card as stored in Firestore, under decks/{deckId}/cards/{cardId}.
export interface Card {
  id: string;
  frontText: string;
  backText: string;
  order: number;
  difficulty: Difficulty;
  reviewsCount: number;
}

export interface DeckDraftInfo {
  title: string;
  description: string;
  category: string;
  colorTheme: string;
}

// A deck as stored in Firestore, under decks/{deckId}.
export interface Deck extends DeckDraftInfo {
  id: string;
  userId: string;
  totalCards: number;
  masteredCards: number;
}
