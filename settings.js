var settings = new Settings();

function Settings() {
    this.FPS = 30;

    this.backgroundColor = new Color(0, 0, 0);
    this.inputPointsColor = new Color(255, 255, 255);
    this.inputPointsLifeTime = 1.5; //seconds
    this.noiseXAxis = 10; //input point is a random number in that range around actual value
    this.noiseYAxis = 10; //input point is a random number in that range around actual value
}