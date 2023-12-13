import fs from "fs";

const colorRef = { red: 12, green: 13, blue: 14 };

function partOne(path) {
  let result = 0;
  const text = fs.readFileSync(path, "utf-8");
  const lines = text.trim().split("\n");
  for (const line of lines) {
    let ok = true;
    const [id, subLine] = line.split(":");
    const games = subLine.split(";");
    for (const game of games) {
      const event = game.split(",");
      for (const balls of event) {
        const [n, color] = balls.trim().split(" ");
        if (parseInt(n) > colorRef[color]) {
          ok = false;
        }
      }
    }
    if (ok) {
      result += parseInt(id.trim().split(" ")[1]);
    }
  }
  console.log(result);
}
function partTwo(path) {
  const text = fs.readFileSync(path, "utf-8");
  const lines = text.trim().split("\n");
  return lines
    .map((line) => {
      const maxCount = {
        red: 0,
        blue: 0,
        green: 0,
      };
      line
        .split(": ")[1]
        .split("; ")
        .forEach((set) => {
          const pulls = set.split(", ");
          return pulls.forEach((pull) => {
            const [count, color] = pull.split(" ");
            if (maxCount[color] < Number(count)) {
              maxCount[color] = Number(count);
            }
          });
        });
      return maxCount.red * maxCount.green * maxCount.blue;
    })
    .reduce((a, b) => a + b);
}

console.log(partTwo("./input.txt"));
