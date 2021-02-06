import React, { useState, useEffect } from 'react';
import MovieInfo from './MovieInfo';

export default function App(props) {
	const [query, updateQuery] = useState({
		baseURL: 'http://www.omdbapi.com/?',
		apiKey: 'apikey=' + '27a58027',
		option: '&s=',
		title: '',
		searchURL: ''
	});

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		(async () => {
			if (query.searchURL) {
				try {
					const response = await fetch(query.searchURL);
					const data = await response.json();
					await setMovies(data.Search);
				} catch (error) {
					console.error(error);
				} finally {
					updateQuery({
						baseURL: 'http://www.omdbapi.com/?',
						apiKey: 'apikey=' + '27a58027',
						option: '&s=',
						title: '',
						searchURL: ''
					});
				}
			}
		})();
	}, [query]);

	const handleChange = e => {
		updateQuery({
			...query,
			...{
				[e.target.id]: e.target.value
			}
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		updateQuery({
			...query,
			searchURL: query.baseURL + query.apiKey + query.option + query.title
		});
	};

	return (
		<div className="Page-wrapper">
			<h1>Movies</h1>
			<div className="form">
				<form onSubmit={handleSubmit}>
					<input
						id="title"
						type="text"
						value={query.title}
						onChange={handleChange}
					/>
					<input type="submit" value="Find Movies"></input>
				</form>
			</div>
			<div className="movies-display">
				{movies.map(movie => (
					<MovieInfo movie={movie} />
				))}
			</div>
		</div>
	);
}
