import firebase from './config.js';
// import authDB from './signup.js';

var authDB = firebase.database().ref('authenticate')

document.getElementById('signinForm').addEventListener('submit',signinForm);

function signinForm(e){
        
        e.preventDefault();
        var email = getElementVal('email');
        var pw = getElementVal('pw');

        authDB.orderByChild("email").equalTo(email).once("value")
        .then((snapshot) => {
                if (snapshot.exists()) {
                        snapshot.forEach((childSnapshot) => {
                                const childData = childSnapshot.val();
                                if (childData.pw === pw) {
                                        const userid = childSnapshot.key;
                                        console.log(userid);
                                        localStorage.setItem('userid', userid);
                                        window.location.href = "homepage.html"; 
                                } else {
                                        alert("wrong credentials");
                                }
                        });
                } else {
                        alert("wrong credentials");
                }
  })
  .catch((error) => {
    console.error(error);
  });
       
}

const getElementVal = (id) =>{
        return document.getElementById(id).value;
}

//export default success

