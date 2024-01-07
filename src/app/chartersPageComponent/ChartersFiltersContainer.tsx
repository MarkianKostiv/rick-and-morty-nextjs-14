import { useMediaQuery } from "react-responsive";
import { FiltersChaptersMobile } from "./FiltersChaptersMobile";
import { Filters } from "./Filters";

interface FiltersContainerProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  setDimensionFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}
// цей компонент повертає в залежності від ширини екру, або мобільну, або
// звичайну версію фільтрів, йому небхідно передвати властивості, які відповідають за
// динамічну зміну запиту до api
export const ChartersFiltersContainer = (props: FiltersContainerProps) => {
  const { setFilter, setTypeFilter, setDimensionFilter, setStatusFilter } =
    props;
  // ширина екрану на якій покажеться мобільна версія
  const mobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div>
      {mobile ? (
        // передаємо функції фільтрації, які отримуємо із пропсів батьківського елемента
        // переданих йому
        <FiltersChaptersMobile
          setFilter={setFilter}
          setTypeFilter={setTypeFilter}
          setDimensionFilter={setDimensionFilter}
          setStatusFilter={setStatusFilter}
        />
      ) : (
        // аналогічно мобільним фільтрам
        <Filters
          setFilter={setFilter}
          setSpeciesFilter={setTypeFilter}
          setGenderFilter={setDimensionFilter}
          setStatusFilter={setStatusFilter}
        />
      )}
    </div>
  );
};
