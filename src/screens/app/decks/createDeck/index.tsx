import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import CustomInput from "../../../../components/customInput";
import GradientButton from "../../../../components/gradientButton";
import { deckCategories, deckColorOptions } from "../../../../data/deckOptions";
import { DeckDraftInfo } from "../../../../types/deck";
import { updateDeckInfo } from "../../../../services/firebase/decks";

// Present both for creating a fresh deck (route.params is empty, hands the draft
// to AddCards) and editing an existing one (route.params.deckId + initialValues,
// saves the edit directly to Firestore and pops back to Deck Detail).
const CreateDeck = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const editing: { deckId: string; initialValues: DeckDraftInfo } | undefined = route.params?.editing;

  const [title, setTitle] = useState(editing?.initialValues.title ?? "");
  const [description, setDescription] = useState(editing?.initialValues.description ?? "");
  const [category, setCategory] = useState(editing?.initialValues.category ?? deckCategories[0]);
  const [colorTheme, setColorTheme] = useState(editing?.initialValues.colorTheme ?? deckColorOptions[0].color);
  const [titleError, setTitleError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setTitleError("Give your deck a title.");
      return;
    }
    setTitleError("");

    const draft: DeckDraftInfo = {
      title: title.trim(),
      description: description.trim(),
      category,
      colorTheme,
    };

    if (editing) {
      setSaving(true);
      try {
        await updateDeckInfo(editing.deckId, draft);
        navigation.goBack();
      } finally {
        setSaving(false);
      }
      return;
    }

    navigation.navigate("AddCards", { draft });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flexFill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Icon name="x" size={20} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>{editing ? "Edit Deck" : "New Deck"}</Text>
          <View style={styles.closeButton} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CustomInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Operating Systems"
            autoCapitalize="sentences"
            error={titleError}
          />

          <CustomInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="What's this deck about?"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.sectionLabel}>Category</Text>
          <View style={styles.chipsWrap}>
            {deckCategories.map(item => {
              const active = item === category;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  activeOpacity={0.8}
                  onPress={() => setCategory(item)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Accent Color</Text>
          <View style={styles.swatchRow}>
            {deckColorOptions.map(option => {
              const active = option.color === colorTheme;
              return (
                <TouchableOpacity
                  key={option.color}
                  style={[
                    styles.swatch,
                    { backgroundColor: option.color },
                    active && styles.swatchActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setColorTheme(option.color)}
                >
                  {active && <Icon name="check" size={14} color={Colors.white} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <GradientButton
            title={editing ? "Save Changes" : "Create & Add Cards"}
            onPress={handleSubmit}
            loading={saving}
            icon={editing ? undefined : "arrow-right"}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateDeck;
