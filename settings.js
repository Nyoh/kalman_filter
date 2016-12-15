var settings = new Settings();

function Settings() {
    this.FPS = 30;
    this.deltaT = 1000.0 / this.FPS;

    this.backgroundColor = new Color(0, 0, 0);
    this.inputPointsColor = new Color(255, 255, 255);
    this.inputPointsLifeTime = 1.5; //seconds
    this.noiseXAxis = 20; //input point is a random number in that range around actual value
    this.noiseYAxis = 20; //input point is a random number in that range around actual value

    this.kalmanPointsColor = new Color(100, 255, 100);
    this.kalmanPointsLifeTime = 1.5; //seconds
}

var matrixA = math.matrix([
    [1, 0, settings.deltaT, 0],
    [0, 1, 0, settings.deltaT],
    [0, 0, 1, 0],
    [0, 0, 0, 1]]);  // transition model

var matrixB = math.eye(4); // control-input model

var matrixR = math.matrix([
    [0.1, 0, 0, 0],
    [0, 0.1, 0, 0],
    [0, 0, 0.1, 0],
    [0, 0, 0, 0.1]]);; // covariance

var matrixC = math.matrix([
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1]]); // measurement

var matrixQ = math.matrix([
    [0.001, 0, 0, 0],
    [0, 0.001, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]]); // sensor noise