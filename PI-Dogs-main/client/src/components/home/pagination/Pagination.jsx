import React from "react";
import './Pagination.css';

const Pagination = ({ dogsPerPage, dogs, pagination }) => {
    const pages = [];

    for (let i = 1; i <= Math.floor(dogs / dogsPerPage); i++) {
        pages.push(i)
    }

    return (
        <nav className="numbers-Pagination">
            <ul className="pages-Pagination">
                {
                    pages && pages.map(num => (
                        <button key={num}>
                            <a className="numButton-Pagination" onClick={() => pagination(num)}>{num}</a>
                        </button>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;