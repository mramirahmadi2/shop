import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../assets/img homes/depositphotos_8711123-stock-photo-luxury-stone-home-at-dusk.webp";
import AddressPost from "./AddressPost/AddressPost";
import Button from "components/Button";
import Dialog from "components/Modal";
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
  const [showModal, setShowModal] = useState(false);
  const [textModal, setTextModal] = useState<{typeModal:string; head: string; body: string }>({
    typeModal:"",
    head: "",
    body: "",
  });
  const {  deleteData } = useDeleteHook<{ message: string }>(`${url}/products/${params.id}`);
  const  navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MyData>(
          `${url}/products/${params.id}`
        );
        setPost(response.data);
      } catch (error) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
  const handleDeleteModal = (productName: string) => {
    setShowModal(true);
    setTextModal({typeModal:"delete", head: `حدف محصول ${productName}`, body: `آیا از حذف محصول ${productName} مطمعن هستید؟` });
  };
  const deletePost = ()=>{
    deleteData();
    navigate("/")
  }
  const handlEditModal = (productName: string) => {
    setShowModal(true);
    setTextModal({ typeModal: "edit" ,head: `ویرایش محصول ${productName}`, body: `این بخش هنوز کامل نیست` }); 
  };
  const changeModal = () => {
    showModal === true ? setShowModal(false) : setShowModal(true);
  };
  return (
    <div className="mx-8 ">
      <div>
        {loading && <div>...loading</div>}
        {error && <div>{error}</div>}
        {post && (
          <div className="flex flex-col ">
            <Dialog
              ShowModal={showModal}
              changeModal={changeModal}
              deletePost={deletePost}
              typeModal={textModal.typeModal} head={textModal.head} body={textModal.body}
            />
            <div className="flex flex-col items-center md:flex-row justify-between w-full">
              <div className="flex flex-col items-start w-2/3">
                <h1>{post.name}</h1>
                <p>قیمت کتاب: {post.price}</p>
                <div>
                  <p className="">{post.description}</p>
                  <p className="">آدرس کالا:{post.address}</p>
                </div>
                <div className="flex flex-row">
                  <Button
                    body="ویرایش اطلاعات"
                    ClassName="bg-blue-700 text-white p-2 rounded-3xl"
                    Click={() => handlEditModal(post.name)}
                  />
                  <Button
                    body="حذف اطللاعات"
                    ClassName="bg-red-600 text-white p-2 rounded-3xl mr-5"
                    Click={() => handleDeleteModal(post.name)}
                  />
                </div>
              </div>
              <div className="w-1/6 h-auto ">
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
