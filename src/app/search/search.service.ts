import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SimilarVideo } from './SimilarVideoModel';
import { DataSimilarTrack } from './SimilarTrackModel';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  configAPI = environment;
  lastFmApiiUrl = 'http://ws.audioscrobbler.com/2.0/?';
  youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search?';

  constructor(private http: HttpClient) {}

  getTrackSimilar(artist: string, track: string, amount: number): Observable<DataSimilarTrack> {
    return this.http.get<DataSimilarTrack>(
      this.lastFmApiiUrl +
        `method=track.getSimilar&api_key=${this.configAPI.lastFMKey}&artist=${artist}&track=${track}&limit=${amount}&format=json`
    );
  }

  getTrackSimilarMock(): Observable<DataSimilarTrack> {
    return this.http.get<DataSimilarTrack>(
      "https://e3088b26-97aa-4981-9369-e814f5817498.mock.pstmn.io/getsimilar"
    );
  }

  getVideoSimilar(artist: string, track: string): Observable<SimilarVideo> {
    return this.http.get<SimilarVideo>(
      this.youtubeApiUrl +
        `part=id&q=${artist}/${track}&type=video&maxResults=1&key=${this.configAPI.youtubeKey}`
    );
  }

  getVideoSimilarMock(): Observable<SimilarVideo> {
    return this.http.get<SimilarVideo>(
      "https://4fe5c1dd-328d-4c02-824c-166df478fac2.mock.pstmn.io/v2/search"
    );
  }

}
