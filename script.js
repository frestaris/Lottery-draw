const drawButton = document.getElementById("drawButton");
const drawnNumbersText = document.getElementById("drawnNumbers");
let selectedNumbers = [];
const modal = document.getElementById("myModal");
const modalMessage = document.getElementById("modalMessage");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

// click 5 numbers event

document.addEventListener("DOMContentLoaded", function () {
  const numbers = document.querySelectorAll("#numberTable td");
  let clickedCount = 0;
  let selectedNumbers = [];

  numbers.forEach((number) => {
    number.addEventListener("click", function () {
      if (this.classList.contains("clicked")) {
        this.classList.remove("clicked");
        clickedCount--;
        selectedNumbers = selectedNumbers.filter(
          (num) => num !== this.textContent
        );
      } else if (clickedCount < 5) {
        this.classList.add("clicked");
        clickedCount++;
        selectedNumbers.push(this.textContent);
      }
    });
  });
});

drawButton.addEventListener("click", () => {
  if (selectedNumbers.length !== 5) {
    alert("Please select 5 numbers before drawing");
    return;
  }
  const drawnNumbers = [];
  for (let i = 0; i < 5; i++) {
    let randomNumber;
    do {
      randomNumber = generateRandomNumber();
    } while (drawnNumbers.includes(randomNumber));
    drawnNumbers.push(randomNumber);
  }
  drawnNumbersText.textContent = drawnNumbers.join(", ");
  drawnNumbersText.style.display = "block"; // Show the drawn numbers paragraph

  // Check if selectedNumbers match drawnNumbers
  const sortedSelectedNumbers = selectedNumbers.slice().sort();
  const sortedDrawnNumbers = drawnNumbers.slice().sort();
  const matchedNumbers = sortedSelectedNumbers.filter((num) =>
    sortedDrawnNumbers.includes(num)
  );

  showModal(matchedNumbers, drawnNumbers);
});

function generateRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

// Add event listener to each number cell
const numberCells = document.querySelectorAll("#numberTable td");
numberCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const number = parseInt(cell.textContent);
    if (selectedNumbers.includes(number)) {
      const index = selectedNumbers.indexOf(number);
      selectedNumbers.splice(index, 1);
      cell.classList.remove("selected");
    } else if (selectedNumbers.length < 5) {
      selectedNumbers.push(number);
      cell.classList.add("selected");
    }
  });
});

// show modal
function showModal(matchedNumbers, drawnNumbers) {
  const sortedMatchedNumbers = matchedNumbers.slice().sort();
  const sortedDrawnNumbers = drawnNumbers.slice().sort();

  if (
    JSON.stringify(sortedMatchedNumbers) === JSON.stringify(sortedDrawnNumbers)
  ) {
    modalMessage.textContent = `🎉🎉JACKPOT🎉🎉`;
  } else if (matchedNumbers.length === 0) {
    modalMessage.textContent = "You didn't win this time. Try again!";
  } else {
    const message = `You Won!🎉 Matched numbers: ${
      matchedNumbers.length
    }. Numbers: ${matchedNumbers.join(", ")}`;
    modalMessage.textContent = message;
  }
  modal.style.display = "block";
}

// Close modal when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  drawnNumbersText.style.display = "none";
});
