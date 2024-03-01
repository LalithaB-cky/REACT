import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { CardType } from './types';
import './style.css';

const images = ['🍎', '🍇', '🍌', '🍓', '🍍', '🥝'];

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [first, setFirst] = useState<CardType | null>(null);
  const [second, setSecond] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...images, ...images]
      .map((item, index) => ({
        id: index,
        image: item,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFirst(null);
    setSecond(null);
  };

  const handleCardClick = (card: CardType) => {
    if (disabled) return;
    if (first && card.id === first.id) return;

    first ? setSecond(card) : setFirst(card);
  };

  useEffect(() => {
    if (first && second) {
      setDisabled(true);
      if (first.image === second.image) {
        setCards(prev =>
          prev.map(card =>
            card.image === first.image ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [first, second]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Match 🍒</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            flipped={card === first || card === second || card.matched}
            handleClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
