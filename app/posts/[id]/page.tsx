'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import CreateComment from "../components/CreateComment";
import {TPost, TComment} from '../../common/types';

async function getComments(id:string) {
    try {
        const res = await fetch(`${process.env.VERCEL_URL}/api/posts/${id}/comments`);
        if (!res.ok) {
            console.log('failed');
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (e) {
        console.log('async error', e);
    }
};

async function getPost(id:string) {
    try {
        const res = await fetch(`${process.env.VERCEL_URL}/api/posts/${id}`);
        if (!res.ok) {
            console.log('failed');
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (e) {
        console.log('async error', e);
    }
};


export default function Post({params: {id}}: { params: { id: string } }) {
    const [post, setPost] = useState<TPost | null>(null);
    const [comments, setComments] = useState<TComment[]>([]);

    const onSuccess = (comment:TComment) => {
        setPost((prev) => ({...prev as TPost, comment_count: Number(prev!.comment_count) + 1}));
        setComments((prev) => ([...prev, comment]));
    };

    useEffect(() => {
        (async () => {
            try {
                const [post, comments] = await Promise.all([getPost(id), getComments(id)]);
                setPost(post.data);
                setComments(comments.data);
            } catch (e) {
                console.log('failed to fetch', e);
            }
        })()
    }, []);

    return (
        <>
            <nav className="m-5">
                <Link href="/posts" className="text-blue-500 font-medium hover:underline active:underline">Posts list</Link>
            </nav>
            <main className='flex flex-col items-center max-w-5xl mx-auto'>
                {!post ? <div>Loading...</div> :
                    <>
                      <h2 className="text-2xl font-semibold font-light">{post.title}</h2>
                      <p className="grow p-2 text-slate-500 mb-12">{post.description}</p>
                      <CreateComment post_id={id} onSuccess={onSuccess}/>
                      <p className="text-sm text-zinc-900 self-end">Comments count: {post.comment_count}</p>
                    </>
                }
                <section className="w-full mt-2">
                    {comments.reverse().map((c, i) => (
                        <article key={c.comment_id} className="mb-1 p-3 bg-slate-50 rounded">
                            <div className="block">
                                <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                     src={`https://ui-avatars.com/api/?name=${c.username}`}
                                     alt=""/>
                                <span className="ml-2 font-medium mb-2">{c.username}</span>
                            </div>
                            <p className="m-2">{c.comment}</p>
                        </article>
                    ))}
                </section>
            </main>
        </>
    )
}