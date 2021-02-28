import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
	//const currentUser = React.useContext(UserContext);
	const [name, setName] = React.useState("");
	const [occupation, setOccupation] = React.useState("");

	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleOccupationChange(e) {
		setOccupation(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onProfileUpdate({name: name, about: occupation});
	}

	return (
		<PopupWithForm
			name="edit-profile"
			title="Edit profile"
			buttonText="Save"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="modal__label">
				<input
					id="profile-name"
					type="text"
					name="name"
					className="modal__input form__name-input"
					placeholder="name"
					minLength="2"
					maxLength="40"
					onChange={handleNameChange}
					value={name}
					required
				/>
				<span id="profile-name-error" className="modal__error"></span>
			</label>

			<label className="modal__label">
				<input
					id="profile-occupation"
					type="text"
					name="occupation"
					className="modal__input form__job-input"
					placeholder="occupation"
					minLength="2"
					maxLength="200"
					onChange={handleOccupationChange}
					value={occupation}
					required
				/>
				<span id="profile-occupation-error" className="modal__error"></span>
			</label>
		</PopupWithForm>
	);
}
export default EditProfilePopup;
