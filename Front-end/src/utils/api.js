class Api {
	constructor({ baseURL, headers }) {
		this._baseURL = baseURL;
		this._headers = headers;
		// constructor body
	}

	getInitialCards() {
		return fetch(this._baseURL + "/cards", {
			headers: this._headers,
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	getUserInfo() {
		return fetch(this._baseURL + "/users/me", {
			headers: this._headers,
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	getAppInfo() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}

	setUserInfo({ name, about }) {
		return fetch(this._baseURL + "/users/me", {
			headers: this._headers,
			method: "PATCH",
			body: JSON.stringify({
				name,
				about,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	addCard({ name, link }) {
		return fetch(this._baseURL + "/cards", {
			headers: this._headers,
			method: "POST",
			body: JSON.stringify({
				name,
				link,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	// DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
	removeCard(cardId) {
		return fetch(this._baseURL + "/cards/" + cardId, {
			headers: this._headers,
			method: "DELETE",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	//PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
	addLikes(cardId) {
		return fetch(this._baseURL + "/cards/likes/" + cardId, {
			headers: this._headers,
			method: "PUT",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
	//DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
	removeLikes(cardId) {
		return fetch(this._baseURL + "/cards/likes/" + cardId, {
			headers: this._headers,
			method: "DELETE",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
	//PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
	setAvatar({ avatar }) {
		return fetch(this._baseURL + "/users/me/avatar", {
			headers: this._headers,
			method: "PATCH",
			body: JSON.stringify({
				avatar,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
}

const api = new Api({
	baseURL: "https://around.nomoreparties.co/v1/group-5",
	headers: {
		authorization: "97759523-392d-4e85-9860-1537a0a1a99b",
		"Content-Type": "application/json",
	},
});

export default api;
