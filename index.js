import "./global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform } from "react-native";
import { NAV_THEME } from "~/constants/navTheme";
import { useColorScheme } from "~/hooks/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import React from "react";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const setTheme = async () => {
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
  }


  React.useEffect(() => {
    setTheme.finally(() => SplashScreen.hideAsync());
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
      <PortalHost />
    </ThemeProvider>
  );
};

export function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

registerRootComponent(App);
