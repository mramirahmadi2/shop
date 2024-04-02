import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../assets/img homes/depositphotos_8711123-stock-photo-luxury-stone-home-at-dusk.webp";
import AddressPost from "./AddressPost/AddressPost";
import Button from "components/Button";
import DialogDelete from "components/Modal";
import DialogEdit from "components/ModalEdit";
import useDeleteHook from "api/useDelete";

interface MyData {
  id: string;
  name: string;
  creator: string;
  price: number;
  address: string;
  description: string;
}

const Post: React.FC = () => {
  const url = "http://localhost:8000";
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<MyData | null>(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [textModal, setTextModal] = useState<{ typeModal: string; head: string; body: string }>({
    typeModal: "",
    head: "",
    body: "",
  });
  const { deleteData } = useDeleteHook<{ message: string }>(`${url}/products/${params.id}`);
  const navigate = useNavigate();

  // استیت جدید برای نگهداری اطلاعات ویرایش شده
  const [editedData, setEditedData] = useState<MyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MyData>(
          `${url}/products/${params.id}`
        );
        setPost(response.data);
        setEditedData(response.data); // تنظیم اطلاعات اولیه برای ویرایش
      } catch (error) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleDeleteModal = (productName: string) => {
    setShowModalDelete(true);
    setTextModal({ typeModal: "delete", head: `حدف محصول ${productName}`, body: `آیا از حذف محصول ${productName} مطمعن هستید؟` });
  };

  const deletePost = () => {
    deleteData();
    navigate("/")
  };

  const handlEditModal = (productName: string) => {
    setShowModalEdit(true);
    setTextModal({ typeModal: "edit", head: `ویرایش محصول ${productName}`, body: `فرم زیر را پر کنید` });
  };

  const handleEdit = async (editedData: MyData) => {
    try {
      if (editedData) {
        // ارسال درخواست به آدرس مربوط به ویرایش با استفاده از اطلاعات ویرایش شده
        await axios.put(`${url}/products/${params.id}`, editedData);
        // بروزرسانی استیت editedData پس از انجام ویرایش
        setEditedData(editedData);
        // بروزرسانی استیت post با استفاده از editedData
        setPost(editedData);
      }
      // مخفی کردن مودال ویرایش
      setShowModalEdit(false);
    } catch (error) {
      console.error("An error occurred while editing:", error);
      // مدیریت خطا در صورت نیاز
    }
  };
  
  const changeModal = () => {
    setShowModalDelete(prevState => !prevState);
  };

  return (
    <div className="mx-auto min-w-[80vw]">
      <div>
        {loading && <div>...loading</div>}
        {error && <div>{error}</div>}
        {post && (
          <div className="w-full">
            <DialogDelete
              ShowModal={showModalDelete}
              changeModal={changeModal}
              deletePost={deletePost}
              typeModal={textModal.typeModal} head={textModal.head} body={textModal.body}
            />
            <DialogEdit
              ShowModalEdit={showModalEdit}
              changeModal={()=>setShowModalEdit(prevState => !prevState)}
              typeModal={textModal.typeModal}
              head={textModal.head}
              body={textModal.body}
              Edit={handleEdit}            
              IdPost={post.id}
              Url={url}
            />
            <div className="flex flex-col items-center md:flex-row justify-between w-full">
              <div className="flex flex-col items-start basis-4/6">
                <h1>{post.name}</h1>
                <p>قیمت: {post.price}</p>
                <div>
                  <p className="">{post.description}</p>
                  <p className="">آدرس کالا:{post.address}</p>
                </div>
                <div className="flex flex-row">
                  <Button
                    body="ویرایش اطلاعات"
                    ClassName="bg-blue-700 text-white p-2 "
                    Click={() => handlEditModal(post.name)}
                  />
                  <Button
                    body="حذف اطللاعات"
                    ClassName="bg-red-600 text-white p-2  mr-5"
                    Click={() => handleDeleteModal(post.name)}
                  />
                </div>
              </div>
              <div className="my-3 md:my-0 h-auto basis-1/6">
                <img src={Img} alt={post.name} className="w-52 h-52 " />
              </div>
            </div>
            <div className="w-full my-8">
              <p>آدرس کالا بر روی نقشه</p>
              <AddressPost address={post.address} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
