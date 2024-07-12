import React from "react";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import {Text} from "~/components/ui/text";
import * as Card from "~/components/ui/card";
import {blurHash} from "~/constants/blurHash";

export function HomeScreen({navigation}: { navigation: any; }): React.ReactElement {
    return (
        <ScrollView>
            <View className="flex-1" style={styles.container}>
                <Text style={styles.title}>Popüler Başlıklar</Text>
                <TouchableOpacity onPress={() => navigation.navigate('WatchList', {type: 'movie'})}>
                    <Card.Card>
                        <Card.CardContent className="p-0">
                            <Image
                                style={styles.image}
                                source="https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
                                placeholder={String(blurHash)}
                                contentFit="cover"
                                transition={1000}
                            />
                        </Card.CardContent>
                        <Card.CardFooter className="items-center bg-foreground pt-3">
                            <Text style={{fontSize: 18}} className="text-white">
                                Filmler
                            </Text>
                        </Card.CardFooter>
                    </Card.Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('WatchList', {type: 'series'})}>
                    <Card.Card>
                        <Card.CardContent className="p-0">
                            <Image
                                style={styles.image}
                                source="https://upload.wikimedia.org/wikipedia/en/8/82/MTV_Roadies_official_logo.jpg"
                                placeholder={String(blurHash)}
                                contentFit="cover"
                                transition={1000}
                            />
                        </Card.CardContent>
                        <Card.CardFooter className="items-center bg-foreground pt-3">
                            <Text style={{fontSize: 18}} className="text-white">
                                Diziler
                            </Text>
                        </Card.CardFooter>
                    </Card.Card>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16, paddingBottom: 128
    },
    image: {
        height: 240,
        backgroundColor: "#0553",
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});
