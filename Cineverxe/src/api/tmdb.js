// Base URL and Fallback API key in case env variable is empty
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || 'c84ea8924fca240f9e160ef512df1207';
const BASE_URL = 'https://api.themoviedb.org/3';

// Image Endpoints
export const image500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// Mock Data for Fallback
const mockMovies = [
  {
    id: 27205,
    title: "Inception",
    genre: "Sci-Fi",
    genres: [{ id: 878, name: "Science Fiction" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }],
    overview: "Cobb, a skilled thief who steals valuable secrets from deep within the subconscious during the dream state, is given a inverse task: plant an idea into the mind of a C.E.O.",
    poster_path: "/oHQUi959uG11VC045SgPG2gDwz.jpg",
    backdrop_path: "/s3TBrRGB1K7G5J2221ILUpUr2Kq.jpg",
    vote_average: 8.4,
    release_date: "2010-07-15",
    runtime: 148,
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000",
  },
  {
    id: 155,
    title: "The Dark Knight",
    genre: "Action",
    genres: [{ id: 18, name: "Drama" }, { id: 28, name: "Action" }, { id: 80, name: "Crime" }],
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tWGB2Xoi1Rue64q6o9O6C68n.jpg",
    backdrop_path: "/nMKdUUuedzldufgZ6De2lH1wJvH.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
    runtime: 152,
    img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000",
  },
  {
    id: 157336,
    title: "Interstellar",
    genre: "Sci-Fi",
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" }],
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QvIPwc3Hzv18gcBlbgzb0tL.jpg",
    backdrop_path: "/xJHdhbg3evxB6O7eqJstVM04nUx.jpg",
    vote_average: 8.4,
    release_date: "2014-11-05",
    runtime: 169,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
  },
  {
    id: 603,
    title: "The Matrix",
    genre: "Sci-Fi",
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }],
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    poster_path: "/f89U3wzqrjFnHwb9Y9OMv6U0HzA.jpg",
    backdrop_path: "/3N92H2rG2P24h6V2D2833wZ6w1f.jpg",
    vote_average: 8.2,
    release_date: "1999-03-30",
    runtime: 136,
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000",
  },
  {
    id: 550,
    title: "Fight Club",
    genre: "Drama",
    genres: [{ id: 18, name: "Drama" }],
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way.",
    poster_path: "/pB8BM76G6j0YuMsV7nEA1eF92gB.jpg",
    backdrop_path: "/hZ01w38fhptXz9Wo757519WoWoWo.jpg",
    vote_average: 8.4,
    release_date: "1999-10-15",
    runtime: 139,
    img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000",
  }
];

const mockCast = [
  { name: "Leonardo DiCaprio", character: "Cobb", profile_path: "/xkQFlk1bW7hU5eH45W4d2V167u.jpg" },
  { name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "/xkQFlk1bW7hU5eH45W4d2V167u.jpg" },
  { name: "Elliot Page", character: "Ariadne", profile_path: "/xkQFlk1bW7hU5eH45W4d2V167u.jpg" },
  { name: "Tom Hardy", character: "Eames", profile_path: "/xkQFlk1bW7hU5eH45W4d2V167u.jpg" },
];

// Fetch Request Helper
const apiCall = async (endpoint, params = {}) => {
  // Construct URL with query parameters
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params
  });
  
  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`TMDB API call failed for ${endpoint}:`, error.message);
    throw error;
  }
};

// API Functions
export const fetchTrendingMovies = async () => {
  try {
    const data = await apiCall('/trending/movie/day');
    return data.results || mockMovies;
  } catch (e) {
    return mockMovies;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const data = await apiCall('/movie/popular');
    return data.results || mockMovies;
  } catch (e) {
    return mockMovies.slice().reverse();
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const data = await apiCall('/movie/upcoming');
    return data.results || mockMovies;
  } catch (e) {
    return mockMovies.slice(2, 5);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const data = await apiCall('/movie/top_rated');
    return data.results || mockMovies;
  } catch (e) {
    return mockMovies.slice(0, 3);
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const data = await apiCall(`/movie/${id}`);
    return data;
  } catch (e) {
    const found = mockMovies.find(m => m.id === Number(id)) || mockMovies[0];
    return found;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const data = await apiCall(`/movie/${movieId}/credits`);
    return data.cast || mockCast;
  } catch (e) {
    return mockCast;
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const data = await apiCall(`/movie/${movieId}/similar`);
    return data.results || mockMovies;
  } catch (e) {
    return mockMovies;
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const data = await apiCall('/search/movie', { query });
    return data.results || [];
  } catch (e) {
    return mockMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
};

export const fetchDiscoverMovies = async (genreId) => {
  try {
    const data = await apiCall('/discover/movie', { with_genres: genreId });
    return data.results || [];
  } catch (e) {
    return mockMovies;
  }
};

// Genre mapping for local mock filtering
export const GENRES_MAP = {
  "Action": 28,
  "Adventure": 12,
  "Comedy": 35,
  "Drama": 18,
  "Horror": 27,
  "Sci-Fi": 878,
  "Romance": 10749,
  "Thriller": 53
};
