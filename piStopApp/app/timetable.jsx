import BusCard from "@/components/BusCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function timetable() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://bus.prvatehnicka.edu.rs/api/get_bus_lines.php")
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.log(err));
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Red vožnje</Text>

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                styles.backButton
              ]}
            >
              <Text style={styles.buttonText}>Nazad</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}>


            {data.map(item => (
              <BusCard
                key={item.line_name}
                line_name={item.line_name}
                line_start={item.line_start}
                line_end={item.line_end}
              />
            ))}
          </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.bg,
    color: lightTheme.text
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: lightTheme.text,
    marginBottom: 16,
    marginTop: 20
  },
  card: {
    backgroundColor: lightTheme.bg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: lightTheme.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  line: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.primary,
  },
  name: {
    fontSize: 16,
    color: lightTheme.subtext,
    marginTop: 4,
  },
  backButton: {
    backgroundColor: lightTheme.primary,
    padding: 10,
    borderRadius: 14
  },
  buttonText: {
    color: "white"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});

