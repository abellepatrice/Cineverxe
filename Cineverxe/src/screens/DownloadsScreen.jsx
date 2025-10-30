import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const downloadedMovies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMhYLs1YN2xBZDh_TYQTTwxCbplJadJ3jGsY55BQBrnC-vQohNukWDvvIYdCZYC2c2AJ2Bw9_tWOGRhwQobBedHYT53b2vjiMVaKVIHsybkzzNmt-hksW2cRfp2KLpUlQeKBoFILKnuwAhSmjMp6vQ79qBM2RNxNB-Qgr_kZZCFOWjATFA8iZomyEV9bYF8s3qUk4jr7rcE0VrQFBkZhrIPeFkVAJOHIlro008hVPyv6qCFXZwzKpdPIUxunF16elsGSooerzK4JZj",
    size: "2.1 GB",
    downloaded: true,
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU34HzoIJ0S38SzZLag1rsJ0emqUoe5tInLvpcIKImn9zUaRw3RkSnbiqEGjnLNEItMAmYnurJ2irijli6R0b7e7zAh5-Pl8UCLOAttgYooiEQKgWuBFmy4JHrSyHTyCuWCHhLLPI9Bn05RHWTLcX4AUXhtYJJtrc5rCWJ1oaDmtV0ZHpjQmbGN4UDC5NtNMtMoCyusGYKN4vJV7wCKAwPglIgchwtdFUeXibcPILWrfDho_8ckH2nwq9N-GQAPHn2jTdf4FOwkpGQ",
    size: "1.8 GB",
    downloaded: true,
  },
];

const downloadingMovies = [
  {
    title: "Dune",
    genre: "Adventure",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ACHohIGwbniLiXp6keXFH5kEF-J6BGIwY99kxMFRfVyGDcUGKpjo7fqjBr7ot8LZm_5iIkVDmcLpEnFIxZnfFHVxc0-8IV9tz_FZw7RReD3GiRL_tu5d6WxGqTK6MhL-BLDCzqjASeC8fl0-2hNwkMRX2yEyeNJv9ecuz5wN27WA5XMV6bhI9NVX_xo4kX5rwQ7qq7Ash5TLeWSmiXJO3Zf4WxOo6IqvLk5LAdUQQ_wg2_tsYfpbtYLDYPWlA_qKF4AxJilc2QVe",
    size: "3.2 GB",
    progress: 0.75,
  },
];

const DownloadsScreen = () => {
  const [downloads, setDownloads] = useState(downloadedMovies);
  const [downloading, setDownloading] = useState(downloadingMovies);

  const deleteDownload = (movie) => {
    Alert.alert(
      "Delete Download",
      `Delete "${movie.title}" from downloads?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => setDownloads(downloads.filter(item => item.title !== movie.title)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Downloads</Text>
      </View>

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
              <View key={index} style={styles.downloadItem}>
                <Image source={{ uri: movie.img }} style={styles.downloadPoster} />
                <View style={styles.downloadInfo}>
                  <Text style={styles.downloadTitle}>{movie.title}</Text>
                  <Text style={styles.downloadGenre}>{movie.genre} • {movie.size}</Text>
                  <TouchableOpacity style={styles.watchButton}>
                    <MaterialIcons name="play-arrow" size={20} color="#fff" />
                    <Text style={styles.watchButtonText}>Watch</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteDownload(movie)}
                >
                  <MaterialIcons name="delete" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DownloadsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  pageHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
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
  downloadPoster: { width: 80, height: 120, borderRadius: 6 },
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
