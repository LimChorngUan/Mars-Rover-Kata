/******************************************************************************
 
There are three rovers now discovering the Mars.
Use roverCommand(command) to send command to the rovers, each rover will take
turn to move.
f: move forward
b: move backward
l: turn left
r: turn right

********************************************************************************/

/* Rover Object
direction contains one of the four values: N, S, E, W
x and y are coordinates
*******************************************/
var rover1 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

var rover2 = {
  direction: "N",
  x: 5,
  y: 5,
  travelLog: []
};

var rover3 = {
  direction: "N",
  x: 5,
  y: 6,
  travelLog: []
};

var rovers = [rover1, rover2, rover3];
var roverNumber = 0; // rovers take turns to move

// Setting the grid
// To create a 10 x 10 grid, the maximum x and y coordinates will be 9
var minCoordinate = 0;
var maxCoordinate = 9;

// Generate random obstacle
var numObstacle = 5;
var obstaclePositions = [];
var obstacleX, obstacleY;

for (var j = 0; j < numObstacle; j++) {
  obstacleX = Math.floor(Math.random() * (maxCoordinate + 1));
  obstacleY = Math.floor(Math.random() * (maxCoordinate + 1));
  // check if obstacle crash with rover's initial position
  for (var m = 0; m < rovers.length; m++) {
    if (obstacleX === rovers[m].x && obstacleY === rovers[m.y]) {
      continue;
    }
  }
  obstaclePositions.push([obstacleX, obstacleY]);
}

// Console log rover's initial position and obstacles position
console.log("Rover-1 Initial Position: (" + rover1.x + "," + rover1.y + ")");
console.log("Rover-2 Initial Position: (" + rover2.x + "," + rover2.y + ")");
console.log("Rover-3 Initial Position: (" + rover3.x + "," + rover3.y + ")");

console.log("Obstacles Position: ");
obstaclePositions.forEach(obstacle => {
  console.log("(" + obstacle[0] + "," + obstacle[1] + ")");
});

/* Rover turn to left
 *************************************/
function turnLeft(rover) {
  console.log("Rover is turning to its left");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  facingDirection(rover.direction);
}

/* Rover turn to right
 *************************************/
function turnRight(rover) {
  console.log("Rover is turning to its right");
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  facingDirection(rover.direction);
}

/* Check if there's obstacle
return true if there's obstacle, false if it's clear
 *************************************/
function bumpObstacle(x, y) {
  for (var i = 0; i < obstaclePositions.length; i++) {
    if (x === obstaclePositions[i][0] && y === obstaclePositions[i][1]) {
      return true;
    }
  }
  return false;
}

/* Check if the rover will bump into another rover
return true if there's collision, false if it's clear
 *************************************/
function bumpRover(x, y) {
  for (var i = 0; i < rovers.length; i++) {
    if (x === rovers[i].x && y === rovers[i].y) {
      return true;
    }
  }
  return false;
}

/* Check rover's moving situation
whether it has reached boudaries, obstacle, or can it proceed
 *************************************/
function checkRover(x, y, fOrB, rover) {
  if (
    x < minCoordinate ||
    x > maxCoordinate ||
    y < minCoordinate ||
    y > maxCoordinate
  ) {
    boundaryWarn(rover.direction);
  } else if (bumpObstacle(x, y)) {
    console.log(
      "Warning! There's an obstacle ahead at position: (" + x + "," + y + ")"
    );
  } else if (bumpRover(x, y)) {
    console.log(
      "Warning! Rover will bump into another rover at position: (" +
        x +
        "," +
        y +
        ")"
    );
  } else {
    if (fOrB === "f") {
      console.log("Rover is moving forwards");
    } else if (fOrB === "b") {
      console.log("Rover is moving backwards");
    }
    rover.x = x;
    rover.y = y;
  }
  console.log("Rover's current position: (" + rover.x + "," + rover.y + ")");
  rover.travelLog.push("(" + rover.x + "," + rover.y + ")");
}

/* Rover moving forwards
 *************************************/
function moveForwards(rover) {
  var x = rover.x;
  var y = rover.y;

  switch (rover.direction) {
    case "N":
      y--;
      break;
    case "E":
      x++;
      break;
    case "S":
      y++;
      break;
    case "W":
      x--;
      break;
  }

  checkRover(x, y, "f", rover);
}

/* Rover moving backwards
 *************************************/
function moveBackwards(rover) {
  var x = rover.x;
  var y = rover.y;

  switch (rover.direction) {
    case "S":
      y--;
      break;
    case "W":
      x++;
      break;
    case "N":
      y++;
      break;
    case "E":
      x--;
      break;
  }

  checkRover(x, y, "b", rover);
}

/* Rover's Command
r: turn Right
l: turn Left
f: move Forwards
b: mover Backwards
 *************************************/
function roverCommand(command) {
  var roverNo = roverNumber + 1;
  console.log("*********************************************");
  console.log("Current moving rover: Rover-" + roverNo);
  console.log("*********************************************");

  for (var i = 0; i < command.length; i++) {
    switch (command[i]) {
      case "l":
        turnLeft(rovers[roverNumber]);
        break;
      case "r":
        turnRight(rovers[roverNumber]);
        break;
      case "f":
        moveForwards(rovers[roverNumber]);
        break;
      case "b":
        moveBackwards(rovers[roverNumber]);
        break;
      default:
        console.log("no such command");
    }
  }
  console.log("Rover's travellog: " + rovers[roverNumber].travelLog);

  // The next rover's turn
  if (roverNumber === 2) {
    roverNumber = 0;
  } else {
    roverNumber++;
  }
}

/* roverDirection, facingDirection, BoundaryWarn
are all messages that will be printed 
*******************************************/
function roverDirection(directionSymbol) {
  var directionWord = "";

  switch (directionSymbol) {
    case "N":
      directionWord = "North";
      break;
    case "W":
      directionWord = "West";
      break;
    case "S":
      directionWord = "South";
      break;
    case "E":
      directionWord = "East";
      break;
  }

  return directionWord;
}

// Message about rover's facing direction
function facingDirection(direction) {
  var roverFace = roverDirection(direction);
  console.log("Rover is now facing: " + roverFace);
}

// Warning message when reaching boundary
function boundaryWarn(direction) {
  var roverFace = roverDirection(direction);
  console.log("Reach boundary, there's no way to move towards " + roverFace);
}
