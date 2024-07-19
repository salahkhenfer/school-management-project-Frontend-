import { useEffect, useState } from "react";
import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";
import LoadingFirstPage from "../../components/loading/LoadingFirstPage";
import {
  addLanguageApi,
  deleteLanguageApi,
  getAllLanguages,
} from "../../apiCalls/languagesCalls";
import Swal from "sweetalert2";

function Languages() {
  const [addLanguage, setAddLanguage] = useState(false);
  const [Languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (language.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "الرجاء إدخال لغة قبل الإضافة",
        showConfirmButton: true,
      });
      return;
    }

    setIsAdding(true);

    try {
      const addedLanguage = await addLanguageApi(language);
      console.log(addedLanguage);
      if (addedLanguage) {
        getAllLanguage();

        await Swal.fire({
          icon: "success",
          title: "تمت الإضافة بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        setLanguage("");
        setAddLanguage(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "تعذر إضافة اللغة. الرجاء المحاولة مرة أخرى.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ أثناء الإضافة. الرجاء المحاولة مرة أخرى.",
        showConfirmButton: true,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handelCancel = () => {
    setAddLanguage(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await Swal.fire({
      title: "هل أنت متأكد من حذف هذا العنصر؟",
      text: "لن يمكنك التراجع عن هذا الإجراء",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, احذفه!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await deleteLanguageApi(id);
        if (deleteResult) {
          Swal.fire("تم الحذف!", "تم حذف العنصر بنجاح", "success");
          setLanguages((prevLanguages) =>
            prevLanguages.filter((language) => language.id !== id)
          );
        } else {
          Swal.fire("فشل الحذف!", "حدث خطأ أثناء الحذف", "error");
        }
      }
    });
  };
  const getAllLanguage = async () => {
    setLoading(true);
    try {
      const languages = await getAllLanguages();
      setLanguages(languages);
    } catch (err) {
      console.error("Failed to fetch languages:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllLanguage();
  }, []);

  if (loading) {
    return <LoadingFirstPage />;
  }

  return (
    <div
      className={`max-w-[1000px] duration-200 relative w-full mx-auto ${
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
        className="flex w-full justify-center items-center flex-wrap gap-10"
      >
        {Languages.map((language) => (
          <SmallCard
            key={language.id}
            id={language.id}
            text={language.name}
            handleDelete={handleDelete}
          />
        ))}
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
        <div className="md:w-fit max-md:w-full p-4 h-fit md:px-12 z-30 md:py-2 md:top-[5%] md:left-[30%] top-0 left-0 absolute bg-gray-200 rounded-3xl justify-start items-center inline-flex">
          <div className="max-md:w-full self-stretch flex-col justify-start items-end gap-4 inline-flex">
            <div className="self-stretch text-center text-gray-800 text-3xl font-semibold font-['Cairo'] leading-10">
              إضافة لغة
            </div>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full focus:outline-none px-8 py-2 rounded-lg border border-black/opacity-70 justify-end items-center gap-2"
            />
            <div
              onClick={handleAdd}
              className="self-stretch cursor-pointer px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2 inline-flex"
            >
              <div className="text-right text-white text-base font-semibold font-['Cairo'] leading-normal">
                اضافة
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
