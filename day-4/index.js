import fs from "fs";

function partOne(path) {
  const text = fs.readFileSync(path, "utf-8").trim().split("\n");

  const input = text.map((str) => str.replace(/  /g, " 0"));

  const result = input.reduce((acc, row) => {
    const [, cards] = row.split(": ");
    const [winners, myCards] = cards.split(" | ");

    const point = myCards
      .split(" ")
      .filter((card) => winners.includes(card)).length;

    const value = point === 0 ? 0 : Math.pow(2, point - 1);

    return acc + value;
  }, 0);
  return result;
}

const resultOne = partOne("./input.txt");
console.log(resultOne);
