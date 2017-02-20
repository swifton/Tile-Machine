var challengePassed = 0;
var highestSolvedChallenge = 0;

function drawChallenges() {
	clear();
	drawButtons(challengeButtons, highestSolvedChallenge + 5);
	drawButtons(challengeLabelButtons, highestSolvedChallenge + 4);
	
	if (challengePassed == 1) {drawLabel("Passed", 10, 30, "green");}
	if (challengePassed == -1) {drawLabel("Failed", 10, 30, "red");}
	if (challengePassed == 2) {drawLabel("Testing...", 10, 30);}
}

var challengeLabelButtons = [];
var challengeButtons = [];

function setupChallengeButtons() {
	var paramsOfChallenges = [
		new challengeParams([0], 50000, 1000, 0),
		new challengeParams([4], 50000, 1000, 0),
		new challengeParams([1], 50000, 1000, 0),
		new challengeParams([0, 4], 50000, 100, 0),
		new challengeParams([0, 4], 50000, 1000, 0),
		new challengeParams([2, 3], 50000, 1, 1),
		new challengeParams([5, 6], 50000, 10, 1)
	];
	
	var backButton = new button("Back", CANVAS_WID - 80, 13 , 65, 19, function () {mode = 'programming'; challengePassed = 0;})
	
	challengeButtons.push(backButton);
	
	for (var i = 0; i < paramsOfChallenges.length; i++) {
		paramsOfChallenges[i].nOfChallenge = i;
		var partOfLabel = '';
		switch (paramsOfChallenges[i].challengeMode) {
			case 0:	 
				partOfLabel = " on average ";
				break;
			case 1:	 
				partOfLabel = " in the worst case ";
				break;
			case 2:	 
				partOfLabel = " in the best case ";
				break;
		}
		var tetrominoLabel = '';
		for (var j = 0; j < paramsOfChallenges[i].tetrominoes.length; j++) {tetrominoLabel += figureLabels[paramsOfChallenges[i].tetrominoes[j]] + ", ";}
		tetrominoLabel = tetrominoLabel.slice(0, tetrominoLabel.length - 2);
		var currentLabel = "Make a program that runs for at least " +  paramsOfChallenges[i].targetGameLent.toString() + " rows" + partOfLabel + "with " + tetrominoLabel + " tetromino";
		currentLabel += paramsOfChallenges[i].tetrominoes.length > 1? "es." : ".";
		challengeLabelButtons.push(new button(currentLabel, 10, 10 + 30 * (i + 1), CANVAS_WID - 20, 25, null));
		challengeButtons.push(new button("test", CANVAS_WID - 80, 13 + 30 * (i + 1), 65, 19, function (par) {challengePassed = 2; drawChallenges(); setTimeout(function() {runChallenge(par)}, 1);}, paramsOfChallenges[i]));
		if (localStorage.getItem("challenge " + i.toString()) == "1") {challengeLabelButtons[i].color = "green"; highestSolvedChallenge = i;}
	}
}

function challengeParams(tetrominoes, lentOfGame, targetGameLent, challengeMode) {
	this.tetrominoes = tetrominoes;
	this.lentOfGame = lentOfGame;
	this.targetGameLent = targetGameLent;
	this.nOfChallenge = null;
	this.challengeMode = challengeMode; // 0 - on average, 1 - minimum, 2 - maximum
}

function runChallenge(params) {
	sampleSize = params.lentOfGame;
	allowedFigures = params.tetrominoes;
	savedGames = [];
	gamePaused = true;
	results = [];
	
	for (i = 0; i < nOfKeptResults; i++) {  // This can introduce errors, if the number of games is smaller than the length of this array.
		results.push(0);
	} 
  
	newGame();
	resetStats();
	
	veryFastGameLoop(true);
	
	switch (params.challengeMode) {
		case 0: 
			if (averageNumberOfLinesDeleted > params.targetGameLent) {markChallengeSolved(params.nOfChallenge)}
			else {challengePassed = -1;}
			break;
			
		case 1: 
			if (minNumberofLinesDeleted > params.targetGameLent) {markChallengeSolved(params.nOfChallenge)}
			else {challengePassed = -1;}
			break;
			
		case 2: 
			if (maxNumberofLinesDeleted > params.targetGameLent) {markChallengeSolved(params.nOfChallenge)}
			else {challengePassed = -1;}
			break;
	}
	
	sampleSize = defaultSampleSize;
	drawChallenges();
}

function markChallengeSolved(numberOfChallenge) {
	challengePassed = 1; 
	challengeLabelButtons[numberOfChallenge].color = "green"; 
	localStorage.setItem("challenge " + numberOfChallenge.toString(), "1");
	if (highestSolvedChallenge < numberOfChallenge + 1) {highestSolvedChallenge = numberOfChallenge + 1;}
}


