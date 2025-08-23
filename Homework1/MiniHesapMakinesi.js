const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function calculator() {
  try {
    const num1 = await new Promise((resolve) => {
      readline.question("Birinci sayıyı girin: ", (num) =>
        resolve(parseFloat(num))
      );
    });

    const num2 = await new Promise((resolve) => {
      readline.question("İkinci sayıyı girin: ", (num) =>
        resolve(parseFloat(num))
      );
    });

    const operator = await new Promise((resolve) => {
      readline.question("Bir işlem girin (+, -, *, /): ", (op) => resolve(op));
    });

    let result;
    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      if (num2 === 0) {
        throw new Error("Bölen sıfır olamaz!");
      }
      result = num1 / num2;
    } else {
      throw new Error("Geçersiz işlem!");
    }

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        switch (num2) {
          case 0:
            throw new Error("Bölen sıfır olamaz!");
          default:
            result = num1 / num2;
            break;
        }
        break;
      default:
        throw new Error("Geçersiz işlem!");
    }

    console.log(`Sonuç: ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    readline.close();
  }
}

calculator();
