import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

// Not Currently Used - For Favorite Functionality 

function Favorite({ addToFavorites, isFavorite }) {
    return (
        <div>
            <button 
                className={`py-2 px-4 rounded ${isFavorite ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500'}`}
                onClick={addToFavorites}>
                <FontAwesomeIcon icon={faThumbTack} />
            </button>
        </div>
    );
}

export default Favorite;