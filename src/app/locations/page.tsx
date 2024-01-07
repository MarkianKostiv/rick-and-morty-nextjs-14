"use client";
import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { Header } from "../common/header/Header";
import { Navigation } from "../common/header/Navigation";
import { LoadMoreBtn } from "../common/LoadMoreBtn";
import mainImg from "./images/mainImg.svg";
import { MainImg } from "../common/MainImg";
import { Container } from "../common/Container";
import { LocationCard } from "./locationsPageComponents/LocationCard";
import { Footer } from "../common/footer/Footer";
import { ContainerFilters } from "./locationsPageComponents/ContainerFilters";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents?: string[];
}

// це голвна сторінка локацій, тут ми виконуємо запит до api та збираємо всі компоненти із яких складається сторінка локацій
const Locations = () => {
  const [locations, setCharacters] = useState<Location[]>([]);
  const [isCharacterNotFound, setIsCharacterNotFound] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // Фільтри
  const [filter, setFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [dimensionFilter, setDimensionFilter] = useState<string>("");

  const [nextPage, setNextPage] = useState<string | null>(null);

  // функція відкрива та закриває мобільне меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // отримання даних з api
  const fetchCharacters = async () => {
    try {
      // поки дані завантажуться, показуємо лоадер користувачу
      setIsLoading(true);
      // робимо динамічний запит до api щоб користувач міг фільтрувати дані, в запит підставляємо необхідні фільтри
      const url = `https://rickandmortyapi.com/api/location/?name=${filter}&type=${typeFilter}&dimension=${dimensionFilter}&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);

      if (page === 1) {
        setCharacters(data.results);
      } else {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }
      // якщо дані були отримані відключаємо повідомлення про не знайдених персонажів
      setIsCharacterNotFound(false);

      setNextPage(data.info.next);
    } catch (error) {
      console.error("Error fetching characters:", error);
      // якщо відбулась помилка включаємо повідомлення про не знайдених персонажів
      setIsCharacterNotFound(true);
    } finally {
      // виключаємо лоадер після успішного, або не успішного отримання даних
      setIsLoading(false);
    }
  };

  // встановлюємо фільтри
  useEffect(() => {
    fetchCharacters();
  }, [filter, typeFilter, dimensionFilter, page]);
  // завантажуємо наступні сторінки з api
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className='bg-[#FFF]'>
      <Header
        onClick={toggleMobileMenu}
        charterPage='link-style link-style-disabled'
        locationPage='link-style link-style-active'
        episodesPage='link-style link-style-disabled'
      ></Header>
      {/* показуємо мобільне меню коли змінилося значення isMobileMenuOpen */}
      <div
        className={`w-full h-full fixed flex flex-col ease-in-out duration-300 justify-start z-10 bg-[#fff] ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <Navigation
          className='m-0 flex-col'
          // додаткові класи для дочірніх елементів, за необхідності
          classForChild=' font-bold pt-12 text-2xl'
        />
      </div>
      <MainImg
        src={mainImg}
        height={202}
        width={326}
      />
      {/* передаємо контейнеру з фільтрами фінкції, які дозволяють змінювати запит */}
      <ContainerFilters
        setFilter={setFilter}
        setTypeFilter={setTypeFilter}
        setDimensionFilter={setDimensionFilter}
      />

      <Container>
        {/* поки контет ватажиться показуємо лоадер */}
        {isLoading ? (
          <ColorRing
            visible={true}
            height='150'
            width='150'
            ariaLabel='color-ring-loading'
            wrapperStyle={{}}
            wrapperClass='color-ring-wrapper'
            colors={["#2196F3", "#1E88DD", "#35A0F4", "#1B7CC9", "#47A9F5"]}
          />
        ) : locations?.length > 0 ? (
          locations.map((location) => (
            <LocationCard
              // після завантаження даних рендеримо картку локації
              // передаючи їй необхідні дані з api
              key={location.id}
              name={location.name}
              type={location.type}
              dimension={location.dimension}
              residents={location.residents}
            />
          ))
        ) : (
          // якщо відбулась якась помилка для користувача виводиться повідомлення
          // про помилку
          <p className='text-center text-red-500 p-5 text-lg font-bold mb-20'>
            {isCharacterNotFound
              ? "Error fetching Locations"
              : "No characters found"}
          </p>
        )}
      </Container>
      {/* виклкикаємо кнопку завантаження додаткових даних
      передаємо функцію, яка переключає сторінки та 
      приховуємо кнопку тоді коли більше немає сторінок для переключення в api
      або відбулася помилка завантаження */}
      <LoadMoreBtn
        onClick={loadMore}
        myClass={isCharacterNotFound || !nextPage ? "hidden" : "block"}
      />
      <Footer />
    </main>
  );
};

export default Locations;
