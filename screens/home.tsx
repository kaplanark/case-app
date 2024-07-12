import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";
import * as Card from "~/components/ui/card";
import { blurHash } from "~/constants/blurHash";

const popularTitles = [
  {
    title: "Filmler",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/ec/Under_the_gun_1951_poster.jpg",
    type: "movie",
  },
  {
    title: "Diziler",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/DrPlonk.jpg/220px-DrPlonk.jpg",
    type: "series",
  },
];

export function HomeScreen({navigation}: {navigation: any}): React.ReactElement {
  return (
    <ScrollView>
      <View className="flex-1" style={styles.container}>
        <Text style={styles.title} className="text-foreground">Popüler Başlıklar</Text>
        {popularTitles.map((item) => (
          <TouchableOpacity
            key={item.type}
            onPress={() => navigation.navigate("WatchList", { type: item.type })}
          >
            <Card.Card>
              <Card.CardContent className="p-0">
                <Image
                  style={styles.image}
                  source={item.image}
                  placeholder={String(blurHash)}
                  contentFit="cover"
                  transition={1000}
                />
              </Card.CardContent>
              <Card.CardFooter className="bg-foreground pt-3 justify-between">
                <Text style={{ fontSize: 18,fontWeight:'bold' }} className="text-primary-foreground flex-1 text-center">
                    {item.title}
                </Text>
              </Card.CardFooter>
            </Card.Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 128,
  },
  image: {
    height: 240,
    backgroundColor: "#0553",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
