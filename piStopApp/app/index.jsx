import { ImageBackground, StyleSheet, Text, View } from "react-native";

import backgroundImage from "../assets/images/Gemini_Generated_Image_7qexzq7qexzq7qex.png" 

export default function Page() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}>
          
          <Text>Test</Text>

        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    padding: 24
  }
});
