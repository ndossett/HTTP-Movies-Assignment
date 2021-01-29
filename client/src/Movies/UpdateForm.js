import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateForm = props => {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialMovie)
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data)
            setFormValues(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const changeMovieHandler = evt => {
        const { name, value } = evt.target
        setFormValues({...formValues, [name]: value});
    };

    const handleMovieSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, formValues)
        .then(res => {
            setFormValues(props.movieList.map(movie => {
                if(movie.id === res.data.id){
                    return  res.data;
                } else {
                    return movie;
                }
            }));
            push(`/movies/${id}`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <h2> Update Movie</h2>
            <form onSubmit={handleMovieSubmit}>
                <label htmlFor='title'>Title</label>
                <input 
                    type='text'
                    name='title'
                    onChange={changeMovieHandler}
                    placeholder='title'
                    value={formValues.title}
                />
                <label htmlFor='director'>Director</label>
                <input 
                    type='text'
                    name='director'
                    onChange={changeMovieHandler}
                    placeholder='director'
                    value={formValues.director}
                />
                <label htmlFor='metascore'>Metascore</label>
                <input 
                    type='number'
                    name='metascore'
                    onChange={changeMovieHandler}
                    placeholder='metascore'
                    value={formValues.metascore}
                />
                <label htmlFor='actors'>Actors</label>
                <input 
                    type='string'
                    name='actors'
                    onChange={changeMovieHandler}
                    placeholder='actors'
                    value={formValues.actors}
                />
                <button className='form-button' type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm
