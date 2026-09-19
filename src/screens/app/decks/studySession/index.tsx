import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import ProgressBar from "../../../../components/progressBar";
import { subscribeToCards, subscribeToDeck } from "../../../../services/firebase/decks";
import { recordStudyActivity } from "../../../../services/firebase/stats";
import { getAuth } from "@react-native-firebase/auth";
import { Card, Deck } from "../../../../types/deck";

// Solid app-blue gradient for every card, independent of the deck's own accent color.
const CARD_GRADIENT = [Colors.primary_blue, "#0b4fb0"];

const StudySession = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { deckId } = route.params;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubDeck = subscribeToDeck(deckId, setDeck);
    const unsubCards = subscribeToCards(deckId, setCards);
    return () => {
      unsubDeck();
      unsubCards();
    };
  }, [deckId]);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const goToIndex = (index: number) => {
    flipAnim.setValue(0);
    setFlipped(false);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    goToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex === cards.length - 1) {
      const uid = getAuth().currentUser?.uid;
      if (uid) recordStudyActivity(uid).catch(() => {});
      Alert.alert("Nice work!", `You've reviewed all ${cards.length} cards in this deck.`, [
        { text: "Done", onPress: () => navigation.goBack() },
      ]);
      return;
    }
    goToIndex(currentIndex + 1);
  };

  if (!deck) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.primary_blue} />
      </View>
    );
  }

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });
  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="x" size={20} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{deck.title}</Text>
        <View style={styles.iconButton} />
      </View>

      {cards.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="layers" size={26} color={Colors.primary_blue} />
          <Text style={styles.emptyTitle}>No cards to study</Text>
          <Text style={styles.emptySubtitle}>Add some flashcards to this deck first.</Text>
        </View>
      ) : (
        <>
          <View style={styles.progressWrap}>
            <ProgressBar progress={(currentIndex + 1) / cards.length} color={Colors.primary_blue} />
            <Text style={styles.progressText}>Card {currentIndex + 1} of {cards.length}</Text>
          </View>

          <View style={styles.cardArea}>
            <View style={styles.cardTouchable}>
              <Animated.View
                style={[styles.cardFace, { transform: [{ perspective: 1200 }, { rotateY: frontInterpolate }] }]}
              >
                <LinearGradient
                  colors={CARD_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardLabel}>QUESTION</Text>
                  <ScrollView contentContainerStyle={styles.cardTextWrap} showsVerticalScrollIndicator={false}>
                    <Text style={styles.cardText}>{currentCard.frontText}</Text>
                  </ScrollView>
                </LinearGradient>
              </Animated.View>

              <Animated.View
                style={[styles.cardFace, { transform: [{ perspective: 1200 }, { rotateY: backInterpolate }] }]}
              >
                <LinearGradient
                  colors={[...CARD_GRADIENT].reverse()}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardLabel}>ANSWER</Text>
                  <ScrollView contentContainerStyle={styles.cardTextWrap} showsVerticalScrollIndicator={false}>
                    <Text style={styles.cardText}>{currentCard.backText}</Text>
                  </ScrollView>
                </LinearGradient>
              </Animated.View>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
            >
              <Icon name="chevron-left" size={20} color={currentIndex === 0 ? Colors.grey : Colors.black} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.showAnswerButton} onPress={flipCard} activeOpacity={0.85}>
              <Text style={styles.showAnswerText}>{flipped ? "Show Question" : "Show Answer"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handleNext} activeOpacity={0.8}>
              <Icon name={isLastCard ? "check" : "chevron-right"} size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default StudySession;
