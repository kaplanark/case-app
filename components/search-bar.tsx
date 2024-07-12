import { View } from "lucide-react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { SortType } from "~/types";
import { Button } from "./ui/button";
import { CircleX } from "lucide-react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { useColorScheme } from "~/hooks/useColorScheme";

interface SearchBarProps {
  filter: { shorted: SortType | null; search: string };
  setFilter: (filter: { shorted: SortType | null; search: string }) => void;
}

export function SearchBar({
  filter,
  setFilter,
}: SearchBarProps): React.ReactElement {

  const {colorScheme} = useColorScheme();

  return (
    <Card className="border-0">
      <Card className="border-0 relative">
        <Input
          value={filter.search}
          className="w-full"
          onChangeText={(value) => setFilter({ ...filter, search: value })}
          placeholder="Film, dizi veya oyuncu ara"
        />
        {filter.search ? (
          <Button
            size="icon"
            variant="ghost"
            onPress={() => setFilter({ ...filter, search: "" })}
            className="rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          >
            <CircleX size={16} color={colorScheme === "dark" ? "#fff" : "#000"}  />
          </Button>
        ) : null}
      </Card>
      {filter.search ? (
        <Text className="mt-2 font-bold text-foreground">
          Arama sonuçları: {filter.search}
        </Text>
      ) : null}
    </Card>
  );
}
