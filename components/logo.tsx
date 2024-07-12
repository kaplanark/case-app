import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export function Logo(): React.ReactElement {
    return (
        <View>
            <Image
                style={styles.logo}
                source={require("~/assets/images/logo.png")}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 96,
        height: 42,
        objectFit: "contain",
        resizeMode: "contain",
    }
});
