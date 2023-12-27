'use client';
import React, { useState, FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {TPost} from "../../common/types";

interface ICreatePostProps {
    isOpen: boolean,
    closeModal: () => void,
    onSuccess: (post: TPost) => void
};

export default function CreatePost({isOpen= false, closeModal=() => {}, onSuccess=() => {}}: ICreatePostProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            const res = await response.json();
            onSuccess(res.data);
            closeModal();
        } catch (error) {
            setError((error as Error).message);
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   <h4 className="text-gray-700">Create post:</h4>
                  </Dialog.Title>
                  <div className="mt-2">
                      <form onSubmit={onSubmit}>
                          <div className="mb-3 block">
                              <label className="text-gray-700" htmlFor="title">Title:</label>
                              <input required className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 form-input py-2 rounded" type="text" id="title" name="title" />
                          </div>
                          <div className="mb-4 block relative pb-8">
                              <label className="text-gray-700" htmlFor="description">Description:</label>
                              <textarea required className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 form-textarea py-2 rounded" id="description" name="description" rows={4} cols={50} />
                              {error && <div className="absolute bottom-0 left-0 text-red-500">error {error}</div>}
                          </div>
                          <div className="block">
                              <button type="submit" disabled={isLoading} className="bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 hover:bg-blue-400 active:shadow-blue-600/50 active:bg-blue-600 active:border-gray-300 rounded p-2 text-white ">
                                  {isLoading ? 'Loading...' : 'Submit'}
                              </button>
                          </div>
                      </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}
