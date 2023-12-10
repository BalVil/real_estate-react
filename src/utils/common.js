import dayjs from "dayjs";

export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { top: !menuOpened && "-100%" };
  }
};

export const updateFavorites = (id, favorites) => {
  if (favorites.includes(id)) {
    return favorites.filter((itemId) => itemId !== id);
  } else {
    return [...favorites, id];
  }
};

export const checkFavorites = (id, favorites, defaultClr, accentClr) => {
  return favorites?.includes(id) ? accentClr : defaultClr;
};

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have at least 3 characters"
    : null;
};

export const commonFilter = (data, searchValue) => {
  return (
    data?.filter(
      (property) =>
        property.title
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        property.city.toLowerCase().includes(searchValue.toLowerCase().trim())
    ) || []
  );
};

export const getFormattedDate = (value) => {
  const [firstDay, lastDay] = value.map((date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : null
  );

  return lastDay ? `${firstDay} - ${lastDay}` : firstDay;
};
