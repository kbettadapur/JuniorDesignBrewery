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