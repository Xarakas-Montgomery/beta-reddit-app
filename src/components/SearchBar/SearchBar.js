import React, { useState } from "react";
import styles from "./searchBar.module.css"
import searchIcon from '../../media/search.png'
export const SearchBar = ({term, setTerm}) => {

    return (
        <div className={styles.search}>
            <div className={styles.searchContainer}>
                <img src={searchIcon} alt="search icon" className={styles.icon} />
                <input value={term} placeholder="Search"  className={styles.searchBar} onChange={(e) => setTerm(e.target.value)}></input>
            </div>
        </div>
    );

};