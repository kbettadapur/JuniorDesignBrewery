import firebaseApp from '../firebase';

export function getUserData(uid) {
	databaseReference = firebaseApp.database().ref("/Users/" + uid + "/publicData");
	return databaseReference.once("value").then((snapshot) => {
		return Promise.resolve(snapshot.val());
	});
}

export function setUserData(userData) {
	uid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("/Users/" + uid + "/publicData");
	return databaseReference.set(userData);
}

export function reportUser(uid) {
	ourUid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("Users/" + uid + "/metadata/reports/" + ourUid);
	return databaseReference.set(true);
}

export function reportReview(reviewId) {
	ourUid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("Reviews/" + reviewId + "/metadata/reports/" + ourUid);
	return databaseReference.set(true);
}

export function getBreweryReviews(breweryId) {
	databaseReference = firebaseApp.database().ref("Breweries/" + breweryId + "/reviews/");
	return databaseReference.once("value").then((reviewIds) => {
		if (reviewIds.exists()) {
			reviewPromises = [];
			Object.keys(reviewIds.val()).forEach((reviewId) => {
				reviewPromises.push(getReview(reviewId));
			});
			return Promise.all(reviewPromises);
		} else {
			return Promise.resolve([]);
		}
	}).then((reviews) => {
		return Promise.resolve(reviews.filter((review) => review != null));
	});
}

export function getReview(reviewId) {
	databaseReference = firebaseApp.database().ref("Reviews/" + reviewId + "/metadata");
	return databaseReference.once("value").then((metadata) => {
		if (metadata.val().viewable) {
			databaseReference = firebaseApp.database().ref("Reviews/" + reviewId + "/data");
			return databaseReference.once("value").then((review) => {
				merged = Object.assign(metadata.val(), review.val());
				return Promise.resolve(merged);
			});
		} else {
			return Promise.resolve(null);
		}
	});
}

export function setFavoriteState(breweryId, favoriteState) {
	uid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("Users/" + uid + "/privateData/favorites/" + breweryId);
	if (favoriteState) {
		return databaseReference.set(true);
	} else {
		return databaseReference.remove();
	}
}

export function getFavoriteState(breweryId) {
	uid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("Users/" + uid + "/privateData/favorites/" + breweryId);
	return databaseReference.once("value").then((snapshot) => {
		return Promise.resolve(snapshot.exists());
	});
}

export function deleteReview(reviewId) {
	databaseReference = firebaseApp.database().ref("Reviews/" + reviewId + "/metadata/viewable");
	return databaseReference.set(false);
}

export function getUsersObject(Uids) {
	users = {};
	userPromises = [];
	Uids.forEach((Uid) => {
		if (users[Uid] == undefined) {
			users[Uid] = {};
			// this is to make sure we don't get the same user data twice
			userPromise = getUserData(Uid).then((userData) => {
				users[Uid] = userData;
				return Promise.resolve(null);
			});
			userPromises.push(userPromise);
		}
	});
	return Promise.all(userPromises).then(() => {
		return Promise.resolve(users);
	})
}

export function isAdmin() {
	ourUid = firebaseApp.auth().currentUser.uid;
	databaseReference = firebaseApp.database().ref("Admins/" + ourUid);
	return databaseReference.once("value").then((snapshot) => {
		return Promise.resolve(snapshot.exists());
	})
}