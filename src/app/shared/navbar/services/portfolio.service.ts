import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MediaItem } from '../models/media-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;

  constructor(
      private readonly http:HttpClient) { }

  addItem(mediaItem: MediaItem) : Observable<any>{
     return this.http.post(this.apiUrl+"/api/portfolio/add-item",mediaItem, {withCredentials:true});
  }
}
