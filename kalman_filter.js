function KalmanFilter()
{
    this.mu = math.matrix([[0], [0], [0], [0]]);
    this.sigma = math.zeros(4, 4);
}

KalmanFilter.prototype.addPoint = function(point)
{
    this.prevMu = this.mu;
    this.prevSigma = this.sigma;

    var control = math.zeros(4, 1); // we don't have control

    // Predict
    var mu = (matrixA.multiply(this.prevMu)).add(matrixB.multiply(control));
    var sigma = ((matrixA.multiply(this.prevSigma)).multiply(matrixA.transpose())).add(matrixR);

    // Update
    var S = ((matrixC.multiply(sigma)).multiply(matrixC.transpose())).add(matrixQ);
    var K = (sigma.multiply(matrixC.transpose())).multiply(S.inverse());
    //var z = math.matrix([[point.x], [point.y], [point.x - math.subset(this.prevMu], [velY]]);



}