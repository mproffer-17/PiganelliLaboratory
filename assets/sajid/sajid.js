(() => {
  "use strict";

  const menuButton =
    document.getElementById(
      "sajid-menu-button"
    );

  const navLinks =
    document.getElementById(
      "sajid-nav-links"
    );


  if (
    menuButton &&
    navLinks
  ) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle(
            "is-open"
          );

        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(
        link => {

          link.addEventListener(
            "click",
            () => {

              navLinks.classList.remove(
                "is-open"
              );

              menuButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }
          );

        }
      );

  }


  /*
   Add a subtle solid background to the navigation
   after the visitor scrolls down the page.
  */

  const header =
    document.querySelector(
      ".sajid-header"
    );


  function updateHeader() {

    if (!header) {
      return;
    }

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 40
    );

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();

})();
