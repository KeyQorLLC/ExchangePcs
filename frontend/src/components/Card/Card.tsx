import React from "react";

interface CardProps {
  id: string;
  imageUrl: string;
  condition: string;
  group: string;
  member: string;
  album: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  condition,
  group,
  member,
  album,
  description,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md cursor-pointer flex flex-row hover:bg-yellow-100">
      <img
        src={group + ".jpg"}
        alt={id}
        className="w-60 h-60 object-cover mb-2 rounded-md"
      />
      <div className="ml-4">
        <p className="text-gray-600 mb-2">Condition: {condition}</p>
        <p className="text-gray-600 mb-2">Group: {group}</p>
        <p className="text-gray-600 mb-2">Member: {member}</p>
        <p className="text-gray-600 mb-2">Album: {album}</p>
        <p className="text-gray-600 mb-2">Description: {description}</p>
      </div>
    </div>
  );
};

export default Card;
