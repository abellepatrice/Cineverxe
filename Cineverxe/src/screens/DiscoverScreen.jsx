import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const genres = [
  "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Adventure"
];

const discoverMovies = [
  {
    title: "The Matrix",
    genre: "Sci-Fi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ssxd7Ewd6coJDMig1zvRrNDCCHWlIVPWSX_9Pkb8mRHkzOulX0Hj6ssD-YZ9cUk9o4z-E6YtvHZ6yQXwc1V8PNqY9T90lyIK79Xgk-5ra7K7I1rd_jAzXbU4MbW3jvhkoAT1lAJnEs6bEhccJSOcr2zhFJMQTysoPbhQ-ya7gl3e8zZLFi0SaA6G_5AgX8fgT8K6obX2m5KYZq-6D9e0Ep2lJEnIp1Q_mdeLrL7DMDZcxvSmxjrxY2QQwb8Hd92v6zEs",
  },
  {
    title: "Pulp Fiction",
    genre: "Crime",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU34HzoIJ0S38SzZLag1rsJ0emqUoe5tInLvpcIKImn9zUaRw3RkSnbiqEGjnLNEItMAmYnurJ2irijli6R0b7e7zAh5-Pl8UCLOAttgYooiEQKgWuBFmy4JHrSyHTyCuWCHhLLPI9Bn05RHWTLcX4AUXhtYJJtrc5rCWJ1oaDmtV0ZHpjQmbGN4UDC5NtNMtMoCyusGYKN4vJV7wCKAwPglIgchwtdFUeXibcPILWrfDho_8ckH2nwq9N-GQAPHn2jTdf4FOwkpGQ",
  },
  {
    title: "Fight Club",
    genre: "Drama",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMhYLs1YN2xBZDh_TYQTTwxCbplJadJ3jGsY55BQBrnC-vQohNukWDvvIYdCZYC2c2AJ2Bw9_tWOGRhwQobBedHYT53b2vjiMVaKVIHsybkzzNmt-hksW2cRfp2KLpUlQeKBoFILKnuwAhSmjMp6vQ79qBM2RNxNB-Qgr_kZZCFOWjATFA8iZomyEV9bYF8s3qUk4jr7rcE0VrQFBkZhrIPeFkVAJOHIlro008hVPyv6qCFXZwzKpdPIUxunF16elsGSooerzK4JZj",
  },
];

const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies = discoverMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedGenre === "All" || movie.genre === selectedGenre)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="explore" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="filter-list" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Genres */}
        <View style={styles.genresContainer}>
          <TouchableOpacity
            style={[styles.genreButton, selectedGenre === "All" && styles.activeGenre]}
            onPress={() => setSelectedGenre("All")}
          >
            <Text style={[styles.genreText, selectedGenre === "All" && styles.activeGenreText]}>All</Text>
          </TouchableOpacity>
          {genres.map(genre => (
            <TouchableOpacity
              key={genre}
              style={[styles.genreButton, selectedGenre === genre && styles.activeGenre]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text style={[styles.genreText, selectedGenre === genre && styles.activeGenreText]}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Movies Grid */}
        <View style={styles.moviesContainer}>
          {filteredMovies.map((movie, index) => (
            <TouchableOpacity key={index} style={styles.movieCard}>
              <Image source={{ uri: movie.img }} style={styles.moviePoster} />
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieGenre}>{movie.genre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1 },
  iconButton: { padding: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a1b3d",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: "#fff", fontSize: 16, paddingVertical: 12 },
  genresContainer: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, marginTop: 16 },
  genreButton: {
    backgroundColor: "#2a1b3d",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeGenre: { backgroundColor: "#5b13ec" },
  genreText: { color: "#aaa", fontSize: 14 },
  activeGenreText: { color: "#fff", fontWeight: "bold" },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  movieCard: { width: "48%", marginBottom: 16 },
  moviePoster: { width: "100%", height: 200, borderRadius: 8 },
  movieTitle: { color: "#fff", fontWeight: "500", marginTop: 6, fontSize: 14 },
  movieGenre: { color: "#bbb", fontSize: 12 },
});
