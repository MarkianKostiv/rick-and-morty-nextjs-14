"use client";
// Home.tsx
import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import logoCharters from "./chartersPageComponent/images/logoCharters.svg";
import { Header } from "./common/header/Header";
import { Container } from "./common/Container";
import { PersonCard } from "./chartersPageComponent/PersonCard";
import { Footer } from "./common/footer/Footer";
import { Navigation } from "./common/header/Navigation";
import { LoadMoreBtn } from "./common/LoadMoreBtn";
import { ChartersFiltersContainer } from "./chartersPageComponent/ChartersFiltersContainer";
import { MainImg } from "./common/MainImg";

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
  gender?: string;
  status?: string;
  type?: string;
  location?: { name: string };
  origin?: { name: string };
  episode?: string[];
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isCharacterNotFound, setIsCharacterNotFound] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // фільтри
  const [speciesFilter, setSpeciesFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
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
      const url = `https://rickandmortyapi.com/api/character/?name=${filter}&species=${speciesFilter}&gender=${genderFilter}&status=${statusFilter}&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

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
  }, [filter, speciesFilter, genderFilter, statusFilter, page]);
  // завантажуємо наступні сторінки
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className='bg-[#FFF] relative'>
      <Header
        onClick={toggleMobileMenu}
        charterPage='link-style link-style-active'
        locationPage='link-style link-style-disabled'
        episodesPage='link-style link-style-disabled'
      />
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
        src={logoCharters}
        width={600}
        height={200}
      />
      {/* передаємо контейнеру з фільтрами фінкції, які дозволяють змінювати запит */}
      <ChartersFiltersContainer
        setFilter={setFilter}
        setTypeFilter={setSpeciesFilter}
        setDimensionFilter={setGenderFilter}
        setStatusFilter={setStatusFilter}
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
        ) : characters?.length > 0 ? (
          characters.map((character) => (
            // після завантаження даних рендеримо картку персонажа
            // передаючи їй необхідні дані з api
            <PersonCard
              key={character.id}
              name={character.name}
              species={character.species}
              img={character.image}
              type={character.type}
              gender={character.gender}
              status={character.status}
              location={character.location?.name}
              origin={character.origin?.name}
              episodes={character.episode}
            />
          ))
        ) : (
          // якщо відбулась якась помилка для користувача виводиться повідомлення
          // про помилку
          <p className='text-center text-red-500 p-5 text-lg font-bold'>
            {isCharacterNotFound
              ? "Error fetching characters"
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
}
