import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@react-native-firebase/auth";
import styles from "./styles";
import { Colors, Gradients } from "../../../assets/constants/colors";
import Icon from "../../../components/icon";
import DeckCard from "../../../components/deckCard";
import { useDecks } from "../../../context/DecksContext";
import { useStats } from "../../../context/StatsContext";

const Home = () => {
  const navigation = useNavigation<any>();
  const user = getAuth().currentUser;
  const firstName = user?.displayName?.split(" ")[0] || "there";
  const { decks } = useDecks();
  const { stats } = useStats();
  const recentDecks = decks.slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header + Streak */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingSmall}>Welcome back,</Text>
            <Text style={styles.greetingName}>{firstName} 👋</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Profile")}>
            <LinearGradient
              colors={Gradients.hero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarButton}
            >
              <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={Gradients.warm}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.streakBanner}
        >
          <View style={styles.streakIconWrap}>
            <Icon family="ionicons" name="flame" size={18} color={Colors.primary_orange} />
          </View>
          <Text style={styles.streakText}>{stats.currentStreak} Day Streak</Text>
          <Text style={styles.streakSubtext}>Keep it going!</Text>
        </LinearGradient>

        {/* Continue Studying */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Continue Studying</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Decks")}>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentDecks.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.decksRow}
          >
            {recentDecks.map(deck => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onPress={() => navigation.navigate("Decks", { screen: "DeckDetail", params: { deckId: deck.id } })}
                onStudy={() => navigation.navigate("Decks", { screen: "StudySession", params: { deckId: deck.id } })}
                onQuiz={() => navigation.navigate("Decks", { screen: "QuizSession", params: { deckId: deck.id } })}
              />
            ))}
          </ScrollView>
        ) : (
          <TouchableOpacity
            style={styles.emptyDecksCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Decks", { screen: "CreateDeck" })}
          >
            <View style={styles.emptyDecksIconWrap}>
              <Icon name="plus" size={18} color={Colors.primary_blue} />
            </View>
            <View style={styles.emptyDecksTextWrap}>
              <Text style={styles.emptyDecksTitle}>Create your first deck</Text>
              <Text style={styles.emptyDecksSubtitle}>Start building a set of flashcards</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
