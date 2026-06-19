import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, image500, image185 } from '../api/tmdb';

const { width, height } = Dimensions.get('window');

const MovieDetailScreen = ({ route, navigation }) => {
  const { id, title: routeTitle, img: routeImg } = route.params || {};
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getMovieDetails();
    checkIfFavorite();
  }, [id]);

  const getMovieDetails = async () => {
    setLoading(true);
    try {
      const details = await fetchMovieDetails(id);
      const credits = await fetchMovieCredits(id);
      const similar = await fetchSimilarMovies(id);
      setMovie(details);
      setCast(credits);
      setSimilarMovies(similar);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('myListMovies');
      if (stored) {
        const list = JSON.parse(stored);
        const exists = list.some(item => item.id === id || item.title === routeTitle);
        setIsFavorite(exists);
      }
    } catch (e) {
      console.error("Error checking favorite status:", e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('myListMovies');
      let list = stored ? JSON.parse(stored) : [];
      const movieToSave = {
        id: id || movie?.id,
        title: movie?.title || routeTitle,
        genre: movie?.genres?.[0]?.name || movie?.genre || 'Movie',
        img: image500(movie?.poster_path) || routeImg || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000'
      };

      if (isFavorite) {
        list = list.filter(item => item.id !== movieToSave.id && item.title !== movieToSave.title);
        setIsFavorite(false);
      } else {
        list.push(movieToSave);
        setIsFavorite(true);
      }
      await AsyncStorage.setItem('myListMovies', JSON.stringify(list));
    } catch (e) {
      console.error("Error saving favorite:", e);
    }
  };

  const handleDownload = async () => {
    try {
      const stored = await AsyncStorage.getItem('downloadedMovies');
      let list = stored ? JSON.parse(stored) : [];

      const movieToDownload = {
        id: id || movie?.id,
        title: movie?.title || routeTitle,
        genre: movie?.genres?.[0]?.name || movie?.genre || 'Movie',
        img: image500(movie?.poster_path) || routeImg || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000',
        size: '1.8 GB',
        downloaded: true
      };

      if (list.some(item => item.title === movieToDownload.title)) {
        Alert.alert("Already Downloaded", "This movie is already in your downloads.");
        return;
      }

      list.push(movieToDownload);
      await AsyncStorage.setItem('downloadedMovies', JSON.stringify(list));
      Alert.alert("Success", `"${movieToDownload.title}" has been added to downloads!`);
    } catch (e) {
      console.error("Error saving download:", e);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5b13ec" />
      </View>
    );
  }

  const backdropUrl = image500(movie?.backdrop_path) || image500(movie?.poster_path) || routeImg;
  const posterUrl = image185(movie?.poster_path) || routeImg;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image with gradient overlay */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: backdropUrl }} style={styles.backdropImage} />
          <View style={styles.gradientOverlay} />
          
          {/* Header Controls */}
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
              <MaterialIcons name="chevron-left" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite} style={styles.headerButton}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={28}
                color={isFavorite ? "#ff4757" : "#fff"}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Movie Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie?.title || routeTitle}</Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{movie?.release_date?.split('-')[0] || 'N/A'}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>{movie?.runtime ? `${movie.runtime} min` : 'N/A'}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#ffd700" />
              <Text style={styles.ratingText}>{movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.playButton}>
              <MaterialIcons name="play-arrow" size={24} color="#fff" />
              <Text style={styles.playButtonText}>Watch Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
              <MaterialIcons name="file-download" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Genres */}
          <View style={styles.genresContainer}>
            {movie?.genres?.map((g) => (
              <View key={g.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{g.name}</Text>
              </View>
            ))}
          </View>

          {/* Overview */}
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.overviewText}>{movie?.overview || "No overview available."}</Text>

          {/* Cast */}
          {cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast & Crew</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castList}>
                {cast.map((item, idx) => {
                  const castImg = image185(item.profile_path) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';
                  return (
                    <View key={idx} style={styles.castCard}>
                      <Image source={{ uri: castImg }} style={styles.castImage} />
                      <Text style={styles.castCharacter} numberOfLines={1}>{item.character}</Text>
                      <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Similar Movies</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarList}>
                {similarMovies.map((item, idx) => {
                  const simImg = image185(item.poster_path) || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200';
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.similarCard}
                      onPress={() => navigation.push('Movie', { id: item.id, title: item.title, img: simImg })}
                    >
                      <Image source={{ uri: simImg }} style={styles.similarPoster} />
                      <Text style={styles.similarTitle} numberOfLines={1}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#161022' },
  loadingContainer: { flex: 1, backgroundColor: '#161022', justifyContent: 'center', alignItems: 'center' },
  imageContainer: { width: width, height: height * 0.45, position: 'relative' },
  backdropImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 16, 34, 0.6)',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerButton: {
    backgroundColor: 'rgba(22, 16, 34, 0.5)',
    borderRadius: 999,
    padding: 6,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#161022',
    paddingTop: 24,
    minHeight: height * 0.6,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  metaContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  metaText: { color: '#aaa', fontSize: 14 },
  metaDivider: { color: '#aaa', marginHorizontal: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#ffd700', marginLeft: 4, fontWeight: 'bold' },
  actionsContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b13ec',
    paddingVertical: 14,
    borderRadius: 12,
  },
  playButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  downloadButton: {
    backgroundColor: '#2a1b3d',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  genreChip: { backgroundColor: '#2a1b3d', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  genreText: { color: '#bbb', fontSize: 12 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 12 },
  overviewText: { color: '#bbb', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  section: { marginTop: 16 },
  castList: { gap: 12, paddingVertical: 8 },
  castCard: { width: 80, alignItems: 'center' },
  castImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 6, resizeMode: 'cover' },
  castCharacter: { color: '#fff', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  castName: { color: '#aaa', fontSize: 9, textAlign: 'center' },
  similarList: { gap: 12, paddingVertical: 8 },
  similarCard: { width: 110 },
  similarPoster: { width: 110, height: 160, borderRadius: 12, resizeMode: 'cover', marginBottom: 6 },
  similarTitle: { color: '#fff', fontSize: 12, textAlign: 'center' }
});
