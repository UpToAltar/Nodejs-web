export const  generateRandomNumbers = (min, max) => {
  var numbers = [];

  // Tạo mảng chứa các số từ min đến max
  for (var i = min; i <= max; i++) {
    numbers.push(i);
  }

  var randomNumbers = [];

  // Chọn ngẫu nhiên 6 số từ mảng và đưa vào mảng randomNumbers
  for (var j = 0; j < 6; j++) {
    var randomIndex = Math.floor(Math.random() * numbers.length);
    var randomNumber = numbers[randomIndex];

    // Hoán đổi số ngẫu nhiên được chọn với phần tử cuối cùng trong mảng
    numbers[randomIndex] = numbers[numbers.length - 1];
    numbers.pop();

    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

