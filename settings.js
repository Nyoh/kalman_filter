var settings = new Settings();

function Settings() {
    this.FPS = 30;

    this.backgroundColor = new Color(0, 0, 0);
    this.noiseColor = new Color(255, 255, 255);

    this.noiseLifeTime = 1.5; //seconds
}