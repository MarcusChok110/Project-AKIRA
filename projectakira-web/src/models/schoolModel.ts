// shared fields
interface SchoolBase {
  id: number; // primary key
  name: string; // 0-255 char in length
  about: string;
  location: string;
  admission: string;
}

// in database
export interface School extends SchoolBase {
  image: string; // URL to AWS S3 image
}

// in request
export interface SchoolDTO extends SchoolBase {
  image?: Blob;
}
