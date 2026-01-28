import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.13/api/data.php")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pi Stop 🚌</Text>
        <Text style={styles.subtitle}>
          Informacije za javni prevoz na dlanu!
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Dolasci</Text>

        {data.map(item => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.line}>{item.line_number} 🚌</Text>
              <Text style={styles.route}>
                {item.line_start} → {item.line_end}
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>LIVE</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <Link href="/timetable" style={styles.navItem}>
          Red vožnje
        </Link>

        <Link href="#" style={styles.navItemSecondary}>
          Test
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 4,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  line: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2563eb",
  },

  route: {
    fontSize: 14,
    color: "#475569",
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16a34a",
  },

  navigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  navItem: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },

  navItemSecondary: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
  },
});
