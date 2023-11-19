export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
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
