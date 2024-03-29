import React from "react";
import eNahad from "../../assets/img footer/1MDy1-uz.png";
const Footer = () => {
  const menu = [
    {
      id: 1,
      title: "عنوان منو",
      items: [
        { id: 1, name: "درباره ما" },
        { id: 2, name: "نشانی ما" },
        { id: 3, name: "ارتباط با ما" },
        { id: 4, name: "قوانین و مقررات" },
      ],
    },
  ];

  return (
    <footer className="bg-[#fafafc] w-full">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between w-full md:justify-start flex-row">
          <div>
            {menu.map(({ id, title, items }) => (
              <div key={id} className="flex flex-col items-start pr-4">
                <h2 className="text-18px">{title}</h2>
                <ul className="flex flex-col items-start text-16px text-[#555770] mt-5">
                  {items.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div >
            {menu.map(({ id, title, items }) => (
              <div key={id} className="flex flex-col items-start pr-4">
                <h2 className="text-18px">{title}</h2>
                <ul className="flex flex-col items-start text-16px text-[#555770] mt-5">
                  {items.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img src={eNahad} alt="eNahad" />
        </div>
      </div>
      <div className="bg-[#f2f2f5] w-full py-4 text-center text-16px text-[#555770]">
        <span>سایت فروشگاهی با تمام لوازمی که نیاز شماست</span>
      </div>
    </footer>
  );
};

export default Footer;
