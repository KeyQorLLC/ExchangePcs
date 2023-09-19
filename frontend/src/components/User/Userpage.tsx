import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardList from "../Card/CardList";

interface SearchCriteria {
  user: string;
}

const Userpage: React.FC = () => {
  let params = useParams();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCard = async (searchCriteria: SearchCriteria) => {
      const response = await fetch(`/api/card?user=${searchCriteria.user}`);
      if (response.status === 200) {
        const data = await response.json();
        setCardData(data);
      }
    };

    fetchCard({ user: String(params.userid) });
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-kpopPink to-white flex flex-col items-center">
      <div className="mt-4">User: {params.userid}</div>
      <CardList cards={cardData} links={false} />
    </div>
  );
};

export default Userpage;
