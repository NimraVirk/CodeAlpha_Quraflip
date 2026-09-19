import { Card } from "../types/deck";

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * Turns a pool of cards into multiple-choice questions: each card's front text
 * becomes the prompt and its back text the correct answer, with up to 3
 * distractors drawn from other cards' back text in the same pool.
 */
export const buildQuizQuestions = (cards: Card[], limit = 10): QuizQuestion[] => {
  const pool = shuffle(cards).slice(0, limit);

  return pool.map(card => {
    const distractorPool = cards
      .filter(c => c.id !== card.id && c.backText.trim() !== card.backText.trim())
      .map(c => c.backText);
    const distractors = shuffle(Array.from(new Set(distractorPool))).slice(0, 3);

    const options = shuffle([
      { text: card.backText, isCorrect: true },
      ...distractors.map(text => ({ text, isCorrect: false })),
    ]);

    return { id: card.id, prompt: card.frontText, options };
  });
};
