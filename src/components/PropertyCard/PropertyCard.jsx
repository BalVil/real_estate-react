import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
import "./PropertyCard.css";

function PropertyCard({ card }) {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart p-card"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <AiFillHeart size={24} color="white" />
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
