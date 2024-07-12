import { type SortOptions } from "~/types";

export const filterOptions: { label: string; value: SortOptions }[] = [
  { label: "Yeniye Göre Sırala", value: "new" },
  { label: "Eskiye Göre Sırala", value: "old" },
  { label: "Puana Göre Sırala", value: "rate" },
  { label: "Rastgele Sırala", value: "random" },
];

export const defaultValues: { shorted: SortOptions; search: string } = {
  shorted: "random",
  search: "",
};
