export type TPost = {
    post_id: number,
    title: string,
    description: string,
    comment_count: number
};

export type TComment = {
    comment_id: number,
    comment: string,
    username: string,
    user_id: number,
}