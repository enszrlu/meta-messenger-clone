import React from 'react';

function LogoutButton({ clickHandler }) {
    return (
        <button
            onClick={() => clickHandler()}
            className="bg-blue-500  text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
            Sign Out
        </button>
    );
}

export default LogoutButton;
