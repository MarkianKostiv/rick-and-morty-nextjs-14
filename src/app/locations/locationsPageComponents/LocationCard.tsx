"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { keyPress } from "@/app/utils/keyPress";
import { CloseBtn } from "@/app/chartersPageComponent/personCardComponents/CloseBtn";
import { PersonsList } from "./PesrsonsList";
// import "./castom.css";
interface LocationPops {
  name: string;
  dimension: string;
  type: string;
  residents?: string[];
}

export const LocationCard = (props: LocationPops) => {
  const { name, dimension, type, residents } = props;
  const [isCardOpened, setIsCardOpened] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 900 });

  const [titleStyles, setTitleStyles] = useState<string>(" ");
  useEffect(() => {
    if (mobile) {
      setTitleStyles("text-3xl");
    } else {
      setTitleStyles("text-5xl");
    }
  }, [mobile]);

  const normalCard =
    "castom-shadow  bg-[#fff] pt-9 pb-9 mt-6 w-60 flex justify-center flex-col text-center cursor-pointer hover:shadow-xl";
  const openedCard =
    "fixed duration-500 ease-in-out bg-[#fff] pt-4 top-14 w-full flex items-center justify-start flex-col left-0 h-screen cursor-default";

  const cardStyle = isCardOpened ? openedCard : normalCard;
  const showElement = isCardOpened ? "" : "hidden";
  const hideElement = isCardOpened ? "hidden" : "";

  // функція відкриває картку локації
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // список дочірніх елементів при кліку на які можна відкривати картку
    const isChildElement =
      e.target instanceof HTMLElement &&
      (e.target.tagName === "H3" ||
        e.target.tagName === "P" ||
        e.target.tagName === "IMG");

    // щоб уникнути багів із закриванням картки слід перевіряти чи відбувається
    // клік по батьківському елементу чи дочірньому, картка відкривається лише при кліку на батьківський елемент
    // так ми уникаємо багу, коли клікаємо на кнопку закриття і запсукаються функції закриття і відкриття, оскільки клік
    // йде по 2 елементах і стає не можливим закрити картку
    if (e.target === e.currentTarget || isChildElement) {
      setIsCardOpened(true);
    }
  };

  // для того, щоб була можливість вікривати картку з клавіатури
  // слід використовувати цю функцію в зв'язці з keyPress
  const handleCardKeyPress = (e: React.KeyboardEvent) => {
    setIsCardOpened(true);
  };

  // функція закривання картки
  const closingCard = () => {
    setIsCardOpened(false);
  };

  return (
    // передаємо div функціонал кліку, оскільки кліком на нього
    // має вікриватися картка локації
    <div
      onClick={handleCardClick}
      onKeyPress={keyPress("Enter", handleCardKeyPress)}
      role='button'
      tabIndex={0}
      className={cardStyle}
    >
      <CloseBtn
        onClick={closingCard}
        showElement={showElement}
      />
      <h3
        className={`${
          isCardOpened
            ? `${titleStyles} font-normal mt-12`
            : "text-lg font-medium mt-0"
        }  text-[#000000DE]`}
      >
        {name}
      </h3>
      <p className={`text-[#666666] ${hideElement}`}>{type}</p>
      <p className={`text-[#666666] ${hideElement}`}>{dimension}</p>

      <div
        className={
          isCardOpened
            ? `flex items-center w-1/2 justify-around mt-6`
            : `hidden`
        }
      >
        <p className='flex flex-col text-base font-bold text-[#081F32]'>
          Type{" "}
          <span className='font-normal text-[#6E798C] text-sm'>{type}</span>
        </p>{" "}
        <p className='flex flex-col text-base font-bold text-[#081F32]'>
          Dimension{" "}
          <span className='font-normal text-[#6E798C] text-sm'>
            {dimension}
          </span>
        </p>
      </div>
      {/* Передаємо списку персонажів локації масив із посиланнями на персонажів та передаємо значення
      чи було відкрита картка локації, щоб завантажувати персонажів для конкретної локації лише тоді коли користувач
      її вікриває це зменшує навантаження на сайт,  
      та запобігає полким з боку api коли виконується забагато одночасних заптів */}
      <PersonsList
        isCardOpened={isCardOpened}
        persons={residents}
      />
    </div>
  );
};
