var config = {
    apiKey: "AIzaSyDhOFTjm1v-Izy53HkAtj5nU2QhSlSByGc",
    authDomain: "traintime-c0d9c.firebaseapp.com",
    databaseURL: "https://traintime-c0d9c.firebaseio.com",
    projectId: "traintime-c0d9c",
    storageBucket: "traintime-c0d9c.appspot.com",
    messagingSenderId: "555895340434"
};

firebase.initializeApp(config);


var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {
        name: trainName,
        destination: destinationName,
        firstTrain: firstTrain,
        frequency: frequency
    };


    console.log(newTrain);


    database.ref().push(newTrain);




    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");


    return false;

});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {


    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrain);
    console.log(frequency);


    var now = moment();

    console.log("The current time is " + moment(now).format("HH:mm"));


    var firstTrainTime = moment.unix(firstTrain).format("HH:mm");

    console.log("The first train is at " + firstTrainTime);

    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");

    var Remainder = diffTime % frequency;

    var minutesAway = frequency - Remainder;
    console.log("The next train is " + minutesAway + " minutes away");

    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("The next train arrives at " + nextArrival);

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
        frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway);
});
