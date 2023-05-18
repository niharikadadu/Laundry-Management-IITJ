import firebase from './config.js';
var regDB = firebase.database().ref('registration')
var authDB = firebase.database().ref('authenticate')

document.getElementById('signupForm').addEventListener('submit', submitForm)

function submitForm(e) {
        e.preventDefault();
        var email = getElementVal('email')
        var rollno = getElementVal('rollno')
        var hostel = getElementVal('hostel')
        var name = getElementVal('name')

        regDB.orderByChild('email').equalTo(email).once('value')
                .then(function (snapshot) {
                        if (snapshot.exists()) {
                                alert('Email already in use!');
                        } else {
                                if (!email.endsWith('@iitj.ac.in')) {
                                        alert('Please enter valid Institute Email-Id');
                                } else {
                                        firebase.database().ref('registration' + '/' + rollno).set({
                                                email: email,
                                                hostel: hostel,
                                                name: name,
                                        });


                                        // regDB.once('value').then(function(snapshot){
                                        //         var keys = Object.keys(snapshot.val());
                                        //         var pwid = keys[keys.length - 1];
                                        //         var newCred = authDB.push();
                                        //         newCred.set({
                                        //                 email : email,
                                        //                 pw : pwid,
                                        //         });
                                        //         sendVerificationMail(email,pwid);
                                        // });

                                        var pwid = generatePassword(8);
                                        firebase.database().ref('authenticate' + '/' + rollno).set({
                                                email: email,
                                                pw: pwid,
                                        });
                                        firebase.database().ref('details' + '/' + rollno).set({
                                                email: email,
                                                name: name,
                                                hostel: hostel,
                                        });
                                        sendVerificationMail(email, pwid);
                                }
                        }
                });
}

const getElementVal = (id) => {
        return document.getElementById(id).value;
}

const sendVerificationMail = (email, pwid) => {
        var params = {
                email: email,
                pwid: pwid,
                receiver_mailID: email,
        }

        console.log(email, pwid);
        emailjs.send("service_t6olk3b", "template_evf7vbr", params)
                .then(function (res) {
                        alert("Verification Mail sent successfully. Check your inbox for credentials!")
                })
                .catch(function (error) {
                        if (error.status === 400 && error.text.includes('Invalid email address')) {
                                console.log('Invalid email address');
                        } else {
                                console.log('Error sending email: ' + error);
                        }
                });

}

function generatePassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars.charAt(randomIndex);
        }
        return password;
}


