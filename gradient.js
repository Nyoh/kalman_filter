function Gradient(startColor, endColor, colorCount)
{
    this.currentColor = startColor;
    this.endColor = endColor;
    this.telomere = colorCount;
    if (this.telomere < 1)
        this.telomere = 1;
}

Gradient.prototype.color = function() {
    var result = this.currentColor;

    this.currentColor.red = ((this.endColor.red - this.currentColor.red) / this.telomere) + this.currentColor.red;
    this.currentColor.green = ((this.endColor.green - this.currentColor.green) / this.telomere) + this.currentColor.green;
    this.currentColor.blue = ((this.endColor.blue - this.currentColor.blue) / this.telomere) + this.currentColor.blue;
    if (this.telomere > 1)
        --this.telomere;

    return result;
}