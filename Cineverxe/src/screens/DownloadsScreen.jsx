import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const STORAGE_KEY = 'downloadedMovies';

const defaultDownloads = [
  {
    id: 27205,
    title: "Inception",
    genre: "Sci-Fi",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000",
    size: "2.1 GB",
    downloaded: true,
  },
  {
    id: 155,
    title: "The Dark Knight",
    genre: "Action",
    img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000",
    size: "1.8 GB",
    downloaded: true,
  },
];

const downloadingMovies = [
  {
    id: 164,
    title: "Dune",
    genre: "Adventure",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    size: "3.2 GB",
    progress: 0.75,
  },
];

const DownloadsScreen = () => {
  const navigation = useNavigation();
  const [downloads, setDownloads] = useState([]);
  const [downloading, setDownloading] = useState(downloadingMovies);

  useFocusEffect(
    React.useCallback(() => {
      loadDownloads();
    }, [])
  );

  const loadDownloads = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setDownloads(JSON.parse(stored));
      } else {
        // Initialize with default downloads
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDownloads));
        setDownloads(defaultDownloads);
      }
    } catch (e) {
      console.error("Error loading downloads:", e);
    }
  };

  const deleteDownload = (movie, e) => {
    e.stopPropagation();
    Alert.alert(
      "Delete Download",
      `Delete "${movie.title}" from downloads?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const newList = downloads.filter(item => item.title !== movie.title);
            setDownloads(newList);
            try {
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            } catch (err) {
              console.error(err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Page Header */}
      <SafeAreaView>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Downloads</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Downloading Section */}
        {downloading.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Downloading</Text>
            {downloading.map((movie, index) => (
              <View key={index} style={styles.downloadItem}>
                <Image source={{ uri: movie.img }} style={styles.downloadPoster} />
                <View style={styles.downloadInfo}>
                  <Text style={styles.downloadTitle}>{movie.title}</Text>
                  <Text style={styles.downloadGenre}>{movie.genre} • {movie.size}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${movie.progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(movie.progress * 100)}%</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.pauseButton}>
                  <MaterialIcons name="pause" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Downloaded Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Downloaded</Text>
          {downloads.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="download" size={64} color="#aaa" />
              <Text style={styles.emptyText}>No downloads yet</Text>
              <Text style={styles.emptySubtext}>Download movies to watch offline</Text>
            </View>
          ) : (
            downloads.map((movie, index) => (
              <TouchableOpacity
                key={index}
                style={styles.downloadItem}
                onPress={() => navigation.navigate('Movie', { id: movie.id, title: movie.title, img: movie.img })}
              >
                <Image source={{ uri: movie.img }} style={styles.downloadPoster} />
                <View style={styles.downloadInfo}>
                  <Text style={styles.downloadTitle} numberOfLines={1}>{movie.title}</Text>
                  <Text style={styles.downloadGenre}>{movie.genre} • {movie.size}</Text>
                  <TouchableOpacity style={styles.watchButton}>
                    <MaterialIcons name="play-arrow" size={20} color="#fff" />
                    <Text style={styles.watchButtonText}>Watch</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={(e) => deleteDownload(movie, e)}
                >
                  <MaterialIcons name="delete" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
        
        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default DownloadsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  pageHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pageTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  downloadItem: {
    flexDirection: "row",
    backgroundColor: "#2a1b3d",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  downloadPoster: { width: 80, height: 120, borderRadius: 6, resizeMode: "cover" },
  downloadInfo: { flex: 1, marginLeft: 12 },
  downloadTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  downloadGenre: { color: "#bbb", fontSize: 14, marginTop: 2 },
  progressContainer: { marginTop: 8, flexDirection: "row", alignItems: "center" },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#444",
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: "#5b13ec" },
  progressText: { color: "#fff", fontSize: 12 },
  pauseButton: { padding: 8 },
  watchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5b13ec",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  watchButtonText: { color: "#fff", fontSize: 12, marginLeft: 4 },
  deleteButton: { padding: 8 },
  emptyContainer: { alignItems: "center", paddingTop: 50 },
  emptyText: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 16 },
  emptySubtext: { color: "#aaa", fontSize: 14, textAlign: "center", marginTop: 8 },
});
