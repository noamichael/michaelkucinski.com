export interface BlogCategory{
    count: number
    description: string
    id: number
    link: string
    meta: any[]
    name: string
    parent: number
    slug: string
    taxonomy: 'category',
    _links: any[];
}