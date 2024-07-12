import React from "react";
import {ScrollView, StyleSheet, Text, View,FlatList} from "react-native";
import {Input} from "~/components/ui/input";
import * as DropdownMenu from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {ArrowDownNarrowWide} from "lucide-react-native";
import {type SortOptions} from "~/types";
import {defaultValues, filterOptions} from "~/constants/filterState";
import * as Card from "~/components/ui/card";
import {Image} from "expo-image";

function MovieCard({item}):React.ReactElement{
    return (
        <Card.Card className="h-[200px]" style={styles.item}>
            <Card.CardContent className="p-0">
                <Image
                    style={styles.image}
                    source={item.image}
                    contentFit="cover"
                    transition={1000}
                />
            </Card.CardContent>
            <Card.CardFooter className="items-center bg-foreground pt-3">
                <Text style={{fontSize: 18}} className="text-white text-center">
                    {item.title}
                </Text>
            </Card.CardFooter>
        </Card.Card>
    )
}

export function MovieScreen(): React.ReactElement {
    const [filter, setFilter] = React.useState<{ shorted: SortOptions | null; search: string }>(defaultValues);

    const data = [
        {
            id: 1,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        },
        {
            id: 2,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        },
        {
            id: 3,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        },
        {
            id: 4,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        },
        {
            id: 5,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        },
        {
            id: 6,
            title: "Jumanji",
            image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Wolfcreek.png"
        }
    ]
    return (
            <ScrollView>
                <View style={styles.container} className="p-6">
                    <View  style={{gap:16}}>
                        <View className="flex-row items-center">
                            <Text style={styles.title}>
                                Filimler
                            </Text>
                            <DropdownMenu.DropdownMenu>
                                <DropdownMenu.DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="flex-row items-center"
                                        style={{gap: 6}}
                                    >
                                        <ArrowDownNarrowWide size={16} color="#000000"/>
                                        <Text>
                                            {filterOptions.find(
                                                (option) => option.value === filter.shorted
                                            )?.label || "Sırala"}
                                        </Text>
                                    </Button>
                                </DropdownMenu.DropdownMenuTrigger>
                                <DropdownMenu.DropdownMenuContent
                                    className="w-72 native:w-72 rounded-none"
                                    align="end">
                                    <DropdownMenu.DropdownMenuRadioGroup
                                        onValueChange={(value: SortOptions) =>
                                            setFilter({...filter, shorted: value})
                                        }
                                        value={filter.shorted as SortOptions}>
                                        {filterOptions.map((option: { label: string, value: SortOptions }, index: number) => (
                                            <DropdownMenu.DropdownMenuRadioItem
                                                value={option.value}
                                                key={index}
                                                onPress={() =>
                                                    setFilter({...filter, shorted: option.value})
                                                }
                                            >
                                                <Text>{option.label}</Text>
                                            </DropdownMenu.DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenu.DropdownMenuRadioGroup>
                                </DropdownMenu.DropdownMenuContent>
                            </DropdownMenu.DropdownMenu>
                        </View>
                        <Input
                            value={filter.search}
                            onChangeText={(value) => setFilter({...filter, search: value})}
                            placeholder="Film, dizi veya oyuncu ara"
                        />
                    </View>
                    <FlatList
                        data={data}
                        contentContainerStyle={{gap: 8}}
                        columnWrapperStyle={{gap: 8}}
                        renderItem={({item}) => <MovieCard item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingBottom: 128,
        flex: 1,
    },
    title: {fontSize: 22, fontWeight: "bold", flex: 1},
    image: {
        height: 200,
        backgroundColor: "#0553",
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item: {
        width: '50%',
    }
});
