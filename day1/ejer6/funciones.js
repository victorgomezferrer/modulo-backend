function factorial(n){
  let numFinal = 1;
  if (n == 0 || n == 1){
    return numFinal;
  }
  else if(n > 1){
    for(var i = n; i >= 1; i--){
      numFinal = numFinal * i;
    }
    return numFinal;
  }
}

module.exports = factorial