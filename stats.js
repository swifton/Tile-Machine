var numberOfTilesDropped = 0;
var numberOfLinesDeleted = 0;
var numberOfGamesPlayed = 0;
var totalLinesDeleted = 0;
var totalTilesDropped = 0;
var nOfKeptResults = 10;
var results;

function printStats() {
//  print("Number of tiles dropped in this game:");
//  print(numberOfTilesDropped);
//  print("Number of lines deleted in this game:");
 // print(numberOfLinesDeleted);
//  print("Average number of tiles:");
//  print(totalTilesDropped * 1.0 / numberOfGamesPlayed);
  //print("Average number of lines:");
  //print(totalLinesDeleted * 1.0 / numberOfGamesPlayed);
  //print(numberOfGamesPlayed);
}

function finishGameStats() {
  totalLinesDeleted += numberOfLinesDeleted;
  totalTilesDropped += numberOfTilesDropped;
  saveResults();
}

function newGameStats() {
  numberOfGamesPlayed ++;
  numberOfTilesDropped = 0;
  numberOfLinesDeleted = 0;
}

function resetStats() {
  numberOfGamesPlayed = 0;
  totalLinesDeleted = 0;
  totalTilesDropped = 0;
}

function saveResults() {
  results[numberOfGamesPlayed % nOfKeptResults] = totalLinesDeleted * 1.0 / numberOfGamesPlayed;
}

function countDiscrepancy() {
	var min = results[0];
	var max = results[0];
	
	for (i = 0; i < results.length; i++) {
		if (results[i] > max) {max = results[i]}
		if (results[i] < min) {min = results[i]}
	}
	
	return max - min;
}