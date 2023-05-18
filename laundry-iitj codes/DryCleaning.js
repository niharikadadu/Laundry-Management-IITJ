import firebase from './config.js'

const rollno = localStorage.userid
console.log(rollno)

var storage = firebase.storage();
var detailsDB = firebase.database().ref('details')
var clothesDB = firebase.database().ref('LastDeposit')

// var fileRef = storage.ref().child("files/" + rollno);
// fileRef.getDownloadURL().then(function (url) {
//         document.getElementById("mypic").src = url;
// }).catch(function (error) {
//         console.error("Error getting download URL from Firebase Storage: ", error);
// });

// document.getElementById('rollno').innerHTML = rollno;

const getElementVal = (id) => {
        return document.getElementById(id).value;
}

// detailsDB.child(rollno).once("value").then((snapshot) => {
//         const details = snapshot.val();
//         const name = details.name;
//         const hostel = details.hostel;

//         document.getElementById("name").innerHTML = name;
//         document.getElementById("hostel").innerHTML = hostel;
//         document.getElementById("rollno").innerHTML = rollno;
// });



const dryCleanDB = firebase.database().ref('DryCleaning');

dryCleanDB.child(rollno).once('value')
        .then((snapshot) => {
                const data = snapshot.val();

                // Generate an HTML table dynamically using the data in the logs array
                const table = document.createElement('table');
                table.setAttribute('class', "table align-items-center table-flush");
                const thead = document.createElement('thead');

                const headersRow = document.createElement('tr');
                const headers = ['Date received', 'Blanket', 'Hoodies', 'Sweater', 'Others', 'Return Date', 'Dues'];

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



                

                const row = document.createElement('tr');

                const dateCell = document.createElement('td');
                dateCell.setAttribute("class", "fw-bolder text-gray-500");
                dateCell.textContent = convertDate(data.date);
                row.appendChild(dateCell);

                const blanketCell = document.createElement('td');
                blanketCell.setAttribute("class", "fw-bolder text-gray-500");
                blanketCell.textContent = data.blanket;
                row.appendChild(blanketCell);

                const hoodieCell = document.createElement('td');
                hoodieCell.setAttribute("class", "fw-bolder text-gray-500");
                hoodieCell.textContent = data.hoodies;
                row.appendChild(hoodieCell);

                const sweaterCell = document.createElement('td');
                sweaterCell.setAttribute("class", "fw-bolder text-gray-500");
                sweaterCell.textContent = data.sweater;
                row.appendChild(sweaterCell);

                const othersCell = document.createElement('td');
                othersCell.setAttribute("class", "fw-bolder text-gray-500");
                othersCell.textContent = data.others;
                row.appendChild(othersCell);

                const returnDateCell = document.createElement('td');
                returnDateCell.setAttribute("class", "fw-bolder text-gray-500");
                returnDateCell.textContent = convertDate(data.returnDate);
                row.appendChild(returnDateCell);

                const duesCell = document.createElement('td');
                duesCell.setAttribute("class", "fw-bolder text-gray-500");
                duesCell.textContent = data.dues;
                row.appendChild(duesCell);

                tbody.appendChild(row);


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


