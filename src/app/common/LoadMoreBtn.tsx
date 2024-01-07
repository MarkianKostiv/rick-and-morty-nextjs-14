import React from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
  myClass?: string;
}
//  це кнопка завантаження наступних сторінок з api
// при виклику їй слід передавати функцію, яка відповідає за це
// також опціонально можна передавати дотаткові класи
export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  onClick,
  myClass,
}) => {
  return (
    <div className='flex items-center justify-center w-full'>
      <button
        onClick={onClick}
        className={`${myClass} bg-[#F2F9FE] text-[#2196F3] pt-2 pb-2 text-sm font-medium pr-8 pl-8 mt-12 duration-300 hover:bg-[#DCE2E7]  btn-castom `}
      >
        Load More
      </button>
    </div>
  );
};
