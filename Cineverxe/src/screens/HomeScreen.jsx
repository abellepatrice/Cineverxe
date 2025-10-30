import React from "react";
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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const trending = [
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
  {
    title: "John Wick 4",
    genre: "Action",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ssxd7Ewd6coJDMig1zvRrNDCCHWlIVPWSX_9Pkb8mRHkzOulX0Hj6ssD-YZ9cUk9o4z-E6YtvHZ6yQXwc1V8PNqY9T90lyIK79Xgk-5ra7K7I1rd_jAzXbU4MbW3jvhkoAT1lAJnEs6bEhccJSOcr2zhFJMQTysoPbhQ-ya7gl3e8zZLFi0SaA6G_5AgX8fgT8K6obX2m5KYZq-6D9e0Ep2lJEnIp1Q_mdeLrL7DMDZcxvSmxjrxY2QQwb8Hd92v6zEs",
  },
];

const recommended = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ssxd7Ewd6coJDMig1zvRrNDCCHWlIVPWSX_9Pkb8mRHkzOulX0Hj6ssD-YZ9cUk9o4z-E6YtvHZ6yQXwc1V8PNqY9T90lyIK79Xgk-5ra7K7I1rd_jAzXbU4MbW3jvhkoAT1lAJnEs6bEhccJSOcr2zhFJMQTysoPbhQ-ya7gl3e8zZLFi0SaA6G_5AgX8fgT8K6obX2m5KYZq-6D9e0Ep2lJEnIp1Q_mdeLrL7DMDZcxvSmxjrxY2QQwb8Hd92v6zEs",
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU34HzoIJ0S38SzZLag1rsJ0emqUoe5tInLvpcIKImn9zUaRw3RkSnbiqEGjnLNEItMAmYnurJ2irijli6R0b7e7zAh5-Pl8UCLOAttgYooiEQKgWuBFmy4JHrSyHTyCuWCHhLLPI9Bn05RHWTLcX4AUXhtYJJtrc5rCWJ1oaDmtV0ZHpjQmbGN4UDC5NtNMtMoCyusGYKN4vJV7wCKAwPglIgchwtdFUeXibcPILWrfDho_8ckH2nwq9N-GQAPHn2jTdf4FOwkpGQ",
  },
  {
    title: "Parasite",
    genre: "Thriller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMhYLs1YN2xBZDh_TYQTTwxCbplJadJ3jGsY55BQBrnC-vQohNukWDvvIYdCZYC2c2AJ2Bw9_tWOGRhwQobBedHYT53b2vjiMVaKVIHsybkzzNmt-hksW2cRfp2KLpUlQeKBoFILKnuwAhSmjMp6vQ79qBM2RNxNB-Qgr_kZZCFOWjATFA8iZomyEV9bYF8s3qUk4jr7rcE0VrQFBkZhrIPeFkVAJOHIlro008hVPyv6qCFXZwzKpdPIUxunF16elsGSooerzK4JZj",
  },
];

const newReleases = [
  {
    title: "Damsel",
    genre: "Adventure",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqxuU5tVjVo3vSPYyybyzZ1XjRdn1HMPx0Dkrn1xutxC5WKeKj4UOLZnDs2PGy-BvBGDH7vvk5Y27A2uN5vT6giUBTXuLL0LxIQLROcEAnT4LPcmf46-GgkYhO4D0E4PpKff-0nYb4RymI-AyuvkBP8kqmy1Y62Wmyt7pE_20xHj-3ggH1cZ0V6dWxr_x7THjFs4rhylYWGoS2ZxE1B5YvH8g1yK8nF8OSlYdcZj1opgLPGeOTuT5bRwD2Uw4A",
  },
  {
    title: "The Marvels",
    genre: "Superhero",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoyf7W4pA53h4Yz6Mhd6DaQx-v8M0RYmcBxuD_5EQZ9sK0gU7rPi4jsVLWJ1Gd6ekE3s5iLfQjWn3SrKMj0E8Fq8im7Abqrx8v95fsZc7O6_rI-FuYQbA4Fz_vrqggOvbv_QxFYhUXFRvq89YDGJHGR1D5iMPcTCYfkk5zvPt5oKZcln48-yTg5auMLzo9dbHH5tZMyce86FoipClKThcRYRtS7ChykxL",
  },
  {
    title: "Rebel Moon",
    genre: "Sci-Fi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTkJrRt0uvNufZ7iLbWLsE40yIQGthNMw1-U2V_ebOQ2sJztYxvBNNyDLQk_JJw_dDHg6vEZ2ZsK4RuZ0_8ToepbDsgOOfWbLRuDy2XynqGHnQ6MK3PwhrV6ZUtDJle1mQo77vUeAUS4lVQCFo6FZrNoFSqIl6daIehLaAyDhT54FyQlzK-LKRq90irTg35eBFxTFpwhvnR8T7bFELp8",
  },
];

const HomeScreen = () => {

  return (
    <View style={styles.container}>

      <SafeAreaView style={{ marginBottom: 3 }}>
        <StatusBar style="light" />
        {/* Page Header */}
        <View style={styles.pageHeader}>

          <Text style={styles.pageTitle}>Home</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLo0zWiDWYwFTV3B6dJLLCJWfm8PLAhgy8j3ZKjx_6YXkvyjkbD7mvCNqoWgiacSOtp870I8Gl1B3DvmK5HneSsaahlNwJnODsHJPoGbsGZyc0wtBNE00QIEew_asSCGot8d_Rnb0_2Wv4GTfuiAfk5P7Jw_44sZ-dYhUmQE9earh6aX_rjTok5PgiA35oU6fyBbm91Yu4L5TmR7PHJyrenxu5BNgur3UhTVfS87L221naMRXyIwYiQe15chsy1nq_JV74n_vJhQnR",
          }}
          style={styles.heroImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Interstellar</Text>
            <Text style={styles.heroText}>
              When Earth becomes uninhabitable, a former pilot must lead a team
              through a wormhole to save humanity.
            </Text>
            <TouchableOpacity style={styles.watchBtn}>
              <MaterialIcons name="play-arrow" size={24} color="#fff" />
              <Text style={styles.watchText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Trending Now */}
        <MovieSection title="Trending Now" data={trending} />
        {/* Recommended */}
        <MovieSection title="Recommended For You" data={recommended} />
        {/* New Releases */}
        <MovieSection title="New Releases" data={newReleases} />
      </ScrollView>
    </View>
  );
};

const MovieSection = ({ title, data }) => {

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.link}>See All</Text>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.poster} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieGenre}>{item.genre}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1 },
  headerIcons: { flexDirection: "row", gap: 8 },
  iconButton: { padding: 8 },
  heroImage: { height: 380, marginHorizontal: 16, marginTop: 8 },
  heroOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(22,16,34,0.45)",
    borderRadius: 16,
  },
  heroTitle: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  heroText: { color: "#ddd", fontSize: 14, marginTop: 4 },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5b13ec",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  watchText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
  section: { marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  sectionTitle: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  link: { color: "#5b13ec", fontWeight: "600" },
  card: { marginHorizontal: 8, width: 120 },
  poster: { width: "100%", height: 180, borderRadius: 8 },
  movieTitle: { color: "#fff", fontWeight: "500", marginTop: 6 },
  movieGenre: { color: "#bbb", fontSize: 12 },
});

export default HomeScreen;

