import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState('HD');

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "This will clear all cached data. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: () => {
            // Implement cache clearing logic
            Alert.alert("Success", "Cache cleared successfully!");
          },
        },
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      "Reset App",
      "This will reset all app data and preferences. This action cannot be undone. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            // Implement app reset logic
            Alert.alert("Success", "App has been reset!");
          },
        },
      ]
    );
  };

  const qualityOptions = ['SD', 'HD', '4K'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="settings" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Playback Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playback</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto-play</Text>
              <Text style={styles.settingDescription}>Automatically play next episode</Text>
            </View>
            <Switch
              value={autoPlay}
              onValueChange={setAutoPlay}
              trackColor={{ false: "#767577", true: "#5b13ec" }}
              thumbColor={autoPlay ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Download Quality</Text>
              <Text style={styles.settingDescription}>Default quality for downloads</Text>
            </View>
            <View style={styles.qualitySelector}>
              {qualityOptions.map((quality) => (
                <TouchableOpacity
                  key={quality}
                  style={[
                    styles.qualityOption,
                    downloadQuality === quality && styles.qualityOptionActive,
                  ]}
                  onPress={() => setDownloadQuality(quality)}
                >
                  <Text
                    style={[
                      styles.qualityText,
                      downloadQuality === quality && styles.qualityTextActive,
                    ]}
                  >
                    {quality}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive notifications about new releases</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#5b13ec" }}
              thumbColor={notifications ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
            <MaterialIcons name="cleaning-services" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Clear Cache</Text>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0.8</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2025.10.31</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="info" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>App Info</Text>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="help" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Help & Support</Text>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <TouchableOpacity style={styles.dangerButton} onPress={handleResetApp}>
            <MaterialIcons name="refresh" size={24} color="#ff6b6b" />
            <Text style={styles.dangerButtonText}>Reset App</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161022" },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  settingInfo: { flex: 1 },
  settingTitle: { color: "#fff", fontSize: 16, fontWeight: "500" },
  settingDescription: { color: "#bbb", fontSize: 14, marginTop: 2 },
  qualitySelector: { flexDirection: "row" },
  qualityOption: {
    backgroundColor: "#2a1b3d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  qualityOptionActive: { backgroundColor: "#5b13ec" },
  qualityText: { color: "#aaa", fontSize: 14 },
  qualityTextActive: { color: "#fff", fontWeight: "bold" },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  actionButtonText: { color: "#fff", fontSize: 16, flex: 1, marginLeft: 12 },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  infoLabel: { color: "#bbb", fontSize: 14 },
  infoValue: { color: "#fff", fontSize: 14, fontWeight: "500" },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  dangerButtonText: { color: "#ff6b6b", fontSize: 16, flex: 1, marginLeft: 12 },
});

export default SettingsScreen;
