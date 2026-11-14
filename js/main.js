(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const toast = document.getElementById("toast");
  const form = document.getElementById("contact-form");
  const thanks = document.getElementById("form-thanks");
  const formError = document.getElementById("form-error");
  const year = document.getElementById("year");
  let toastTimer;

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("nav-open"));
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", function (event) {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) setMenu(false);
  });

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        if (!toast.classList.contains("is-visible")) toast.hidden = true;
      }, 250);
    }, 2400);
  }

  document.querySelectorAll("[data-add-to-cart]").forEach(function (button) {
    button.addEventListener("click", function () {
      const name = button.getAttribute("data-product") || "Item";
      showToast(name + " added to cart");
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.elements.namedItem("name");
      const email = form.elements.namedItem("email");
      const message = form.elements.namedItem("message");
      const emailOk = email && email.value.trim() && email.checkValidity();
      const valid =
        name && name.value.trim() &&
        emailOk &&
        message && message.value.trim();

      if (!valid) {
        if (formError) formError.hidden = false;
        (name && !name.value.trim() ? name : !emailOk ? email : message).focus();
        return;
      }

      if (formError) formError.hidden = true;
      form.reset();
      form.closest(".contact-grid").classList.add("is-sent");
      if (thanks) {
        thanks.hidden = false;
        thanks.focus?.();
      }
    });
  }
})();
