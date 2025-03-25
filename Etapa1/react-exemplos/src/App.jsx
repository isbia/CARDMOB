import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter'
import Photo from './components/Photo'
import Album from './components/Album'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [albumId, setAlbumId] = useState(1);

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url);
      //console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        //console.log(data);
        const updatePhotos = data.map( (photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }))
        setPhotos(data);
      }

    } catch (error) {
      console.error('Erro ao buscar fotos', error);

    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
    <TodoList name="CARDMOB"/>
      <Counter title="Contando..."/>
      <Counter initial="180"/>
      <article>
        <h1>Album da API</h1>
        {photos.map( (photo) => (
          // <article key={photo.id}>
          //   <h2>ID #{photo.id} {photo.title}</h2>
          //   <img src={photo.thumbnailUrl} alt={photo.title}/>
          // </article>
          <Photo photo={photo}/>
        ) )}
      </article>

      <div>
        <button onClick={() => setAlbumId(1)}>Album #1</button>
        <button onClick={() => setAlbumId(2)}>Album #2</button>
        <button onClick={() => setAlbumId(3)}>Album #3</button>
        <button onClick={() => setAlbumId(4)}>Album #4</button>
      </div>

      <Album albumId={albumId}/>
    </>
  )
}

export default App
