
  const navToggle = document.querySelector("#navToggle");
  const navClosedIcon = document.querySelector("#navClosed");
  const navOpenIcon = document.querySelector("#navOpen");
  const navIcon = document.querySelectorAll(".navIcon");
  const nav = document.querySelector("nav");
  
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    // document.body.style.overflow = "hidden";

    document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "auto";
    navIcon.forEach((icon) => {
      icon.classList.toggle("hidden");
    });
  });
  
  
  window.addEventListener(
    "resize", () => {
      if (document.body.clientWidth > 1200) {
        nav.classList.remove("open");
        navIcon.forEach((icon) => {
          icon.classList.remove("hidden");
        });
        navOpenIcon.classList.add("hidden");
        document.body.style.overflow = "auto";

      }
    },
    { passive: false }
  );
