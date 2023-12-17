import { useState } from "react";
import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import useFilteredProperties from "../../hooks/useFilteredProperties";
import "./Properties.css";

function Properties() {
  const { data, isLoading, error } = useProperties();
  const [searchValue, setSearchValue] = useState("");
  console.log(data);

  const filteredData = useFilteredProperties(data, searchValue);

  if (error) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "50vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className="flexColCenter paddings innerWidth properties-container">
          <SearchBar filter={searchValue} setFilter={setSearchValue} />
          <div className="paddings flexCenter properties">
            {filteredData.map((card) => (
              <PropertyCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Properties;
