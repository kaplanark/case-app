import React from "react";
import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";
import * as Card from "~/components/ui/card";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function HomeScreen({
  navigation,
}: {
  navigation: any;
}): React.ReactElement {
  return (
    <ScrollView>
      <View className="flex-1 p-6" style={{ gap: 16,paddingBottom:128 }}>
        <Text style={{ fontSize: 22 ,fontWeight: 'bold'}}>Popüler Başlıklar</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Movie")}>
          <Card.Card>
            <Card.CardContent className="p-0">
              <Image
                style={styles.image}
                source="https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </Card.CardContent>
            <Card.CardFooter className="items-center bg-foreground pt-3">
              <Text style={{ fontSize: 18 }} className="text-white">
                Filmler
              </Text>
            </Card.CardFooter>
          </Card.Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Series")}>
          <Card.Card>
            <Card.CardContent className="p-0">
              <Image
                style={styles.image}
                source="https://upload.wikimedia.org/wikipedia/en/8/82/MTV_Roadies_official_logo.jpg"
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </Card.CardContent>
            <Card.CardFooter className="items-center bg-foreground pt-3">
              <Text style={{ fontSize: 18 }} className="text-white">
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
  image: {
    height: 240,
    backgroundColor: "#0553",
  },
});
