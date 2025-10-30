// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Animated, Easing } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// const SplashScreen = ({ navigation }) => {
//   const [progress] = useState(new Animated.Value(0));

//   useEffect(() => {
//     // Animate loading bar
//     Animated.timing(progress, {
//       toValue: 1,
//       duration: 3000,
//       easing: Easing.ease,
//       useNativeDriver: false,
//     }).start(() => {
//       // Navigate to Main tabs after loading completes
//       navigation.replace("Main");
//     });
//   }, [navigation]);

//   const widthInterpolated = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0%", "100%"],
//   });

//   return (
//     <View style={styles.container}>
//       {/* Radial Gradient Background */}
//       <View style={styles.radialOverlay} />

//       {/* Logo */}
//       <View style={styles.logoContainer}>
//         <View style={styles.logoGlow}>
//           <MaterialIcons name="movie" size={60} color="#fff" />
//         </View>
//         <Text style={styles.appName}>Cineverxe</Text>
//         <Text style={styles.tagline}>Your Universe of Cinema</Text>
//       </View>

//       {/* Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={styles.progressBarBackground}>
//           <Animated.View
//             style={[styles.progressBarFill, { width: widthInterpolated }]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   radialOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#5b13ec",
//   },
//   logoContainer: {
//     alignItems: "center",
//   },
//   logoGlow: {
//     height: 110,
//     width: 110,
//     borderRadius: 999,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.9,
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   appName: {
//     fontSize: 32,
//     fontWeight: "700",
//     marginTop: 24,
//   },
//   tagline: {
//     fontSize: 16,
//     marginTop: 6,
//   },
//   progressContainer: {
//     position: "absolute",
//     bottom: 60,
//     width: 200,
//   },
//   progressBarBackground: {
//     height: 8,
//     borderRadius: 999,
//     backgroundColor: "rgba(255,255,255,0.1)",
//     overflow: "hidden",
//   },
//   progressBarFill: {
//     height: "100%",
//     borderRadius: 999,
//     backgroundColor: "#5b13ec",
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SplashScreen = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate loading bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      // Navigate to Home after loading completes
      navigation.replace("Main");
    });
  }, [navigation]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Radial Gradient Background */}
      <View style={styles.radialOverlay} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoGlow}>
          <MaterialIcons name="movie" size={60} color="#fff" />
        </View>
        <Text style={styles.appName}>Cineverxe</Text>
        <Text style={styles.tagline}>Your Universe of Cinema</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBarFill, { width: widthInterpolated }]}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161022",
    alignItems: "center",
    justifyContent: "center",
  },
  radialOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoGlow: {
    backgroundColor: "#5b13ec",
    height: 110,
    width: 110,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5b13ec",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 10,
  },
  appName: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 24,
  },
  tagline: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginTop: 6,
  },
  progressContainer: {
    position: "absolute",
    bottom: 60,
    width: 200,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5b13ec",
  },
});
