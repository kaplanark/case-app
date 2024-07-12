import "./global.css";

import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform } from "react-native";
import { NAV_THEME } from "~/constants/navTheme";
import { useColorScheme } from "~/hooks/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

import { HomeScreen } from "~/screens/home";
import { DetailsScreen } from "~/screens/detail";
import { MovieScreen } from "~/screens/movie";
import { SeriesScreen } from "~/screens/series";
import { Footer } from "./components/footer";

import {Logo} from "./components/logo";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const Stack = createNativeStackNavigator(); // Create a native stack navigator.

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before getting the color scheme.
NavigationBar.setBackgroundColorAsync("#151515"); // Set the background color of the navigation bar to white.
NavigationBar.setButtonStyleAsync("light"); // Set the button style of the navigation bar to dark.

const NavigationStack = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  const screenOptions = {
    title: "",
    headerStyle: {
      backgroundColor: "#000000",
    },
    headerShadowVisible: false,
    headerLeft: () => <Logo />,
    headerRight: () => (
      <Button size="sm" variant="brand">
        <Text>Deneme Başlat</Text>
      </Button>
    ),
  };

  if (!isColorSchemeLoaded) {
    return null;
  }
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "light"} />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={screenOptions}
        />

        <Stack.Screen
          name="Movie"
          component={MovieScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="Series"
          component={SeriesScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={screenOptions}
        />
      </Stack.Navigator>
      <PortalHost />
      <Footer />
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}


