import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCard(props) {
	function handleSubmit(e) {
		e.preventDefault();
		props.onDeleteCard();
	}
	return (
		<PopupWithForm
			name="delete-card"
			title="Are you sure"
			buttonText="Yes!"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		></PopupWithForm>
	);
}
export default DeleteCard;
