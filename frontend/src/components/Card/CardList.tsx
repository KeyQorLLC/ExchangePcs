import React from "react";
import Card from "./Card";
import CardNoLink from "./CardNoLink";

interface CardData {
  _id: string;
  imageUrl: string;
  condition: string;
  group: string;
  member: string;
  album: string;
  description: string;
  user: string;
  name: string;
}

interface CardListProps {
  cards: CardData[];
  links: Boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, links }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {cards.map((card) =>
        links ? (
          <Card
            id={card._id}
            imageUrl={card.imageUrl}
            condition={card.condition}
            group={card.group}
            member={card.member}
            album={card.album}
            description={card.description}
            user={card.user}
            name={card.name}
            key={card._id}
          />
        ) : (
          <CardNoLink
            id={card._id}
            imageUrl={card.imageUrl}
            condition={card.condition}
            group={card.group}
            member={card.member}
            album={card.album}
            description={card.description}
            user={card.user}
            name={card.name}
            key={card._id}
          />
        )
      )}
    </div>
  );
};

export default CardList;
