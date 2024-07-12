import { type SortType } from "~/types";

// Filter options for sorting movies or series
export const filterOptions: { label: string; value: SortType | null }[] = [
  { label: "Yeniye Göre Sırala", value: "new" },
  { label: "Eskiye Göre Sırala", value: "old" },
  { label: "Puana Göre Sırala", value: "rate" },
  { label: "Rastgele Sırala", value: "random" },
];

// Default values for filter state
export const defaultValues: { shorted: SortType | null; search: string } = {
  shorted: null,
  search: "",
};
