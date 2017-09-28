import { BlogComment } from './blog-comment';

export interface BlogPost {
    id: number
    categories: number[]
    comments: BlogComment[]
    comment_status: string
    content: {}
    date: string
    date_gmt: string
    excerpt: {
        rendered: string,
        protected: number
    }
    featured_media: number
    format: string
    guid: { rendered: string }
    link: string
    meta: any[]
    modified: string
    modified_gmt: string
    ping_status: string
    slug: string
    sticky: boolean
    tags: string[]
    template: string
    title: { rendered: string }
    type: 'post'
    _embeded?: {
        id: number
        description: string
        name: string
        avatar_urls: {
            24: string
            48: string
            96: string
        }
        slug: string

    }

}