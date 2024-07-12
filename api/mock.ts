import {ResponseData} from "~/types";

export async function fetchMockData(): Promise<ResponseData> {
    const response: Response = await fetch("https://gist.githubusercontent.com/hknclk/5710c4adb791755b31ccde6777f04bd2/raw/bd4e28b3e34027707a0d393f414355c5ff5362db/sample.json");
    const data = await response.json();
    return data;
}
