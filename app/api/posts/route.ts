import conn from '@/app/api/db';
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');

        const res = await conn.query('insert into posts (user_id, title, description) values ($1, $2, $3) RETURNING *;', [2, title, description]);
        return NextResponse.json({data: {...res.rows[0], comment_count: 0}});
    } catch(e) {
        console.log(e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}