import React from 'react';
import bookImg from '../assets/img books/image.png';

interface PostProps {
  name: string;
  creator: string;
  price: string;
}

const Post: React.FC<PostProps> = ({ name, creator, price }) => {
  const truncateWriter = (creator: string, maxLength: number): string => {
    const words = creator.split(' ');
    return words.length > maxLength ? `${words.slice(0, maxLength).join(' ')}...` : creator;
  };

  return (
    <div className='flex flex-col mx-4 my-2 items-center justify-between'>
      <img src={bookImg} alt="bookImg" className='w-36 h-36 rounded-3xl shadow-lg' />
      <div className='flex flex-col'>
        <span>{name}</span>
        <span>ایجاد کننده: {truncateWriter(creator,1)}</span>
        <span>{price}تومان</span>
        <p></p>
      </div>
    </div>
  );
};

export default Post;
