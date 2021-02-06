import React from 'react';
const MovieInfo = props => {
	return (
		<div className="column">
			<h1>Title: {props.movie.Title}</h1>
			<h2>Year: {props.movie.Year}</h2>
			<img src={props.movie.Poster} alt={props.movie.Title} />
		</div>
	);
};
export default MovieInfo;
