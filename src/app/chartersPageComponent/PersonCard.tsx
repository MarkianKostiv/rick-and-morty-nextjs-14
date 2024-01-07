"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { keyPress } from "../utils/keyPress";
import "./castom.css";
import { CloseBtn } from "./personCardComponents/CloseBtn";
import { InfoBlock } from "./personCardComponents/InfoBlock";
interface PersonPops {
  name: string;
  species: string;
  img: string;
  gender?: string;
  status?: string;
  type?: string;
  location?: string;
  origin?: string;
  episodes?: string[];
}
// картка персонажа, при виклику їй треба передати
// ім'я вид та зображення, усе інше опціонально
export const PersonCard = (props: PersonPops) => {
  const {
    name,
    species,
    gender,
    status,
    origin,
    type,
    location,
    img,
    episodes,
  } = props;
  const [isCardOpened, setIsCardOpened] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 900 });
  const [imgStyles, setImgStyles] = useState<string>(" ");
  const [titleStyles, setTitleStyles] = useState<string>(" ");
  // стилі для адаптивності дизайну
  useEffect(() => {
    if (mobile) {
      setImgStyles("h-40 w-40 mt-12");
      setTitleStyles("text-3xl");
    } else {
      setImgStyles("h-52 w-52");
      setTitleStyles("text-5xl");
    }
  }, [mobile]);

  // стилі для закритої картки
  const normalCard =
    "castom-shadow  bg-[#fff] pt-7 pb-3 mt-6 w-60 flex justify-center flex-col text-left cursor-pointer hover:shadow-xl";
  // стилі для вікритої картки
  const openedCard =
    "fixed duration-500 ease-in-out bg-[#fff] pt-4 top-14 w-full flex items-center justify-start flex-col left-0 h-screen cursor-default";
  // передаємо класи картці в залежності від того и була вона відкрита чи закрита
  const cardStyle = isCardOpened ? openedCard : normalCard;
  // також робиму логіку для приховування або  та показу певного елемента
  const showElement = isCardOpened ? "" : "hidden";
  const hideElement = isCardOpened ? "hidden" : "";
  // в деяких персонажів type у відвовіді з
  // api може бути пустим рядком, тоді передаємо значення, щою
  // у нас не був порожній рядок
  const typeValue = type === "" ? "unknown" : type;

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
      <Image
        // змінємо стилі зображення якщо картка відкривається і навпаки
        className={`${
          isCardOpened ? `rounded-full ${imgStyles}` : "h-40 w-auto"
        }`}
        src={img}
        alt='Person-img'
        height={168}
        width={240}
      />
      <h3
        // аналогічно зображенню
        className={`${
          isCardOpened
            ? `${titleStyles} font-normal m-0`
            : " ml-4 mt-3 text-lg font-medium"
        }  text-[#000000DE]`}
      >
        {name}
      </h3>
      {/* приховуємо елемент коли картка відкрита */}
      <p className={`ml-4 text-[#666666] ${hideElement}`}>{species}</p>
      {/* передаємо блоку інформації про персонажа всі необхідні дані
      а також передаємо стан картки, чи була вона відкрита, також показуємо ценй елемент, коли картка відкрита */}
      <InfoBlock
        showElement={showElement}
        gender={gender}
        status={status}
        species={species}
        origin={origin}
        type={type}
        location={location}
        typeValue={typeValue}
        episodes={episodes}
        isOpened={isCardOpened}
      />
    </div>
  );
};
