import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "desafio-conceitos-react", 
      url: "https://github.com/thofurtado", 
      techs: ["Node.js", "JavaScript", "React"]
    });
    const repository = response.data;
    setRepository([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const newRepositories = repositories
        .filter((r) => r.id !== id);
      setRepository(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
        <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

         </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
