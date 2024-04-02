import React, { useState, useEffect } from "react";
import LeafMap from "components/LeafMap";
import usePostRequest from "api/usePostRequest";
import useNewProductId from "hook/NewProductId";
import Button from "components/Button";

const Advertising = () => {
  const key = "3465314b34e941ba9e1b2a3af7c3929d";
  const urlPost = "http://localhost:8000/products";
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [mapClicked, setMapClicked] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [productCreator , steProductCreator] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mapAddress, setMapAddress] = useState("");
  const [price,setPrice] = useState("")
  const [postData, loading, error] = usePostRequest<any>(`${urlPost}`);
  let latestProductId = useNewProductId(`${urlPost}`);
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProductDescription(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleLocationChange = (newLocation: any) => {
    setLocation(newLocation);
    setMapClicked(true); // وقتی کاربر روی نقشه کلیک می‌کند، mapClicked را روی true تنظیم کنید
  };
  const handleProductCreatorChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    steProductCreator(e.target.value)
  }
  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPrice(e.target.value)
  }
  useEffect(() => {
   
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lng}&key=${key}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setMapAddress(data.results[0].formatted);
          setUserAddress(data.results[0].formatted); // Update userAddress with the map address
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    if (mapClicked) {
      fetchAddress();
    }
  }, [location, mapClicked]);

  const handleUserAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAddress(e.target.value);
    setMapAddress(""); 
    setMapClicked(false); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      productName.trim() === "" ||
      productDescription.trim() === "" ||
      productCreator.trim() === "" ||
      phoneNumber.trim() === "" ||
      userAddress.trim() === ""
    ) {
      //اگر تمام فرم ما پر نبود این ارور نمایش داده میشود
      alert("لطفا فرم را کامل پر کنید");
      return; 
    }
    try {
  
      const formData = {
        id:latestProductId,
        name: productName,
        description:productDescription,
        creator: productCreator,
        phone:phoneNumber,
        price: price,
        address:userAddress,
      };
      
      const postResponse = await postData(formData); 
  
      if (!postResponse.error) {
        console.log("Data posted successfully:", postResponse.data);
        alert("اطلاعات با موفقیت ذخیره شد")
        setProductName("");
        setProductDescription("");
        steProductCreator("");
        setPhoneNumber("");
        setUserAddress("");
        setMapAddress("");
        setPrice("");
        setMapClicked(false);
        setLocation({ lat: 35.6892, lng:51.3890 })
      } else {
        console.error("Error posting data:", postResponse.error);
        // پردازش خطا و نمایش آن به کاربر
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // پردازش خطای سمت کلاینت
    }
  };
  
  
  
  
  return (
    <div className="max-w-7xl items-start">
      <form onSubmit={handleSubmit} className="w-[70vw] mx-auto space-y-2 mb-8">
        <h2 className="text-center text-xl my-2 font-bold">ثبت آگهی</h2>
        <div className="flex flex-row items-end justify-around">
          <div className="space-y-2 w-full">
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="product-name"
                >
                  نام کالا را وارد کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="product-name"
                  type="text"
                  placeholder="نام کالا"
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  id="product-description"
                >
                  شرح کالا را وارد کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="شرح کالا"
                  id="product-description"
                  value={productDescription}
                  onChange={handleProductDescriptionChange}
                ></textarea>
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="product-creator"
                >
                  نام خود را وارد کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="product-creator"
                  type="text"
                  placeholder="نام"
                  value={productCreator}
                  onChange={handleProductCreatorChange}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="phone-number"
                >
                  شماره موبایل خود را وارد کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="phone-number"
                  type="tel"
                  placeholder="09"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="price"
                >
                  قیمت خانه را وارد کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="price"
                  type="number"
                  placeholder="قیمت به تومان"
                  value={price}
                  onChange={handleProductPriceChange}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-start justify-between w-4/5">
              <div className="">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-address"
                >
                  آدرس خانه را بر روی نقشه مشخص کنید
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-address"
                  type="text"
                  value={mapClicked ? mapAddress : userAddress}
                  onChange={handleUserAddressChange}
                  placeholder="آدرس خانه"
                />
              </div>
            </div>
          </div>
          <Button type="submit" body="ثبت اطلاعات" ClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/6" />
        </div>

        {/* Map component */}
        <p className="text-center">آدرس خود را از روی نقشه ثبت کنید</p>
        <LeafMap onLocationChange={handleLocationChange} />
      </form>
    </div>
  );
};

export default Advertising;
