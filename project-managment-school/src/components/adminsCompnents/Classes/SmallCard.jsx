import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SmallCard({ text, notNavigate }) {
  return (
    <>
      {notNavigate ? (
        <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex">
          <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
            {text}
          </div>
        </div>
      ) : (
        <Link
          to={`${text}`}
          className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex"
        >
          <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
            {text}
          </div>
        </Link>
      )}
    </>
  );
}

export default SmallCard;
