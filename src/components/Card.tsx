import React from 'react';
import { CardType } from '../types';

interface CardProps {
  card: CardType;
  flipped: boolean;
  handleClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, flipped, handleClick }) => {
  return (
    <div className="card" onClick={handleClick}>
      {flipped ? (
        <div className="front">{card.image}</div>
      ) : (
        <div className="back">❓</div>
      )}
    </div>
  );
};

export default Card;
