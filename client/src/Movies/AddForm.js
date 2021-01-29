import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddForm = ({getMovieList}) => {
    const [formValues, setFormValues] = useState(initialMovie);
    const { push } = useHistory();

    const changeHandler = evt => {
        const { name, value } = evt.target
        setFormValues({...formValues, [name]: value})
    }

   const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies/`, formValues)
        .then(res => {
            setFormValues(initialMovie);
            getMovieList();
            push('/');
        })
        .catch(err => {
            console.log(err)
        })
    };

    return (
        <div>
            <h2> Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={formValues.title}
                />
                <label htmlFor='director'>Director</label>
                <input 
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={formValues.director}
                />
                <label htmlFor='metascore'>Metascore</label>
                <input 
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={formValues.metascore}
                />
                <label htmlFor='actors'>Actors</label>
                <input 
                    type='string'
                    name='actors'
                    onChange={changeHandler}
                    placeholder='actors'
                    value={formValues.actors}
                />
                <button className='form-button' type='submit'>Update</button>
            </form>
        </div>
    )
}

export default AddForm
