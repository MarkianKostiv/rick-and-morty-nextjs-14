import React, { ChangeEvent, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NameSearch } from "../locations/locationsPageComponents/filtersComponents/NameSearch";
import { ChaptersSelects } from "./chartersFiltersComponents/ChaptersSelects";

interface FiltersProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSpeciesFilter: React.Dispatch<React.SetStateAction<string>>;
  setGenderFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}
// при виклику передаємо функції фільтрації, які динамічно впливають на запит до
// api
export const Filters: React.FC<FiltersProps> = (props) => {
  const { setFilter, setSpeciesFilter, setGenderFilter, setStatusFilter } =
    props;

  // передаємо функції фільтрації функціям виклику, ці функції запускають функції фільтрації
  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSpeciesFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSpeciesFilter(e.target.value);
  };

  const handleGenderFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(e.target.value);
  };

  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const normal = useMediaQuery({ maxWidth: 1200 });
  const tablet = useMediaQuery({ maxWidth: 790 });
  const mobile = useMediaQuery({ maxWidth: 500 });
  const [filtersPaddingSize, setContainerSize] =
    useState<string>("pr-52 pl-52");
  // міняємо значення відступів залежно від ширини екрану
  useEffect(() => {
    if (mobile) {
      setContainerSize("pr-6 pl-6");
    } else if (tablet) {
      setContainerSize("pr-20 pl-20");
    } else if (normal) {
      setContainerSize("pr-32 pl-32");
    } else {
      setContainerSize("pr-52 pl-52");
    }
  }, [normal, tablet, mobile]);

  return (
    <div
      className={`flex justify-center items-center w-full flex-wrap ${filtersPaddingSize}`}
    >
      {/* викликаємо компонент інпута для пошуку за name
      передаємо функцію, яка викликає функцію фільтрації */}
      <NameSearch
        filterChange={handleNameFilterChange}
        additionalClassContainer='ml-3 mr-3 w-60'
        additionalText=''
      />
      <ChaptersSelects
        // викликаємо компонент із селектами
        // та передаємо йому функції виклику функцій фільтрації
        handleSpeciesFilterChange={handleSpeciesFilterChange}
        handleGenderFilterChange={handleGenderFilterChange}
        handleStatusFilterChange={handleStatusFilterChange}
        additionalClassContainer='flex flex-wrap justify-center'
        additionalClassSelect='ml-3 mr-3'
      />
    </div>
  );
};
