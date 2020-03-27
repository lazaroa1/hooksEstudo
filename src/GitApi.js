import React, {useState, useEffect} from 'react';


function GitApi() {
  const [repositories, setRepositories] = useState([])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/diego3g/repos')
    const data = await response.json()

    setRepositories(data)
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritados`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories)
  }
  
  return (
      <ul>
      {repositories.map(repo => (
        <li key={repo.id}>{repo.name}
        {repo.favorite && <span>(Favorito)</span>}
        <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}

export default GitApi;
