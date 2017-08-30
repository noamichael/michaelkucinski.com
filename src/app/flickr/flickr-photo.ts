export interface FlickrPhoto {
    farm: number
    id: string
    isfamily: number
    isfriend: number
    ispublic: number
    owner: string
    secret: string
    server: string
    title: string
    primary: string
    url?: { _content: any, type: any }[]
}