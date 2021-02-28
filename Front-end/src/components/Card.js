import React from "react";
import TrashLid from "../images/Trashcan_lid.svg";
import TrashBottom from "../images/trashcan_bottom.svg";
import { UserContext } from "../contexts/CurrentUserContext";

function Card(props) {
	const currentUser = React.useContext(UserContext);

	// Checking if you are the owner of the current card
	const isOwn = props.owner._id === currentUser._id;

	// Creating a variable which you'll then set in `className` for the delete button
	const cardRemoveButtonClassName = `card__delete ${
		isOwn ? "card__remove-btn_visible" : "card__remove-btn"
	}`;

	// Check if the card was liked by the current user
	const isLiked = props.likes.some((i) => i._id === currentUser._id);

	// Create a variable which you then set in `className` for the like button
	const cardLikeButtonClassName = `card__heart ${isLiked ? "card__like" : "card__heart"}`;

	function handleClick() {
		props.onCardClick(props.card);
	}

	function deleteClick() {
		props.onDeleteClick(props.card);
	}

	function handleLikeClick() {
		props.onLikeClick(props.card);
	}

	return (
		<li className="card">
			<img
				className="card__img"
				src={props.src}
				onClick={handleClick}
				alt={props.title}
			/>
			<button className={cardRemoveButtonClassName} onClick={deleteClick}>
				<img src={TrashLid} alt="Trashcan lid" className="card__trash-top" />
				<img
					src={TrashBottom}
					alt="trashcan bottom"
					className="card__trash-bottom"
				/>
			</button>
			<div className="card__info">
				<h2 className="card__title">{props.title}</h2>
				<div className="card__likes">
					<button
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
					></button>
					<p className="card__like-total">{props.likes.length}</p>
				</div>
			</div>
		</li>
	);
}
export default Card;
