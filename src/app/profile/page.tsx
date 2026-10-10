"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Session থেকে নাম পাওয়া গেলে input-এ বসানো
  if (session?.user && !initialized) {
    setName(session.user.name ?? "");
    setInitialized(true);
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName === session?.user?.name) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className='flex flex-1 items-center justify-center bg-stone-50 px-4 py-16'>
        <div className='w-full max-w-2xl space-y-5 rounded-2xl bg-white p-8 shadow-sm'>
          <div className='skeleton h-8 w-48' />
          <div className='skeleton h-20 w-20 rounded-full' />
          <div className='skeleton h-12 w-full' />
          <div className='skeleton h-12 w-full' />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className='flex flex-1 items-center justify-center bg-stone-50 px-4 py-16'>
        <div className='w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700'>
            <svg
              className='h-8 w-8'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'>
              <rect x='4' y='10' width='16' height='11' rx='2' />
              <path d='M8 10V7a4 4 0 0 1 8 0v3' />
            </svg>
          </div>

          <h1 className='mt-5 text-2xl font-bold text-slate-900'>
            সাইন ইন প্রয়োজন
          </h1>

          <p className='mt-2 text-sm leading-6 text-slate-500'>
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <Link
            href='/sign-in'
            className='mt-6 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800'>
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;
  const initial = user.name?.trim().charAt(0) || "U";

  return (
    <main className='flex-1 bg-stone-50 px-4 py-10 sm:px-6 sm:py-14'>
      <div className='mx-auto max-w-3xl'>
        {/* Page Heading */}
        <div className='mb-8'>
          <p className='text-sm font-semibold text-green-700'>
            বাজার দর · অ্যাকাউন্ট
          </p>

          <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            আমার প্রোফাইল
          </h1>

          <p className='mt-3 text-sm leading-6 text-slate-500 sm:text-base'>
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং নিজের নাম আপডেট করুন।
          </p>
        </div>

        {/* Profile Information */}
        <section className='overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm'>
          <div className='bg-green-800 px-6 py-6 sm:px-8'>
            <div className='flex flex-col items-center gap-4 sm:flex-row'>
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "প্রোফাইল ছবি"}
                  width={80}
                  height={80}
                  unoptimized
                  className='h-20 w-20 rounded-full border-2 border-white/70 object-cover'
                />
              ) : (
                <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/70 bg-white/15 text-3xl font-bold text-white'>
                  {initial}
                </div>
              )}

              <div className='text-center sm:text-left'>
                <h2 className='text-xl font-bold text-white sm:text-2xl'>
                  {user.name || "ব্যবহারকারী"}
                </h2>
                <p className='mt-1 break-all text-sm text-green-100'>
                  {user.email}
                </p>
                <p className='mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white'>
                  সদস্য
                </p>
              </div>
            </div>
          </div>

          {/* Update Information */}
          <div className='p-6 sm:p-8'>
            <h3 className='text-lg font-bold text-slate-900'>ব্যক্তিগত তথ্য</h3>

            <p className='mt-1 text-sm text-slate-500'>
              নিচের ফর্ম থেকে আপনার নাম পরিবর্তন করতে পারবেন।
            </p>

            <form onSubmit={handleUpdate} className='mt-6 space-y-5'>
              <div>
                <label
                  htmlFor='profile-name'
                  className='mb-2 block text-sm font-semibold text-slate-700'>
                  আপনার নাম
                </label>

                <input
                  id='profile-name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='আপনার নাম লিখুন'
                  autoComplete='name'
                  required
                  maxLength={100}
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100'
                />
              </div>

              <div>
                <label
                  htmlFor='profile-email'
                  className='mb-2 block text-sm font-semibold text-slate-700'>
                  ইমেইল ঠিকানা
                </label>

                <input
                  id='profile-email'
                  type='email'
                  value={user.email}
                  readOnly
                  className='w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none'
                />

                <p className='mt-2 text-xs text-slate-400'>
                  এই ফর্ম থেকে ইমেইল পরিবর্তন করা যাবে না।
                </p>
              </div>

              <div className='flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between'>
                <Link
                  href='/'
                  className='text-center text-sm font-medium text-slate-500 transition hover:text-green-700 sm:text-left'>
                  ← হোম পেজে ফিরে যান
                </Link>

                <button
                  type='submit'
                  disabled={isSaving}
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60'>
                  {isSaving && (
                    <span className='loading loading-spinner loading-sm' />
                  )}
                  {isSaving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
