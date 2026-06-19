import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { searchMovies, fetchDiscoverMovies, fetchPopularMovies, image185, GENRES_MAP } from "../api/tmdb";

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller"
];

const getGenreName = (genreId) => {
  const genresMapping = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  return genresMapping[genreId] || "Movie";
};

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      // Debounce search
      const delayDebounceFn = setTimeout(() => {
        searchMoviesData(searchQuery);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      loadGenreMoviesData(selectedGenre);
    }
  }, [searchQuery, selectedGenre]);

  const searchMoviesData = async (query) => {
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadGenreMoviesData = async (genre) => {
    setLoading(true);
    try {
      if (genre === "All") {
        const results = await fetchPopularMovies();
        setMovies(results);
      } else {
        const genreId = GENRES_MAP[genre];
        if (genreId) {
          const results = await fetchDiscoverMovies(genreId);
          setMovies(results);
        }
      }
    } catch (error) {
      console.error("Error fetching discover movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons name="explore" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Discover</Text>
        </View>
      </SafeAreaView>

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
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <MaterialIcons name="close" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        {/* Genres (only show when not actively searching) */}
        {searchQuery.trim().length <= 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genresContainer}
          >
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
          </ScrollView>
        )}

        {/* Movies Grid / List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5b13ec" />
          </View>
        ) : movies.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="movie" size={64} color="#aaa" />
            <Text style={styles.emptyText}>No movies found</Text>
            <Text style={styles.emptySubtext}>Try searching for another title or selecting a different genre.</Text>
          </View>
        ) : (
          <View style={styles.moviesContainer}>
            {movies.map((movie, index) => {
              const posterUrl = image185(movie.poster_path) || movie.img || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200";
              const genreName = movie.genre_ids ? getGenreName(movie.genre_ids[0]) : (movie.genre || "Movie");
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.movieCard}
                  onPress={() =>
                    navigation.navigate("Movie", {
                      id: movie.id,
                      title: movie.title,
                      img: image185(movie.poster_path) || posterUrl,
                    })
                  }
                >
                  <Image source={{ uri: posterUrl }} style={styles.moviePoster} />
                  <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                  <Text style={styles.movieGenre}>{genreName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        
        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1, marginLeft: 10 },
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
  genresContainer: { 
    flexDirection: "row", 
    paddingHorizontal: 16, 
    marginTop: 16, 
    gap: 8,
    paddingBottom: 4 
  },
  genreButton: {
    backgroundColor: "#2a1b3d",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeGenre: { backgroundColor: "#5b13ec" },
  genreText: { color: "#aaa", fontSize: 14 },
  activeGenreText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: { minHeight: 300, justifyContent: "center", alignItems: "center" },
  emptyContainer: { minHeight: 300, justifyContent: "center", alignItems: "center", paddingHorizontal: 32 },
  emptyText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 16 },
  emptySubtext: { color: "#aaa", fontSize: 14, textAlign: "center", marginTop: 8 },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  movieCard: { width: "48%", marginBottom: 16 },
  moviePoster: { width: "100%", height: 220, borderRadius: 8, resizeMode: "cover" },
  movieTitle: { color: "#fff", fontWeight: "500", marginTop: 6, fontSize: 14 },
  movieGenre: { color: "#bbb", fontSize: 12 },
});
