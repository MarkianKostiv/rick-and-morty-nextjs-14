import { ChangeEventHandler } from "react";
interface FiltersProps {
  handleSpeciesFilterChange: ChangeEventHandler<HTMLSelectElement>;
  handleGenderFilterChange: ChangeEventHandler<HTMLSelectElement>;
  handleStatusFilterChange: ChangeEventHandler<HTMLSelectElement>;
  additionalClassContainer?: string;
  additionalClassSelect?: string;
}

// цей компонент відповідає за селекти для фільтрів, йому слід передавати функції,
// які відповідають за виклик фільтрації, також можемо передавати додаткові класи для компоненту
export const ChaptersSelects = (props: FiltersProps) => {
  const {
    handleSpeciesFilterChange,
    handleGenderFilterChange,
    handleStatusFilterChange,
    additionalClassContainer,
    additionalClassSelect,
  } = props;
  return (
    <div className={`${additionalClassContainer}`}>
      <select
        className='pt-4 pb-4 border border-[#9E9E9E] focus:border-[#9E9E9E] w-60 h-14 rounded-xl mt-2 '
        name='Species'
        id='1'
        onChange={handleSpeciesFilterChange}
      >
        <option value=''>Species</option>
        <option value='Human'>Human </option>
        <option value='Alien'>Alien</option>
        <option value='Mythological Creature'>Mythological Creature</option>
        <option value='Humanoid'>Humanoid</option>
        <option value='Robot'>Robot</option>
        <option value='Animal'>Animal</option>
        <option value='Cronenberg'>Cronenberg</option>
        <option value='Disease'>Disease</option>
        <option value='Poopybutthole'>Poopybutthole</option>
        <option value='unknown'>unknown</option>
      </select>
      <select
        name='Gender'
        id='2'
        onChange={handleGenderFilterChange}
        className={` ${additionalClassSelect} pt-3 pb-3 border border-[#9E9E9E] focus:border-[#9E9E9E] w-60 h-14 rounded-xl mt-2 `}
      >
        <option value=''>Gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Genderless'>Genderless</option>
        <option value='unknown'>unknown</option>
      </select>
      <select
        name='Status'
        id='3'
        onChange={handleStatusFilterChange}
        className='pt-3 pb-3 border border-[#9E9E9E] focus:border-[#9E9E9E] w-60 h-14 rounded-xl mt-2'
      >
        <option value=''>Status</option>
        <option value='Alive'>Alive </option>
        <option value='Dead'>Dead</option>
        <option value='unknown'>unknown</option>
      </select>
    </div>
  );
};
