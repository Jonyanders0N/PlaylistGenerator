export interface SearchVideo {
  nameArtist: string;
  nameSong: String;
  linkYoutube: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Image {
  text: string;
  size: string;
}

export interface Streamable {
  text: string;
  fulltrack: string;
}

export interface Track {
  name: string;
  playcount: number;
  mbid: string;
  match: number;
  url: string;
  streamable: Streamable;
  duration: number;
  artist: Artist;
  image: Image;
}

export interface SimilarTracks {
  track: Track[];
}

export interface DataSimilarTrack {
  similartracks: SimilarTracks;
}
