import React from "react";

function PopupWithForm(props) {
	return (
		<div
			className={`modal modal_type_${props.name} ${
				props.isOpen ? "modal_display" : " "
			}`}
		>
			<div className="modal__container">
				<div className="modal__content">
					<h3 className="modal__title">{`${props.title}`}</h3>
					<form
						action="#"
						className={`modal__form form form_type_${props.name}`}
						noValidate
						onSubmit={props.onSubmit}
					>
						{props.children}
						<button
							type="submit"
							className="modal__button form__save"
							disabled=""
						>
							{props.buttonText}
						</button>
					</form>
					<button
						className="modal__close link"
						onClick={props.onClose}
					></button>
				</div>
			</div>
		</div>
	);
}

export default PopupWithForm;
