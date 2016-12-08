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
    var that = this;
    this.noisePoints.forEach(function(point, index) {
        point.update(that.context);
        if (point.timeToDie())
            that.noisePoints.splice(index, 1);
    });

    setTimeout(function(){that.update()}, 1000/settings.FPS);
}

function NoisePoint(x, y)
{
    this.x = x;
    this.y = y;
    this.telomere = settings.noiseLifeTime * settings.FPS;
    this.color = settings.noiseColor;
}

NoisePoint.prototype.update = function(context) {
    this.color = this.color.gradient(settings.backgroundColor, this.telomere);
    context.fillStyle = this.color.string();
    context.fillRect(this.x, this.y, 1, 1);
    --this.telomere;
}

NoisePoint.prototype.timeToDie = function() {
    return this.telomere < 1;
}