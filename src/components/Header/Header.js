import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./header.module.css"
import logoIcon from "../../media/logo.png"
import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postSlice";

export const Header = () => {

    return (
        <div className={styles.header}>
            <Link to="/">
                <img src={logoIcon} alt="The logo of the app" className={styles.icon}/>
            </Link>
            <div className={styles.logo}>
                <h1>REDDIX</h1>
            </div>
            <div className={styles.home}>
                <Link to ="/">Home</Link>
            </div>
        </div>
    )
}