document.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".interactive"));
  let currentIndex = 0;

  // Ensure all interactive elements are focusable
  boxes.forEach(box => {
    box.setAttribute("tabindex", "0");

    const name = box.dataset.name;
    const isSelectable = box.dataset.selectable !== "false";

    // Restore selection if applicable
    if (isSelectable && name && localStorage.getItem(name) === "selected") {
      box.classList.add("selected");
    }

    // Mouse click behavior
    box.addEventListener("click", () => {
      const link = box.closest("a");

      if (link) {
        link.click(); // Navigate if inside a link
        return;
      }

      if (isSelectable && name) {
        const isSelected = box.classList.contains("selected");
        if (isSelected) {
          localStorage.removeItem(name);
          box.classList.remove("selected");
        } else {
          localStorage.setItem(name, "selected");
          box.classList.add("selected");
        }
      }
    });
  });

  // Initial focus
  boxes[currentIndex]?.focus();

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % boxes.length;
      boxes[currentIndex].focus();
    } else if (event.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
      boxes[currentIndex].focus();
    } else if (event.key === "Enter") {
      const box = boxes[currentIndex];
      const link = box.closest("a");
      const name = box.dataset.name;
      const isSelectable = box.dataset.selectable !== "false";

      if (link) {
        link.click(); // Navigate if inside a link
        return;
      }

      if (isSelectable && name) {
        const isSelected = box.classList.contains("selected");
        if (isSelected) {
          localStorage.removeItem(name);
          box.classList.remove("selected");
        } else {
          localStorage.setItem(name, "selected");
          box.classList.add("selected");
        }
      }
    }
  });
});






