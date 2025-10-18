import { mediaType } from "../navbar/models/media-type";

export interface MediaItemResult{
    Id: number;
    title: string;
    imageFilePath?: string;
    finished: boolean;
    finishedDate?: Date;
    portfolioId: number;
    mediaType: mediaType;
}
