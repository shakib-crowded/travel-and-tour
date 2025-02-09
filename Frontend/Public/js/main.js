(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

/* Query Form Script*/
// Bootstrap Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("queryForm");
  const alertBox = document.getElementById("successAlert");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return; // Stop execution if form is invalid
    }

    form.classList.add("was-validated");

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Query submitted successfully!");

        // ✅ Show alert by changing display property
        alertBox.style.display = "block";
        alertBox.textContent =
          "Your Booking Query Has Been Submitted, We'll Contact You Soon.";

        // ✅ Reset form after successful submission
        form.reset();
        form.classList.remove("was-validated");

        // ✅ Hide alert after 5 seconds
        setTimeout(() => {
          alertBox.style.display = "none";
        }, 5000);
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error submitting the form. Try again later.");
    }
  });
});

// Open chatbot function
function openChat() {
  document.getElementById("chatbot-container").style.display = "block";
}

// Close chatbot function
function closeChat() {
  document.getElementById("chatbot-container").style.display = "none";
}

function scrollToBooking() {
  const bookingSection = document.getElementById("online-booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}
// Bootstrap Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Check if passwords match
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("confirmPassword").classList.add("is-invalid");
    } else {
      document.getElementById("confirmPassword").classList.remove("is-invalid");
    }

    form.classList.add("was-validated");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  });
});

// Booking Form Alert
document
  .querySelector("#bookingForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);

    try {
      const response = await fetch("/booking", {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        alert(data.message); // Show success alert
        window.location.href = "/"; // Redirect after alert
      } else {
        alert(data.error || "Server Problem, Please Try Again!");
      }
    } catch (error) {
      alert("Network error, please try again later!");
    }
  });
