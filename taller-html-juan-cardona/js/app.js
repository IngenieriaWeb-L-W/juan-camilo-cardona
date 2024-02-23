// Immediately Invoked Function Expression for the color theme switch
((d) => {
  if (localStorage.getItem("theme") === "dark") {
    d.body.classList.add("dark");
    d.querySelector("#switch").classList.add("active");
  }
  const $btnSwitch = d.querySelector("#switch");

  $btnSwitch.addEventListener("click", () => {
    d.body.classList.toggle("dark");
    $btnSwitch.classList.toggle("active");
    if (d.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
})(document);

// Immediately Invoked Function Expression for the page's loader
((d, w) => {
  //Simple loader (Without 'Under construction')

  w.addEventListener("load", () => {
    setTimeout(() => {
      let $loader = d.querySelector(".loader");
      $loader.classList.toggle("loader2");
    }, 1000);
  });
})(document, window);
