// const btn = document.querySelector(".button");
// const container = document.querySelector(".logo");
// const menuBtn = document.querySelector(".menu-icon");
// const title = document.querySelector(".title-svg");

// btn.addEventListener("click", function () {
//   alert("ты лох!");
// });

// title.addEventListener("click", function () {
//   alert("сам сдавай долбоеб");
// });

// menuBtn.addEventListener("click", function () {
//   alert("продам ответы 500 рублкй писать в телеграм");
// });

// container.addEventListener("click", function () {
//   alert("пососи");
// });

function showPopup(text) {
    const popup = document.getElementById("popup");
    popup.textContent = text;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
  }
  
  document.querySelector(".button").addEventListener("click", () => {
    showPopup("ты лох!");
  });
  
  document.querySelector(".title").addEventListener("click", () => {
    showPopup("сам сдавай долбоеб");
  });
  
  document.querySelector(".menu-icon").addEventListener("click", () => {
    showPopup("продам ответы 500 рублей — писать в Telegram");
  });
  
  document.querySelector(".logo").addEventListener("click", () => {
    showPopup("пососи");
  });
  