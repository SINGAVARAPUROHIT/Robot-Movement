# Robot-Movement
Here's a README file for project:
---------

This project simulates the movement of robots on a grid based on user input. The robots can be added to the grid, moved in different directions, and avoid collisions with other robots. The grid size and robot movement instructions can be specified by the user.

## Running the Project

### 1. Open `index.html`

To start the project, open the `index.html` file in a web browser:

1. **Open the project folder** in your browser.
2. **Double-click** the `index.html` file to launch it.

### 2. Input the Grid Size

- Enter the number of rows and columns for your grid in the **Grid Size** input field.
- Click on the **Create Grid** button to generate the grid.

### 3. Add a Robot

- In the **Robot ID** input field, provide a unique name (ID) for the robot.
- Click on the **Add Robot** button to place the robot at the starting position `(0, 0)` on the grid.
- If the starting position is already occupied, a message will appear indicating that the starting position is occupied, and you will not be able to add a new robot until the position is cleared.

### 4. Move a Robot

- In the **Command** input field, provide the movement direction and steps for the robot, e.g., `N3` (move 3 steps North).
  - Directions:
    - `N` for North
    - `S` for South
    - `E` for East
    - `W` for West
- Click the **Move Robot** button to move the robot based on the input. If the destination position is occupied or out of bounds, the robot will stop at the previous position, and an appropriate message will appear.

### Features:
- Only one robot can be added to the starting position `(0, 0)` at a time.
- Robots cannot move into a cell occupied by another robot.
- The grid size is dynamic and can be specified by the user.

---

## Unit Testing with Jest

This project includes unit tests for the core logic using **Jest**.

### 1. Install Jest

To run the tests, you must first install Jest as a development dependency. In your project directory, run the following command:

```bash
npm install jest --save-dev
```


### 2. If there is no `package.json` file:

   **Initialize `package.json`:**
   - If you don’t already have a `package.json` file in your project, you can create it by running the following command in your project directory:
     ```bash
     npm init -y
     ```
   - This will generate a default `package.json` file with basic configuration.

### 3. Run the Tests

To run the tests, use the following command:

```bash
npm test
```

This will execute the test cases defined in the `terrain.test.js` file and output the results to the console.

---

## Test Cases

The unit tests verify the following functionalities:

1. **Adding Robots:**
   - Adding a robot to the grid.
   - Checking if the starting position `(0, 0)` is occupied.
   - Preventing duplicate robot IDs.

2. **Moving Robots:**
   - Moving robots in different directions (`N`, `S`, `E`, `W`).
   - Preventing movement into occupied cells.
   - Ensuring robots do not move out of bounds.
   - Handling invalid robot IDs and commands.

3. **Edge Cases:**
   - Checking for no movement if the robot is unable to move.
   - Preventing collisions when multiple robots are added.




