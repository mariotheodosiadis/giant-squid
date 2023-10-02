const fs = require("fs");

const processedData = [];
const winningScore = [];
const winningTable = [];
let tempTables;

const drawnNums = [
  1, 76, 38, 96, 62, 41, 27, 33, 4, 2, 94, 15, 89, 25, 66, 14, 30, 0, 71, 21,
  48, 44, 87, 73, 60, 50, 77, 45, 29, 18, 5, 99, 65, 16, 93, 95, 37, 3, 52, 32,
  46, 80, 98, 63, 92, 24, 35, 55, 12, 81, 51, 17, 70, 78, 61, 91, 54, 8, 72, 40,
  74, 68, 75, 67, 39, 64, 10, 53, 9, 31, 6, 7, 47, 42, 90, 20, 19, 36, 22, 43,
  58, 28, 79, 86, 57, 49, 83, 84, 97, 11, 85, 26, 69, 23, 59, 82, 88, 34, 56,
  13,
];

//TODO: some checks optinally!

//Makes sense to check only the affected array and column every time that they might have won
const checkWinningTable = (
  indexArr,
  indexCol,
  newTable,
  originalTable,
  dim = 5
) => {
  let colSum = 0;
  let arrSum = 0;
  let winningScore = 0;

  //check sum of specific array
  for (let i = 0; i < dim; i++) {
    arrSum += newTable[indexArr][i];
  }

  //check sum of specific col
  for (let j = 0; j < dim; j++) {
    colSum += newTable[j][indexCol];
  }
  //found winning array or found winning col
  if (arrSum === dim || colSum === dim) {
    newTable.map((arr, indexArrNew) => {
      arr.map((col, indexColNew) => {
        if (newTable[indexArrNew][indexColNew] === 0) {
          winningScore += originalTable[indexArrNew][indexColNew];
        }
      });
    });
    return (winningScore = winningScore * originalTable[indexArr][indexCol]);
  }

  return null;
};

const main = () => {
  for (i = 0; i < drawnNums.length; i++) {
    processedData[0].map((arr, indexArr) => {
      arr.map((col_, indexCol) => {
        processedData.map((table, index) => {
          if (
            table[indexArr][indexCol] === drawnNums[i] &&
            !winningScore[index]
          ) {
            tempTables[index][indexArr][indexCol] = 1;
            const winningSum = checkWinningTable(
              indexArr,
              indexCol,
              tempTables[index],
              table,
              table.length
            );

            if (winningSum) {
              winningScore[index] = winningSum;
              winningTable.push(index + 1);
            }
          }
        });
      });
    });
  }
};

// breaks the file into 5x5 tables
fs.readFile("dataInput.txt", (err, data) => {
  if (err) {
    throw err;
  }

  const dataArrayString = data.toString().match(/[^\n]+/g);
  const newArr = dataArrayString.map((el) => el.split(" ").filter((n) => n));
  const transformElToNum = newArr.map((arr) => arr.map((el) => Number(el)));

  for (i = 0; i < transformElToNum.length; i += 5) {
    processedData.push(transformElToNum.slice(i, i + 5));
    winningScore.push(0);
  }

  // creates fake empty tables to store 1 or 0
  tempTables = processedData.map((tab) =>
    [...Array(tab.length)].map((e) => Array(tab.length).fill(0))
  );

  main();

  const tableToWin = winningTable[winningTable.length - 1];

  console.log(`WinningTable is the ${tableToWin}nd`);
  console.log("WinningScore:", winningScore[tableToWin - 1]);
});
