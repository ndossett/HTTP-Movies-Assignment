import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from 'axios';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm';
import AddForm from './Movies/AddForm';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
    <nav>
      <div className='nav-links'>
        <NavLink exact to='/movies/add'>
          Add Movie
        </NavLink>
        <NavLink  exact to='/'>
          Home
        </NavLink>
      </div>
    </nav>
    
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      
      <Route exact path='/movies/:id'>
          <Movie
          addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/movies/:id/edit">
        <UpdateForm updateMovies={setMovieList} movieList={movieList} />
      </Route>

      <Route path="/movies/add">
        <AddForm addMovies={setMovieList} movieList={movieList} getMovieList={getMovieList}/>
      </Route>
    </>
  );
};

export default App;
