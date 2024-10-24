document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // Stop observing once the animation has been triggered
        }
      });
    },
    { threshold: 0.1 } // Adjust threshold as needed
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
});
