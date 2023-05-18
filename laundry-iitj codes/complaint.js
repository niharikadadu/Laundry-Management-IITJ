const firebaseConfig = {
    // Add your Firebase Configurations
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var FirstName = getElementVal("FirstName");
    var LastName = getElementVal("LastName");
    var RollNo = getElementVal("RollNo");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");


    saveMessages(FirstName, LastName, RollNo, emailid, msgContent);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (FirstName, LastName, RollNo, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        FirstName: FirstName,
        LastName: LastName,
        RollNo: RollNo,
        emailid: emailid,
        msgContent: msgContent,
    });

    window.location = 'SubmissionPage.html';
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};