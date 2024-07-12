export type SortOptions = "new" | "old" | "rate" | "random";

export interface GlobalResponse {
    status: number;
    message: string;
    data: ResponseData;
}

export interface Entry {
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
