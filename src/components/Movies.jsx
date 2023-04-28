export function ListofMovies({ movies })
{
    return (
        <ul className="movies">
            {
                movies.map(movie => (
                    <li className="movie" key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.tilte} />
                    </li>
                ))
            }
        </ul>
    )
}

export function NoResults()
{
    return (
        <p>No se encontraron resultados de esta peliculas</p>
    )
}


export function Movies({ movies })
{
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListofMovies movies={movies}></ListofMovies>
            : <NoResults></NoResults>
    )
}