class Terrain {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.robots = {};
    this.colors = {};
    this.terrainElement = document.getElementById("terrain");
    this.initializeGrid();
  }

  initializeGrid() {
    this.terrainElement.innerHTML = "";
    this.terrainElement.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
    this.terrainElement.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
        this.terrainElement.appendChild(cell);
      }
    }
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
    this.renderRobot(robotId);
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

      // Stop if out of bounds or cell is occupied
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

    // Update robot's position if valid
    if (newX === robot.x && newY === robot.y) {
      return `Robot ${robotId} did not move.`;
    }

    robot.x = newX;
    robot.y = newY;
    this.renderRobot(robotId);
    return `Robot ${robotId} moved to (${newX}, ${newY}).`;
  }

  isCellOccupied(x, y) {
    return Object.values(this.robots).some(robot => robot.x === x && robot.y === y);
  }

  renderRobot(robotId) {
    // Remove previous robot rendering
    document.querySelectorAll(`.robot[data-id="${robotId}"]`).forEach(el => el.remove());

    const robot = this.robots[robotId];
    const cell = document.querySelector(`.cell[data-row="${robot.x}"][data-col="${robot.y}"]`);

    if (cell) {
      const robotElement = document.createElement("div");
      robotElement.className = "robot";
      robotElement.dataset.id = robotId;
      robotElement.textContent = robotId;
      robotElement.style.backgroundColor = this.colors[robotId];
      cell.appendChild(robotElement);
    }
  }
}

let terrain;

document.getElementById("create-grid").addEventListener("click", () => {
  const gridSize = parseInt(document.getElementById("grid-size").value, 10);
  if (!gridSize || gridSize < 3) {
    alert("Please enter a valid grid size (minimum 3).");
    return;
  }
  terrain = new Terrain(gridSize, gridSize);
  document.getElementById("controls").style.display = "block";
});

document.getElementById("add-robot").addEventListener("click", () => {
  const robotId = document.getElementById("robot-id").value.trim();
  if (!robotId) {
    alert("Robot ID cannot be empty.");
    return;
  }
  const result = terrain.addRobot(robotId);
  alert(result);
});

document.getElementById("move-robot").addEventListener("click", () => {
  const robotId = document.getElementById("robot-id").value.trim();
  const command = document.getElementById("command").value.trim();
  if (!robotId || !command) {
    alert("Robot ID and Command cannot be empty.");
    return;
  }
  const result = terrain.moveRobot(robotId, command);
  alert(result);
});
