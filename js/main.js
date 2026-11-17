(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var main = document.getElementById("main");
  var footer = document.querySelector(".site-footer");
  var toast = document.getElementById("toast");
  var form = document.getElementById("contact-form");
  var thanks = document.getElementById("form-thanks");
  var again = document.getElementById("form-again");
  var year = document.getElementById("year");
  var toastTimer;

  if (year) year.textContent = String(new Date().getFullYear());

  function menuFocusables() {
    if (!header) return [];
    return Array.prototype.filter.call(header.querySelectorAll("a, button"), function (el) {
      return !el.hidden && el.getAttribute("aria-hidden") !== "true";
    });
  }

  function setMenu(open, options) {
    if (!header || !toggle) return;
    var wasOpen = header.classList.contains("nav-open");
    options = options || {};
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    try {
      if (main) main.inert = open;
      if (footer) footer.inert = open;
    } catch (err) {
      /* inert is a progressive enhancement */
    }

    if (open) {
      var firstLink = nav && nav.querySelector("a");
      if (firstLink) firstLink.focus();
    } else if (wasOpen && options.restoreFocus) {
      toggle.focus();
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("nav-open"), { restoreFocus: true });
    });
  }

  function goToSection(link) {
    var id = (link.getAttribute("href") || "").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        var wasOpen = header && header.classList.contains("nav-open");
        setMenu(false);
        if (wasOpen) goToSection(link);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!header || !header.classList.contains("nav-open")) return;

    if (event.key === "Escape") {
      setMenu(false, { restoreFocus: true });
      return;
    }

    if (event.key !== "Tab") return;
    var items = menuFocusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 761px)").matches) setMenu(false);
  });

  var sections = [];
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push({ link: link, section: section });
  });

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    var mark = window.scrollY + (header ? header.offsetHeight : 0) + 64;
    var active = null;
    sections.forEach(function (item) {
      if (item.section.offsetTop <= mark) active = item;
    });
    sections.forEach(function (item) {
      if (item === active) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        if (!toast.classList.contains("is-visible")) toast.textContent = "";
      }, 280);
    }, 2600);
  }

  document.querySelectorAll("[data-add-to-cart]").forEach(function (button) {
    var label = button.innerHTML;
    button.addEventListener("click", function () {
      var name = button.getAttribute("data-product") || "Item";
      showToast(name + " added to cart");
      button.textContent = "Added";
      clearTimeout(button._labelTimer);
      button._labelTimer = setTimeout(function () {
        button.innerHTML = label;
      }, 1400);
    });
  });

  function setInvalid(input, error, invalid) {
    if (!input) return;
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
    if (error) error.hidden = !invalid;
  }

  if (form && thanks) {
    var panel = form.closest(".contact-panel");
    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var messageError = document.getElementById("message-error");

    function clearOnInput(input, error) {
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") setInvalid(input, error, false);
      });
    }

    clearOnInput(name, nameError);
    clearOnInput(email, emailError);
    clearOnInput(message, messageError);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nameBad = !name.value.trim();
      var emailBad = !email.value.trim() || !email.checkValidity();
      var messageBad = !message.value.trim();

      setInvalid(name, nameError, nameBad);
      setInvalid(email, emailError, emailBad);
      setInvalid(message, messageError, messageBad);

      var firstInvalid = nameBad ? name : emailBad ? email : messageBad ? message : null;
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      form.reset();
      setInvalid(name, nameError, false);
      setInvalid(email, emailError, false);
      setInvalid(message, messageError, false);
      if (panel) panel.classList.add("is-sent");
      thanks.hidden = false;
      thanks.focus();
    });

    if (again) {
      again.addEventListener("click", function () {
        thanks.hidden = true;
        if (panel) panel.classList.remove("is-sent");
        name.focus();
      });
    }
  }
})();
