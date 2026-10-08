import { useState } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Tiny inline icons (no SVG deps) ─────────────────────────────────────────
const icon = StyleSheet.create({
  wrapper: { width: 18, height: 18, justifyContent: "center", alignItems: "center" },
  star: { fontSize: 16, color: "#1a1a1a", lineHeight: 18 },
  person: { fontSize: 52, lineHeight: 60 },
  check: { fontSize: 14, color: "#fff", fontWeight: "bold" },
});

const EmailIcon = () => (
  <View style={icon.wrapper}>
    <Text style={{ fontSize: 16, color: "#1a1a1a" }}>✉</Text>
  </View>
);
const StarIcon = () => (
  <View style={icon.wrapper}>
    <Text style={icon.star}>★</Text>
  </View>
);
const PersonIcon = () => <Text style={icon.person}>👤</Text>;
const CheckIcon = () => <Text style={icon.check}>✓</Text>;

// ─── InfoField helper ─────────────────────────────────────────────────────────
function InfoField({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [points, setPoints] = useState(0);
  const [fabScale] = useState(new Animated.Value(1));
  const [toastVisible, setToastVisible] = useState(false);
  const [toastOpacity] = useState(new Animated.Value(0));

  const showToast = () => {
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  const handleAddPoints = () => {
    Animated.sequence([
      Animated.timing(fabScale, { toValue: 0.88, duration: 80, useNativeDriver: true }),
      Animated.spring(fabScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();

    setPoints((prev) => {
      showToast();
      return prev + 10;
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>My Profile</Text>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <PersonIcon />
          </View>
          <View style={styles.badge}>
            <CheckIcon />
          </View>
        </View>

        <View style={styles.divider} />

        <InfoField label="Name" value="Dinuja Ransara" />

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.row}>
            <EmailIcon />
            <Text style={[styles.value, { marginLeft: 8 }]}>dinujaransara0204@gmail.com</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Points</Text>
          <View style={styles.row}>
            <StarIcon />
            <Text style={[styles.value, { marginLeft: 8 }]}>{points}</Text>
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <Animated.View style={[styles.fabWrapper, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddPoints}
          activeOpacity={0.85}
          accessibilityLabel="Add 10 points"
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Toast */}
      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
          <Text style={styles.toastText}>+10 points added! Total: {points}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  appBar: {
    backgroundColor: "#000",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarTitle: { color: "#fff", fontSize: 18, fontWeight: "600", letterSpacing: 0.3 },
  body: { paddingHorizontal: 24, paddingVertical: 32, paddingBottom: 100 },
  avatarContainer: { alignSelf: "center", marginBottom: 24 },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: { height: 1, backgroundColor: "rgba(0,0,0,0.18)", marginBottom: 24 },
  field: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "700", color: "#000", marginBottom: 4 },
  value: { fontSize: 16, color: "#1a1a1a" },
  row: { flexDirection: "row", alignItems: "center" },
  fabWrapper: { position: "absolute", bottom: 32, right: 24 },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabIcon: { color: "#fff", fontSize: 30, fontWeight: "300", lineHeight: 34 },
  toast: {
    position: "absolute",
    bottom: 104,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.82)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  toastText: { color: "#fff", fontSize: 14, fontWeight: "500" },
});
