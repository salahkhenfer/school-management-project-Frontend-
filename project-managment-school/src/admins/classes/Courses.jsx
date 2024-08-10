import React, { useEffect, useState } from "react";
import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import {
  addCourse,
  deleteCourse,
  getCourses,
} from "../../apiCalls/coursesCalls";
import Swal from "sweetalert2";

function Courses() {
  const [addCourses, setAddCourses] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [courses, setCourses] = useState([]);
  const [CourseName, setCourseName] = useState("");

  const handelAdd = async (onClose) => {
    if (CourseName.trim() === "") {
      return;
    }
    const response = await addCourse(CourseName);
    if (response) {
      fatchCourses();
    }
    onClose();
  };
  const handelCancel = () => {
    setAddCourses(false);
  };

  const fatchCourses = async () => {
    const response = await getCourses();
    setCourses(response);
  };
  useEffect(() => {
    fatchCourses();
  }, []);
  const handelDelete = async (id) => {
    Swal.fire({
      title: "هل انت متأكد من حذف الدورة؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteCourse(id);
          fatchCourses();
        }
      })
      .catch((err) => {
        Swal.fire("حدث خطأ ما", err, "error");
      });
  };
  return (
    <div
      className={`max-w-[1000px] duration-200 relative  w-full mx-auto ${
        addCourses ? " bg-opacity-30" : ""
      }`}
    >
      <div
        style={addCourses ? { filter: "blur(2px)" } : {}}
        className="w-full h-28 py-10 mx-auto text-center text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10"
      >
        الدورات الموجودة
      </div>
      <div
        style={addCourses ? { filter: "blur(2px)" } : {}}
        className=" flex w-full justify-center items-center flex-wrap gap-10"
      >
        {courses?.map((course) => (
          <SmallCard
            key={course.id}
            id={course.id}
            text={course.name}
            notNavigate={false}
            handleDelete={handelDelete}
          />
        ))}
      </div>
      <div
        style={addCourses ? { filter: "blur(2px)" } : {}}
        className="w-full flex justify-center items-center my-10"
      >
        <Button
          onPress={onOpen}
          className="w-96 h-16 px-8 py-4 hover:bg-blue-600 cursor-pointer bg-indigo-500 rounded-2xl flex justify-center items-center gap-2"
        >
          <div className="text-right text-white text-2xl font-semibold font-['Cairo'] leading-9">
            اضافة دورة
          </div>
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent className="w-fit">
          {(onClose) => (
            <div className=" max-md:w-full p-4   h-fit md:px-12  md:py-2   bg-gray-200 rounded-3xl justify-start items-center inline-flex">
              <div className=" max-md:w-full self-stretch flex-col justify-start items-end gap-4 inline-flex">
                <div className="self-stretch text-center text-gray-800 text-3xl font-semibold font-['Cairo'] leading-10">
                  إضافة دورة
                </div>
                <input
                  onChange={(e) => setCourseName(e.target.value)}
                  type="text"
                  placeholder="اسم الدورة"
                  className=" w-full focus:outline-none  px-8 py-2 rounded-lg border border-black/opacity-70 justify-end items-center gap-2"
                />
                <Button
                  onClick={() => handelAdd(onClose)}
                  className="self-stretch cursor-pointer px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2 inline-flex"
                >
                  <div className="text-right text-white text-base font-semibold font-['Cairo'] leading-normal">
                    اضافة{" "}
                  </div>
                </Button>
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
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Courses;
