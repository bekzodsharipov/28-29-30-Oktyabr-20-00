document.addEventListener("DOMContentLoaded", function () {

    // Foydalanuvchi hodisasini yuborish funksiyasi
    async function sendEvent(eventType) {
        try {
            const response = await fetch("https://user-action-tracker.asosit.uz/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: eventType,
                    site_name: "Asosiy"
                })
            });

            if (!response.ok) {
                throw new Error("Serverdan xatolik keldi: " + response.status);
            }

            const data = await response.json();
            console.log("Yuborilgan javob:", data);

        } catch (error) {
            console.error("Xatolik:", error);
        }
    }

    sendEvent("Saytga kirdi");

    const registerBtns = document.querySelectorAll(".registerBtn");
    const modal = document.getElementById("registrationModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const overlay = document.querySelector(".homeModalOverlay");
    const form = document.getElementById("registrationForm");
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const submitBtn = document.getElementById("submitBtn");
    const selectedCountry = document.getElementById("selectedCountry");
    const selectedCountryCode = document.getElementById("selectedCountryCode");
    const dropdown = document.getElementById("countryDropdown");
    const dropdownIcon = document.getElementById("dropdownIcon");

    const countries = [
        { name: "Tajikistan", code: "+992" },
        { name: "Uzbekistan", code: "+998" },
        { name: "AQSH", code: "+1" },
        { name: "Janubiy Koreya", code: "+82" },
        { name: "Qirg’iziston", code: "+996" },
        { name: "Qozog’iston", code: "+7" },
        { name: "Tojikiston", code: "+992" },
        { name: "Turkmaniston", code: "+993" },
        { name: "Polsha", code: "+48" }
    ];

    const phoneFormats = {
        "+992": {
            placeholder: "55 555 5555",
            format: function (value) {
                let t = "";
                if (value.length > 0) t += value.slice(0, Math.min(2, value.length));
                if (value.length > 2) t += " " + value.slice(2, Math.min(5, value.length));
                if (value.length > 5) t += " " + value.slice(5, Math.min(7, value.length));
                if (value.length > 7) t += " " + value.slice(7, Math.min(9, value.length));
                return t;
            },
            validate: function (v) {
                return /^\d{2} \d{3} \d{2} \d{2}$/.test(v);
            }
        },
        "+998": {
            placeholder: "88 888 88 88",
            format: function (value) {
                let t = "";
                if (value.length > 0) t += value.slice(0, Math.min(2, value.length));
                if (value.length > 2) t += " " + value.slice(2, Math.min(5, value.length));
                if (value.length > 5) t += " " + value.slice(5, Math.min(7, value.length));
                if (value.length > 7) t += " " + value.slice(7, Math.min(9, value.length));
                return t;
            },
            validate: function (v) {
                return /^\d{2} \d{3} \d{2} \d{2}$/.test(v);
            }
        },
        "+1": {
            placeholder: "555 123 4567",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(3, v.length));
                if (v.length > 3) t += " " + v.slice(3, Math.min(6, v.length));
                if (v.length > 6) t += " " + v.slice(6, Math.min(10, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{3} \d{3} \d{4}$/.test(v);
            }
        },
        "+82": {
            placeholder: "10 1234 5678",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(2, v.length));
                if (v.length > 2) t += " " + v.slice(2, Math.min(6, v.length));
                if (v.length > 6) t += " " + v.slice(6, Math.min(10, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{2} \d{4} \d{4}$/.test(v);
            }
        },
        "+996": {
            placeholder: "555 123 456",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(3, v.length));
                if (v.length > 3) t += " " + v.slice(3, Math.min(6, v.length));
                if (v.length > 6) t += " " + v.slice(6, Math.min(9, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{3} \d{3} \d{3}$/.test(v);
            }
        },
        "+7": {
            placeholder: "700 123 4567",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(3, v.length));
                if (v.length > 3) t += " " + v.slice(3, Math.min(6, v.length));
                if (v.length > 6) t += " " + v.slice(6, Math.min(10, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{3} \d{3} \d{4}$/.test(v);
            }
        },
        "+992": {
            placeholder: "55 555 5555",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(2, v.length));
                if (v.length > 2) t += " " + v.slice(2, Math.min(5, v.length));
                if (v.length > 5) t += " " + v.slice(5, Math.min(9, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{2} \d{3} \d{4}$/.test(v);
            }
        },
        "+993": {
            placeholder: "6 123 4567",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(1, v.length));
                if (v.length > 1) t += " " + v.slice(1, Math.min(4, v.length));
                if (v.length > 4) t += " " + v.slice(4, Math.min(8, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{1} \d{3} \d{4}$/.test(v);
            }
        },
        "+48": {
            placeholder: "123 456 789",
            format: function (v) {
                let t = "";
                if (v.length > 0) t += v.slice(0, Math.min(3, v.length));
                if (v.length > 3) t += " " + v.slice(3, Math.min(6, v.length));
                if (v.length > 6) t += " " + v.slice(6, Math.min(9, v.length));
                return t;
            },
            validate: function (v) {
                return /^\d{3} \d{3} \d{3}$/.test(v);
            }
        }
    };

    let currentCode = "+998";

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflowY = "scroll";
    }

    // Mamlakat tanlash dropdown
    selectedCountry.addEventListener("click", function () {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
        } else {
            dropdown.innerHTML = "";
            countries.forEach(function (country) {
                const div = document.createElement("div");
                div.className = "country-option";
                if (country.code === currentCode) div.classList.add("selected");

                div.innerHTML = `
          <span>${country.name}</span>
          <span class="country-code">${country.code}</span>
          ${country.code === currentCode ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ""}
        `;

                div.addEventListener("click", function () {
                    currentCode = country.code;
                    selectedCountryCode.textContent = country.code;
                    dropdown.style.display = "none";
                    const cfg = phoneFormats[country.code] || phoneFormats["+998"];
                    phoneInput.placeholder = cfg.placeholder;
                    phoneInput.value = "";
                    phoneError.style.display = "none";
                    dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
                });

                dropdown.appendChild(div);
            });

            dropdown.style.display = "block";
            dropdownIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
        }
    });

    document.addEventListener("click", function (e) {
        if (!selectedCountry.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
            dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
        }
    });

    phoneInput.addEventListener("input", function (e) {
        const numbers = e.target.value.replace(/\D/g, "");
        const formatted = (phoneFormats[currentCode] || phoneFormats["+998"]).format(numbers);
        phoneInput.value = formatted;
        phoneError.style.display = "none";
    });

    registerBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            sendEvent("Tugmani bosdi");
            modal.style.display = "block";
            document.body.style.overflowY = "hidden";
        });
    });

    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const phoneVal = phoneInput.value;
        const validator = phoneFormats[currentCode] || phoneFormats["+998"];

        if (!validator.validate(phoneVal)) {
            phoneError.style.display = "block";
            return;
        }

        phoneError.style.display = "none";
        submitBtn.textContent = "YUBORILMOQDA...";
        submitBtn.disabled = true;

        const now = new Date();
        const date = now.toLocaleDateString("uz-UZ");
        const time = now.toLocaleTimeString("uz-UZ");

        const formData = {
            TelefonRaqam: currentCode + " " + phoneInput.value,
            SanaSoat: date + " - " + time
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        window.location.href = "/thankYou.html";

        submitBtn.textContent = "DAVOM ETISH";
        submitBtn.disabled = false;
        phoneInput.value = "";
        closeModal();
    });

    // TIMER
    let totalSeconds = 120;
    const timerElement = document.getElementById("timer");

    const countdown = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            return;
        }
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formatted = minutes.toString().padStart(1, "0") + ":" + seconds.toString().padStart(2, "0");
        timerElement.textContent = formatted;
    }, 1000);
});