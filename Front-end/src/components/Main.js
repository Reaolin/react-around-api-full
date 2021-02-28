import React from "react";
import Card from "./Card";
import { UserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(props) {
	const currentUser = React.useContext(UserContext);

	

	//Calls the initial cards from the API --don't forget the empty array
		


	return (
		<>
		          <Header link={'/signin'} text={"Log out"} onClick={props.handleSignOut} userEmail={props.userEmail} />

		<main className="main">
			<section className="profile">
				<div className="profile__avatar-container">
					<img
						className="profile__avatar"
						src={currentUser.avatar}
						alt="profile"
					/>
					<button
						className="profile__avatar_edit-btn"
						onClick={props.handleEditAvatarClick}
					></button>
				</div>
				<div className="profile-info">
					<div className="profile-info__text">
						<h1 className="profile-info__title">{currentUser.name}</h1>
						<p className="profile-info__sub-title">{currentUser.about}</p>
					</div>
					<button
						className="profile__edit-btn link"
						onClick={props.handleEditProfileClick}
					></button>
				</div>

				<button
					className="profile__add-btn link"
					onClick={props.handleAddPlaceClick}
				></button>
			</section>
			<section className="photo-container">
				<ul className="photo-grid">
					{props.cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							src={card.link}
							title={card.name}
							likes={card.likes}
							owner={card.owner}
							_id={card._id}
							onCardClick={() => props.handleCardClick(card.link, card.name)}
							onDeleteClick={(card) => props.handleCardDelete(card)}
							onLikeClick={(card) => props.handleCardLike(card)}
						/>
					))}
				</ul>
			</section>
		</main>
		</>
	);
}

export default Main;
