import React from 'react';
import type {SortType} from "~/types";
import {filterOptions} from "~/constants/filterState";
import {Text} from "react-native";
import * as DropdownMenu from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {ArrowDownNarrowWide} from "lucide-react-native";

interface FilterDropdownProps {
    setFilter: (filter: { shorted: SortType | null; search: string }) => void;
    filter: { shorted: SortType | null; search: string };
}

export function FilterDropdown({setFilter, filter}: FilterDropdownProps): React.ReactElement {
    return (
        <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className="flex-row items-center"
                    style={{gap: 6}}>
                    <ArrowDownNarrowWide size={16} color="#000000"/>
                    <Text>
                        {filterOptions.find(
                            (option) => option.value === filter.shorted
                        )?.label || "Sırala"}
                    </Text>
                </Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent
                className="w-64 native:w-64 rounded-none"
                align="end">
                <DropdownMenu.DropdownMenuRadioGroup
                    onValueChange={(value: string) => setFilter({...filter, shorted: value as SortType})}
                    value={filter.shorted as SortType}>
                    {filterOptions.map((option: { label: string, value: SortType | null }, index: number) => (
                        <DropdownMenu.DropdownMenuRadioItem
                            value={option.value as SortType}
                            key={index}
                            onPress={() =>
                                setFilter({...filter, shorted: option.value as SortType})
                            }>
                            <Text>{option.label}</Text>
                        </DropdownMenu.DropdownMenuRadioItem>
                    ))}
                </DropdownMenu.DropdownMenuRadioGroup>
            </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
    )
}
