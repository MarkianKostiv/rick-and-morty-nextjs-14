"use strict";
import Link from "next/link";
interface NavigationProps {
  className?: string;
  classForChild?: string;
  charterPage?: string;
  locationPage?: string;
  episodesPage?: string;
}
// наігації передаються стилі опціонально, якими можна показувати на якій зараз сторінці
// знаходиться користувач
export const Navigation = (props: NavigationProps) => {
  const { className, classForChild, charterPage, locationPage, episodesPage } =
    props;
  return (
    <nav className={`${className || "mr-10"} flex justify-evenly items-center`}>
      <Link
        className={`${classForChild || "mr-6"} ${charterPage}`}
        href='/'
      >
        <p>Chapters</p>
      </Link>
      <Link
        className={`${classForChild || "mr-6"} ${locationPage} `}
        href='/locations'
      >
        <p>locations</p>
      </Link>
      <Link
        className={`${classForChild} ${episodesPage}`}
        href='/episodes'
      >
        <p>Episodes</p>
      </Link>
    </nav>
  );
};
