import { ReactNode, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

interface ContainerProps {
  children: ReactNode;
  myClass?: string;
}
// цей компонент виступає в ролі адаптивного контейнера для наших карток персонажів, локацій та епізодів
// йому можна передвати дочірній елемент шляхом <Container>дочірній елемент</Container> можна передвати
// необмежену кількість дочірніх елементів
export const Container = (props: ContainerProps) => {
  // ендпойнти ширини, вони забезпечеють нормальне відображення контейнера та його елементів
  const normal = useMediaQuery({ maxWidth: 1200 });
  const tablet = useMediaQuery({ maxWidth: 790 });
  const mobile = useMediaQuery({ maxWidth: 500 });
  const [containerPaddingSize, setContainerSize] =
    useState<string>("pr-52 pl-52");
  // визначаємо стилі контейнера відносно ширини екрану
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
      className={`w-full flex items-center justify-evenly flex-wrap mt-9 ${containerPaddingSize} relative ${props.myClass}`}
    >
      {props.children}
    </div>
  );
};
