import Link from "next/link";

const Footer = () => {
  return (
    <footer className='mt-auto border-t border-base-300 bg-base-200/60'>
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:gap-6 md:text-left'>
        {/* Brand Description */}
        <Link
          href='/'
          className='text-sm font-semibold leading-7 text-base-content transition-colors hover:text-primary sm:text-base'>
          🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </Link>

        {/* Price Disclaimer */}
        <p className='max-w-xl text-xs leading-6 text-base-content/70 sm:text-sm md:text-right'>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
