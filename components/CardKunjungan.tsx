import React, { useEffect, useState } from "react";

export default function CardKunjungan({
  text,
  count,
}: {
  text: string;
  count: number;
}) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // durasi animasi dalam ms
    const stepTime = 30; // waktu update tiap step dalam ms
    const steps = Math.ceil(duration / stepTime);
    const increment = count / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= count) {
        setDisplayCount(count);
        clearInterval(counter);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [count]);

  return (
    <div
      className="w-full min-h-[150px] flex flex-col justify-center items-center text-center outline gap-2 shadow-xl bg-white/10 backdrop-blur-md rounded-2xl px-4 py-4 text-white transition hover:scale-[1.02] duration-300"
      style={{
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <h2 className="text-4xl font-medium tracking-tight drop-shadow-md">
        {displayCount.toLocaleString()}
      </h2>
      <p className="text-lg mt-2 font-medium tracking-wide">{text}</p>
    </div>
  );
}
