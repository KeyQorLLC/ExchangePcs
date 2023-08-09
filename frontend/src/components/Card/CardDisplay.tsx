import React from "react";
import CardList from "./CardList";

const mockCards = [
  {
    id: "1",
    imageUrl: "https://example.com/card1.jpg",
    condition: "Mint",
    member: "Lisa",
    group: "BlackPink",
    album: "Bornpink",
    user: "User1",
    description: "Great card",
  },
  {
    id: "2",
    imageUrl: "https://example.com/card1.jpg",
    condition: "Mint",
    member: "Rose",
    group: "BlackPink",
    album: "Bornpink",
    user: "User1",
    description: "Great card",
  },
  {
    id: "3",
    imageUrl: "https://example.com/card1.jpg",
    condition: "Mint",
    member: "Jisoo",
    group: "BlackPink",
    album: "Bornpink",
    user: "User1",
    description: "Great card",
  },
  {
    id: "4",
    imageUrl: "https://example.com/card1.jpg",
    condition: "Mint",
    member: "Jennie",
    group: "BlackPink",
    album: "Bornpink",
    user: "User1",
    description: "Great card",
  },
];

const CardDisPlay: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-h-60vh bg-gradient-to-r from-kpopPink to-kpopPurple">
      <h1 className="text-4xl font-bold text-white mb-4">Card Display Page</h1>
      <CardList cards={mockCards} />
    </div>
  );
};

export default CardDisPlay;
