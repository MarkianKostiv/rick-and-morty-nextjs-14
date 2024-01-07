import React, { ChangeEvent, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./castom.css";
import { NameSearch } from "@/app/locations/locationsPageComponents/filtersComponents/NameSearch";

interface FiltersProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  otherText?: string;
}

export const EpisodesFilter: React.FC<FiltersProps> = (props) => {
  const { setFilter, otherText } = props;
  // функція, яка зупускає функцію зміни запиту до api
  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  // ендпоінти для адаптиву
  const normal = useMediaQuery({ maxWidth: 1200 });
  const tablet = useMediaQuery({ maxWidth: 790 });
  const mobile = useMediaQuery({ maxWidth: 500 });
  const [filtersPaddingSize, setContainerSize] =
    useState<string>("pr-52 pl-52");
  const [NameSearchSize, setNameSearchSize] = useState("w-31-rem");
  const [NameSearchText, setNameSearchText] = useState(otherText);
  // адаптив компонента
  useEffect(() => {
    if (mobile) {
      setContainerSize("pr-6 pl-6");
      setNameSearchSize("w-80");
    } else if (tablet) {
      setContainerSize("pr-20 pl-20");
      setNameSearchSize("w-80");
      setNameSearchText("Name or episode (ex.S01E01)...");
    } else if (normal) {
      setContainerSize("pr-32 pl-32");
    } else {
      setContainerSize("pr-52 pl-52");
      setNameSearchSize("w-31-rem");
      setNameSearchText(otherText);
    }
  }, [normal, tablet, mobile]);

  return (
    <div
      className={`flex justify-center items-center w-full flex-wrap ${filtersPaddingSize}`}
    >
      {/* передаємо полю введення текст, який отримуємо від батьківського елементу, за необхідності */}
      <NameSearch
        // передаємо функцію, яка викликає функцію, яка змінює запит до api
        filterChange={handleNameFilterChange}
        additionalClassContainer={NameSearchSize}
        additionalText={NameSearchText}
      />
    </div>
  );
};
