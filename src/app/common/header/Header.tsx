"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import "./header.css";
import logo from "./images/logo.svg";
import { Navigation } from "./Navigation";
import { NavButton } from "./NavButton";

interface HeaderProps {
  onClick?: () => void;
  charterPage?: string;
  locationPage?: string;
  episodesPage?: string;
}

export const Header = (props: HeaderProps) => {
  // при виклику хедера передаємо функцію кліку, для виклику мобільного меню
  // також опціонально передаємо додаткові стилі для відстеження на якій сторінці
  // викликано хедер, для сторінки на якій перебуваємо предаємо link-style link-style-active
  // для інших передаємо link-style-disabled замість active
  const { onClick, charterPage, locationPage, episodesPage } = props;
  const mobileAndTablet = useMediaQuery({ maxWidth: 1000 });
  const showMobileBtn = useMediaQuery({ maxWidth: 792 });
  const [smallHeader, setSmallHeader] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  useEffect(() => {
    setSmallHeader(mobileAndTablet);

    // Приховуємо Navigation та показуємо NavButton при необхідності
    if (showMobileBtn) {
      setShowNavigation(false);
    } else {
      setShowNavigation(true);
    }
  }, [mobileAndTablet, showMobileBtn]);

  useEffect(() => {
    // Змінюємо класи падіння при зміні стану showMobileBtn
    if (showMobileBtn) {
      // Якщо мобільна кнопка показується, змінюємо падіння для ширини екрану 792 пікселів
      setSmallHeader(true);
    } else {
      // Якщо мобільна кнопка прихована, відновлюємо падіння для ширини екрану 1000 пікселів
      setSmallHeader(mobileAndTablet);
    }
  }, [showMobileBtn, mobileAndTablet]);

  return (
    <header
      className={`w-full z-20 flex justify-between items-center bg-[#FFF] text-[#000] font-bold text-lg custom-shadow sticky top-0 ${
        smallHeader
          ? showMobileBtn
            ? "pl-6 pr-6"
            : "pl-28 pr-28"
          : "pl-52 pr-52"
      }`}
    >
      <Link href='/'>
        <Image
          src={logo}
          alt='Logo'
          width={46}
          height={49}
          className='bg-white pt-1.5 pb-1.5'
        ></Image>
      </Link>

      {/* В залежності від умови показуємо Navigation або NavButton */}
      {showNavigation && (
        <Navigation
          charterPage={charterPage}
          locationPage={locationPage}
          episodesPage={episodesPage}
        />
      )}
      {!showNavigation && <NavButton onClick={onClick} />}
    </header>
  );
};
