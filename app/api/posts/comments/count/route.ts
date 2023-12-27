import conn from "@/app/api/db";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    try {
        const result = await conn.query('SELECT posts.post_id, posts.title, posts.description, COUNT(comments.comment_id) AS comment_count FROM posts LEFT JOIN comments ON posts.post_id = comments.post_id GROUP BY posts.post_id, posts.title, posts.description;');
        return NextResponse.json({posts: result.rows});
    } catch (e) {
        console.log('error', e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}