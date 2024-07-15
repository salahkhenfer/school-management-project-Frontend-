import { useState } from "react";
import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";

function Languages() {
  const [addLanguage, setAddLanguage] = useState(false);
  const handelAdd = () => {
    setAddLanguage(false);
  };
  const handelCancel = () => {
    setAddLanguage(false);
  };
  return (
    <div
      className={`max-w-[1000px] duration-200 relative  w-full mx-auto ${
        addLanguage ? " bg-opacity-30" : ""
      }`}
    >
      <div
        style={addLanguage ? { filter: "blur(2px)" } : {}}
        className="w-full h-28 py-10 mx-auto text-center text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10"
      >
        اللغات الموجودة
      </div>
      <div
        style={addLanguage ? { filter: "blur(2px)" } : {}}
        className=" flex w-full justify-center items-center flex-wrap gap-10"
      >
        <SmallCard text="اللغة العربية" />
        <SmallCard text="اللغة العربية" />
      </div>
      <div
        style={addLanguage ? { filter: "blur(2px)" } : {}}
        className="w-full flex justify-center items-center my-10"
      >
        <div
          onClick={() => setAddLanguage(!addLanguage)}
          className="w-96 h-16 px-8 py-4 hover:bg-blue-600 cursor-pointer bg-indigo-500 rounded-2xl flex justify-center items-center gap-2"
        >
          <div className="text-right text-white text-2xl font-semibold font-['Cairo'] leading-9">
            اضافة لغة
          </div>
        </div>
      </div>
      {addLanguage && (
        <div className="md:w-96 max-md:w-full p-4   h-fit md:px-12 z-30 md:py-2 md:top-[5%] md:left-[30%] top-0 left-0  absolute  bg-gray-200 rounded-3xl justify-start items-center inline-flex">
          <div className=" max-md:w-full self-stretch flex-col justify-start items-end gap-4 inline-flex">
            <div className="self-stretch text-center text-gray-800 text-3xl font-semibold font-['Cairo'] leading-10">
              إضافة لغة
            </div>
            <input className=" w-full focus:outline-none  px-8 py-2 rounded-lg border border-black/opacity-70 justify-end items-center gap-2" />

            <div
              onClick={handelAdd}
              className="self-stretch cursor-pointer px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2 inline-flex"
            >
              <div className="text-right text-white text-base font-semibold font-['Cairo'] leading-normal">
                اضافة{" "}
              </div>
            </div>
            <div
              onClick={handelCancel}
              className="self-stretch cursor-pointer px-8 py-2 bg-red-600 rounded-2xl justify-center items-center gap-2 inline-flex"
            >
              <div className="text-right text-white text-base font-semibold font-['Cairo'] leading-normal">
                الغاء
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Languages;
