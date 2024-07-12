import React from "react";
import {FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Input} from "~/components/ui/input";
import {type SortType} from "~/types";
import {defaultValues} from "~/constants/filterState";
import {useQuery} from "@tanstack/react-query";
import {fetchMockData} from "~/api/mock";
import {MediaCard} from "~/components/media-card";
import {filterFromSearch, filterFromSorted, filterFromType} from "~/utils/filters";
import {FilterDropdown} from "~/components/filter-dropdown";


export function WatchListScreen({route}:{route:any}): React.ReactElement {
    const {type} = route.params;

    const [filter, setFilter] = React.useState<{ shorted: SortType | null; search: string }>(defaultValues);

    const moviesQuery = useQuery({
        queryKey: ["entries"],
        queryFn: fetchMockData,
    });

    const data = React.useMemo(() => {
        if (!moviesQuery.data) return [];
        let result = filterFromType(moviesQuery.data?.entries, type);
        result = filterFromSorted(result, filter.shorted as SortType);
        return filterFromSearch(result, filter.search, 'title');

    }, [moviesQuery.data, filter.search, filter.shorted]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={moviesQuery.isFetching} onRefresh={() => moviesQuery.refetch()}/>
                }>
                <View style={styles.container}>
                    <View style={{gap: 16}}>
                        <View className="flex-row items-center">
                            <Text style={styles.title} className="text-foreground">
                                Filimler
                            </Text>
                            <FilterDropdown setFilter={setFilter} filter={filter}/>
                        </View>
                        <Input
                            value={filter.search}
                            onChangeText={(value) => setFilter({...filter, search: value})}
                            placeholder="Film, dizi veya oyuncu ara"
                        />
                    </View>
                    {
                        data.length ? (
                            <FlatList
                                data={data}
                                contentContainerStyle={{gap: 8}}
                                columnWrapperStyle={{gap: 8}}
                                renderItem={({item}) => <MediaCard item={item}/>}
                                keyExtractor={item => item.title.toString()}
                                numColumns={2}
                                scrollEnabled={false}
                            />
                        ) : moviesQuery.isLoading ? (<Text>Yükleniyor...</Text>) : moviesQuery.isError ? (<Text>Hata oluştu</Text>) : (
                            <Text>Arama sonucu bulunamadı :(</Text>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingBottom: 128,
        flex: 1,
        padding: 16,
    },
    title: {fontSize: 22, fontWeight: "bold", flex: 1},
});
