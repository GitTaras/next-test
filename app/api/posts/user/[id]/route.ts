import conn from '@/app/api/db';
import {NextResponse} from "next/server";

export async function GET(request: Request, { params: {id} }: { params: { id: string } }) {
    try {
        const result = await conn.query('select * from posts where user_id = $1;', [id]);
        return NextResponse.json({posts: result.rows});
    } catch(e) {
        console.log('error', e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}