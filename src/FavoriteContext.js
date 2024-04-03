import React, { createContext, useContext, useState } from 'react';

// Not Currently Used - For Favorite Functionality 

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

        const addToFavorites = (cityName) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(cityName)) {
            return prevFavorites.filter((city) => city !== cityName);
            } else {
            return [...prevFavorites, cityName];
            }
        });
        };

        const isFavorite = (cityName) => {
            return favorites.includes(cityName);
        };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
