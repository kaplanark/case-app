import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Theme, ThemeProvider} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {Platform} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NAV_THEME} from "~/constants/navTheme";
import {useColorScheme} from "~/hooks/useColorScheme";
import {PortalHost} from "@rn-primitives/portal";
import {SplashScreen} from "expo-router";

import {Button} from "~/components/ui/button";
import {Text} from "~/components/ui/text";

import {HomeScreen} from "~/screens/home";
import {WatchListScreen} from "~/screens/watch-list";
import {Footer} from "~/components/footer";

import {Logo} from "~/components/logo";


const LIGHT_THEME: Theme = { // Define the light theme for the app.
    dark: false,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = { // Define the dark theme for the app.
    dark: true,
    colors: NAV_THEME.dark,
};

const Stack = createNativeStackNavigator() // Create a stack navigator for the app.

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before getting the color scheme.
NavigationBar.setBackgroundColorAsync("#151515").then(); // Set the background color of the navigation bar to white.
NavigationBar.setButtonStyleAsync("light").then(); // Set the button style of the navigation bar to light.
export function NavigationStack() {
    const queryClient: QueryClient = new QueryClient();

    const {colorScheme, setColorScheme, isDarkColorScheme} = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const theme = await AsyncStorage.getItem("theme");
            if (Platform.OS === "web") {
                // Adds the background color to the html element to prevent white background on overscroll.
                document.documentElement.classList.add("bg-background");
            }
            if (!theme) {
                // If the theme is not set, set the theme to the color scheme.
                await AsyncStorage.setItem("theme", colorScheme);
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
            SplashScreen.hideAsync(); // Hide the splash screen after the color scheme is loaded.
        });
    }, []);

    const screenOptions = { // Define the screen options for the stack navigator screens.
        title: "",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerShadowVisible: false,
        headerLeft: () => <Logo/>,
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
            <StatusBar style={isDarkColorScheme ? "light" : "light"}/>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="WatchList"
                        component={WatchListScreen}
                        options={screenOptions}
                    />
                </Stack.Navigator>
            </QueryClientProvider>
            <PortalHost/>
            <Footer/>
        </ThemeProvider>
    );
};
