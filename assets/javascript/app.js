//my train's Firebase configuration//
var firebaseConfig = {
    apiKey: "AIzaSyCORmPAbeMNwYdwZR4oZLJYp1pDkZZdjsI",
    authDomain: "train-scheduler-149fb.firebaseapp.com",
    databaseURL: "https://train-scheduler-149fb.firebaseio.com",
    projectId: "train-scheduler-149fb",
    storageBucket: "train-scheduler-149fb.appspot.com",
    messagingSenderId: "324967098074",
    appId: "1:324967098074:web:553098649707f0b06267e3",
    measurementId: "G-98D95FHWTB"
  };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 

 //variable to reference the database//
 var database = firebase.database();

 // form values//
var trainName;
var destination;
var firstTrain;
var frequency = 0;

//create a button to add an additional train//
$("#add-train").on("click", function (event) {
    event.preventDefault();

  // obtain the user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = $("#train-time-input").val().trim();
  var trainFequency = $("#frequency-input").val().trim();

  // creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTrainTime,
    frequency: trainFequency
  };

  // send the train data to firebase
  database.ref().push(newTrain);

  // logs all info to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // clears all of the text-boxes after user submits input
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {

//change the date to reflect a year prior to present time
var firstTrainTime = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");

// difference between the current time and first train time
var timeDiff = moment().diff(moment(firstTrainTime), "minutes");

//calculate difference between first train arrival and current time
var remainder = timeDiff % frequency;

//time until next train arrival
var minutesAway = trainFrequency - remainder;

//time until next train arrival
var nextTrain = moment().add(minutesAway, "minutes");

//add a new row for the next user's input
var newRow = $("<tr>").append(
    $("<td>").text(childSnapshot.val().trainName),
    $("<td>").text(childSnapshot.val().destination),
    $("<td>").text(childSnapshot.val().frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );
  $(".table tbody").append(newRow);

});
