import { useEffect, useState } from "react";
import "./App.css";
import images02 from "./images/02.jpg";
import images06 from "./images/06.jpg";
import images01 from "./images/01.jpg";
import images08 from "./images/08.jpg";
import images09 from "./images/09.jpg";
import images10 from "./images/10.jpg";
import images12 from "./images/12.jpg";
import images19 from "./images/10.png";
import images15 from "./images/15.jpg";
import images16 from "./images/16.jpg";
import images17 from "./images/17.jpg";
import images18 from "./images/18.jpg";

function App() {
  const genetratedCards = () => {
    const memoryCards = [
      images01,
      images02,
      images06,
      images08,
      images09,
      images10,
      images12,
      images19,
      images15,
      images16,
      images17,
      images18,
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
  const gameOver = solved.length !== cards.length;

  const resetGame = () => {
    setCards(genetratedCards());
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div className="body">
      <div className="heading">
        <h1>Memory Game</h1>
        {gameOver && <h2>You WON! Congrats! 🎊🎉</h2>}
      </div>
      <div className="cards">
        {cards.map((img, index) => (
          <div onClick={() => handleClick(index)} key={index} className="card">
            {flipped.includes(index) || solved.includes(index) ? (
              <img src={`${img}`} alt={img} width={100} height={100} />
            ) : (
              <img
                src="data:image/jpeg;base64,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"
                width={100}
                height={100}
                style={{ borderRadius: "4px" }}
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
