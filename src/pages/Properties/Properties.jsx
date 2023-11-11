import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import "./Properties.css";

function Properties() {
  const { data, isLoading, error } = useProperties();

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
    <div className="flexColCenter paddings innerWidth properties-container">
      <SearchBar />
      <div className="paddings flexCenter properties">
        {data.map((card) => (
          <PropertyCard card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default Properties;
