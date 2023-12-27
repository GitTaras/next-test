import conn from '@/app/api/db';
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const username = searchParams.get('username') || "";
        const result = await conn.query('select * from users where username = $1;', [username]);
        return NextResponse.json({data: result.rows});
    } catch(e) {
        console.log('error', e);
        return NextResponse.json({error: "Bad request"}, {status: 400});
    }
}