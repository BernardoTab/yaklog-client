import { MediaItemResult } from "../../../../shared/models/media-item.result";

export interface FinishedMediaResponse{
    items: MediaItemResult[];
    totalCount: number;
}
