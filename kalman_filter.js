function KalmanFilter()
{
    this.mu = math.matrix([[0], [0], [0], [0]]);
    this.sigma = math.zeros(4, 4);
}

KalmanFilter.prototype.addPoint = function(point)
{
    this.prevMu = this.mu;
    this.prevSigma = this.sigma;

    var velX = point.x - math.subset(this.prevMu, math.index(0, 0));
    var velY = point.y - math.subset(this.prevMu, math.index(1, 0));

    var measurement = math.matrix([[point.x], [point.y], [velX], [velY]]);
    var control = math.zeros(4, 1); // we don't have control

    // Predict
    var mu = math.add(math.multiply(matrixA, this.prevMu), math.multiply(matrixB, control));
    var sigma = math.add(math.multiply(math.multiply(matrixA, this.prevSigma), math.transpose(matrixA)), matrixR);

    // Update
    var S = math.add(math.multiply(math.multiply(matrixC, sigma), math.transpose(matrixC)), matrixQ);
    var K = math.multiply(math.multiply(sigma, math.transpose(matrixC)), math.inv(S));
    var y = math.subtract(measurement, math.multiply(matrixC, mu));

    this.mu = math.add(mu, math.multiply(K, y));
    this.sigma = math.multiply(math.subtract(math.eye(4), math.multiply(K, matrixC)), sigma);
}

KalmanFilter.prototype.getPoint = function()
{
    var x = math.subset(this.mu, math.index(0, 0));
    var y = math.subset(this.mu, math.index(1, 0));
    var prevX = math.subset(this.prevMu, math.index(0, 0));
    var prevY = math.subset(this.prevMu, math.index(1, 0));

    return new KalmanPoint(x, y, prevX, prevY);
}