var drawer;

function onMouseMove(event) {
    drawer.onMouseMove(event);
}

// Main
$(document).ready(function() {
    drawer = new Drawer();
});

function Drawer()
{
    this.canvas = document.getElementById("kf_canvas");
    this.context = this.canvas.getContext("2d");
    this.noisePoints = new Array();
    this.filter = new KalmanFilter();

    var that = this;
    setTimeout(function(){that.update()}, settings.deltaT);
}

Drawer.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var newPoint = new NoisePoint(x, y);
    this.noisePoints.push(newPoint);
    this.filter.addPoint(newPoint);
}

Drawer.prototype.update = function() {
    var that = this;
    this.noisePoints.forEach(function(point, index) {
        point.update(that.context);
        if (point.timeToDie())
            that.noisePoints.splice(index, 1);
    });

    setTimeout(function(){that.update()}, settings.deltaT);
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.update = function(context) {
    this.color = this.color.gradient(settings.backgroundColor, this.telomere);
    context.fillStyle = this.color.string();
    context.fillRect(this.x, this.y, 2, 2);
    --this.telomere;
}

Point.prototype.timeToDie = function() {
    return this.telomere < 1;
}

NoisePoint.prototype = new Point();
function NoisePoint(x, y)
{
    this.x = Math.floor(Math.random() * settings.noiseXAxis * 2 - settings.noiseXAxis) + x;
    this.y = Math.floor(Math.random() * settings.noiseYAxis * 2 - settings.noiseYAxis) + y;
    this.telomere = settings.inputPointsLifeTime * settings.FPS;
    this.color = settings.inputPointsColor;
}