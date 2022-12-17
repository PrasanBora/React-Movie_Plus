 import React from "react";
 import { useEffect ,useState } from "react";
 import './App.css';
 import SearchIcon from './search.svg';
 import MovieCard from './MovieCard';

// http://www.omdbapi.com/?i=tt3896198&apikey=11f92595
const API_URL = ' https://www.omdbapi.com?apikey=11f92595'


// const movie1 ={
//   "Title": "Spider-Man Title Reveal",
//   "Year": "2021",
//   "imdbID": "tt14122734",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg"
// }


const App =() => {
  
  useEffect (()=> 
  {
     searchMovies ('Avengers');
  } ,[]);

  const [searchTerm , setSearchTerm] =useState("");
  const [movies ,setMovies]= useState ([]);
  
  const searchMovies = async (title ) =>
  {
     console.log(title);
     const response = await fetch (`${API_URL}&s=${title}`);
     const data = await response.json();
     console.log(data.Search);
     if(data.Search !== undefined)
      setMovies( data.Search );
  };
  
  return (
    <div  className="app">
      <h1> Movie_PLus </h1>

      <div className="search">
        <input
           placeholder="Search for Movies"
           value ={searchTerm}
           onChange = { (e) => setSearchTerm (e.target.value) }
         
           onKeyDown={(e) =>
                     {
                        if (e.key === "Enter")
                        {  searchMovies (searchTerm)}
                      }}
        />
           <img 
              src={SearchIcon}
              alt = "search"
              onClick={ ()=> searchMovies (searchTerm)} 
            />          
           
      </div>

{
  movies.length > 0
  ? (
    <div className="container">
    
        {movies.map ((movie)=> 
        ( < MovieCard movie={movie}/>)
          )}
      </div>
  ):(
    <div className="empty">
      <h2>No Movies Found 😔</h2>
    </div>
  )} 
    </div>
  );
};
export default App;
