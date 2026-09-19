import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Colors, Gradients } from "../../../assets/constants/colors";
import Icon from "../../../components/icon";
import { useDecks } from "../../../context/DecksContext";

const Quiz = () => {
  const navigation = useNavigation<any>();
  const { decks, loading } = useDecks();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.subtitle}>Test what you've learned</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Decks", { screen: "QuizSession" })}
        >
          <LinearGradient
            colors={Gradients.warm}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modeCard}
          >
            <View style={styles.modeIcon}>
              <Icon name="zap" size={18} color={Colors.primary_orange} />
            </View>
            <View style={styles.modeTextWrap}>
              <Text style={styles.modeTitle}>Quick Quiz</Text>
              <Text style={styles.modeDescription}>10 random questions, no timer</Text>
            </View>
            <Icon name="chevron-right" size={18} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Choose a Deck</Text>

        {!loading && decks.length === 0 && (
          <TouchableOpacity
            style={styles.emptyCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Decks", { screen: "CreateDeck" })}
          >
            <Icon name="plus" size={16} color={Colors.primary_blue} />
            <Text style={styles.emptyCardText}>Create a deck to start quizzing</Text>
          </TouchableOpacity>
        )}

        {decks.map(deck => (
          <View key={deck.id} style={[styles.deckRow, { borderLeftColor: deck.colorTheme }]}>
            <View style={styles.deckTextWrap}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.deckMeta}>{deck.totalCards} cards · {deck.category}</Text>
            </View>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: deck.colorTheme }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Decks", { screen: "QuizSession", params: { deckId: deck.id } })}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;
