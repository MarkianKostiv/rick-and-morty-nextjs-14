"use client";
import React from "react";
import { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "react-responsive";
import "../castom.css";

interface InfoBlockProps {
  showElement: string;
  gender?: string;
  status?: string;
  species?: string;
  origin?: string;
  type?: string;
  location?: string;
  typeValue?: string;
  episodes?: string[];
  isOpened?: boolean;
}

// цей компонент виклкикається тоді, коли відкривається картка персонажа
// він містить усі додаткові дані про персонажа, важливо передавати чи була картка відкрита
export const InfoBlock: React.FC<InfoBlockProps> = ({
  showElement,
  gender,
  status,
  species,
  origin,
  type,
  location,
  typeValue,
  episodes,
  isOpened,
}) => {
  const mobile = useMediaQuery({ maxWidth: 900 });
  const [infoBlockStyles, setContainerStyles] = useState<string>(" ");
  const [firstListStyles, setFirstListStyles] = useState<string>(" ");
  const [secondListStyles, setSecondListStyles] = useState<string>(
    "h-96 mb-7 overflow-auto scrollbar-hide"
  );
  // адаптив компонента
  useEffect(() => {
    if (mobile) {
      setContainerStyles(
        "justify-center flex-col h-96 overflow-auto scrollbar-hide "
      );
      setFirstListStyles("mt-24");
      setSecondListStyles("h-0");
    } else {
      setContainerStyles(" ");
      setFirstListStyles(" ");
      setSecondListStyles("h-96 mb-7 overflow-auto scrollbar-hide");
    }
  }, [mobile]);

  // оскільки в даних персонажа ми отримуємо масив посилань до api на
  // епізоди персонажа необхідно доатково пробігтися по цьому масиву, щоб отримати дані епізодів
  const [episodeData, setEpisodeData] = useState<any[]>([]);
  useEffect(() => {
    const getEpisodeData = async () => {
      // починаємо пробігатися по масиву, тільки якщо користувач відкрив картку, саме тому ми
      // передвали стан картки у пропсах, якщо вона відкрита справджується умова і ми пробігаємося по списку епізодів
      // таким чином ми пропібгаємося по епізодах для конкретної картки і рендеримо їх для неї, яку вибрав користувач
      // і уникаємо сильного навантаження на клієнта та api коли відбувається велика кількість одночасних запитів
      if (isOpened && episodes && episodes.length > 0) {
        const episodeDataPromises = episodes?.map(async (url) => {
          try {
            const response = await fetch(url);
            const episodeData = await response.json();
            return episodeData;
          } catch (error) {
            console.error(
              `Помилка отримання даних епізоду за URL ${url}:`,
              error
            );
            return null;
          }
        });

        if (episodeDataPromises) {
          const episodeDataList = await Promise.all(episodeDataPromises);
          setEpisodeData(episodeDataList.filter((data) => data !== null));
        }
      }
    };

    getEpisodeData();
  }, [isOpened, episodes]);

  return (
    <div
      className={`flex w-full ${infoBlockStyles} items-center justify-evenly mb-10 ${showElement}`}
    >
      {/* у цьому списку передаємо додаткові дані персонажа для відкритої картки */}
      <ul className={`mr-5 pb-5 ${firstListStyles}`}>
        <h3 className='text-xl font-medium text-[#8E8E93] mb-6'>
          Informations
        </h3>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Gender</p>
          <p className='font-normal text-sm text-[#6E798C]'>{gender}</p>
        </li>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Status</p>
          <p className='font-normal text-sm text-[#6E798C]'>{status}</p>
        </li>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Specie</p>
          <p className='font-normal text-sm text-[#6E798C]'>{species}</p>
        </li>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Origin</p>
          <p className='font-normal text-sm text-[#6E798C]'>{origin}</p>
        </li>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Type</p>
          <p className='font-normal text-sm text-[#6E798C]'>{typeValue}</p>
        </li>
        <li className='pl-5 mb-3 border-b w-80'>
          <p className='text-base font-bold text-[#081F32]'>Location</p>
          <p className='font-normal text-sm text-[#6E798C]'>{location}</p>
        </li>
      </ul>
      {/* цьому списку передаємо епізоди по яких ми пробіглися
      коли картка була відкрита */}
      <ul className={`${secondListStyles}`}>
        <h3 className='text-xl font-medium text-[#8E8E93] mb-9'>Episodes</h3>
        {episodeData.map((episode) => (
          <li
            key={episode.id}
            className='pl-5 mb-3 border-b w-80 relative'
          >
            <p className='text-base font-bold text-[#081F32]'>
              {episode.episode}
            </p>
            <p className='font-normal text-sm text-[#6E798C]'>{episode.name}</p>
            <p className='text-xs font-medium text-[#8E8E93]'>
              {episode.air_date}
            </p>
            <ArrowForwardIosIcon
              className='absolute right-0 top-5'
              color='disabled'
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
