import React from "react";

function CardStatictc({ text, value }) {
  return (
    <div
      dir="ltr"
      className="w-48  h-20 my-1 md:my-10  p-4 mx-4  text-center  border border-gray-200 rounded-xl flex-col justify-start items-end gap-3 inline-flex"
    >
      <div className="text-zinc-500 text-xs font-medium font-['Cairo'] uppercase leading-snug">
        {text}
      </div>
      <div className="  ">
        <div className="text-zinc-900 text-center text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
          {value}
        </div>
      </div>
    </div>
  );
}

export default CardStatictc;
