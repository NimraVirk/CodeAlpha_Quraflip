import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Colors, Gradients } from "../../../assets/constants/colors";
import Icon from "../../../components/icon";
import DeckCard from "../../../components/deckCard";
import { deckCategories } from "../../../data/deckOptions";
import { useDecks } from "../../../context/DecksContext";

const CATEGORY_FILTERS = ["All", ...deckCategories];

const DecksList = () => {
  const navigation = useNavigation<any>();
  const { decks, loading } = useDecks();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredDecks = useMemo(() => {
    return decks.filter(deck => {
      const matchesCategory = activeCategory === "All" || deck.category === activeCategory;
      const matchesSearch = deck.title.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [decks, activeCategory, search]);

  const openDeck = (deckId: string) => navigation.navigate("DeckDetail", { deckId });
  const openStudySession = (deckId: string) => navigation.navigate("StudySession", { deckId });
  const openQuizSession = (deckId: string) => navigation.navigate("QuizSession", { deckId });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={filteredDecks}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={filteredDecks.length > 0 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.title}>My Decks</Text>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.8}
                onPress={() => setSearchOpen(open => !open)}
              >
                <Icon name={searchOpen ? "x" : "search"} size={17} color={Colors.black} />
              </TouchableOpacity>
            </View>

            {searchOpen && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search decks..."
                placeholderTextColor={Colors.grey}
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            )}

            <FlatList
              data={CATEGORY_FILTERS}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
              renderItem={({ item }) => {
                const active = item === activeCategory;
                return (
                  <TouchableOpacity
                    style={[styles.chip, active && styles.chipActive]}
                    activeOpacity={0.8}
                    onPress={() => setActiveCategory(item)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <DeckCard
            deck={item}
            style={styles.gridCard}
            onPress={() => openDeck(item.id)}
            onStudy={() => openStudySession(item.id)}
            onQuiz={() => openQuizSession(item.id)}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={styles.emptyState} color={Colors.primary_blue} />
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Icon name="folder" size={26} color={Colors.primary_blue} />
              </View>
              <Text style={styles.emptyTitle}>
                {decks.length === 0 ? "No decks yet" : "No decks match"}
              </Text>
              <Text style={styles.emptySubtitle}>
                {decks.length === 0
                  ? "Tap the + button to create your first flashcard deck."
                  : "Try a different search or category."}
              </Text>
            </View>
          )
        }
      />

      <TouchableOpacity
        style={styles.fabTouchable}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("CreateDeck")}
      >
        <LinearGradient colors={Gradients.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fab}>
          <Icon name="plus" size={22} color={Colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DecksList;
