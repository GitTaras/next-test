import {NextResponse} from "next/server";
import conn from "@/app/api/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const post_id = Number(params.id);
        const res = await conn.query('SELECT posts.post_id, posts.title, posts.description, COUNT(comments.comment_id) AS comment_count FROM posts LEFT OUTER JOIN comments ON posts.post_id = comments.post_id where posts.post_id = $1 group by posts.post_id, posts.title, posts.description;', [post_id]);
        return NextResponse.json({data: res.rows[0]});
    } catch(e) {
        console.log('error',e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}