"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AuthButtons = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return (
      <div className='flex items-center gap-2'>
        <div className='skeleton h-10 w-10 rounded-full' />
        <div className='skeleton h-4 w-16' />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className='flex shrink-0 items-center gap-2'>
        <Link
          href='/sign-in'
          className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:px-4'>
          সাইন ইন
        </Link>

        <Link
          href='/sign-up'
          className='rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 sm:px-4'>
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const initial = user.name?.trim().charAt(0) || "U";

  return (
    <div className='relative shrink-0' ref={menuRef}>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup='menu'
        className='flex max-w-[190px] items-center gap-2 rounded-full border border-green-100 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition hover:bg-green-50'>
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            width={40}
            height={40}
            unoptimized
            className='h-10 w-10 shrink-0 rounded-full object-cover'
          />
        ) : (
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white'>
            {initial}
          </span>
        )}

        <span className='truncate text-sm font-semibold text-slate-800'>
          {user.name || "ব্যবহারকারী"}
        </span>

        <svg
          aria-hidden='true'
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role='menu'
          className='absolute right-0 top-full z-[60] mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl'>
          <div className='border-b border-slate-100 px-3 py-3'>
            <p className='truncate text-sm font-bold text-slate-900'>
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className='mt-1 truncate text-xs text-slate-500'>{user.email}</p>
          </div>

          <div className='space-y-1 py-2'>
            <Link
              href='/profile'
              role='menuitem'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-green-50 hover:text-green-800'>
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'>
                <circle cx='12' cy='8' r='4' />
                <path d='M5 21v-2a7 7 0 0 1 14 0v2' />
              </svg>
              প্রোফাইল
            </Link>

            <button
              type='button'
              role='menuitem'
              onClick={handleSignOut}
              className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50'>
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M10 17l5-5-5-5' />
                <path d='M15 12H3' />
                <path d='M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6' />
              </svg>
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
