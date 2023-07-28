import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { SearchService } from './search.service';
import { SimilarTracks, Track, SearchVideo, DataSimilarTrack } from './SimilarTrackModel';
import { SimilarVideo } from './SimilarVideoModel';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  formSearch!: FormGroup;
  tracks!: Track[];
  listaVideos: string[] = [];
  trackModel: SearchVideo[] = [];
  qtdTracks = [5, 10, 20]; // 5, 10, 20, 50
  qtdDefault = 5;

  matcher = new MyErrorStateMatcher()

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit() {
    this.formSearch = this.fb.group({
      artist: new FormControl<string | null>('pitty', Validators.required),
      track: new FormControl<string | null>('equalize', Validators.required),
      qtdTracks: new FormControl<number | null>(null),
    });
    this.formSearch.controls['qtdTracks'].setValue(this.qtdDefault, {
      onlySelf: true,
    });
  }

  loadTracks() {
    if (!this.formSearch.valid) return;

    this.trackModel = [];

    let similartracks = {} as SimilarTracks;

    const artist = this.formSearch.get('artist')?.value;
    const track = this.formSearch.get('track')?.value;
    const qtdTracks = this.formSearch.get('qtdTracks')?.value;

    const myObserve = {
      next: (data: DataSimilarTrack) => {
        similartracks = data.similartracks;
        if (data !== undefined) {
          this.tracks = similartracks.track;
          this.loadVideos(this.tracks);
        }
      }, 
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    return this.searchService
      .getTrackSimilar(artist, track, qtdTracks)
      // .getTrackSimilarMock()
      .subscribe(myObserve);
  }

  loadVideos(listaTracks: Track[]) {
    listaTracks.forEach((element, index) => {
      let similarVideos = {} as SimilarVideo;

      const track = {} as SearchVideo;

      const myObserve = {
        next: (data: SimilarVideo) => {
          similarVideos = data;
          this.listaVideos.push(similarVideos.items[0]?.id.videoId);
          console.log(
            'https://www.youtube.com/watch?v=' + similarVideos.items[0]?.id.videoId
          );

          track.nameSong = element.artist.name;
          track.nameArtist = element.name;
          track.linkYoutube =
            'https://www.youtube.com/watch?v=' +
            similarVideos.items[0]?.id.videoId;

          this.trackModel.push(track);
        },
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      };

      this.searchService
        .getVideoSimilar(element.artist.name, element.name)
        // .getVideoSimilarMock()
        .subscribe(myObserve);
    });
  }

  loadTracksTest() {
    this.trackModel.push(
    {nameSong: "Equalize", nameArtist:"Pitty", linkYoutube:""},
    {nameSong: "Equalize", nameArtist:"Pitty", linkYoutube:""},
    {nameSong: "Equalize", nameArtist:"Pitty", linkYoutube:""},
    {nameSong: "Equalize", nameArtist:"Pitty", linkYoutube:""},
    {nameSong: "Equalize", nameArtist:"Pitty", linkYoutube:""}
    )
  }
}
