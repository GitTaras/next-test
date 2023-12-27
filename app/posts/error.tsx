'use client'

import {useEffect} from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="m-2 mb-6">
            <h2 className="text-gray-700">Something went wrong!</h2>
            <button
                className="bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 hover:bg-blue-400 active:shadow-blue-600/50 active:bg-blue-600 active:border-gray-300 rounded p-2 text-white "
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}