"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { ColorRing } from "react-loader-spinner";
import logo from "./images/logo.svg";
import { Header } from "../common/header/Header";
import { Navigation } from "../common/header/Navigation";
import { MainImg } from "../common/MainImg";
import { EpisodesFilter } from "./episodesPageComponents/EpisodesFilter";
import { Container } from "../common/Container";
import { EpisodeCard } from "./episodesPageComponents/EpisodeCard";
import { Footer } from "../common/footer/Footer";
import { LoadMoreBtn } from "../common/LoadMoreBtn";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters?: string[];
}

// це головна сторінка епізодів, тут збираємо усі компоненти для епізодів
// та робимо запит до api
const Episodes = () => {
  const [episodes, setCharacters] = useState<Episode[]>([]);
  const [isCharacterNotFound, setIsCharacterNotFound] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // Фільтри
  const [filter, setFilter] = useState<string>("");
  const [isSearchingByEpisode, setIsSearchingByEpisode] =
    useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null); // Track next page

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const fetchEpisodes = async () => {
    try {
      setIsLoading(true);

      let url = "";

      // Перевірка, чи користувач вводить номер епізоди чи назву
      // кожен номер епізоду починається із s0, тобто, якщо поаток
      // рядку у полі ввдення дорівнює s0 значить користувач хоче шукати за
      // номером епізоду тоді робимо запит до api за епізодм, в іншому випадку шукаємо за назвою
      // епізоду
      if (filter.toLowerCase().startsWith("s0")) {
        url = `https://rickandmortyapi.com/api/episode?episode=${filter}&page=${page}`;
      } else {
        url = `https://rickandmortyapi.com/api/episode?name=${filter}&page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);

      if (page === 1) {
        setCharacters(data.results);
      } else {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }

      setIsCharacterNotFound(false);

      setNextPage(data.info.next);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setIsCharacterNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [filter, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className='bg-[#FFF]'>
      <Header
        onClick={toggleMobileMenu}
        charterPage='link-style link-style-disabled'
        locationPage='link-style link-style-disabled'
        episodesPage='link-style link-style-active'
      ></Header>
      <div
        className={`w-full h-full fixed flex flex-col ease-in-out duration-300 justify-start z-10 bg-[#fff] ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <Navigation
          className='m-0 flex-col'
          classForChild=' font-bold pt-12 text-2xl'
        />
      </div>
      <MainImg
        src={logo}
        height={210}
        width={270}
      />
      {/* опціонально передаємо інший текст для плейсхолдера поля інпут */}
      <EpisodesFilter
        setFilter={setFilter}
        otherText='Filter by name or episode (ex. S01 or S01E02)'
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
        ) : episodes?.length > 0 ? (
          episodes.map((episode) => (
            <EpisodeCard
              // після завантаження даних рендеримо картку епізоду
              // передаючи їй необхідні дані з api
              key={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
              characters={episode.characters}
            />
          ))
        ) : (
          // якщо відбулась якась помилка для користувача виводиться повідомлення
          // про помилку
          <p className='text-center text-red-500 p-5 text-lg font-bold mb-20'>
            {isCharacterNotFound
              ? "Error fetching Episodes"
              : "No Episodes found"}
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

export default Episodes;
