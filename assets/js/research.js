(() => {
  "use strict";

  const track =
    document.getElementById(
      "research-approach-track"
    );

  const previousButton =
    document.getElementById(
      "research-approach-prev"
    );

  const nextButton =
    document.getElementById(
      "research-approach-next"
    );

  if (
    !track ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }


  function scrollAmount() {
    const card =
      track.querySelector(
        ".research-v2-approach-card"
      );

    if (!card) {
      return Math.max(
        280,
        track.clientWidth * 0.8
      );
    }

    const styles =
      window.getComputedStyle(
        track
      );

    const gap =
      parseFloat(
        styles.columnGap ||
        styles.gap ||
        "0"
      ) || 0;

    return (
      card.getBoundingClientRect().width +
      gap
    );
  }


  function updateButtons() {
    const maxScroll =
      Math.max(
        0,
        track.scrollWidth -
        track.clientWidth
      );

    const tolerance =
      4;

    previousButton.disabled =
      track.scrollLeft <=
      tolerance;

    nextButton.disabled =
      track.scrollLeft >=
      maxScroll -
      tolerance;
  }


  function move(direction) {
    track.scrollBy({
      left:
        direction *
        scrollAmount(),

      behavior:
        "smooth"
    });
  }


  previousButton.addEventListener(
    "click",
    () => move(-1)
  );


  nextButton.addEventListener(
    "click",
    () => move(1)
  );


  /*
   Holding Shift while using the mouse wheel
   scrolls the Approach cards horizontally.
  */

  track.addEventListener(
    "wheel",
    event => {

      if (!event.shiftKey) {
        return;
      }

      event.preventDefault();

      track.scrollLeft +=
        event.deltaY ||
        event.deltaX;
    },
    {
      passive: false
    }
  );


  track.addEventListener(
    "scroll",
    updateButtons,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateButtons
  );


  updateButtons();

})();
