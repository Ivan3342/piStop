import { Pressable, StyleSheet, Text, View, ScrollView, Switch, Button, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [dark, setDark] = useState(false);

  const user = "Ivan";

  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    fetch("http://bus.prvatehnicka.edu.rs/api/get_bus_lines.php")
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.log(err));
  }, []);

  const getCrowdStatus = (count) => {
    if (count <= 18) {
      return { label: "Mala gužva", color: "#22c55e" };
    }

    if (count <= 35) {
      return { label: "Srednja gužva", color: "#eab308" };
    }

    return { label: "Velika gužva", color: "#ef4444" };
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Zdravo, {user} 👋</Text>
            <Text style={[styles.subtitle, { color: theme.subtext }]}>
              Informacije za javni prevoz na dlanu
            </Text>
          </View>

          {/* Theme toggle */}
          <Pressable onPress={() => setDark(!dark)}>
            <Image
              style={{ width: 54, height: 54 }}
              source={
                dark
                  ? require("../assets/images/sun-svgrepo-com.svg")
                  : require("../assets/images/moon-svgrepo-com.svg")
              }
            />
          </Pressable>

          <Switch onValueChange={(value) => setDark(value)} value={dark} />

        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Dolasci
          </Text>

          {data.map(item => {
            let crowd = getCrowdStatus(item.face_count);

            return (
              <View
                key={item.line_name + 1}
                style={[
                  styles.card,
                  { backgroundColor: theme.card, shadowColor: theme.shadow }
                ]}
              >
                <View>
                  <Text style={[styles.line, { color: theme.primary }]}>
                    {item.line_name}
                  </Text>
                  <Text style={[styles.route, { color: theme.subtext }]}>
                    {item.line_start} → {item.line_end}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: crowd.color + "22" }
                  ]}
                >
                  <Text style={[styles.badgeText, { color: crowd.color }]}>
                    {crowd.label}
                  </Text>

                  <Text style={[styles.badgeText, { color: crowd.color, textAlign: "center" }]}>
                    {item.face_count} / {item.capacity}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomBar, { backgroundColor: theme.card }]}>
          <Link href="/timetable" asChild>
            <Pressable style={[styles.button, { backgroundColor: theme.primary }]}>
              <Text style={[styles.buttonText, { color: theme.text }]}>Red vožnje</Text>
            </Pressable>
          </Link>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const lightTheme = {
  bg: "#f5f7fb",
  card: "#ffffff",
  text: "#0f172a",
  subtext: "#64748b",
  primary: "#2563eb",
  shadow: "#000",
};

const darkTheme = {
  bg: "#020617",
  card: "#020617",
  text: "#f8fafc",
  subtext: "#94a3b8",
  primary: "#3b82f6",
  shadow: "#000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },

  line: {
    fontSize: 26,
    fontWeight: "900",
  },

  route: {
    fontSize: 14,
    marginTop: 2,
    width: 200,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingTop: 16,
    paddingBottom: 36,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopWidth: 1,
    borderTopColor: "#1e293b22",
  },

  button: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.4,
    textAlign: "center"
  },
});
