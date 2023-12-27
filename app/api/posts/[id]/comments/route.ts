import {NextResponse} from "next/server";
import conn from "@/app/api/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const post_id = Number(params.id);
        const res = await conn.query('select comments.comment_id, comments.comment, users.username, users.user_id from comments inner join users on comments.user_id = users.user_id and comments.post_id = $1;', [post_id]);
        return NextResponse.json({data: res.rows});
    } catch(e) {
        console.log('error', e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const post_id = Number(params.id);
        const formData = await request.formData();
        const comment = formData.get('comment');

        const res = await conn.query('insert into comments (post_id, user_id, comment) values ($1, $2, $3) RETURNING *;', [post_id, 2 ,comment]);
        return NextResponse.json({data: {...res.rows[0], username: 'dou'}});
    } catch (e) {
        console.log('error', e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}