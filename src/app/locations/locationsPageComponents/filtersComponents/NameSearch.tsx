import { ChangeEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface NameSearchProps {
  filterChange: ChangeEventHandler<HTMLInputElement>;
  additionalClassContainer?: string;
  additionalText?: string;
}
// цей компонент використовується для фільтрації за тим, що вводить користувач
// при виклику необхідно передати функцію, яка запускає функцію зміни запиту до api
// шляшом того, що вводить користувач
export const NameSearch = (props: NameSearchProps) => {
  // також опціонально можемо передавати, або інший текст для плейс холдера, або додаткові класи
  const { filterChange, additionalClassContainer, additionalText } = props;

  return (
    <div className='relative'>
      <input
        placeholder={`${additionalText}` || `Filter by name...`}
        className={`${additionalClassContainer} pt-3 pb-3 border border-[#9E9E9E] focus:border-[#9E9E9E] h-14 rounded-xl pl-12 mt-2`}
        type='text'
        onChange={filterChange}
      />
      <SearchIcon
        color='disabled'
        className='absolute castom-top left-4 transform -translate-y-2/4'
      />
    </div>
  );
};
