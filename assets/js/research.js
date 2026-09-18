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


  /*
   Determine how far to move each time one of the
   yellow arrow buttons is clicked.

   The amount equals approximately one complete
   Approach card plus the gap between cards.
  */

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


  /*
   Disable the left button when already at the
   beginning and disable the right button once
   the final card has been reached.
  */

  function updateButtons() {

    const maxScroll =
      Math.max(
        0,
        track.scrollWidth -
        track.clientWidth
      );

    const tolerance =
      5;

    previousButton.disabled =
      track.scrollLeft <=
      tolerance;

    nextButton.disabled =
      track.scrollLeft >=
      maxScroll -
      tolerance;
  }


  function move(
    direction
  ) {

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
    () => {
      move(-1);
    }
  );


  nextButton.addEventListener(
    "click",
    () => {
      move(1);
    }
  );


  /*
   Shift + mouse wheel can also move horizontally.

   Touchscreens can still swipe normally.
  */

  track.addEventListener(
    "wheel",
    event => {

      if (
        !event.shiftKey
      ) {
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


  /*
   Recheck after images have loaded, because their
   dimensions can slightly change the width of the track.
  */

  window.addEventListener(
    "load",
    updateButtons
  );


  updateButtons();

})();
