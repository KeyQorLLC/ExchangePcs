import React from "react";

interface CardProps {
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

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  condition,
  group,
  member,
  album,
  version,
  description,
  user,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <img
        src={imageUrl}
        alt={id}
        className="w-full h-32 object-cover mb-2 rounded-md"
      />
      <h3 className="text-gray-600 mb-2">Condition: {condition}</h3>
      <p className="text-gray-600 mb-2">Group: {group}</p>
      <p className="text-gray-600 mb-2">Member: {member}</p>
      <p className="text-gray-600 mb-2">Album: {album}</p>
      <p className="text-gray-600 mb-2">Version: {version}</p>
      <p className="text-gray-600 mb-2">Description: {description}</p>
      <p className="text-gray-600">Posted by: {user}</p>
    </div>
  );
};

export default Card;
