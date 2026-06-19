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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const STORAGE_KEY = 'myListMovies';

const MyListScreen = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadMyList();
    }, [])
  );

  const loadMyList = async () => {
    try {
      const storedList = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedList !== null) {
        setList(JSON.parse(storedList));
      } else {
        setList([]);
      }
    } catch (error) {
      console.error('Error loading my list:', error);
    }
  };

  const saveMyList = async (newList) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (error) {
      console.error('Error saving my list:', error);
    }
  };

  const removeFromList = (movie, e) => {
    // Prevent navigation when clicking remove
    e.stopPropagation();
    
    Alert.alert(
      "Remove from List",
      `Remove "${movie.title}" from your list?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            const newList = list.filter(item => item.title !== movie.title);
            setList(newList);
            saveMyList(newList);
          },
        },
      ]
    );
  };

  const clearList = () => {
    Alert.alert(
      "Clear List",
      "Remove all movies from your list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            setList([]);
            saveMyList([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons name="video-library" size={32} color="#fff" />
          <Text style={styles.headerTitle}>My List</Text>
          <View style={styles.headerActions}>
            {list.length > 0 && (
              <TouchableOpacity style={styles.iconButton} onPress={clearList}>
                <MaterialIcons name="clear-all" size={26} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="video-library" size={64} color="#aaa" />
            <Text style={styles.emptyText}>Your list is empty</Text>
            <Text style={styles.emptySubtext}>Add movies to your list to see them here</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.listCount}>{list.length} movie{list.length !== 1 ? 's' : ''} in your list</Text>
            {list.map((movie, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => navigation.navigate('Movie', { id: movie.id, title: movie.title, img: movie.img })}
              >
                <Image source={{ uri: movie.img }} style={styles.listPoster} />
                <View style={styles.listInfo}>
                  <View>
                    <Text style={styles.listTitle} numberOfLines={1}>{movie.title}</Text>
                    <Text style={styles.listGenre}>{movie.genre}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={(e) => removeFromList(movie, e)}
                  >
                    <MaterialIcons name="remove-circle" size={24} color="#ff6b6b" />
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1, marginLeft: 10 },
  headerActions: { flexDirection: "row" },
  iconButton: { padding: 8 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 },
  emptyText: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 16 },
  emptySubtext: { color: "#aaa", fontSize: 14, textAlign: "center", marginTop: 8 },
  listContainer: { paddingHorizontal: 16, marginTop: 16 },
  listCount: { color: "#5b13ec", fontSize: 14, fontWeight: "bold", marginBottom: 12 },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#2a1b3d",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  listPoster: { width: 80, height: 120, borderRadius: 6, resizeMode: "cover" },
  listInfo: { flex: 1, marginLeft: 12, justifyContent: "space-between" },
  listTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  listGenre: { color: "#bbb", fontSize: 14, marginTop: 2 },
  removeButton: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  removeText: { color: "#ff6b6b", fontSize: 14, marginLeft: 4 },
});
