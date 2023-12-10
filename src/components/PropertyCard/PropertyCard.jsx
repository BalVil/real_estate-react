import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";
import "./PropertyCard.css";

function PropertyCard({ card }) {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart p-card"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <FavoriteHeart id={card.id} />
      <img src={card.image} alt={card.name} />
      <div className="secondaryText p-card__price">
        <span>$</span>
        <p>{card.price}</p>
      </div>
      <p className="p-card__name primaryText">
        {truncate(card.title, { length: 20 })}
      </p>
      <p className="p-card__detail secondaryText">
        {truncate(card.description, { length: 80 })}
      </p>
    </div>
  );
}

export default PropertyCard;
