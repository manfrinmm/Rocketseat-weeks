import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import api from "../../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    api.get("spots", { params: { tech: tech } }).then(({ data }) => {
      setSpots(data);
    });
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}> {tech} </Text>
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: spot }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: spot.thumbnail_url }}
            />
            <Text style={styles.company}>{spot.company}</Text>
            <Text style={styles.price}>
              {spot.price ? `R$ ${spot.price}/dia` : "GRATUITO"}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigate(spot._id)}
            >
              <Text style={styles.buttonText}>Solicitar reversa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default withNavigation(SpotList);

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  bold: {
    fontWeight: "bold"
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2
  },
  company: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 10 },
  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }
});
