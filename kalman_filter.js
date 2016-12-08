function KalmanFilter()
{
    this.currentX = math.matrix([[0], [0], [0], [0]]);
    this.currentP = math.zeros(4, 4);
}

KalmanFilter.prototype.addPoint = function(point)
{
    this.prevX = this.currentX;
    this.prevP = this.currentP;

    var control = math.zeros(4, 1); // we don't have control
    // prediction
    //var X = (matrixA.multiply(this.prevX)).add(matrixB.multiply(control));
    //var P = ((matrixA.multiply(this.prevP)).multiply(matrixA.transpose())).add(Q);



    //var measurement = math.matrix([cur_xPos, cur_yPos, velX, velY]);



}