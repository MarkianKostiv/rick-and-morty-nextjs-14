import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { Container } from "@/app/common/Container";
import { PersonCard } from "@/app/chartersPageComponent/PersonCard";
import "./castom.css";

interface PersonsListProps {
  persons?: string[];
  isCardOpened: boolean;
}

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

export const PersonsList = (props: PersonsListProps) => {
  // передаємо у пропсах не лише масив посилань на персонажів, але
  // і те чи була картка локації вікрита
  const { persons, isCardOpened } = props;
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      // первіряємо чи була відкрита картка локації, чи передані персонажі і чи
      // персонажів у масиві більше нуля, таким чином підвантажуться персонажі для конкретної локації,
      // яку вибрав користувач лише тоді, коли він натиснув на картку, таким чином уникаємо занадто
      // велкої кількості одночасних запитів до api, що могло б призвести до помилок
      if (isCardOpened && persons && persons.length > 0) {
        try {
          // поки наші дані завантажуються включаємо лоадер
          setIsLoading(true);
          const characterPromises = persons.map(async (characterUrl) => {
            const response = await fetch(characterUrl);
            const data = await response.json();
            return data;
          });

          const charactersData = await Promise.all(characterPromises);
          setCharacters(charactersData);
        } catch (error) {
          console.error("Error fetching characters:", error);
        } finally {
          setIsLoading(false); // коли персонажі завантажені прибираємо лоадер
        }
      } else {
        setIsLoading(false); // Для уникнення вічного показу лоадера прибираємо його,
        // коли поржній масив residents
      }
    };

    fetchCharacters();
  }, [isCardOpened, persons]);

  return (
    <div
      className={
        isCardOpened ? `height-screen overflow-auto scrollbar-hide` : `hidden`
      }
    >
      <Container myClass='mb-28'>
        {/* показуємо лоадер, якщо йде завантаження */}
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
            // при успішному завантаженні рендеримо картку персонажа
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
          // в разі, того, якщо api повернуло нам порожній масив residents
          // виводимо для користувача повідомлення про відсутність персонажів
          // на локації
          <p className=' text-red-500 p-5 text-lg font-bold mb-20'>
            No characters at this location
          </p>
        )}
      </Container>
    </div>
  );
};
