import { Pressable, StyleSheet, Text, View, ScrollView, Switch, Button, Image, Animated } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { SvgXml } from 'react-native-svg'
import * as Progress from 'react-native-progress';

export default function BusCard(props) {
  return (
    <View style={styles.card}>
        <View>
            <Text style={styles.name}>{props.line_name}</Text>
            <Text>{props.line_start} → {props.line_end}</Text>
        </View>
        <Text>›</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#eeeeee",
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
    }
})
