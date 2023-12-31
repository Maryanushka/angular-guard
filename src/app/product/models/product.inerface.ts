export interface IProduct {
  _slug: string;
  title: string;
  description: string;
  cover: {url: string, width: number, height: number}[];
  categories: {_slug: string, title: string}[];
}
export interface ISingleProduct {
  _slug: string;
  title: string;
  description: string;
  cover: {url: string, width: number, height: number}[];
  categories: {_slug: string, title: string}[];
  content: {body: string}[];
  seo: {title: string, social_media_image: {url: string, width: number, height: number}, description: string} | null;
}
