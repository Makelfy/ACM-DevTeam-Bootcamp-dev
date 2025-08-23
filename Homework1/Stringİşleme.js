const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function stringChanging() {
  const str = await new Promise((resolve) => {
    readline.question("Bir cümle yazın: ", (input) => resolve(input));
  });

  console.log("Karakter sayısı: " + str.length);
  console.log("Kelime sayısı: " + str.split(" ").length);
  console.log("Ters çevrilmiş hali: " + str.split("").reverse().join(""));

  readline.close();
}

stringChanging();
