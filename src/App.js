import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const genetratedCards = () => {
    const memoryCards = [
      "01.jpg",
      "02.jpg",
      "06.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
      "12.jpg",
      "10.png",
      "15.jpg",
      "16.jpg",
      "17.jpg",
      "18.jpg",
    ];
    const deck = [...memoryCards, ...memoryCards];
    return deck.sort(() => Math.random() - 0.5);
  };
  const [cards, setCards] = useState(genetratedCards());
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };
    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };
  const gameOver = solved.length === cards.length;

  const resetGame = () => {
    setCards(genetratedCards());
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div className="body">
      <div className="heading">
        <h1>Memory Game</h1>
        {gameOver && <h2>You WON! Congrats!</h2>}
      </div>
      <div className="cards">
        {cards.map((img, index) => (
          <div onClick={() => handleClick(index)} key={index} className="card">
            {flipped.includes(index) || solved.includes(index) ? (
              <img src={`/images/${img}`} alt={img} width={100} height={100} />
            ) : (
              <img
                src="/images/gradinet.jpg"
                width={100}
                height={100}
                alt="gradinet"
              />
            )}
          </div>
        ))}
      </div>
      <div className="btn">
        <button onClick={resetGame} className="btn-innerChild">
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
