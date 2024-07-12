import React from "react";
import {View, Text, StyleSheet, Keyboard, EmitterSubscription} from "react-native";
import {Link} from "@react-navigation/native";
import * as Lucide from "lucide-react-native";
import {Button} from "~/components/ui/button";

export function Footer(): React.ReactElement | null {
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    // Listen for keyboard show and hide events to hide the footer when the keyboard is visible on the screen to prevent overlapping.
    React.useEffect(() => {
        const keyboardDidShowListener:EmitterSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // Set the keyboard visible state to true when the keyboard is shown.
        });
        const keyboardDidHideListener:EmitterSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // Set the keyboard visible state to false when the keyboard is hidden.
        });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (keyboardVisible) return null; // If the keyboard is visible, return null to hide the footer.
    return (
        <View style={styles.container}>
            <View style={styles.linkWrapper}>
                <Link to="#">
                    <Text style={{color: "#ffffff"}}>Anasayfa</Text>
                </Link>
                <Text style={{color: "#ffffff"}}>|</Text>
                <Link to="#">
                    <Text style={{color: "#ffffff"}}>Kullanıcı Sözleşmesi</Text>
                </Link>
                <Text style={{color: "#ffffff"}}>|</Text>
                <Link to="#">
                    <Text style={{color: "#ffffff"}}>Gizlilik Politikası</Text>
                </Link>
            </View>
            <View style={styles.buttonsWrapper}>
                <Button size="icon" variant="ghost" className="rounded-full bg-gray-800">
                    <Lucide.Twitter size={20} color="#ffffff"/>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-gray-800">
                    <Lucide.Facebook size={20} color="#ffffff"/>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#151515",
    },
    linkWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    buttonsWrapper: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    },
});
