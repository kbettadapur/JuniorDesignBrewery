import firebaseApp from '../firebase';


function verifyAdmin(uid) {
    var exists = false;
    var ref = firebaseApp.database().ref("admins/");
    ref.child(uid).on('value', function(snapshot) {
        return snapshot.val();
    });
}

exports.isAdmin = function(uid) {
	return verifyAdmin(uid);
};