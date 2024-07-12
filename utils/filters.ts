import { Entry ,FilterType,SortType} from "~/types";

export const filterFromType = (data:Entry[], type:FilterType) => {
    if (!data || !data.length) return [];
    return data.filter((item:Entry) => {
        return item['programType'] === type;
    });
}


export const filterFromSorted = (data:Entry[], shorted:SortType) => {
    if (!data || !data.length) return [];
    return data.sort((a, b) => {
        switch (shorted) {
            case "new":
                return a['releaseYear'] - b['releaseYear'];
            case "old":
                return b['releaseYear'] - a['releaseYear'];
            case "rate":
                return a['imdbRating'] - b['imdbRating'];
            case "random":
                return Math.random() - 0.5;
            default:
                return 0;
        }
    });
}

export const filterFromSearch = (data:Entry[], search:string|null,key:string='title') => {
    if (!search) return data;
    return data.filter((item:Entry) => {
        return item[key].toLowerCase().includes(search.toLowerCase());
    });
}
