import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DecksList from "../../screens/app/decks";
import CreateDeck from "../../screens/app/decks/createDeck";
import AddCards from "../../screens/app/decks/addCards";
import DeckDetail from "../../screens/app/decks/deckDetail";
import StudySession from "../../screens/app/decks/studySession";
import QuizSession from "../../screens/app/decks/quizSession";

const Stack = createNativeStackNavigator();

const DecksStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecksList" component={DecksList} />
      <Stack.Screen name="CreateDeck" component={CreateDeck} options={{ presentation: "modal" }} />
      <Stack.Screen name="AddCards" component={AddCards} />
      <Stack.Screen name="DeckDetail" component={DeckDetail} />
      <Stack.Screen name="StudySession" component={StudySession} options={{ presentation: "fullScreenModal" }} />
      <Stack.Screen name="QuizSession" component={QuizSession} options={{ presentation: "fullScreenModal" }} />
    </Stack.Navigator>
  );
};

export default DecksStack;
