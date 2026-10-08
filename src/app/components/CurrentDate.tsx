"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

  return (
    <p className='truncate text-xs text-slate-500 sm:text-sm'>
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
};

export default CurrentDate;
