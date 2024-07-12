

export const filterFromType = (data, type) => {
    if (!data || !data.length) return [];
    return data.filter((item) => {
        return item['programType'] === type;
    });
}


export const filterFromSorted = (data, shorted) => {
    if (!data || !data.length) return [];
    return data.sort((a, b) => {
        switch (shorted) {
            case "new":
                return a['releaseYear'] - b['releaseYear'];
            case "old":
                return b['releaseYear'] - a['releaseYear'];
            case "rate":
                return b['imdbRating'] - a['imdbRating'];
            case "random":
                return Math.random() - 0.5;
            default:
                return 0;
        }
    }, [shorted]);
}

export const filterFromSearch = (data, search:string|null,key:string='title') => {
    if (!search) return data;
    return data.filter((item) => {
        return item[key].toLowerCase().includes(search.toLowerCase());
    });
}
