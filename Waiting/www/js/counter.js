$( document ).ready(function() {

	var averageTime = 0;
	var peopleGone = 0;
	var peopleWaiting = 0;
	var latestTime;
	var timeA;
	var timeB;
	var timesArray = [];
	var timeSum = 0;

	console.log (timeSum);

	console.log (timesArray);

	// Get the current time and show it to user
	function showCurrentTime (element) {

		var target = $(element);
		document.latestTime = moment().format("HH:mm:ss");
		target.text(document.latestTime);

	}

	// Set the value for the current people waiting in line
	$(".setPeople").click (function () {
		peopleWaiting = $(".currentPeople").val();
		console.log("People Waiting: " + peopleWaiting);

		document.timeA = moment();
	});



	$(".next").click(function () {

		//Reduce People Waiting by 1
		document.peopleWaiting = peopleWaiting--;
		//Update People Waiting value on user form
		$(".currentPeople").val(peopleWaiting);
		console.log (peopleWaiting);

		//Get current time
		document.timeB = moment();

		//Calculate time passed between last ad current person call
		var timeDiff = document.timeB.diff(document.timeA, 'seconds');
		//Add elapsed time value to times array
		timesArray.push(timeDiff);
		console.log ("Elapsed time: " + timeDiff);
		console.log (timesArray);

		//Reset Time A
		document.timeA = moment();

		//Calculate current average time
		// Increment the number of people that finished
		document.peopleGone = peopleGone++;

		// Add the time from the latest person to the total time
		var totalSum = timeSum + timeDiff;

		timeSum = totalSum;

		console.log (totalSum);
		console.log ("Gone: " + peopleGone);
		// Calculate average by dividing the time over the amount of people
		var averageTime = timeSum / peopleGone;

		console.log("Average: " + moment().seconds(averageTime));
		//Send time to User
		$(".average-value").text(averageTime + " segundos.")


		//Calculate When the user will be called
		var howLong = averageTime * peopleWaiting;
		console.log ("howLong: " + howLong);
		var now = moment();
		var finalTime = moment().add(howLong, 's');
		console.log ("Final: " + moment(finalTime).format("HH:mm:ss"));
		//Send estimated time to user
		$(".estimated-time").text(moment(finalTime).format("HH:mm:ss"));


		//Remove hide class to show generated info
		$(".generated-info.hide").removeClass("hide");

		showCurrentTime(".currentTime");
	});

showCurrentTime(".currentTime");


});