import { useMediaQuery } from "react-responsive";
import { FiltersLocation } from "./FiltersLocation";
import { FiltersMobile } from "./FiltersMobile";

interface FiltersContainerProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  setDimensionFilter: React.Dispatch<React.SetStateAction<string>>;
}
// цей компонент повертає в залежності від ширини екру, або мобільну, або
// звичайну версію фільтрів, йому небхідно передвати властивості, які відповідають за
// динамічну зміну запиту до api
export const ContainerFilters = (props: FiltersContainerProps) => {
  const { setFilter, setTypeFilter, setDimensionFilter } = props;
  // ширина екрану на якій покажеться мобільна версія
  const mobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div>
      {mobile ? (
        // передаємо функції фільтрації, які отримуємо із пропсів батьківського елемента
        // переданих йому
        <FiltersMobile
          setFilter={setFilter}
          setTypeFilter={setTypeFilter}
          setDimensionFilter={setDimensionFilter}
        />
      ) : (
        // аналогічно мобільним фільтрам
        <FiltersLocation
          setFilter={setFilter}
          setTypeFilter={setTypeFilter}
          setDimensionFilter={setDimensionFilter}
        />
      )}
    </div>
  );
};
