import React from "react";
import Card from "./Card";

interface CardData {
  id: string;
  imageUrl: string;
  condition: string;
  group: string;
  member: string;
  album: string;
  version: string;
  description: string;
  user: string;
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
          group={card.group}
          member={card.member}
          album={card.album}
          version={card.version}
          description={card.description}
          user={card.user}
        />
      ))}
    </div>
  );
};

export default CardList;
