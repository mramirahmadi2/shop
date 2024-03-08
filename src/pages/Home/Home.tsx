import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetRequest from "api/useGetRequest";
import Post from "components/Post";
import Pagination from "components/Pagination";

const Home = () => {
  const url = "http://localhost:8000";
  const { data, loading, error } = useGetRequest(`${url}/products`);

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row flex-wrap items-start justify-start">
        {loading && <p>لطفا کمی صبر کنید</p>}
        {error && <p>خطا. اطلاعات بارگزاری نشد درصورت مشاهده این خطا این دستور را در ترمینال وارد کنید : npx json-server --watch db.json --port 8000</p>}
        {currentPosts?.map((item: any, index: number) => (
          <Link to={`/${item.id}`} key={index}>
            <Post name={item.name} creator={item.creator} price={item.price} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
