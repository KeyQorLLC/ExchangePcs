import React from "react";

interface CardProps {
  id: string;
  imageUrl: string;
  condition: string;
  group: string;
  member: string;
  album: string;
  description: string;
  user: string;
  name: string;
}

const CardNoLink: React.FC<CardProps> = ({
  id,
  imageUrl,
  condition,
  group,
  member,
  album,
  description,
  user,
  name,
}) => {
  return (
    <div className="w-[200px] h-[300px] rounded-md">
      <div className="relative w-[100%] h-[95%] transitiontransform preserve-3d perspective hover:rotate-y-180">
        <div className="w-[100%] h-[100%] absolute backface-hidden">
          <img src={imageUrl} alt={id} className="w-[100%] h-[100%]" />
        </div>
        <div className="bg-black text-white w-[100%] h-[100%] absolute rotate-y-180 backface-hidden flex flex-col items-center justify-center">
          <p className="mb-2 text-center">Group: {group}</p>
          <p className="mb-2 text-center">Member: {member}</p>
          <p className="mb-2 text-center">Album:</p>
          <p className="mb-2 text-center">{album}</p>
          <p className="mb-2 text-center">Description:</p>
          <p className="mb-2 text-center">{description}</p>
        </div>
      </div>
      <div className="h-[4%] flex justify-around">
        <p className="text-sm">Condition:{condition}</p>
      </div>
    </div>
  );
};

export default CardNoLink;
