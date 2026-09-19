import React, { useCallback, useEffect, useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAuth, type User } from "@react-native-firebase/auth";
import styles from "./styles";
import { Colors, Gradients } from "../../../assets/constants/colors";
import { getAccountCreatedAt, signOut } from "../../../services/firebase/auth";
import { formatDateKey } from "../../../services/firebase/stats";
import Icon from "../../../components/icon";
import StatTile from "../../../components/statTile";
import { useDecks } from "../../../context/DecksContext";
import { useStats } from "../../../context/StatsContext";

const buildWeekDays = (activeDates: string[]) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      key: formatDateKey(date),
      label: date.toLocaleDateString("en-US", { weekday: "narrow" }),
      isToday: i === 0,
    });
  }
  return days.map(day => ({ ...day, active: activeDates.includes(day.key) }));
};

const Profile = () => {
  const navigation = useNavigation<any>();
  const { decks } = useDecks();
  const { stats } = useStats();
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const [memberSince, setMemberSince] = useState<Date | null>(null);

  // Firebase Auth profile edits don't trigger onAuthStateChanged, so re-read
  // currentUser whenever this tab regains focus (e.g. after Edit Profile).
  useFocusEffect(
    useCallback(() => {
      setUser(getAuth().currentUser);
    }, []),
  );

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) return;
    getAccountCreatedAt(uid).then(setMemberSince).catch(() => {});
  }, []);

  const name = user?.displayName || "Quraflip User";
  const totalCards = decks.reduce((sum, deck) => sum + deck.totalCards, 0);
  const weekDays = buildWeekDays(stats.activeDates);

  const handleHelp = () => {
    Linking.openURL("mailto:support@quraflip.app?subject=Quraflip%20Support").catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={Gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {memberSince && (
            <View style={styles.memberSince}>
              <Text style={styles.memberSinceText}>
                Member since {memberSince.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Text>
            </View>
          )}
        </LinearGradient>

        <View style={styles.content}>
        <View style={styles.statsRow}>
          <StatTile
            icon="layers"
            iconColor={Colors.primary_blue}
            iconTint={Colors.blue_tint}
            value={String(decks.length)}
            label="Decks"
          />
          <StatTile
            icon="book-open"
            iconColor={Colors.success}
            iconTint={Colors.success_tint}
            value={String(totalCards)}
            label="Cards"
          />
          <StatTile
            icon="zap"
            iconColor={Colors.primary_orange}
            iconTint={Colors.orange_tint}
            value={`${stats.currentStreak} Days`}
            label="Streak"
          />
        </View>

        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.calendarRow}>
          {weekDays.map(day => (
            <View key={day.key} style={styles.calendarDayWrap}>
              {day.active ? (
                <LinearGradient
                  colors={Gradients.warm}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.calendarDot}
                >
                  <Icon family="ionicons" name="flame" size={12} color={Colors.white} />
                </LinearGradient>
              ) : (
                <View style={[styles.calendarDot, day.isToday && styles.calendarDotToday]} />
              )}
              <Text style={styles.calendarLabel}>{day.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity
            style={styles.settingsRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={styles.settingsIconWrap}>
              <Icon name="user" size={16} color={Colors.primary_blue} />
            </View>
            <Text style={styles.settingsLabel}>Edit Profile</Text>
            <Icon name="chevron-right" size={16} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7} onPress={handleHelp}>
            <View style={styles.settingsIconWrap}>
              <Icon name="help-circle" size={16} color={Colors.primary_blue} />
            </View>
            <Text style={styles.settingsLabel}>Help & Support</Text>
            <Icon name="chevron-right" size={16} color={Colors.grey} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8} onPress={signOut}>
          <Icon name="log-out" size={16} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
