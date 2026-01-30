import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function timetable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.13/pistop/data.php")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log(err));
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autobuske Linije</Text>

      {data.map(item => (
        <View key={item.ID} style={styles.card}>
          <View>
            <Text style={styles.line}>{item.LINE_NUMBER}</Text>
            <Text style={styles.name}>{item.LINE_START} - {item.LINE_END}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 30 }}>›</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
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
  crowded: {

  }
});
