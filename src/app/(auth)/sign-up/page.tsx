"use client";

import { type FormEvent } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message === "User already exists"
            ? "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।"
            : "সাইন আপ করা যায়নি। তথ্যগুলো যাচাই করে আবার চেষ্টা করুন।",
        );
        console.error("সাইন আপের ত্রুটি:", error);
        return;
      }

      if (data) {
        toast.success("সাইন আপ সফল হয়েছে! স্বাগতম।");
        router.push("/");
        router.refresh();
      } else {
        toast.error("সাইন আপ সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("সাইন আপের সমস্যা:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google login error:", error);
        toast.error("গুগল দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Google login exception:", error);
      toast.error("গুগল দিয়ে প্রবেশ করতে সমস্যা হয়েছে।");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        console.error("GitHub login error:", error);
        toast.error("গিটহাব দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("GitHub login exception:", error);
      toast.error("গিটহাব দিয়ে প্রবেশ করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <main className='min-h-screen bg-base-100 px-4 py-10'>
      <div className='mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold text-base-content'>
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className='mt-2 text-sm text-base-content/70'>
            বিনা খরচে সাইন আপ করে পণ্যের বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className='w-full rounded-2xl border border-base-300 bg-base-200 p-6 shadow-lg sm:p-8'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <fieldset className='fieldset'>
              <label htmlFor='name' className='label'>
                আপনার নাম
              </label>
              <input
                id='name'
                type='text'
                name='name'
                className='input w-full'
                placeholder='আপনার পুরো নাম লিখুন'
                autoComplete='name'
                required
              />
            </fieldset>

            <fieldset className='fieldset'>
              <label htmlFor='email' className='label'>
                ইমেইল
              </label>
              <input
                id='email'
                type='email'
                name='email'
                className='input w-full'
                placeholder='আপনার ইমেইল লিখুন'
                autoComplete='email'
                required
              />
            </fieldset>

            <fieldset className='fieldset'>
              <label htmlFor='password' className='label'>
                পাসওয়ার্ড
              </label>
              <input
                id='password'
                type='password'
                name='password'
                className='input w-full'
                placeholder='কমপক্ষে ৮ অক্ষর'
                autoComplete='new-password'
                minLength={8}
                required
              />
            </fieldset>

            <fieldset className='fieldset'>
              <label htmlFor='confirmPassword' className='label'>
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                className='input w-full'
                placeholder='আবার পাসওয়ার্ড লিখুন'
                autoComplete='new-password'
                minLength={8}
                required
              />
            </fieldset>

            <button
              type='submit'
              className='btn mt-2 w-full border-0 bg-green-700 text-white hover:bg-green-800'>
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          <div className='my-5 flex items-center gap-3'>
            <div className='h-px flex-1 bg-slate-200' />
            <span className='text-xs text-slate-400'>অথবা</span>
            <div className='h-px flex-1 bg-slate-200' />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 48 48'
                className='h-5 w-5 shrink-0'>
                <path
                  fill='#EA4335'
                  d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z'
                  transform='translate(0 4)'
                />
                <path
                  fill='#4285F4'
                  d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.06 46.98 31.85 46.98 24.55Z'
                />
                <path
                  fill='#FBBC05'
                  d='M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z'
                />
                <path
                  fill='#34A853'
                  d='M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z'
                />
              </svg>
              Google
            </button>

            <button
              type='button'
              onClick={handleGitHubSignIn}
              className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-5 w-5 shrink-0'>
                <path d='M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z' />
              </svg>
              GitHub
            </button>
          </div>

          <p className='mt-6 text-center text-sm text-base-content/70'>
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <a
              href='/sign-in'
              className='font-semibold text-green-700 hover:underline'>
              সাইন ইন করুন
            </a>
          </p>

          <div className='mt-4 text-center'>
            <a
              href='/'
              className='text-sm text-base-content/60 hover:text-green-700'>
              ← হোম পেজে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
