import firebase from './config.js'
const rollno = localStorage.userid

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

const prevLogsDB = firebase.database().ref('DepositLogs');

prevLogsDB.child(rollno).once('value')
        .then((snapshot) => {
                const logs = [];

                snapshot.forEach((childSnapshot) => {
                        const date = childSnapshot.key;
                        const data = childSnapshot.val();
                        logs.push({ date, ...data });
                        console.log(logs);
                });

                // Generate an HTML table dynamically using the data in the logs array
                const table = document.createElement('table');
                table.setAttribute('class', "table align-items-center table-flush");
                const thead = document.createElement('thead');

                const headersRow = document.createElement('tr');
                const headers = ['Date','Jeans','Shirt','Jacket','Pyjama','T-Shirt'];

                headers.forEach(headerText => {
                        const header = document.createElement('th');
                        header.setAttribute("class", "border-bottom");
                        header.setAttribute("scope", "col");
                        header.textContent = headerText;
                        headersRow.appendChild(header);
                });

                thead.appendChild(headersRow);
                table.appendChild(thead);


                const tbody = document.createElement('tbody');

                logs.forEach(logEntry => {
                        const date = logEntry.date;

                        const row = document.createElement('tr');

                        const dateCell = document.createElement('td');
                        dateCell.setAttribute("class","fw-bolder text-gray-500");
                        dateCell.textContent = convertDate(date);
                        row.appendChild(dateCell);

                        const jeansCell = document.createElement('td');
                        jeansCell.setAttribute("class","fw-bolder text-gray-500");
                        jeansCell.textContent = logEntry.jeans;
                        row.appendChild(jeansCell);

                        const shirtCell = document.createElement('td');
                        shirtCell.setAttribute("class","fw-bolder text-gray-500");
                        shirtCell.textContent = logEntry.shirt;
                        row.appendChild(shirtCell);

                        const jacketCell = document.createElement('td');
                        jacketCell.setAttribute("class","fw-bolder text-gray-500");
                        jacketCell.textContent = logEntry.jacket;
                        row.appendChild(jacketCell);

                        const pyjamaCell = document.createElement('td');
                        pyjamaCell.setAttribute("class","fw-bolder text-gray-500");
                        pyjamaCell.textContent = logEntry.pyjama;
                        row.appendChild(pyjamaCell);

                        const tshirtCell = document.createElement('td');
                        tshirtCell.setAttribute("class","fw-bolder text-gray-500");
                        tshirtCell.textContent = logEntry.tshirt;
                        row.appendChild(tshirtCell);

                        tbody.appendChild(row);
                });

                table.appendChild(tbody);

                // Append the table to the logTableContainer
                const logTableContainer = document.getElementById('logTableContainer');
                logTableContainer.appendChild(table);
        })
        .catch((error) => {
                console.error(error);
        });


function convertDate(inputDate) {
        var day = inputDate.substring(0, 2);
        var month = inputDate.substring(2, 4);
        var year = inputDate.substring(4, 8);

        var date = new Date(year, month - 1, day); // Note that month is 0-indexed in the Date object

        var outputDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        return outputDate;
}















