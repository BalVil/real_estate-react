import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import UserDetailContext from "../../context/UserDetailContext";
import { changeFavoriteStatus } from "../../services/api";
import { checkFavorites, updateFavorites } from "../../utils/common";

const defaultClr = "white";
const accentClr = "orangered";

function FavoriteHeart({ id }) {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { favorites, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(checkFavorites(id, favorites, defaultClr, accentClr));
  }, [favorites, id]);

  const { mutate } = useMutation({
    mutationFn: () => changeFavoriteStatus(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favorites: updateFavorites(id, prev.favorites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === accentClr ? defaultClr : accentClr));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
}

export default FavoriteHeart;
