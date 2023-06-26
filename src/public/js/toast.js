const toast = ({ title, message, type, duration }) => {
  const main = document.getElementById("toast-form");
  if (main) {
    const toast = document.createElement("div");
    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      waring: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast khi click
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const delay = Math.floor(duration / 1000);
    const icon = icons[type];
    toast.classList.add("toast-form", `toast--${type}`);
    toast.style.animation = `slideInLeft 0.3s ease, fadeOut 1s ${delay}s forwards`;
    toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
    main.appendChild(toast);
  }
}


