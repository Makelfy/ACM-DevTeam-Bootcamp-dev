const randomNumber = Math.floor(Math.random() * 100) + 1;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function numberGuessingGame() {
  while (true) {
    const userGuess = await new Promise((resolve) => {
      readline.question("1-100 arası sayı girin: ", (input) => resolve(input));
    });
    if (userGuess == randomNumber) {
      console.log("Tebrikler sayıyı doğru bildiniz!");
      break;
    } else if (userGuess < randomNumber) {
      console.log("⬆ Daha yüksek bir sayı tahmin edin.");
    } else if (userGuess > randomNumber) {
      console.log("⬇ Daha düşük bir sayı tahmin edin");
    }
  }
  readline.close();
}

numberGuessingGame();
