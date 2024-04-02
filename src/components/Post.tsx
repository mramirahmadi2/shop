import React from 'react';
import Img from '../assets/img homes/depositphotos_8711123-stock-photo-luxury-stone-home-at-dusk.webp';

interface PostProps {
  name: string;
  creator?: string; // Make creator optional
  price: string;
  address?: string; // Make address optional
}

const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return ''; // Check if text is undefined or empty
  const words = text.split(' ');
  return words.length > maxLength ? `${words.slice(0, maxLength).join(' ')}...` : text;
};

const Post: React.FC<PostProps> = ({ name, creator, price, address }) => {
  const truncatedCreator = truncateText(creator, 1);
  const truncatedAddress = truncateText(address, 1);

  return (
    <div className='flex flex-col mx-4 my-2 items-center justify-between'>
      <img src={Img} alt="bookImg" className='w-40 h-40 rounded-3xl shadow-lg mb-4' />
      <div className='flex flex-col'>
        <span>{name}</span>
        {creator && <span>ایجاد کننده: {truncatedCreator}</span>} {/* Render creator only if it exists */}
        <span>{price}تومان</span>
        {address && <p>آدرس: {truncatedAddress}</p>} {/* Render address only if it exists */}
      </div>
    </div>
  );
};

export default Post;
