var numberOfTilesDropped = 0;
var numberOfLinesDeleted = 0;
var numberOfGamesPlayed = 0;
var totalLinesDeleted = 0;
var totalTilesDropped = 0;

function printStats() {
  p("Number of tiles dropped in this game:");
  p(numberOfTilesDropped);
  p("Number of lines deleted:");
  p(numberOfLinesDeleted);
  p("Average number of tiles:");
  p(totalTilesDropped * 1.0 / numberOfGamesPlayed);
  p("Average number of lines:");
  p(totalLinesDeleted * 1.0 / numberOfGamesPlayed);
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