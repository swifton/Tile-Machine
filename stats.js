var numberOfTilesDropped = 0;
var numberOfLinesDeleted = 0;
var numberOfGamesPlayed = 0;
var totalLinesDeleted = 0;
var totalTilesDropped = 0;

function printStats() {
//  print("Number of tiles dropped in this game:");
//  print(numberOfTilesDropped);
  print("Number of lines deleted in this game:");
  print(numberOfLinesDeleted);
//  print("Average number of tiles:");
//  print(totalTilesDropped * 1.0 / numberOfGamesPlayed);
  print("Average number of lines:");
  print(totalLinesDeleted * 1.0 / numberOfGamesPlayed);
}

function finishGameStats() {
  totalLinesDeleted += numberOfLinesDeleted;
  totalTilesDropped += numberOfTilesDropped;
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