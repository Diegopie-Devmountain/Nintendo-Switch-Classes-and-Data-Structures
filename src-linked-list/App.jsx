import { useState } from "react";
import { gamesForSelect, storeGames } from "./data/games"

export default function App() {

  const [yourGames, setYourGames] = useState([
    {
      id: 0,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 1,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 2,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 3,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 4,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 5,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 6,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 7,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 8,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 9,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
    {
      id: 10,
      name: "The Legend of Zelda: Breath of the Wild",
      fileSize: 13000,
      batteryUse: 2,
      coverImg: "https://picsum.photos/id/870/300/300?grayscale&blur=2"
    },
  ]);

  const handleRemove = (data) => {
    console.log(data);
  }
  
  const yourGamesList = yourGames.map((game, index) => {
    return (
      <article className="relative" key={game.id}>
        <button 
        className="w-6 text-white absolute right-0 drop-shadow-md"
        onClick={() => handleRemove(game)}
        >X</button>
        <img src={game.coverImg} className="w-56 h-56 object-cover" />
        <p className="w-56 text-center font-serif">{game.name}</p>
      </article>
    )
  })

  const handleGameInstall = (key) => {
    console.log(key);
    const gameData = storeGames[key];
    console.log(gameData);

    // to do
  }

  const gameButtons = gamesForSelect.map(((game, index) => {
    return (
      <button
        key={index}
        className="bg-slate-300 w-36"
        onClick={() => handleGameInstall(game.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-'))}
      >
        {game}
      </button>
    )
  }))

  return (
    <main>
      <section className="mt-8 px-10">
        <h2 className="text-center font-serif text-xl font-semibold">Select a Game for download!</h2>
        <article className="flex flex-wrap gap-3 mt-5 ">
          {gameButtons}
        </article>
      </section>
      <section className="mt-14 mb-12 px-8">
        <h2 className="text-center font-serif text-xl font-semibold">Your Games</h2>
        <section className="mt-5 flex gap-6 overflow-x-auto">
          {yourGamesList}
        </section>
      </section>
    </main>
  )
}