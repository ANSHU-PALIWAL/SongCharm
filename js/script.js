// toggle js
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyPA6ilWYWFELe4-GkHEkMAnHf3HVGy3vSQnzEbQCWWfv5qQaulrI2mO4QkmiVNCIjm/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const initialSubmitBtn = document.querySelector(".form-section .submit-btn"); // The button on the form
const modal = document.getElementById("payment-modal");
const confirmPaymentBtn = document.getElementById("confirm-payment-btn");

// 1. Intercept the initial form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop data from sending immediately

  // Open the Payment Modal
  openPaymentModal();
});

// Function to Open Modal
function openPaymentModal() {
  modal.style.display = "flex";
}

// Function to Close Modal
function closePaymentModal() {
  modal.style.display = "none";
}

// 2. Handle the "Payment Done" click inside the modal
confirmPaymentBtn.addEventListener("click", () => {
  // Change button text to indicate loading
  confirmPaymentBtn.disabled = true;
  confirmPaymentBtn.innerHTML =
    "Verifying & Sending... <i class='fas fa-spinner fa-spin'></i>";

  // Create FormData from the form
  let formData = new FormData(form);

  // --- THIS ADDS THE NEW COLUMN DATA ---
  // Make sure your Google Sheet has a header named "Payment Status" (optional, but good practice)
  formData.append("Payment Status", "Paid / Submitted");

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      // Success Handling
      closePaymentModal(); // Close popup

      msg.innerHTML = "Success! Payment noted and story received.";
      msg.style.color = "#25d366";

      form.reset();

      // Reset modal button
      confirmPaymentBtn.disabled = false;
      confirmPaymentBtn.innerHTML =
        "Payment Done & Submit <i class='fas fa-check-circle'></i>";

      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
    })
    .catch((error) => {
      // Error Handling
      closePaymentModal();
      msg.innerHTML = "Error! Please check your internet.";
      msg.style.color = "red";

      confirmPaymentBtn.disabled = false;
      confirmPaymentBtn.innerHTML =
        "Payment Done & Submit <i class='fas fa-check-circle'></i>";

      console.error("Error!", error.message);
    });
});

// Close modal if user clicks outside the box
window.onclick = function (event) {
  if (event.target == modal) {
    closePaymentModal();
  }
};

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

var reviewSwiper = new Swiper(".reviews-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,

  loop: false,
  rewind: true,

  grabCursor: true,
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",

  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// to stop autoplay when video starts
const videos = document.querySelectorAll(".reviews-swiper video");
videos.forEach((video) => {
  video.addEventListener("play", () => {
    reviewSwiper.autoplay.stop();
  });
  video.addEventListener("ended", () => {
    reviewSwiper.autoplay.start();
  });
});
