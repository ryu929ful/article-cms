export type Status = "published" |"review"|"draft"

export type Article = {
        id: string,
        title: string,
        slug: string,
        summary: string,
        content: string,
        categoryCode: string,
        tagCodes: string[],
        status: string,
        author: string,
        thumbnailUrl: string,
        publishAt: string|null,
        createdAt: string|null,
        updatedAt: string|null
}