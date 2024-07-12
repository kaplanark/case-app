import React from "react";
import {FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {type SortType} from "~/types";
import {defaultValues} from "~/constants/filterState";
import {useQuery} from "@tanstack/react-query";
import {fetchMockData} from "~/api/mock";
import {MediaCard} from "~/components/media-card";
import {filterFromSearch, filterFromSorted, filterFromType} from "~/utils/filters";
import {FilterDropdown} from "~/components/filter-dropdown";
import { SearchBar } from "~/components/search-bar";


export function WatchListScreen({route}:{route:any}): React.ReactElement {
    const {type} = route.params;

    // Fiter for search and sort options for movies list
    const [filter, setFilter] = React.useState<{ shorted: SortType | null; search: string }>(defaultValues);


    // Fetch movies data from mock api with tanstack query
    const moviesQuery = useQuery({
        queryKey: ["entries"],
        queryFn: fetchMockData,
    });

    // Filter movies data from search, type and sort options
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
                    <View style={{gap: 16,flex:1}}>
                        <View className="flex-row items-center">
                            <Text style={styles.title} className="text-foreground">
                                Filimler
                            </Text>
                            <FilterDropdown setFilter={setFilter} filter={filter}/>
                        </View>
                        <SearchBar filter={filter} setFilter={setFilter}/>
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
                        ) : moviesQuery.isLoading ? (<Text>Yükleniyor...</Text>) : moviesQuery.isError ? (<Text className="text-foreground">Hata oluştu</Text>) : (
                            <Text className="text-foreground">Arama sonucu bulunamadı :(</Text>
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
