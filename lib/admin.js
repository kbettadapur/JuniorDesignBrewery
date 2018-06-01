import firebaseApp from '../firebase';


function verifyAdmin(uid) {
    var exists = false;
    var ref = firebaseApp.database().ref("admin/");
    ref.child(uid).once('value', function(snapshot) {
        exists = snapshot.val();
    });
    return exists;
}

exports.isAdmin = function(uid) {
	return verifyAdmin(uid);
};