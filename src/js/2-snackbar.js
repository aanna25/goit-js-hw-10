
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const delay = Number(formData.get("delay"));
  const state = formData.get("state");

  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === "fulfilled" ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then((delay) =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      })
    )
    .catch((delay) =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      })
    );
});