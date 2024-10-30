import { Image, StyleSheet, Platform, Button, TextInput, View } from "react-native";
import React, { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";

export default function HomeScreen() {

  const [nombrePeli, setNombrePeli] = useState("");
  const [peliData, setPeliData] = useState(null);
  const [error, setError] = useState("");


  const fetchPeli = async () => {
    if (!nombrePeli) return;

    setError("");

    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${nombrePeli}&apikey=316a02f`);
      if (response.data.Response === "True") {
        setPeliData(response.data);
      } else {
        setError(response.data.Error);
        setPeliData(null);
      }
    } catch (err) {
      setError("Error al consultar la API");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
       <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre de la película"
          value={nombrePeli}
          onChangeText={setNombrePeli}
        />
        <Button title="Buscar" onPress={fetchPeli} />
        
        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : (
          peliData && (
            <View style={styles.contenedorPeli}>
              <Image
                source={{ uri: peliData.Poster }}
                style={styles.poster}
              />
              <ThemedText type="title">{peliData.Title}</ThemedText>
              <ThemedText>{peliData.Plot}</ThemedText>
            </View>
          )
        )}        
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 4,
  },
  contenedorPeli: {
    alignItems: "center",
    marginVertical: 16,
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },

});
