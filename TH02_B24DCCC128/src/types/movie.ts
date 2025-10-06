export interface SearchMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface SearchResponse {
    Search?: SearchMovie[];
    totalResults: string;
    Response: string; 
    Error?: string;
}

export interface MovieDetail {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
}