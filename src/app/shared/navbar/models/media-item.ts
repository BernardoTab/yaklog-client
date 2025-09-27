import { mediaType } from "./media-type"

export interface MediaItem{
    Title : string,
    MediaType: mediaType,
    Finished?: boolean,
    FinishedDate?: string,
    ImageFilePath?: string,

    Author?: string,
    Console?: string,
    ReleaseDate?: string,
    Director?: string,
    NumberOfSeasons?: string
}