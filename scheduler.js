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

// jQuery variables from the HTML
var trainName = $("#train-name").val().trim();
var trainDestination = $("#train-destination").val().trim();
var trainTime = $("#train-time").val().trim();
var trainFrequency = $("#train-frequency").val().trim();

// variable to push inputs to Firebase
var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
};

  // Uploads employee data to the firebase
  database.ref().push(newTrain);

  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-time").val("");
  $("#train-frequency").val("");

  });
// function for referencing items entered into Firebase
  database.ref().on("child_added", function(snapShot) {
    console.log(snapShot.val());

    //establishing variables for items entered into Firebase
    var trainName = snapShot.val().name;
    var trainDestination = snapShot.val().destination;
    var trainTime = snapShot.val().time;
    var trainFrequency = snapShot.val().frequency;
    
    //converts entered train time
    var trainTimeConvert = moment(trainTime, "HH:mm").subtract(1, "years")
    console.log("Here is the train time converted: " + trainTimeConvert);
    
    //calculates difference in time between current time and entered time
    var diffTime = moment().diff(moment(trainTimeConvert), 'minutes');
    console.log("difference in time:" + diffTime)

    var trainRemainder = diffTime%trainFrequency
    console.log(trainRemainder)

    //calculates minutes left until train arrival
    var minutesLeft = trainFrequency - trainRemainder
    console.log(minutesLeft)

    //calculates time until next train
    var nextTrain = moment().add(minutesLeft, 'm').format("HH:mm");
    console.log(nextTrain)
   

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain + " PM"),
    $("<td>").text(minutesLeft),

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  });