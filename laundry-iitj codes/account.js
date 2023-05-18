import firebase from './config.js'
const rollno = localStorage.userid
document.getElementById('userid').innerHTML = rollno;

var detailsDB = firebase.database().ref('details');
detailsDB.child(rollno).once("value").then((snapshot) => {
        const details = snapshot.val();
        const name = details.name;
        const hostel = details.hostel;
        document.getElementById("name").innerHTML = name;
        document.getElementById("hostel").innerHTML = hostel;
});

var storage = firebase.storage();
var fileRef = storage.ref().child("files/" + rollno);
fileRef.getDownloadURL().then(function (url) {
        document.getElementById("photo").src = url;
}).catch(function (error) {
        console.error("Error getting download URL from Firebase Storage: ", error);
});

//button elements
var changePhotoButton = document.getElementById("change-photo-button");
var photoForm = document.getElementById("photo-form");
var uploadPhotoButton = document.getElementById("upload-photo-button");
var cancelPhotoButton = document.getElementById("cancel-photo-button");

var updatePasswordButton = document.getElementById("update-password-button");
var passwordForm = document.getElementById("password-form");
var currentPasswordInput = document.getElementById("current-password");
var newPasswordInput = document.getElementById("new-password");
var confirmPasswordInput = document.getElementById("confirm-password");
var updatePasswordSubmitButton = document.getElementById("update-password-submit-button");
var cancelPasswordButton = document.getElementById("cancel-password-button");


// Add event listeners to the buttons
changePhotoButton.addEventListener("click", showPhotoForm);
function showPhotoForm() {
        photoForm.style.display = "block";
}
cancelPhotoButton.addEventListener("click", hidePhotoForm);
function hidePhotoForm() {
        photoForm.style.display = "none";
}

uploadPhotoButton.addEventListener("click", uploadPhoto);

updatePasswordButton.addEventListener("click", showPasswordForm);
function showPasswordForm() {
        passwordForm.style.display = "block";
}

updatePasswordSubmitButton.addEventListener("click", updatePassword);

cancelPasswordButton.addEventListener("click", hidePasswordForm);
function hidePasswordForm() {
        passwordForm.style.display = "none";
        currentPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";
}


function uploadPhoto(event) {
        event.preventDefault(); // Prevent the form from submitting

        var file = document.getElementById("selectphoto").files[0];

        // Upload the file to Firebase Storage
        fileRef.put(file).then(function (snapshot) {
                console.log("File uploaded to Firebase Storage");
                alert("Profile photograph updated!")
        }).catch(function (error) {
                console.error("Error uploading file to Firebase Storage: ", error);
        });

        fileRef.getDownloadURL().then(function (url) {
                document.getElementById("photo").src = url;
        }).catch(function (error) {
                console.error("Error getting download URL from Firebase Storage: ", error);
        });

        // Hide the photo form after photo upload
        hidePhotoForm();
}

function updatePassword(event) {
        event.preventDefault();
        var currentPassword = currentPasswordInput.value;
        var newPassword = newPasswordInput.value;
        var confirmPassword = confirmPasswordInput.value;

        var userRef = firebase.database().ref("authenticate/" + rollno);

        // Check that the current password matches the password in the database
        userRef.child("pw").once("value", function (snapshot) {
                var password = snapshot.val();
                console.log(password);
                if (currentPassword !== password) {
                        alert("Current password is incorrect.");
                        return;
                } else {
                        if (newPassword.length < 6) {
                                alert("New password must be at least 6 characters long.");
                                return;
                        } else {
                        if (newPassword !== confirmPassword) {
                                alert("New password and confirm password do not match.");
                                return;
                        }
                }}


                userRef.update({
                        "pw": newPassword
                }, function (error) {
                        if (error) {
                                console.error("Error updating password: ", error);
                        } else {
                                alert("Password updated successfully.");
                        }
                });
        });

        hidePasswordForm();
}

const getElementVal = (id) => {
        return document.getElementById(id).value;
}