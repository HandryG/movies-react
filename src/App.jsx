import { useEffect, useState, useRef, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

function useSearch()
{
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() =>
  {
    if (isFirstInput.current)
    {
      isFirstInput.current = search === ''
      return
    }

    if (search === '')
    {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/))
    {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3)
    {
      setError('La búsqueda debe tener al menos 3 caractéres')
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App()
{
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search =>
    {
      getMovies({ search })
    }, 400), [])

  const handleSubmit = (event) =>
  {
    event.preventDefault()
    getMovies({ search })

  }

  const handleSort = () =>
  {
    setSort(!sort)
  }

  const handleChange = (event) =>
  {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit} className="form">
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} value={search} placeholder="Avengers, Star Wars" />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {loading
          ? <p>Cargando ...</p>
          : <Movies movies={movies}></Movies>}
      </main>
    </div>
  )
}

export default App
