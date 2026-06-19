import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  image500,
  image185,
} from "../api/tmdb";

const getGenreName = (genreId) => {
  const genres = {
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
  return genres[genreId] || "Movie";
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const trendingData = await fetchTrendingMovies();
      const recommendedData = await fetchTopRatedMovies();
      const upcomingData = await fetchUpcomingMovies();

      setTrending(trendingData);
      setRecommended(recommendedData);
      setNewReleases(upcomingData);

      if (trendingData.length > 0) {
        // Pick a random movie from trending to show as hero
        const randomIndex = Math.floor(Math.random() * Math.min(5, trendingData.length));
        setHeroMovie(trendingData[randomIndex]);
      }
    } catch (error) {
      console.error("Error loading movies for HomeScreen:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5b13ec" />
      </View>
    );
  }

  const heroBackdrop = heroMovie
    ? image500(heroMovie.backdrop_path) || image500(heroMovie.poster_path) || heroMovie.img
    : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000";

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: 3 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Cineverxe</Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate("Discover")}
          >
            <MaterialIcons name="search" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        {heroMovie && (
          <ImageBackground
            source={{ uri: heroBackdrop }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{heroMovie.title}</Text>
              <Text style={styles.heroText} numberOfLines={2}>
                {heroMovie.overview || "Explore this cinema universe."}
              </Text>
              <TouchableOpacity
                style={styles.watchBtn}
                onPress={() =>
                  navigation.navigate("Movie", {
                    id: heroMovie.id,
                    title: heroMovie.title,
                    img: image500(heroMovie.poster_path) || heroMovie.img,
                  })
                }
              >
                <MaterialIcons name="play-arrow" size={24} color="#fff" />
                <Text style={styles.watchText}>Watch Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {/* Trending Now */}
        <MovieSection title="Trending Now" data={trending} navigation={navigation} />
        {/* Recommended */}
        <MovieSection title="Recommended For You" data={recommended} navigation={navigation} />
        {/* New Releases */}
        <MovieSection title="New Releases" data={newReleases} navigation={navigation} />
        
        {/* Extra bottom padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const MovieSection = ({ title, data, navigation }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const posterUrl = image185(item.poster_path) || item.img || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200";
          const genreName = item.genre_ids ? getGenreName(item.genre_ids[0]) : (item.genre || "Movie");
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Movie", {
                  id: item.id,
                  title: item.title,
                  img: image500(item.poster_path) || posterUrl,
                })
              }
            >
              <Image source={{ uri: posterUrl }} style={styles.poster} />
              <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.movieGenre}>{genreName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  loadingContainer: { flex: 1, backgroundColor: "#161022", justifyContent: "center", alignItems: "center" },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  pageTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  searchButton: { padding: 4 },
  heroImage: { height: 350, marginHorizontal: 16, marginTop: 8 },
  heroOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(22,16,34,0.55)",
    borderRadius: 16,
  },
  heroTitle: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  heroText: { color: "#ddd", fontSize: 13, marginTop: 4, lineHeight: 18 },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5b13ec",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  watchText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
  section: { marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  card: { marginHorizontal: 8, width: 120 },
  poster: { width: "100%", height: 180, borderRadius: 8, resizeMode: "cover" },
  movieTitle: { color: "#fff", fontWeight: "500", marginTop: 6, fontSize: 13 },
  movieGenre: { color: "#bbb", fontSize: 11 },
});

export default HomeScreen;
