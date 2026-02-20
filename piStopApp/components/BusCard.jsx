import { StyleSheet, Text, View } from "react-native";

export default function BusCard(props) {
  return (
    <View style={styles.card}>
        <View>
            <Text style={styles.name}>{props.line_name}</Text>
            <Text style={styles.line}>{props.line_start} → {props.line_end}</Text>
        </View>
        <Text>›</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        marginBottom: 12,
        padding: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 18,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    name: {
        fontSize: 24,
        fontWeight: "700",
        color: "#2563eb"
    },
    line: {
        color: "#64748b",
    }
})
