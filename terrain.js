class Terrain {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.robots = {};
    this.colors = {};
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addRobot(robotId) {
    if (this.robots[robotId]) {
      return `Robot ${robotId} already exists!`;
    }

    if (this.isCellOccupied(0, 0)) {
      return "Starting position is occupied. Please move the existing robot first.";
    }

    const color = this.getRandomColor();
    this.robots[robotId] = { x: 0, y: 0 };
    this.colors[robotId] = color;
    return `Robot ${robotId} added at (0, 0).`;
  }

  moveRobot(robotId, command) {
    if (!this.robots[robotId]) {
      return `Robot ${robotId} does not exist!`;
    }

    const robot = this.robots[robotId];
    const direction = command[0];
    const steps = parseInt(command.slice(1), 10);

    if (isNaN(steps)) {
      return `Invalid command format: ${command}`;
    }

    let newX = robot.x;
    let newY = robot.y;

    for (let i = 0; i < steps; i++) {
      let tempX = newX;
      let tempY = newY;

      if (direction === "N") tempX--;
      if (direction === "S") tempX++;
      if (direction === "E") tempY++;
      if (direction === "W") tempY--;

      if (
        tempX < 0 ||
        tempX >= this.rows ||
        tempY < 0 ||
        tempY >= this.cols ||
        this.isCellOccupied(tempX, tempY)
      ) {
        if (this.isCellOccupied(tempX, tempY)) {
          return `Position already occupied at (${tempX}, ${tempY}).`;
        }
        break;
      }

      newX = tempX;
      newY = tempY;
    }

    if (newX === robot.x && newY === robot.y) {
      return `Robot ${robotId} did not move.`;
    }

    robot.x = newX;
    robot.y = newY;
    return `Robot ${robotId} moved to (${newX}, ${newY}).`;
  }

  isCellOccupied(x, y) {
    return Object.values(this.robots).some(robot => robot.x === x && robot.y === y);
  }
}

module.exports = Terrain;
