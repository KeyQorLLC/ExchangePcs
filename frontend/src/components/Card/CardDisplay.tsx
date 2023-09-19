import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import SearchComponent from "../User/SearchComponent";

interface SearchCriteria {
  condition: string;
  group: string;
  member: string;
  album: string;
}

const CardDisPlay: React.FC = () => {
  const [cardData, setCardData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    condition: "",
    group: "",
    member: "",
    album: "",
  });

  useEffect(() => {
    const fetchCard = async (searchCriteria: SearchCriteria) => {
      const response = await fetch(
        `http://localhost:5000/api/card?${
          searchCriteria.condition === ""
            ? ""
            : "&condition=" + searchCriteria.condition
        }${
          searchCriteria.group === "" ? "" : "&group=" + searchCriteria.group
        }${
          searchCriteria.member === "" ? "" : "&member=" + searchCriteria.member
        }${searchCriteria.album === "" ? "" : "&album=" + searchCriteria.album}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setCardData(data);
      }
    };
    fetchCard(searchCriteria);
  }, [searchCriteria]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Find Your Star</h1>
      </div>
      <SearchComponent setCriteria={setSearchCriteria} />
      <CardList cards={cardData} links={true} />
    </div>
  );
};

export default CardDisPlay;
