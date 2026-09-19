import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import CustomInput from "../../../../components/customInput";
import {
  deleteCard,
  subscribeToCards,
  subscribeToDeck,
  updateCardText,
} from "../../../../services/firebase/decks";
import { Card, Deck } from "../../../../types/deck";
import { tintFromHex } from "../../../../utils/color";

const DeckDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { deckId } = route.params;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editFront, setEditFront] = useState("");
  const [editBack, setEditBack] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const unsubDeck = subscribeToDeck(deckId, setDeck);
    const unsubCards = subscribeToCards(deckId, setCards);
    return () => {
      unsubDeck();
      unsubCards();
    };
  }, [deckId]);

  const openEditCard = (card: Card) => {
    setEditingCard(card);
    setEditFront(card.frontText);
    setEditBack(card.backText);
  };

  const handleSaveCardEdit = async () => {
    if (!editingCard || !editFront.trim() || !editBack.trim()) return;
    setSavingEdit(true);
    try {
      await updateCardText(deckId, editingCard.id, {
        frontText: editFront.trim(),
        backText: editBack.trim(),
      });
      setEditingCard(null);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteCard = (card: Card) => {
    Alert.alert("Delete card?", "This card will be removed from the deck.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteCard(deckId, card.id, Math.max(cards.length - 1, 0)),
      },
    ]);
  };

  if (!deck) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.primary_blue} />
      </View>
    );
  }

  const tint = tintFromHex(deck.colorTheme);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{deck.title}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("CreateDeck", {
              editing: {
                deckId: deck.id,
                initialValues: {
                  title: deck.title,
                  description: deck.description,
                  category: deck.category,
                  colorTheme: deck.colorTheme,
                },
              },
            })
          }
        >
          <Icon name="edit-2" size={17} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={[styles.categoryTag, { backgroundColor: tint }]}>
              <Text style={[styles.categoryText, { color: deck.colorTheme }]}>{deck.category}</Text>
            </View>

            {!!deck.description && <Text style={styles.description}>{deck.description}</Text>}

            <Text style={styles.cardCount}>{deck.totalCards} cards</Text>

            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: deck.colorTheme }]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("StudySession", { deckId: deck.id })}
              >
                <Icon name="layers" size={15} color={Colors.white} />
                <Text style={styles.ctaPrimaryText}>Start Flashcards</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ctaButton, styles.ctaQuiz]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("QuizSession", { deckId: deck.id })}
              >
                <Icon name="award" size={15} color={Colors.black} />
                <Text style={[styles.ctaPrimaryText, styles.ctaQuizText]}>Take Quiz</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Cards</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No cards in this deck yet.</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.cardRow}>
            <Text style={styles.cardIndex}>{index + 1}</Text>
            <View style={styles.cardSide}>
              <Text style={styles.cardSideLabel}>Front</Text>
              <Text style={styles.cardSideText} numberOfLines={3}>{item.frontText}</Text>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardSide}>
              <Text style={styles.cardSideLabel}>Back</Text>
              <Text style={styles.cardSideText} numberOfLines={3}>{item.backText}</Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => openEditCard(item)} hitSlop={8}>
                <Icon name="edit-2" size={14} color={Colors.grey} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCard(item)} hitSlop={8}>
                <Icon name="trash-2" size={14} color={Colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={!!editingCard} animationType="slide" transparent onRequestClose={() => setEditingCard(null)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <SafeAreaView style={styles.modalCard} edges={["bottom"]}>
            <Text style={styles.modalTitle}>Edit Card</Text>

            <CustomInput
              label="Front"
              value={editFront}
              onChangeText={setEditFront}
              multiline
              numberOfLines={3}
            />
            <CustomInput
              label="Back"
              value={editBack}
              onChangeText={setEditBack}
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setEditingCard(null)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={handleSaveCardEdit}
                disabled={savingEdit}
              >
                {savingEdit ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.modalSaveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default DeckDetail;
