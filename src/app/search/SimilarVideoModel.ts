export interface SimilarVideo {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Items[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Items {
  kind: string;
  etag: string;
  id: Id;
}

export interface Id {
  kind: string;
  videoId: string;
}
