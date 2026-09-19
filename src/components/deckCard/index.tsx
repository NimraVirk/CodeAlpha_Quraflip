import React from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import styles from "./styles";
import { Colors } from "../../assets/constants/colors";
import ProgressBar from "../progressBar";
import Icon from "../icon";
import { Deck } from "../../types/deck";
import { tintFromHex } from "../../utils/color";

interface DeckCardProps {
  deck: Deck;
  onStudy?: () => void;
  onQuiz?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DeckCard = ({ deck, onStudy, onQuiz, onPress, style }: DeckCardProps) => {
  const progress = deck.totalCards > 0 ? deck.masteredCards / deck.totalCards : 0;
  const tint = tintFromHex(deck.colorTheme);
  const gradientEnd = tintFromHex(deck.colorTheme, 0.35);

  return (
    <TouchableOpacity style={[styles.card, style]} activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={[deck.colorTheme, gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{deck.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{deck.title}</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={deck.colorTheme} />
          <Text style={styles.progressText}>
            {deck.masteredCards} / {deck.totalCards} Mastered
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: tint }]}
            onPress={onStudy}
            activeOpacity={0.8}
          >
            <Icon name="layers" size={14} color={deck.colorTheme} />
            <Text style={[styles.actionText, { color: deck.colorTheme }]}>Study</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.quizButton]}
            onPress={onQuiz}
            activeOpacity={0.8}
          >
            <Icon name="award" size={14} color={Colors.black} />
            <Text style={[styles.actionText, styles.quizText]}>Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeckCard;
