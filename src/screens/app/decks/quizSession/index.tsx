import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import ProgressBar from "../../../../components/progressBar";
import { fetchCardsOnce } from "../../../../services/firebase/decks";
import { recordStudyActivity } from "../../../../services/firebase/stats";
import { getAuth } from "@react-native-firebase/auth";
import { useDecks } from "../../../../context/DecksContext";
import { buildQuizQuestions, QuizQuestion } from "../../../../utils/quiz";
import { Card } from "../../../../types/deck";

type Phase = "loading" | "insufficient" | "active" | "results";

const QUICK_QUIZ_LIMIT = 10;

const QuizSession = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const deckId: string | undefined = route.params?.deckId;
  const isQuickQuiz = !deckId;
  const { decks } = useDecks();

  const [phase, setPhase] = useState<Phase>("loading");
  const [pool, setPool] = useState<Card[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const deck = deckId ? decks.find(d => d.id === deckId) : undefined;
  const title = isQuickQuiz ? "Quick Quiz" : deck?.title ?? "Quiz";

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cards = deckId
        ? await fetchCardsOnce(deckId)
        : (await Promise.all(decks.map(d => fetchCardsOnce(d.id)))).flat();

      if (cancelled) return;

      if (cards.length < 2) {
        setPhase("insufficient");
        return;
      }

      setPool(cards);
      setQuestions(buildQuizQuestions(cards, isQuickQuiz ? QUICK_QUIZ_LIMIT : cards.length));
      setPhase("active");
    })();

    return () => {
      cancelled = true;
    };
    // Only re-run for a fresh deck/session, not every time `decks` updates in the background.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answered = selected !== null;

  const handleSelect = (optionText: string) => {
    if (answered) return;
    setSelected(optionText);
    const option = currentQuestion.options.find(o => o.text === optionText);
    if (option?.isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const uid = getAuth().currentUser?.uid;
      if (uid) recordStudyActivity(uid).catch(() => {});
      setPhase("results");
      return;
    }
    setSelected(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRetake = () => {
    setQuestions(buildQuizQuestions(pool, isQuickQuiz ? QUICK_QUIZ_LIMIT : pool.length));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("active");
  };

  if (phase === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.primary_yellow} />
      </View>
    );
  }

  if (phase === "insufficient") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="x" size={20} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.iconButton} />
        </View>
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Icon name="award" size={26} color={Colors.primary_yellow} />
          </View>
          <Text style={styles.emptyTitle}>Not enough cards yet</Text>
          <Text style={styles.emptySubtitle}>
            {isQuickQuiz
              ? "Add at least 2 flashcards across your decks to take a quiz."
              : "Add at least 2 flashcards to this deck to take a quiz."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "results") {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const tier =
      percentage >= 80
        ? { label: "Excellent!", message: "You really know this deck." }
        : percentage >= 50
        ? { label: "Good Job!", message: "Solid progress — keep it up." }
        : { label: "Keep Practicing", message: "A few more reviews will help." };

    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="x" size={20} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Results</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.resultsWrap}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{score}/{total}</Text>
            <Text style={styles.scorePercentText}>{percentage}%</Text>
          </View>

          <Text style={styles.tierLabel}>{tier.label}</Text>
          <Text style={styles.tierMessage}>{tier.message}</Text>

          <View style={styles.resultsProgressWrap}>
            <ProgressBar progress={percentage / 100} color={Colors.primary_yellow} height={8} />
          </View>

          <View style={styles.resultsActions}>
            <TouchableOpacity style={styles.retakeButton} activeOpacity={0.85} onPress={handleRetake}>
              <Icon name="rotate-ccw" size={15} color={Colors.text_light} />
              <Text style={styles.retakeButtonText}>Retake Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.doneButton}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="x" size={20} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.iconButton} />
      </View>

      <View style={styles.progressWrap}>
        <ProgressBar
          progress={(currentIndex + 1) / questions.length}
          color={Colors.primary_yellow}
        />
        <Text style={styles.progressText}>Question {currentIndex + 1} of {questions.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.promptCard}>
          <Text style={styles.promptText}>{currentQuestion.prompt}</Text>
        </View>

        <View style={styles.optionsWrap}>
          {currentQuestion.options.map(option => {
            const isSelected = selected === option.text;
            const revealCorrect = answered && option.isCorrect;
            const revealWrong = answered && isSelected && !option.isCorrect;

            return (
              <TouchableOpacity
                key={option.text}
                style={[
                  styles.optionButton,
                  revealCorrect && styles.optionCorrect,
                  revealWrong && styles.optionWrong,
                ]}
                activeOpacity={0.8}
                disabled={answered}
                onPress={() => handleSelect(option.text)}
              >
                <Text
                  style={[
                    styles.optionText,
                    (revealCorrect || revealWrong) && styles.optionTextLight,
                  ]}
                >
                  {option.text}
                </Text>
                {revealCorrect && <Icon name="check" size={16} color={Colors.white} />}
                {revealWrong && <Icon name="x" size={16} color={Colors.white} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !answered && styles.nextButtonDisabled]}
          activeOpacity={0.85}
          onPress={handleNext}
          disabled={!answered}
        >
          <Text style={styles.nextButtonText}>{isLastQuestion ? "See Results" : "Next Question"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuizSession;
