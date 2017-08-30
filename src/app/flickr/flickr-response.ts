import { FlickrPhoto } from './flickr-photo';

export interface FlickrResponse {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: string,
        photo: FlickrPhoto[]
    }
    stat: string
}
