import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [cardName, setCardName] =React.useState("");
	const [cardLink, setCardLink] =React.useState("");

	function handleCardName(e) {
		setCardName(e.target.value);
	  }
	  
	  function handleCardLink(e) {
		setCardLink(e.target.value);
	  }
	
	  function handleSubmit(e) {
		e.preventDefault();
		props.handleAddPlace({
		  name: cardName,
		  link: cardLink
		},
		setCardName(''),
		setCardLink(''));
	  }
	return (
		<PopupWithForm
			name="add-card"
			title="New Card"
			buttonText="Save"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="modal__label">
				<input
					id="image-title"
					type="text"
					name="name"
					className="modal__input form__title-input"
					placeholder="title"
					minLength="1"
					maxLength="30"
					onChange={handleCardName}
					value={cardName}
					required
				/>
				<span id="image-title-error" className="modal__error"></span>
			</label>

			<label className="modal__label">
				<input
					id="image-url"
					type="url"
					name="link"
					className="modal__input form__url-input"
					placeholder="url"
					onChange={handleCardLink}
					value={cardLink}
					required
				/>
				<span id="image-url-error" className="modal__error"></span>
			</label>
		</PopupWithForm>
	);
}
export default AddPlacePopup;
