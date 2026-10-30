"use strict";

    document.documentElement.classList.add("js");

    /* ========================================================
       FOTOS
       ======================================================== */

    document.querySelectorAll(".photo-slot img").forEach((img) => {
      const showFallback = () => {
        img.hidden = true;

        const fallback = img.parentElement.querySelector(
          ".photo-fallback"
        );

        if (fallback) {
          fallback.hidden = false;
        }
      };

      img.addEventListener("error", showFallback);

      if (img.complete && img.naturalWidth === 0) {
        showFallback();
      }
    });

    /* ========================================================
       MENU DO CELULAR
       ======================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".main-nav");

    function closeMenu(returnFocus = false) {
      menu.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");

      menuButton.querySelector(".sr-only").textContent =
        "Abrir menu";

      if (returnFocus) {
        menuButton.focus();
      }
    }

    menuButton.addEventListener("click", () => {
      const opening =
        menuButton.getAttribute("aria-expanded") !== "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(opening)
      );

      menuButton.querySelector(".sr-only").textContent =
        opening ? "Fechar menu" : "Abrir menu";

      menu.classList.toggle("is-open", opening);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".header-inner")) {
        closeMenu();
      }
    });

    window
      .matchMedia("(min-width: 701px)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          closeMenu();
        }
      });

    /* ========================================================
       MENSAGENS DO WHATSAPP
       ======================================================== */

    const messages = {
      avaliacao:
        "Olá! Gostaria de agendar uma avaliação na Avolio Odontologia.",

      limpeza:
        "Olá! Gostaria de agendar uma consulta para limpeza dental.",

      restauracoes:
        "Olá! Gostaria de agendar uma avaliação para restaurações.",

      canal:
        "Olá! Gostaria de agendar uma avaliação para tratamento de canal com microscópio.",

      outros:
        "Olá! Gostaria de conhecer os tratamentos de clareamento, coroas ou implantes da Avolio Odontologia.",

      urgencia:
        "Olá! Preciso verificar a disponibilidade para uma urgência odontológica."
    };

    const reason = document.getElementById("motivo");
    const bookingLink = document.getElementById("booking-link");

    function updateBookingLink() {
      const message =
        messages[reason.value] || messages.avaliacao;

      bookingLink.href =
        "https://wa.me/5511956682021?text=" +
        encodeURIComponent(message);
    }

    reason.addEventListener("change", updateBookingLink);

    window.addEventListener("pageshow", updateBookingLink);

    updateBookingLink();

    /* ========================================================
       COPIAR ENDEREÇO
       ======================================================== */

    const address =
      "Avolio Odontologia — Avenida Nove de Julho, 3229, " +
      "conjunto 1506, Jardim Paulista, São Paulo — SP";

    document
      .querySelector(".copy-address")
      .addEventListener("click", async (event) => {
        const button = event.currentTarget;
        const status = document.getElementById("copy-status");

        button.disabled = true;

        try {
          if (
            !navigator.clipboard ||
            !window.isSecureContext
          ) {
            throw new Error("Clipboard unavailable");
          }

          await navigator.clipboard.writeText(address);

          status.textContent =
            "Endereço copiado. Você já pode colar onde precisar.";
        } catch {
          status.textContent =
            "Para copiar: Avenida Nove de Julho, 3229, " +
            "conjunto 1506, São Paulo — SP.";
        } finally {
          button.disabled = false;
        }
      });

    /* ========================================================
       AVISO DE PRIVACIDADE
       ======================================================== */

    const privacyDialog =
      document.getElementById("privacy-dialog");

    document
      .getElementById("privacy-open")
      .addEventListener("click", () => {
        privacyDialog.showModal();
      });

    privacyDialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => {
        privacyDialog.close();
      });

    privacyDialog.addEventListener("click", (event) => {
      if (event.target === privacyDialog) {
        const bounds = privacyDialog.getBoundingClientRect();

        const clickedOutside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (clickedOutside) {
          privacyDialog.close();
        }
      }
    });
