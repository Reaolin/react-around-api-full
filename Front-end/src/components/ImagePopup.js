import React from "react";

function ImagePopup(props) {
	return (
		<div
			className={`modal modal_type_display-image ${
				props.isOpen ? "modal_display" : " "
			}`}

		>
			<div className="modal__container">
				<button className="modal__close link" onClick={props.onClose}></button>
				<figure>
					<img src={props.link} alt={props.title} className="modal__img" />
					<figcaption className="modal__caption">{props.title}</figcaption>
				</figure>
			</div>
		</div>
	);
}

export default ImagePopup;
