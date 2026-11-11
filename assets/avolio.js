"use strict";

    /* Acessos flutuantes em todas as páginas: Instagram e WhatsApp. */
    const socialDock = document.createElement("nav");
    socialDock.className = "floating-social";
    socialDock.setAttribute("aria-label", "Redes sociais e contato");
    socialDock.innerHTML = `
      <a class="floating-social-link floating-instagram"
         href="https://www.instagram.com/avolio.odontologia/"
         target="_blank" rel="noopener noreferrer"
         aria-label="Abrir Instagram da Avolio Odontologia" title="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/>
          <circle cx="12" cy="12" r="4.1"/>
          <circle cx="17.8" cy="6.3" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      <a class="floating-social-link floating-whatsapp"
         href="https://wa.me/5511956682021?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
         target="_blank" rel="noopener noreferrer"
         aria-label="Agendar avaliação pelo WhatsApp" title="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 3.5A11.2 11.2 0 0 0 3.1 17l-1.5 5.4 5.6-1.5A11.2 11.2 0 1 0 20.5 3.5ZM12 20.9a9 9 0 0 1-4.6-1.3l-.3-.2-3.3.9.9-3.2-.2-.3A9 9 0 1 1 12 20.9Zm5-6.8c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6L8.5 6.8c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.3 3.5 5.6 4.9.8.4 1.4.6 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"/>
        </svg>
      </a>`;
    document.body.appendChild(socialDock);


    document.documentElement.classList.add("js");

    /* ========================================================
       MEDIÇÃO DE CLIQUES NO WHATSAPP
       Evento informativo; não equivale a mensagem enviada.
       A conversão do Google Ads requer um conversion label.
       ======================================================== */

    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com/"]');
      if (!link || typeof window.gtag !== "function") return;

      window.gtag("event", "whatsapp_click", {
        link_url: link.href,
        link_text: (link.textContent || "").trim().slice(0, 100),
        transport_type: "beacon"
      });
    });

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
