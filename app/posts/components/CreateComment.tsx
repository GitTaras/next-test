'use client';

import React, { useState, FormEvent } from 'react'
import {TComment} from "../../common/types";


export default function CreateComment({post_id, onSuccess = () => {}}: {post_id: string, onSuccess: (comment:TComment) => void}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch(`/api/posts/${post_id}/comments`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            const res = await response.json();
            onSuccess(res.data);
        } catch (error) {
            setError((error as Error).message);
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="m-2 mb-6">
            <h4 className="text-gray-700">Leave a comment:</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-4 block relative pb-8">
                    <textarea className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 form-textarea py-2 rounded" id="comment" name="comment" rows={4} cols={50} />
                    {error && <div className="absolute bottom-0 left-0 text-red-500">{error}</div>}
                </div>
                <div className="block">
                    <button type="submit" disabled={isLoading} className="bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 hover:bg-blue-400 active:shadow-blue-600/50 active:bg-blue-600 active:border-gray-300 rounded p-2 text-white ">
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}