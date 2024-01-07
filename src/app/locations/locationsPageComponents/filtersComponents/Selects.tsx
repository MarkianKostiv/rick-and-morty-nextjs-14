import { ChangeEventHandler } from "react";
interface FiltersProps {
  handleSpeciesFilterChange: ChangeEventHandler<HTMLSelectElement>;
  handleGenderFilterChange: ChangeEventHandler<HTMLSelectElement>;
  additionalClassContainer?: string;
  additionalClassSelect?: string;
}

// цей компонент відповідає за селекти для фільтрів, йому слід передавати функції,
// які відповідають за виклик фільтрації, також можемо передавати додаткові класи для компоненту
export const Selects = (props: FiltersProps) => {
  const {
    handleSpeciesFilterChange,
    handleGenderFilterChange,
    additionalClassContainer,
    additionalClassSelect,
  } = props;
  return (
    <div className={`${additionalClassContainer}`}>
      <select
        className={`pt-4 pb-4 border border-[#9E9E9E] focus:border-[#9E9E9E] w-60 h-14 rounded-xl mt-2 `}
        name='Species'
        id='1'
        onChange={handleSpeciesFilterChange}
      >
        <option value=''>Type</option>
        <option value='Planet'>Planet </option>
        <option value='Cluster'>Cluster</option>
        <option value='Space station'>Space station</option>
        <option value='Microverse'>Microverse</option>
        <option value='Miniverse'>Miniverse</option>
        <option value='Teenyverse'>Teenyverse</option>
        <option value='TV'>TV</option>
        <option value='Resort'>Resort</option>
        <option value='Fantasy town'>Fantasy town</option>
        <option value='Spacecraft'>Spacecraft</option>
        <option value='Dream'>Dream</option>
        <option value='Dimension'>Dimension</option>
        <option value='Menagerie'>Menagerie</option>
        <option value='Game'>Menagerie</option>
        <option value='Daycare'>Daycare</option>
        <option value='unknown'>unknown</option>
      </select>
      <select
        name='Gender'
        id='2'
        onChange={handleGenderFilterChange}
        className={`${additionalClassSelect} pt-3 pb-3 border border-[#9E9E9E] focus:border-[#9E9E9E] w-60 h-14 rounded-xl mt-2`}
      >
        <option value=''>Dimension</option>
        <option value='Dimension C-137'>Dimension C-137</option>
        <option value='Post-Apocalyptic Dimension'>
          Post-Apocalyptic Dimension
        </option>
        <option value='Replacement Dimension'>Replacement Dimension</option>
        <option value='Cronenberg Dimension'>Cronenberg Dimension</option>
        <option value='Fantasy Dimension'>Fantasy Dimension</option>
        <option value='Dimension 5-126'>Dimension 5-126</option>
        <option value='Cromulon Dimension'>Cromulon Dimension</option>
        <option value='Dimension C-500A'>Dimension C-500A</option>
        <option value='Dimension K-83'>Dimension K-83</option>
        <option value='Dimension K-22'>Dimension K-22</option>
        <option value='Unknown dimension'>Unknown dimension</option>
        <option value='unknown'>unknown</option>
      </select>
    </div>
  );
};
