import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MediaItemResult } from '../models/media-item.result';
import { FinishedMediaResponse } from '../../features/tabs/finished/models/finished-media-response';
import { FinishedMediaItemFilter } from '../../features/tabs/finished/models/finished-media-item-filter';

@Injectable({
  providedIn: 'root'
})
export class MediaItemsService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getFinishedYears(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + "/api/portfolio/finished-years", { withCredentials: true });
  }

  getFinishedMediaInfo(filter:FinishedMediaItemFilter): Observable<FinishedMediaResponse>{
    const params = this.getParamsFromFilter(filter);
    return this.http.get<FinishedMediaResponse>(this.apiUrl + "/api/portfolio/finished",{params, withCredentials: true })
  }

  getParamsFromFilter(filter:FinishedMediaItemFilter) : HttpParams{
    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
