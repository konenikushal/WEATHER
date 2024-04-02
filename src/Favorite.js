import React from 'react';
// import { fas } from '@fortawesome/free-solid-svg-icons'


function Favorite({ addToFavorites, isFavorite }) {
    return (
        <div>
            <button 
                className={`py-2 px-4 rounded ${isFavorite ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500'}`}
                onClick={addToFavorites}>
                {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
}

export default Favorite;