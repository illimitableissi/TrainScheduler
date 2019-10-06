// Firebase parameters
var firebaseConfig = {
    apiKey: "AIzaSyCbzNgiavTBuK6rSpKmonHx9QHAwHyhtGI",
    authDomain: "trainscheduler-e6f07.firebaseapp.com",
    databaseURL: "https://trainscheduler-e6f07.firebaseio.com",
    projectId: "trainscheduler-e6f07",
    storageBucket: "",
    messagingSenderId: "890525875713",
    appId: "1:890525875713:web:5c9f5b8f24ea11371d4a00",
    measurementId: "G-ELBB56GBBH"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
console.log(database)

// Click function on submit button click
  $("#submit-button").on("click", function(event) {
    event.preventDefault();

var trainName = $("#train-name").val().trim();
var trainDestination = $("#train-destination").val().trim();
var trainTime = $("#train-time").val().trim();
var trainFrequency = $("#train-frequency").val().trim();


var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
};

  // Uploads employee data to the database
  database.ref().push(newTrain);

  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-time").val ("");
  $("#train-frequency").val("");

  });

  database.ref().on("child_added", function(snapShot) {
    console.log(snapShot.val());

    var trainName = snapShot.val().name;
    var trainDestination = snapShot.val().destination;
    var trainTime = snapShot.val().time;
    var trainFrequency = snapShot.val().frequency;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  });