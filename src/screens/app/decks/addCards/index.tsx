import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import CustomInput from "../../../../components/customInput";
import GradientButton from "../../../../components/gradientButton";
import { useDecks } from "../../../../context/DecksContext";
import { CardDraft, DeckDraftInfo } from "../../../../types/deck";
import { generateId } from "../../../../utils/id";

const AddCards = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const draft: DeckDraftInfo = route.params.draft;
  const { createDeck } = useDecks();

  const backInputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const [cards, setCards] = useState<CardDraft[]>([]);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [cardError, setCardError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddCard = () => {
    if (!frontText.trim() || !backText.trim()) {
      setCardError("Fill in both sides of the card.");
      return;
    }
    setCardError("");

    setCards(prev => [
      ...prev,
      { id: generateId(), frontText: frontText.trim(), backText: backText.trim() },
    ]);
    setFrontText("");
    setBackText("");
  };

  const handleRemoveCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const handleSaveDeck = async () => {
    if (cards.length === 0) return;
    setSaving(true);
    try {
      const deckId = await createDeck(draft, cards);
      // Reset (not replace/push) so CreateDeck + AddCards drop out of history —
      // the back button from Deck Detail should return to the deck list, not
      // back into the creation form the user just submitted.
      navigation.reset({
        index: 1,
        routes: [{ name: "DecksList" }, { name: "DeckDetail", params: { deckId } }],
      });
    } catch (err: any) {
      Alert.alert("Couldn't save deck", err?.message ?? "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flexFill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color={Colors.black} />
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Add Flashcards</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{draft.title}</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countPillText}>{cards.length}</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.cardCounter}>Card #{cards.length + 1}</Text>

          <CustomInput
            label="Front (Question)"
            value={frontText}
            onChangeText={text => {
              setFrontText(text);
              if (cardError) setCardError("");
            }}
            placeholder="What's the question or prompt?"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            returnKeyType="next"
            onSubmitEditing={() => backInputRef.current?.focus()}
          />

          <CustomInput
            ref={backInputRef}
            label="Back (Answer)"
            value={backText}
            onChangeText={text => {
              setBackText(text);
              if (cardError) setCardError("");
            }}
            placeholder="What's the answer or definition?"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            error={cardError}
          />

          <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={handleAddCard}>
            <Icon name="plus" size={16} color={Colors.primary_blue} />
            <Text style={styles.addButtonText}>Add Next Card</Text>
          </TouchableOpacity>

          {cards.length > 0 && (
            <View style={styles.addedList}>
              <Text style={styles.addedListTitle}>Cards Added: {cards.length}</Text>
              {cards.map((card, index) => (
                <View key={card.id} style={styles.addedRow}>
                  <Text style={styles.addedIndex}>{index + 1}</Text>
                  <Text style={styles.addedText} numberOfLines={1}>{card.frontText}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveCard(card.id)}
                    hitSlop={8}
                    activeOpacity={0.7}
                  >
                    <Icon name="trash-2" size={15} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <GradientButton
            title={`Save Deck ${cards.length > 0 ? `(${cards.length} cards)` : ""}`}
            onPress={handleSaveDeck}
            loading={saving}
            disabled={cards.length === 0}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCards;
