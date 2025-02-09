function loadComponent(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => (document.getElementById(id).innerHTML = data))
    .catch((error) => console.error("Error loading " + file, error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header", "header.html");
  loadComponent("navbar", "navbar.html");
  loadComponent("about", "about.html");
  loadComponent("service", "service.html");
  loadComponent("destination", "destination.html");
  loadComponent("package", "package.html");
  loadComponent("booking", "booking.html");
  loadComponent("process", "process.html");
  loadComponent("team", "team.html");
  loadComponent("testimonial", "testimonial.html");
  loadComponent("footer", "footer.html");
});
