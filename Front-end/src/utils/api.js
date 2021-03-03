class Api {
	constructor({ baseURL, headers }) {
		this._baseURL = baseURL;
		this._headers = headers;
		// constructor body
	}

	getInitialCards(token) {
		return fetch(this._baseURL + "/cards", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	getUserInfo(token) {
		return fetch(this._baseURL + "/users/me", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	getAppInfo() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}

	setUserInfo({ name, about }, token) {
		return fetch(this._baseURL + "/users/me", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "PATCH",
			body: JSON.stringify({
				name,
				about,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	addCard({ name, link }, token) {
		return fetch(this._baseURL + "/cards", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				name,
				link,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	// DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
	removeCard(cardId, token) {
		return fetch(this._baseURL + "/cards/" + cardId, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "DELETE",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}

	//PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
	addLikes(cardId, token) {
		return fetch(this._baseURL + "/cards/" + cardId + "/likes", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "PUT",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
	//DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
	removeLikes(cardId, token) {
		return fetch(this._baseURL + "/cards/" + cardId + "/likes", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "DELETE",
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
	//PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
	setAvatar({ avatar }, token) {
		return fetch(this._baseURL + "/users/me/avatar", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "PATCH",
			body: JSON.stringify({
				avatar,
			}),
		}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
	}
}

const api = new Api({
	baseURL: "http://api.reaolindev.students.nomoreparties.site",
	headers: {
		//"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json",
	},
});

export default api;
