import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  addParent,
  checkParentApi,
  deleteParentApi,
  getAllParents,
  searchParent,
} from "../../apiCalls/parentCalls";
import { getAllStudent } from "../../apiCalls/studentCalls";

// Rest of your component code...
function Parents() {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [parents, setParents] = useState([]);
  const [isParent, setIsParent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const fetchParents = async () => {
    const response = await getAllParents();
    if (response == []) {
      return;
    }
    setParents(response);
    console.log(response);
    setLoadingGroups(false);
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchStudentsByPage = async (page) => {
    const response = await getAllStudent(page);
    setStudents(response);
  };

  const handleSearch = async () => {
    if (searchStudent === "") {
      return fetchParents();
    }
    const newList = await searchParent(searchStudent);
    setParents(newList);
  };

  const deleteParent = async (id) => {
    const response = await deleteParentApi({
      id: id,
    });
    console.log(response);
    fetchParents();
  };
  const handleDeleteParent = async (id) => {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الاجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, احذف!",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteParent(id);
        Swal.fire("تم الحذف!", "تم حذف الولي بنجاح.", "success");
      }
    });
  };
  const addParentApi = async (parentData) => {
    try {
      const newParent = await addParent(parentData);

      if (newParent) {
        await fetchParents();

        Swal.fire({
          icon: "success",
          title: "تمت الاضافة بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });

        onClose();
        setIsParent(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "حدث خطأ أثناء إضافة الوالد",
          text: "يرجى المحاولة مرة أخرى",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error adding parent:", error);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء إضافة الوالد",
        text: "يرجى المحاولة مرة أخرى",
        showConfirmButton: true,
      });
    }
  };

  const handleAddParent = async (event) => {
    event.preventDefault();

    const phoneNumber = event.target.phoneNumber.value;

    try {
      const response = await checkParentApi(phoneNumber);
      console.log(response);

      if (response === "Parent") {
        // Parent already exists
        Swal.fire({
          icon: "info",
          title: "الولي موجود بالفعل",
          text: "تم العثور على الولي في قاعدة البيانات",
          showConfirmButton: true,
        });
      } else {
        if (!isParent) {
          // Parent doesn't exist, show additional fields
          setIsParent(true);
        } else {
          // Add new parent
          const parentData = {
            fullName: event.target.fullName.value,
            phoneNumber: phoneNumber,
            email: event.target.email.value,
            password: event.target.password.value,
          };

          await addParentApi(parentData);
        }
      }
    } catch (error) {
      console.error("Error adding parent:", error);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء إضافة الوالد",
        text: "يرجى المحاولة مرة أخرى",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-5">الأولياء</h1>
      </div>
      <div className="w-full max-md:flex-col flex justify-between items-center">
        <div className="w-full py-5">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem]",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/50 dark:bg-default-500/20",
            }}
            placeholder="ابحث عن ولي ..."
            size="lg"
            startContent={<FaSearch size={18} />}
            endContent={
              <FaSearch
                onClick={handleSearch}
                className="h-fit cursor-pointer w-fit p-3 text-white bg-sky-600 rounded-full"
                size={20}
              />
            }
            onChange={(e) => setSearchStudent(e.target.value)}
            type="search"
          />
        </div>
        <Button
          onPress={onOpen}
          className="w-fit h-fit cursor-pointer mb-5 mx-auto bg-indigo-500 rounded-2xl justify-center items-center gap-2"
        >
          <div className="text-center text-white text-xl px-8 py-1 font-semibold font-['Cairo'] leading-9">
            اضافة ولي
          </div>
          <IoIosAddCircle color="white" className="w-6 h-6" />
        </Button>
      </div>
      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {parents && parents.length > 0 ? (
            <Table className="min-h-[60vh]" isHeaderSticky>
              <TableHeader>
                <TableColumn key="id">رمز الولي</TableColumn>
                <TableColumn key="fullName">اسم الولي</TableColumn>
                <TableColumn key="phoneNumber"> رقم الهاتف</TableColumn>
                <TableColumn key="action">العمليات</TableColumn>
              </TableHeader>
              <TableBody items={parents}>
                {(item) => (
                  <TableRow
                    className="hover:bg-gray-100 border-b-2 border-gray-200 transition-all duration-200 ease-in-out h-4 cursor-pointer"
                    key={item.id}
                    onClick={() => {
                      nav(`${item.id}`);
                      console.log(item.id);
                    }}
                  >
                    {(columnKey) => (
                      <TableCell className="text-right h-7">
                        {columnKey === "action" ? (
                          <div className="flex">
                            <Button
                              color="danger"
                              startContent={<MdDelete />}
                              onClick={() => handleDeleteParent(item.id)}
                            >
                              حذف
                            </Button>
                          </div>
                        ) : (
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex min-h-[60vh] justify-center items-center w-full h-full">
              <div className="text-center text-lg text-gray-500">
                لا يوجد تلاميذ
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-center items-center">
            <Pagination
              onChange={(page) => fetchStudentsByPage(page)}
              total={Math.ceil(parents?.length / 10)}
            />
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Parent</ModalHeader>
          <ModalBody>
            <form onSubmit={handleAddParent} id="parentForm">
              <Input
                className="my-2"
                type="text"
                name="fullName"
                placeholder="اسم الولي"
                required
              />
              <Input
                className="my-2"
                type="number"
                name="phoneNumber"
                placeholder="رقم الولي"
                required
              />

              {isParent && (
                <div>
                  <Input
                    className="my-2"
                    type="email"
                    name="email"
                    placeholder="ايميل الولي"
                  />
                  <Input
                    className="my-2"
                    placeholder="كلمة السر"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    endContent={
                      <button
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <FaEye className="text-2xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="text-2xl text-default-400" />
                        )}
                      </button>
                    }
                  />
                </div>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              الغاء
            </Button>
            <Button color="primary" type="submit" form="parentForm">
              اضافة
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Parents;
