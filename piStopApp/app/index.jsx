import { Pressable, StyleSheet, Text, View, ScrollView, Switch, Button, Image, Animated } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { SvgXml } from 'react-native-svg'
import * as Progress from 'react-native-progress';


export default function Page() {
  const [data, setData] = useState([]);
  const [dark, setDark] = useState(false);
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  }

  const theme = dark ? darkTheme : lightTheme;

  const darkIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#000000"></path> </g></svg>';
  const lightIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="#ffffff"></path> </g></svg>';

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.67,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }), 
      ])
    ).start();
  }, []);

  useEffect(() => {
    fetch("http://bus.prvatehnicka.edu.rs/api/get_bus_lines.php")
      .then(res => res.json())
      .then(json => setData(json.data || []))
      .catch(err => console.log(err));
  }, []);

  const getCrowdStatus = (occupancy_percent) => {
    if (occupancy_percent <= 25) {
      return { label: "Mala gužva", color: "#22c55e" };
    }

    if (occupancy_percent <= 35) {
      return { label: "Srednja gužva", color: "#eab308" };
    }

    return { label: "Velika gužva", color: "#ef4444" };
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{width: "90%"}}>
            <Text style={[styles.title, { color: theme.text }]}>Dobrodošli u PiStop! 🚏</Text>
            <Text style={[styles.subtitle, { color: theme.subtext }]}>
              Informacije za javni prevoz na dlanu
            </Text>
          </View>

          {/* Theme toggle */}
          <Pressable onPress={() => setDark(!dark)}>
            <SvgXml
              width="28"
              height="28"
              xml={dark ? lightIcon : darkIcon}
            />
          </Pressable>
        </View>


        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Dolasci
          </Text>

          {data.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: theme.subtext, fontSize: 18 }}>
                Nema linija uskoro! 😔
              </Text>
            </View>) : (<View></View>)
          }
          {
            data.map(item => {
              let crowd = getCrowdStatus(item.occupancy_percent);

              return (
                <Pressable onPress={() => toggleExpand(item.line_name)}>
                  <View
                    key={item.line_name + 1}
                    style={[
                      styles.card,
                      { backgroundColor: theme.card, shadowColor: theme.shadow }
                    ]}
                  >
                    <View>
                      <View style={styles.lineWrapper}>
                        <Text style={[styles.line, { color: theme.primary }]}>
                          {item.line_name}
                        </Text>
                        <Animated.View
                          style={[
                            styles.live,
                            {
                              opacity: pulseAnim,
                              transform: [{ scale: pulseAnim }]
                            }
                          ]}
                        />
                      </View>

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

                      {expandedId === item.line_name ? (
                        <View>
                          <Text style={[styles.badgeText, { color: crowd.color, textAlign: "center" }]}>
                            {item.face_count} / {item.capacity}
                          </Text>
                          <Text style={[styles.badgeText, { color: crowd.color, textAlign: "center" }]}>
                            Dolazak: {Math.round(Math.random()*100%10)} min
                          </Text>
                        </View>
                      ) : (
                        <Text style={[styles.badgeText, { color: crowd.color, textAlign: "center" }]}>
                          {/* {item.face_count} / {item.capacity} */}
                          <Progress.Bar progress={item.occupancy_percent / 100} width={70} borderWidth={0.5} color={crowd.color} />
                        </Text>
                      )}

                      
                    </View>

                  </View>
                </Pressable>
              );
            })}
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomBar, { backgroundColor: theme.card }]}>
          <Link href="/timetable" asChild>
            <Pressable style={{ ...styles.button, backgroundColor: theme.primary }}>
              <Text style={styles.buttonText}>Red vožnje</Text>
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

  lineWrapper: {
    flexDirection: "row",
    alignItems: "center", 
  },

  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  live: {
    width: 8,
    height: 8,
    backgroundColor: "#22c55e",
    borderRadius: 5,
    marginLeft: 10,
    shadowColor: "#22C580",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },

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
    fontWeight: "900"
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
    textAlign: "center"
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
    textAlign: "center",
    color: "white"
  },
});
