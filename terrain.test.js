const Terrain = require("./terrain");

describe("Terrain Robot Simulation", () => {
  let terrain;

  beforeEach(() => {
    terrain = new Terrain(5, 5); // Create a 5x5 grid for testing
  });

  test("should add a new robot at (0, 0)", () => {
    const result = terrain.addRobot("A");
    expect(result).toBe("Robot A added at (0, 0).");
    expect(terrain.robots["A"]).toEqual({ x: 0, y: 0 });
  });

  test("should not add a robot at (0, 0) if already occupied", () => {
    terrain.addRobot("A");
    const result = terrain.addRobot("B");
    expect(result).toBe("Starting position is occupied. Please move the existing robot first.");
  });

  test("should not allow duplicate robot IDs", () => {
    terrain.addRobot("A");
    const result = terrain.addRobot("A");
    expect(result).toBe("Robot A already exists!");
  });

  test("should move a robot to a new position", () => {
    terrain.addRobot("A");
    const result = terrain.moveRobot("A", "E3");
    expect(result).toBe("Robot A moved to (0, 3).");
    expect(terrain.robots["A"]).toEqual({ x: 0, y: 3 });
  });

  test("should stop a robot before a collision", () => {
    terrain.addRobot("A");
    terrain.moveRobot("A", "E3");
    terrain.addRobot("B");
    const result = terrain.moveRobot("B", "E3");
    expect(result).toBe("Position already occupied at (0, 3).");
    expect(terrain.robots["B"]).toEqual({ x: 0, y: 0 });
  });

  test("should not move a robot out of bounds", () => {
    terrain.addRobot("A");
    const result = terrain.moveRobot("A", "E10");
    expect(result).toBe("Robot A moved to (0, 4).");
    expect(terrain.robots["A"]).toEqual({ x: 0, y: 4 });
  });

  test("should return an error for invalid robot ID", () => {
    const result = terrain.moveRobot("C", "E3");
    expect(result).toBe("Robot C does not exist!");
  });

  test("should return an error for invalid commands", () => {
    terrain.addRobot("A");
    const result = terrain.moveRobot("A", "INVALID");
    expect(result).toBe("Invalid command format: INVALID");
  });

  test("should handle no movement if robot does not change position", () => {
    terrain.addRobot("A");
    const result = terrain.moveRobot("A", "N1");
    expect(result).toBe("Robot A did not move.");
    expect(terrain.robots["A"]).toEqual({ x: 0, y: 0 });
  });
});
