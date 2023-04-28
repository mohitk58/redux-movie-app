import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import "./Header.scss";

const Header = () => {
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(term === "") return alert('Please enter a term');
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");
    };

    return (
        <div className='header'>
            <Link to="/">
                <div className='logo'>Movie App</div>
            </Link>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input type="text" value={term} placeholder="Search Movies or Shows" onChange={e => setTerm(e.target.value)} />
                    <button type="submit"><i className='fa fa-search' /></button>
                </form>
            </div>
            <div className='user-image'>
                <img src={'https://yt3.ggpht.com/yti/AHyvSCDfqbDJ8-QO2TL4p07QEr4BZGJAYmFm1rOPeoNEDw=s88-c-k-c0x00ffffff-no-rj-mo'} alt="user" />
            </div>
        </div>
    );
};

export default Header;