import React, { ChangeEvent, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import "./castom.css";
import { Selects } from "./filtersComponents/Selects";
import { NameSearch } from "./filtersComponents/NameSearch";

interface FiltersProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  setDimensionFilter: React.Dispatch<React.SetStateAction<string>>;
}

// вся логіка компоненту аналогічна звичайним фільтрам FiltersLocation
// через кардинальну зміну вигляду вигляду фільтрів на мобільних
// пристроях створюється окремий компонент
// виклкикаєм в ContainerFiltersContainer оскільки там логіка показу компонента в залжності від ширини екрану
export const FiltersMobile = (props: FiltersProps) => {
  const { setFilter, setTypeFilter, setDimensionFilter } = props;

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSpeciesFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const handleGenderFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimensionFilter(e.target.value);
  };

  const [advancedFiltersClass, setAdvancedFiltersClass] = useState("hidden");
  // змінна для вирівнювання блоку фільтрів для зменшення довжини класнейму у елемента
  const filtersCenter: string =
    "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  const openAdvanced = () => {
    setAdvancedFiltersClass("flex");
  };
  const closeAdvanced = () => {
    setAdvancedFiltersClass("hidden");
  };
  return (
    <div
      className={`flex justify-evenly items-center w-full flex-wrap flex-col pr-6 pl-6`}
    >
      <NameSearch
        filterChange={handleNameFilterChange}
        additionalClassContainer='w-60'
        additionalText=''
      />
      <button
        className='p-4 bg-[#E3F2FD] text-[#2196F3] flex items-center w-60 justify-around rounded mt-4 active:bg-[#CEDCE6]'
        onClick={openAdvanced}
      >
        {" "}
        <FilterListIcon color='disabled' />{" "}
        <span className='text-sm mr-8 font-medium'>Advanced Filters</span>
      </button>
      <div className={`${advancedFiltersClass} filters`}>
        <div
          className={`${advancedFiltersClass} bg-[#fff] z-30 flex-col fixed ${filtersCenter} p-4 pb-24 shadow rounded `}
        >
          <div className='flex w-full justify-between items-center'>
            <h3 className='text-xl font-medium'>Filters</h3>
            <button onClick={closeAdvanced}>
              <CloseIcon />
            </button>
          </div>
          <Selects
            handleSpeciesFilterChange={handleSpeciesFilterChange}
            handleGenderFilterChange={handleGenderFilterChange}
          />
          <button
            className='p-4 bg-[#E3F2FD] text-[#2196F3] flex items-center w-60 justify-around rounded mt-8 text-sm font-medium active:bg-[#CEDCE6]'
            onClick={closeAdvanced}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
