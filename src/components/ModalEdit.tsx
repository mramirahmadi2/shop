import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Edti from "../assets/icons/Edit.svg";
import LeafMap from "components/LeafMap";

const Modal = ({
  ShowModalEdit,
  changeModal,
  head,
  Edit,
  IdPost,
  Url,
}: {
  ShowModalEdit: boolean;
  changeModal: () => void;
  Edit: (editedData: any) => void; // تغییر در دستگاه تایپ کالبک Edit
  typeModal: string;
  head: string;
  body: string;
  IdPost: string;
  Url: string;
}) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [mapClicked, setMapClicked] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    creator: "",
    phone: "",
    address: "",
  });
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/products/${IdPost}`);
        const postData = response.data;
        // قرار دادن اطلاعات درون formData
        setFormData({
          name: postData.name,
          description: postData.description,
          price: postData.price,
          creator: postData.creator,
          phone: postData.phone,
          address: postData.address,
        });
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    if (ShowModalEdit) {
      setOpen(true);
      fetchData();
    } else {
      setOpen(false);
    }
  }, [ShowModalEdit, IdPost, Url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    setOpen(false);
    changeModal();
    e.preventDefault();
    // اینجا اطلاعات ویرایش شده به عنوان پارامتر به تابع Edit ارسال می‌شود
    Edit(formData);
  };
  const handleLocationChange = async (newLocation: any) => {
    setLocation(newLocation);
    setMapClicked(true); // وقتی کاربر روی نقشه کلیک می‌کند، mapClicked را روی true تنظیم کنید

    try {
      // تبدیل مختصات به آدرس
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${newLocation.lat}&lon=${newLocation.lng}&format=json`
      );
      const addressData = response.data;
      const address = addressData.display_name; // آدرس متناظر با موقعیت
      // قرار دادن آدرس جدید در formData
      setFormData((prevData) => ({ ...prevData, address: address }));
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          changeModal();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-100 w-screen overflow-y-auto" dir="rtl">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <img
                        src={Edti}
                        alt="Edti"
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-start mr-3 font-semibold leading-6 text-gray-900"
                      >
                        {head}
                      </Dialog.Title>
                      <div className="">
                        <form
                          onSubmit={handleSubmit}
                          className="w-full flex flex-row items-start justify-between "
                        >

                          <div className="w-full ml-6">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="نام محصول"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                            />
                            <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              placeholder="توضیحات"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                            />
                            <input
                              type="text"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              placeholder="قیمت"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                            />
                            <input
                              type="text"
                              name="creator"
                              value={formData.creator}
                              onChange={handleChange}
                              placeholder="نام خالق"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                            />
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="تلفن"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                            />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="آدرس"
                              className="block w-full p-2 border border-gray-300 rounded mt-2"
                              disabled
                            />
                            <button
                              type="submit"
                              className="block w-full p-2 bg-blue-500 text-white rounded mt-4"
                            >
                              ویرایش
                            </button>
                            <button className="block w-full p-2 bg-red-500 text-white rounded mt-4" onClick={()=>setOpen(false)}>بستن</button>
                          </div>
                           
                          <div className="w-full h-2/3 flex items-start flex-col justify-end">
                            <p>آدرس کالا بر روی نقشه تایین کنید</p>
                            <LeafMap
                              onLocationChange={handleLocationChange}
                              editAdress={formData.address}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
