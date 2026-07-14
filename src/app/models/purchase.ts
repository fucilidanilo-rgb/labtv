export interface Purchase {
  id?: number;
  userId: number;
  movieId: number;
  title: string;
  posterPath: string;
  purchaseDate: string;
}