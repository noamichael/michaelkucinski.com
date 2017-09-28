export interface BlogComment {
    id: number
    author: 0
    author_avatar_urls: {
        24: string
        48: string
        96: string
    }
    author_name: string
    author_url: string
    parent: number
    children: BlogComment[]
    content: {
        rendered: string
    }
    date: string
    date_gmt: string
    link: string
    post: number
    status: string
    type: string
}