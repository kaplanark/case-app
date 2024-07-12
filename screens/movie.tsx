import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Input } from "~/components/ui/input";
import * as DropdownMenu from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import Animated, { FadeIn } from "react-native-reanimated";
import { ArrowDownNarrowWide } from "lucide-react-native";
import { type SortOptions } from "~/types";
import { filterOptions,defaultValues } from "~/constants/filterState";

export function MovieScreen(): React.ReactElement {
  const [fiter, setFilter] = React.useState<{ shorted: SortOptions; search: string }>(defaultValues);
  return (
    <ScrollView>
      <View className="flex-1 p-6" style={styles.container}>
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
                style={{ gap: 6 }}
              >
                <ArrowDownNarrowWide size={16} color="#000000" />
                <Text>
                  {filterOptions.find(
                    (option) => option.value === fiter.shorted
                  )?.label || "Sırala"}
                </Text>
              </Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent
              className="w-72 native:w-72 rounded-none"
              align="end"
            >
              <DropdownMenu.DropdownMenuRadioGroup
                onValueChange={(value) =>
                  setFilter({ ...fiter, shorted: String(value) as SortOptions })
                }
                value={fiter.shorted}
              >
                {filterOptions.map((option, index) => (
                  <DropdownMenu.DropdownMenuRadioItem
                    value={option.value}
                    key={index}
                    onPress={() =>
                      setFilter({ ...fiter, shorted: option.value })
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
          value={fiter.search}
          onChangeText={(value) => setFilter({ ...fiter, search: value })}
          placeholder="Film, dizi veya oyuncu ara"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 128,
  },
  title: { fontSize: 22, fontWeight: "bold", flex: 1 }
});
