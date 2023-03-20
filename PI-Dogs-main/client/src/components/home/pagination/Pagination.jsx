import React from "react";
import './Pagination.css';

const Pagination = ({ dogsPerPage, dogs, pagination }) => {

    const pages = [];

    for (let i = 0; i <= Math.ceil(dogs / dogsPerPage); i++) {
        pages.push(i + 1)
    }

    return (
        <nav className="numbers-Pagination">
            <ul className="pages-Pagination">
                {
                    pages && pages.map(num => (
                        <li key={num}>
                            <a className="numButton-Pagination" onClick={() => pagination(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;