import firebase from './config.js'
//import success from './signin.js'

const rollno = localStorage.userid
console.log(rollno)

var storage = firebase.storage();
var detailsDB = firebase.database().ref('details')
var clothesDB = firebase.database().ref('LastDeposit')

var fileRef = storage.ref().child("files/" + rollno);
fileRef.getDownloadURL().then(function (url) {
        document.getElementById("mypic").src = url;
}).catch(function (error) {
        console.error("Error getting download URL from Firebase Storage: ", error);
});

document.getElementById('rollno').innerHTML = rollno;

const getElementVal = (id) => {
        return document.getElementById(id).value;
}

detailsDB.child(rollno).once("value").then((snapshot) => {
        const details = snapshot.val();
        const name = details.name;
        const hostel = details.hostel;

        document.getElementById("name").innerHTML = name;
        document.getElementById("hostel").innerHTML = hostel;
        document.getElementById("rollno").innerHTML = rollno;
});

clothesDB.child(rollno).once("value").then((snapshot) => {
        const clothes = snapshot.val();

        document.getElementById("date").innerHTML = "Your laundry is coming on: " + convertDate(getDateAfter7Days(clothes.date));

        document.getElementById("jeans").innerHTML = clothes.jeans;
        document.getElementById("tshirt").innerHTML = clothes.tshirt;
        document.getElementById("pyjama").innerHTML = clothes.pyjama;
        document.getElementById("shirt").innerHTML = clothes.shirt;
        document.getElementById("jacket").innerHTML = clothes.jacket;
});

function getCurrentDate() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        year = year.toString();
        var formattedDate = day + month + year;
        return formattedDate;
}

function getDateAfter7Days() {
        var currentDate = new Date();
        var targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);

        var day = targetDate.getDate().toString().padStart(2, '0');
        var month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
        var year = targetDate.getFullYear().toString();

        var outputDate = day + month + year;

        return outputDate;
}

function convertDate(inputDate) {
        var day = inputDate.substring(0, 2);
        var month = inputDate.substring(2, 4);
        var year = inputDate.substring(4, 8);

        var date = new Date(year, month - 1, day); // Note that month is 0-indexed in the Date object

        var outputDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        return outputDate;
}