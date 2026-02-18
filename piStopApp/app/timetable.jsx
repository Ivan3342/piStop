import BusCard from "@/components/BusCard";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

export default function timetable() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://bus.prvatehnicka.edu.rs/api/get_bus_lines.php")
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
    marginTop: 20
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
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
    color: "#2563eb",
  },
  name: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },
  backButton: {
    backgroundColor: "#2563eb",
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
