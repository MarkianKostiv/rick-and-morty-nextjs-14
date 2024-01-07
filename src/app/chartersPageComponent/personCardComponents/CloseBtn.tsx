import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface CloseBtnProps {
  onClick: () => void;
  showElement: string;
}

// ця кнопка призначення для закривання картки персонажа, тому їй
// слід передавати функцію, яка встановлює iscardOpened на false
export const CloseBtn: React.FC<CloseBtnProps> = ({ onClick, showElement }) => {
  const normal = useMediaQuery({ maxWidth: 1200 });
  const tablet = useMediaQuery({ maxWidth: 790 });
  const mobile = useMediaQuery({ maxWidth: 500 });
  const [closeBtnPaddingSize, setContainerSize] =
    useState<string>("pt-11  pl-52");
  // адаптив кнопки
  useEffect(() => {
    if (mobile) {
      setContainerSize("pt-11  pl-6");
    } else if (tablet) {
      setContainerSize("pt-11  pl-16");
    } else if (normal) {
      setContainerSize("pt-11  pl-32");
    } else {
      setContainerSize("pt-11  pl-52");
    }
  }, [normal, tablet, mobile]);

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center absolute ${closeBtnPaddingSize} top-0 left-0 ${showElement}`}
    >
      <ArrowBackIcon /> <span className='font-bold text-lg pl-2'>Go Back</span>
    </button>
  );
};
