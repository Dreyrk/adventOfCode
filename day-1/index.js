import fs from "fs";

const numberRegExp = new RegExp(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].join(
    "|"
  ),
  "g"
);

function partOne(path) {
  const text = fs.readFileSync(path, "utf-8");
  const lines = text.trim().split("\n");
  const result = lines.map((line) => {
    const firstDigit = line.split("").find((el) => !Number.isNaN(parseInt(el)));
    const lastDigit = line
      .split("")
      .findLast((el) => !Number.isNaN(parseInt(el)));
    return parseInt(firstDigit + lastDigit);
  });
  return result.reduce((c, n) => c + n);
}

function isDigit(char) {
  return /^\d$/.test(char);
}

function partTwo(path) {
  const text = fs.readFileSync(path, "utf-8");
  const lines = text.trim().split("\n");
  let sum = 0;

  for (const line of lines) {
    let digits = [];

    for (let i = 0; i < line.length; i++) {
      const c = line[i];

      if (isDigit(c)) {
        digits.push(c);
      }

      const textDigits = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      const lineSubstring = line.substring(i);
      for (let d = 0; d < textDigits.length; d++) {
        const textDigit = textDigits[d];
        if (lineSubstring.startsWith(textDigit)) {
          digits.push(d + 1);
        }
      }
    }

    const lastIndex = digits.length - 1;
    const twoDigits = `${digits[0]}${digits[lastIndex]}`;

    sum += Number(twoDigits);
  }
  return sum;
}

console.log(partTwo("./input.txt"));
