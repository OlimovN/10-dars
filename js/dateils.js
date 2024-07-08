import { getDate, createDetails, getDatestorage } from "./functions.js";

const details = document.getElementById("details");

document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  let id = url.split("id=")[1];

  if (!id) {
    window.location.assign("http://127.0.0.1:5500/index.html");
    return;
  }

  getDate(`https://strapi-store-server.onrender.com/api/products/${id}`)
    .then((data) => {
      if (data.data.id) {
        const card = createDetails(data.data);
        details.innerHTML = card;

        const form = document.querySelector("form");
        const button = document.querySelector("button");
        const select = document.querySelector("select");

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          let product = {
            id: data.data.id,
            time: Date.now(),
            count: select.value,
            attribute: data.data.attribute,
          };
          let products = getDatestorage();
          // Add logic to handle product storage or further actions
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
