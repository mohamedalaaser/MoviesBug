export default async function getMovies(page){

    const resp = await fetch(`http://api.themoviedb.org/3/discover/movie?api_key=f89cd7843a6d2df66b47018467f96c56&page=${page}`);
    const fetchedData = await resp.json();
    return fetchedData;
}