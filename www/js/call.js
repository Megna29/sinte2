//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS E_contact (id INTEGER PRIMARY KEY AUTOINCREMENT, Enumber INTEGER )";


var selectAllStatement = "SELECT * FROM E_contact";

var insertStatement = "INSERT INTO E_contact (Enumber) VALUES (?)";

var updateStatement = "UPDATE E_contact SET Enumber = ? WHERE id=?";

var deleteStatement = "DELETE FROM E_contact WHERE id=?";

var dropStatement = "DROP TABLE E_contact";

var db = openDatabase("Logbook", "1.0", "Log book", 200000); // Open SQLite Database

var dataset;

var DataType;

function initDatabase() // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase) // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        } else {

            createTable(); // If supported then call Function for create table in SQLite

        }

    } catch (e) {

        if (e == 2) {

            // Version number mismatch. 

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable() // Function for Create Table in SQLite.

{

    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], onError);
        
    });

}

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

{
     var numbertemp = document.getElementById("Enumber").value;
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, [numbertemp], showRecords, loadAndReset, onError);
        Success();
    });

    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

}

function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..

{

    var iddelete = id.toString();

    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
        alert("Delete Sucessfully");
    });

    resetForm();

}

function updateRecord() // Get id of record . Function Call when Delete Button Click..

{

    var numberupdate = document.getElementById("Enumber").value;

    var useridupdate = $("#id").val();

    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [numberupdate, Number(useridupdate)], loadAndReset, onError);
    });

}

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.

{

    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });

    resetForm();

    initDatabase();

}

function loadRecord(i) // Function for display records which are retrived from database.

{

    
    var item = dataset.item(i);

    $("#Enumber").val((item['Enumber']).toString());

   

}

function resetForm() // Function for reset form input values.

{
    

    $("#Enumber").val("");

    

}

function loadAndReset() //Function for Load and Reset...

{

    resetForm();

    showRecords()

}


function Success() //Function for Load and Reset...

{

    alert("Input success");

}

function onError(tx, error) // Function for Hendeling Error...

{


}

function showRecords() // Function For Retrive data from Database Display records as list

{
    

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['name'] +  '<br> ' 
                + '<div class="ui-field-contain"> <label for="twho"> Meeting : </label> <p id="twho"> ' + item['Receiver'] + '<p></div> <br> '   +
                    '<div class="ui-field-contain"> <label for="tmsg"> Message : </label> <p id="tmsg"> ' + item['Message'] + '<p></div> <br> '    +
                    '<div class="ui-field-contain"> <label for="tdate"> Date : </label> <p id="tdate"> ' + item['Date'] + '<p></div> <br> '     +
                    '<div class="ui-field-contain"> <label for="ttime"> At Time : </label> <p id="ttime"> ' + item['Time'] + '<p></div> <br> '     +
                    '<div class="ui-field-contain"> <label for="tloc"> Location : </label> <p id="tloc"> ' + item['Location'] + '<p></div> <br> '   +
                    '<div class="ui-field-contain"> <input type="submit" value="Delete" data-role="button" onclick="deleteRecord(' + item['id'] + ');"> </li>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}

function showSideRecords() // Function For Retrive data from Database Display records as list

{
    

    $("#appoint").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = "hello";
                $("#appoint").append(linkeditdelete);

            }

        });

    });

}



$(document).ready(function () // Call function when page is ready for load..

    {;

        $("body").fadeIn(2000); // Fade In Effect when Page Load..

        initDatabase();
        showRecords();

        

        $("#submitButton").click(insertRecord); // Register Event Listener when button click.


    });
function selectitems(query, succ_fun) {
    db.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, result) {
            eval(succ_fun)(result.rows);
        });
    });
}
var query = "select Enumber from E_contact";
selectitems(query, getval_success);
function getval_success(result) {
    if (result.length > 0) {
        for (var i = 0, item = null; i < result.length; i++) {
            $("#v01").html('')
            item = result.item(0);
            var demo = item['Enumber'];
            $("#v01").append(demo);
        }

    }
}
