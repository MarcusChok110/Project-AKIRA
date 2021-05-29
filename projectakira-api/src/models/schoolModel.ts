export interface School {
  id: number; // primary key
  name: string; // 0-255 char in length
  about: string;
  location: string;
  admission: string;
  image: string; // URL to AWS S3 image
}
