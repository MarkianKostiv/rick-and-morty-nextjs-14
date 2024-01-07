import Image from "next/image";
interface ManiImgProps {
  src: string;
  height: number;
  width: number;
}
// цей компонент слід використовувати для головного зображення
// на сторінках, при виклику передаємо шлях до картики та ширину і висоту
export const MainImg = (props: ManiImgProps) => {
  const { src, height, width } = props;
  return (
    <div className='flex items-center justify-center mt-6 mr-6 ml-6 mb-4 md:ml-0 md:mr-0'>
      <Image
        src={src}
        height={height}
        width={width}
        alt='main-img'
      />
    </div>
  );
};
