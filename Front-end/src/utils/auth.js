export const BASE_URL = "http://localhost:3000";

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).catch((err) => console.log(err));
};

export const authorize = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.token) {
				localStorage.setItem("jwt", data.token);
				return data;
			} else {
				return;
			}
		})
		.catch((err) => console.log(err));
};

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => data)
		.catch((err) => console.log(err));
};
