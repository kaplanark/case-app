import React from 'react';
import {Image} from "expo-image";
import {StyleSheet} from "react-native";
import {Text} from "~/components/ui/text";
import * as Card from "~/components/ui/card";
import {Entry} from "~/types";
import {blurHash} from "~/constants/blurHash";

interface MediaCardProps {
    item: Entry;
}

export function MediaCard({item}: MediaCardProps): React.ReactElement {
    return (
        <Card.Card style={styles.card}>
            <Card.CardContent className="p-0">
                <Image
                    style={styles.image}
                    source={item.images['Poster Art'].url}
                    contentFit="cover"
                    placeholder={String(blurHash)}
                    transition={1000}
                />
            </Card.CardContent>
            <Card.CardFooter className="bg-foreground p-3">
                <Text numberOfLines={1} style={styles.title}
                      className="text-primary-foreground text-center flex-1 text-center">
                    {item.title}
                </Text>
            </Card.CardFooter>
        </Card.Card>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
    },
    card: {
        width: '50%',
    },
    title: {
        fontSize: 16,
    }
});
