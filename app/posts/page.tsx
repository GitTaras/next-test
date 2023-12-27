'use client';
import Link from 'next/link'
import {useEffect, useState} from 'react';
import CreatePost from "./components/CreatePost";
import {TPost} from "../common/types";
import {getBaseDomain} from "../common/utils";

async function getAllPosts () {
    try {
        const res = await fetch(`${getBaseDomain()}/api/posts/comments/count`);
        if(!res.ok) {
            console.log('failed');
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch(e) {
        console.log('async error', e);
    }
};

export default function Posts() {
    const [posts, setPosts] = useState<TPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const onSuccess = (post: TPost) => {
        setPosts([...posts, post]);
    };

    useEffect(() => {
        (async () => {
            const data = await getAllPosts();
            setPosts(data.posts);
            setLoading(false);
        })()
    }, []);

    return (
        <main className="container mx-auto my-5">
            {isOpen && <CreatePost isOpen={isOpen} onSuccess={onSuccess} closeModal={closeModal}/>}

            <header className="flex justify-between">
                <h2 className="text-2xl font-semibold font-light">Posts list:</h2>
                <button
                    className="bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 hover:bg-blue-400 active:shadow-blue-600/50 active:bg-blue-600 active:border-gray-300 rounded p-2 text-white"
                    onClick={() => setIsOpen(true)}
                >
                    + Add Post
                </button>
            </header>
            <section className="grid grid-cols-3 gap-4">
                {posts.length ? posts.map((p, i) => (
                  <Link href={`/posts/${p.post_id}`} key={p.post_id}>
                    <article className="border-gray-300 m-6 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col space-x-4 post-card">
                        <h5 className="text-center text-xl font-medium text-black">{p.title}</h5>
                        <p className="grow p-2 text-slate-500">{p.description}</p>
                        <p className="text-sm text-zinc-900">Comments count: {p.comment_count}</p>
                    </article>
                  </Link>
                )):
                    <h5 className="text-xl font-semibold font-light">{loading ? "Loading" : "No posts created yet"}</h5>
                }
            </section>
        </main>
    )
}