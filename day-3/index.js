import fs from "fs";

const hasSymbol = (str) => {
  if (str?.length && str.split("").find((x) => isNaN(x) && x !== ".")) {
    return true;
  } else {
    return false;
  }
};

function partOne(path) {
  const text = fs
    .readFileSync(path, "utf-8")
    .trim()
    .split("\n")
    .filter((n) => n);

  const rows = text.length;
  const cols = text[0].length;

  let founds = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const n = text[i][j].toString();

      if (isNaN(n)) continue;

      let num = n;
      while (++j < rows) {
        if (Number.isInteger(parseInt(text[i][j]))) {
          num += text[i][j];
        } else {
          break;
        }
      }

      const top =
        i === 0 ? "" : text[i - 1].substring(j - num.length - 1, j + 1);
      const bottom =
        i === rows - 1 ? "" : text[i + 1].substring(j - num.length - 1, j + 1);
      const left = text[i][j - num.length - 1] || "";
      const right = text[i][j] || "";

      if (
        hasSymbol(top) ||
        hasSymbol(bottom) ||
        hasSymbol(right) ||
        hasSymbol(left)
      ) {
        founds.push(Number(num));
      }
    }
  }
  return founds.reduce((a, c) => a + c, 0);
}

// Example usage with the provided engine schematic
const result = partOne("./input.txt");
console.log(result);
