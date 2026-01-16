import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import backgroundImage from "../assets/images/Gemini_Generated_Image_7qexzq7qexzq7qex.png" 
import { useThemeColor } from "@/hooks/use-theme-color";

export default function Page() {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}>
          
          <View style={styles.main}>
            <Text style={styles.title}>Dobrodošli u PiStop! 👋</Text>
            <Text>Sve informacije o gradskom prevozu na dohvat ruke!</Text>
          </View>

          <Link href="/timetable">Red Vožnje</Link>

        </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  main: {
  },
  title: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 42,
    fontWeight: 700
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: "Roboto"  
  },
  link: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: "Roboto"
  }
});
