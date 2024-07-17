import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SmallCard({ text, notNavigate, handleDelete, id }) {
  return (
    <>
      {notNavigate ? (
        <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex">
          <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
            {text}
          </div>
        </div>
      ) : (
        <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-200 h-16 px-5 py-4 rounded-2xl border border-black justify-center items-center gap-5 inline-flex">
          <Link to={`${text}`}>
            <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
              {text}
            </div>
          </Link>

          {handleDelete && (
            <div className="border-r-gray-500 border hover:bg-white rounded-full p-3 ">
              <MdDelete
                className="cursor-pointer text-red-600 w-7 h-7"
                onClick={() => handleDelete(id)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SmallCard;
