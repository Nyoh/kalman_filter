function Color(r, g, b)
{
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.string = function() {
    return 'rgb(' + Math.round(this.r) + ',' + Math.round(this.g) + ',' + Math.round(this.b) + ')';
}

Color.prototype.gradient = function(endColor, telomere) {
    if (telomere < 1)
        return endColor;

    var r = (endColor.r - this.r) / telomere + this.r;
    var g = (endColor.g - this.g) / telomere + this.g;
    var b = (endColor.b - this.b) / telomere + this.b;

    return new Color(r, g, b);
}
