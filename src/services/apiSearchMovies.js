import axios from "axios";

export const fetchSearchMovies = async query => {
	const options = {
		method: "GET",
		url: "https://api.themoviedb.org/3/search/movie",
		params: { query, language: "en-US" },
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmVlMTkzY2JmMDJiNjRjZTkwNmUxYzc3ZGI0NTc1MiIsInN1YiI6IjY2MmEyNjVmZGM4NjQ3MDBhZTUyNmJlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ecW8Rd1h69bQnjhc9OKhbMcQOdKfnM1IMZx1vCger3Q",
		},
	};

	const { data } = await axios.request(options);
	return data;
};
