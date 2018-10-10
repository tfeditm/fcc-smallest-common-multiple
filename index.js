// SMALLEST COMMON MULTIPLE

// In my code, I find the smallest common multiple 
// by prime factorization. First, I write all numbers 
// in the array as a product of prime numbers. Then 
// I multiply the highest power of each prime number together. 
// This product will be the smallest common multiple.

function smallestCommons(arr) {

  let max = Math.max(arr[0], arr[1]);
  let min = Math.min(arr[0], arr[1]);
  let nums = [(min === 1) ? min + 1 : min];
  let lastNum = () => nums[nums.length - 1];
  let smallestCommons = [];
  let primes = [];
  let num = 2;

  // Collect the numbers between min and max in nums array
  while(lastNum() < max) {
    nums.push(lastNum() + 1);
  }

  // Collect the prime numbers from 2 to max in primes array
  while(num <= max) {
    let isPrime = true;
    for(let divider = 2; divider <= num / 2; divider++) {
      if(num % divider === 0) {
        isPrime = false;
      }
    }
    if(isPrime) {
      primes.push(num);
    }
    num++;
  }
  
  // The smallestCommons array collects each prime number 
  // and its highest exponent in a separate object.
  smallestCommons = nums.reduce((powers, num) => {
    
    primes.forEach(prime => {
      let expoCounter = 0;
      while(num % prime === 0) {
        expoCounter++;
        
        if(powers.every(power => power.base !== prime)) {
          powers.push({base: prime, expo: 1});
        } else {
          powers.forEach(power => {
            if(power.base === prime && expoCounter > power.expo) {
              power.expo = expoCounter;
            }
          })
        }
        num = num / prime;
      }
    })
    return powers;
  }, [])
  
  // Multiply the prime powers together
  return smallestCommons.reduce((sum, power) => {
    sum *= Math.pow(power.base,power.expo);
    return sum;
  }, 1)

}

// smallestCommons([1, 5]) should return a number.
// smallestCommons([1, 5]) should return 60.
// smallestCommons([5, 1]) should return 60.
// smallestCommons([2, 10]) should return 2520.
// smallestCommons([1, 13]) should return 360360.
// smallestCommons([23, 18]) should return 6056820.