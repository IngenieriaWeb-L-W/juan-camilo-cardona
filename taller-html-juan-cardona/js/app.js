// Immediately Invoked Function Expression for the color theme switch
((d) => {
  const $btnSwitch = d.querySelector("#switch");

  $btnSwitch.addEventListener("click", () => {
    d.body.classList.toggle("dark");
    $btnSwitch.classList.toggle("active");
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
