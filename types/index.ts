export type FilterType = "movie" | "series";

export type SortType = "new" | "old" | "random" | "rate";

export interface GlobalResponse {
    status: number;
    message: string;
    data: ResponseData;
}

export interface Entry {
    [key: string]: any;
    title: string,
    description: string,
    programType: string,
    images: {
        PosterArt: {
            url: string
        }
    },
    releaseYear: number,
}

export interface ResponseData {
    total: number,
    entries: Entry[]
}
