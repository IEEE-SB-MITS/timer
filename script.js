// const countToDate = new Date().setHours(new Date().getHours() + 24)
// let previousTimeBetweenDates
// setInterval(() => {
//   const currentDate = new Date()
//   const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
//   flipAllCards(timeBetweenDates)

//   previousTimeBetweenDates = timeBetweenDates
// }, 250)



const defaultStopDate = "2023-11-25 15:00:00";
const storedUserDate = localStorage.getItem('userDate');
const userDateInput = storedUserDate || defaultStopDate
localStorage.setItem('userDate', userDateInput);


const countToDate = userDateInput?new Date(userDateInput).getTime():new Date(defaultStopDate).getTime();
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

  if (timeBetweenDates >= 0) {
    flipAllCards(timeBetweenDates);
    previousTimeBetweenDates = timeBetweenDates;
  } else {
    // Handle the case when the countdown is complete
    console.log("Countdown complete!");
  }
}, 250);

function flipAllCards(time) {
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
  flip(document.querySelector("[data-hours-ones]"), hours % 10)
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top")
  const startNumber = parseInt(topHalf.textContent)
  if (newNumber === startNumber) return

  const bottomHalf = flipCard.querySelector(".bottom")
  const topFlip = document.createElement("div")
  topFlip.classList.add("top-flip")
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add("bottom-flip")

  top.textContent = startNumber
  bottomHalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = newNumber

  topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber
  })
  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })
  bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber
    bottomFlip.remove()
  })
  flipCard.append(topFlip, bottomFlip)
}