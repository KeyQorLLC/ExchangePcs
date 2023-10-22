import React, { useState } from "react";
import { albumnMap, groupList, memberMap } from "./mapping";

interface SearchComponentProps {
  setSearchCriteria: (criteria: SearchCriteria) => void;
}

interface SearchCriteria {
  condition: string;
  group: string;
  member: string;
  album: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  setSearchCriteria,
}) => {
  const [filter, setFilter] = useState<SearchCriteria>({
    condition: "",
    group: "",
    member: "",
    album: "",
  });

  const handleSearch = () => {
    setSearchCriteria(filter);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">Search Filters</h3>
      <div className="flex space-x-4">
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setFilter({
              ...filter,
              group: e.target.value,
              member: "",
              album: "",
            })
          }
        >
          <option value="">Select Group</option>
          {groupList.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) => setFilter({ ...filter, album: e.target.value })}
        >
          <option value="">Select Album</option>
          {filter.group &&
            albumnMap[filter.group].map((album) => (
              <option key={album} value={album}>
                {album}
              </option>
            ))}
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) => setFilter({ ...filter, member: e.target.value })}
        >
          <option value="">Select Member</option>
          {filter.group &&
            memberMap[filter.group].map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
        </select>
        <button
          className="bg-kpopBlue text-white rounded p-1 hover:bg-kpopYellow transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
