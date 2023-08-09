import React from "react";
import Card from "./Card";

interface CardData {
  id: string;
  imageUrl: string;
  condition: string;
  member: string;
  group: string;
  album: string;
  user: string;
  description: string;
}

interface CardListProps {
  cards: CardData[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-auto">
      {cards.map((card) => (
        <Card
          id={card.id}
          imageUrl={card.imageUrl}
          condition={card.condition}
          member={card.member}
          group={card.group}
          album={card.album}
          user={card.user}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
