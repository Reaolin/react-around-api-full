import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
	const avatarRef = React.useRef();


	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateAvatar(avatarRef.current.value);
	}
		


	return (
		<PopupWithForm
			name="edit-avatar"
			title="Change profile picture"
			buttonText="Save"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="modal__label">
				<input
					ref={avatarRef}
					id="avatar-url"
					type="url"
					name="avatar"
					className="modal__input form__url-input"
					placeholder="avatar url"
					minLength="2"
					required
				/>
				<span id="avatar-url-error" className="modal__error">
					Please enter a url.
				</span>
			</label>
		</PopupWithForm>
	);
}
export default EditAvatarPopup;
