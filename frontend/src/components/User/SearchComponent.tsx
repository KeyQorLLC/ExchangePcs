import React, { useState } from "react";

interface SearchComponentProps {
  onSearch: (criteria: SearchCriteria) => void;
}

interface SearchCriteria {
  condition: string;
  group: string;
  member: string;
  album: string;
  version: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    condition: "",
    group: "",
    member: "",
    album: "",
    version: "",
  });

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-kpopBlue mb-2">
        Search Filters
      </h3>
      <div className="flex space-x-4">
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, condition: e.target.value })
          }
        >
          <option value="">Select Condition</option>
          <option value="Mint">Mint</option>
          <option value="Near Mint">Near Mint</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Light Played">Light Played</option>
          <option value="Played">Played</option>
          <option value="Poor">Poor</option>
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, member: e.target.value })
          }
        >
          {/* Options for member */}
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, group: e.target.value })
          }
        >
          {/* Options for group */}
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, album: e.target.value })
          }
        >
          {/* Options for album */}
        </select>
        <select
          className="border rounded p-1 text-kpopPurple"
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, version: e.target.value })
          }
        >
          {/* Options for version */}
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
