export interface Song {
  artistName: string;
  imageUrl: string;
  songId: string;
  songName: string;
  wordCounts: {
    text: string;
    value: number;
  }[];
}

export interface User {
  email: string;
  token: string;
  userId: string;
}
