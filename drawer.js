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

    var that = this;
    setTimeout(function(){that.update()}, 1000/settings.FPS);
}

Drawer.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var newPoint = new NoisePoint(x, y);
    this.noisePoints.push(newPoint);
}

Drawer.prototype.update = function() {
    this.noisePoints.forEach(function(point, index) {
        point.update(this.context);
        if (point.timeToDie())
            this.noisePoints.splice(index, 1);
    });

    var that = this;
    setTimeout(function(){that.update()}, 1000/settings.FPS);
}

function NoisePoint(x, y)
{
    this.x = x;
    this.y = y;
    this.telomere = settings.noiseLifeTime * settings.FPS;
    this.gradient = new Gradient(settings.noiseColor, settings.backgroundColor, this.telomere);
}

NoisePoint.prototype.update = function(context) {
    context.fillStyle = this.gradient.color();
    context.fillRect(this.x, this.y, 1, 1);
}

NoisePoint.prototype.timeToDie = function() {
    return this.telomere == 0;
}