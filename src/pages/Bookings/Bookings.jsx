import { useContext, useState } from "react";
import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import useFilteredBookings from "../../hooks/useFilteredBookings";
import UserDetailContext from "../../context/UserDetailContext";
import "../Properties/Properties.css";

function Bookings() {
  const { data, isLoading, error } = useProperties();
  const [searchValue, setSearchValue] = useState("");
  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

  const filteredBookings = useFilteredBookings(data, bookings, searchValue);

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
      <SearchBar filter={searchValue} setFilter={setSearchValue} />
      <div className="paddings flexCenter properties">
        {filteredBookings.map((card) => (
          <PropertyCard card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;
