import { type SortOptions } from "~/types";

export const filterOptions: { label: string; value: SortOptions | null }[] = [
  { label: "Yeniye Göre Sırala", value: "new" },
  { label: "Eskiye Göre Sırala", value: "old" },
  { label: "Puana Göre Sırala", value: "rate" },
  { label: "Rastgele Sırala", value: "random" },
];

export const defaultValues: { shorted: SortOptions | null; search: string } = {
  shorted: null,
  search: "",
};
