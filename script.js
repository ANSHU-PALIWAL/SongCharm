// toggle js
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}

// form js
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyPA6ilWYWFELe4-GkHEkMAnHf3HVGy3vSQnzEbQCWWfv5qQaulrI2mO4QkmiVNCIjm/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.innerHTML = "Sending details...";
  msg.style.color = "#6c5ce7";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Success! We have received your story.";
      msg.style.color = "#25d366";
      form.reset();

      setTimeout(function () {
        msg.innerHTML = "";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }, 5000);
    })
    .catch((error) => {
      msg.innerHTML = "Error! Please check your internet.";
      msg.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      console.error("Error!", error.message);
    });
});

// slider js
var swiper = new Swiper(".services-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
