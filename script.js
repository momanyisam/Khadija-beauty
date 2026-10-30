// =====================================
// KHADIJA ELITE BEAUTY
// Glam Up. Stand Out.
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // WhatsApp business number
    const whatsappNumber = "254716762098";

    // Services and prices
    const servicePrices = {
        "Tips": 400,
        "Stick-ons": 300,
        "Plain Gel": 150,
        "Lashes": 300
    };

    // =====================================

// =====================================
// MOBILE NAVIGATION FIX
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        navigation.classList.toggle("active");

        const isOpen = navigation.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after a navigation link is clicked
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =====================================
    // BOOKING FORM ELEMENTS
    // =====================================

    const bookingForm = document.getElementById("bookingForm");
    const bookingService = document.getElementById("bookingService");
    const customerName = document.getElementById("customerName");
    const bookingDate = document.getElementById("bookingDate");

    // Set the earliest selectable booking date to today
    if (bookingDate) {
        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        bookingDate.min = localToday;
    }

    // =====================================
    // AUTOMATIC PRICE DISPLAY
    // =====================================

    function updateBookingPrice() {
        if (!bookingService) return;

        const selectedService = bookingService.value;
        const price = servicePrices[selectedService];

        // Update any price display using these IDs
        const priceElement =
            document.getElementById("bookingPrice") ||
            document.getElementById("totalPrice");

        if (priceElement) {
            priceElement.textContent =
                price !== undefined ? "KSh " + price : "Select a service";
        }

        // Update a price display using the booking price box
        const priceBox = document.querySelector(".booking-price-box");

        if (priceBox) {
            const priceText = price !== undefined
                ? "KSh " + price
                : "Select a service";

            const valueElement = priceBox.querySelector(
                ".price-value, strong, .amount"
            );

            if (valueElement) {
                valueElement.textContent = priceText;
            } else {
                priceBox.setAttribute("data-price", priceText);
            }
        }
    }

    if (bookingService) {
        bookingService.addEventListener("change", updateBookingPrice);
        updateBookingPrice();
    }

    // =====================================
    // SERVICE BOOKING BUTTONS
    // =====================================

    document.querySelectorAll(".service-book").forEach(function (button) {
        button.addEventListener("click", function (event) {
            const selectedService = button.dataset.service;

            if (bookingService && selectedService) {
                bookingService.value = selectedService;
                updateBookingPrice();
            }

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            if (customerName) {
                setTimeout(function () {
                    customerName.focus({ preventScroll: true });
                }, 500);
            }
        });
    });

    // =====================================
    // WHATSAPP BOOKING
    // =====================================

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            const name = customerName
                ? customerName.value.trim()
                : "";

            const service = bookingService
                ? bookingService.value
                : "";

            const date = bookingDate
                ? bookingDate.value
                : "";

            // Look for optional fields if they exist in the form
            const phoneField =
                document.getElementById("customerPhone") ||
                document.getElementById("bookingPhone");

            const timeField =
                document.getElementById("bookingTime") ||
                document.getElementById("customerTime");

            const notesField =
                document.getElementById("bookingNotes") ||
                document.getElementById("specialRequests");

            const phone = phoneField ? phoneField.value.trim() : "";
            const time = timeField ? timeField.value : "";
            const notes = notesField ? notesField.value.trim() : "";

            if (!name) {
                alert("Please enter your name.");
                if (customerName) customerName.focus();
                return;
            }

            if (!service || servicePrices[service] === undefined) {
                alert("Please select a valid beauty service.");
                if (bookingService) bookingService.focus();
                return;
            }

            if (!date) {
                alert("Please select your preferred booking date.");
                if (bookingDate) bookingDate.focus();
                return;
            }

            const formattedDate = new Date(date + "T00:00:00")
                .toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

            let message =
                "Hello Khadija Elite Beauty! 💖\n\n" +
                "I would like to book a beauty service.\n\n" +
                "👤 Name: " + name + "\n" +
                "💅 Service: " + service + "\n" +
                "💰 Price: KSh " + servicePrices[service] + "\n" +
                "📅 Preferred Date: " + formattedDate + "\n";

            if (time) {
                message += "🕒 Preferred Time: " + time + "\n";
            }

            if (phone) {
                message += "📱 My Phone Number: " + phone + "\n";
            }

            if (notes) {
                message += "📝 Additional Details: " + notes + "\n";
            }

            message +=
                "\n📍 Location: Moi University, Eldoret\n\n" +
                "Please confirm whether this booking is available. Thank you!";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            window.open(whatsappURL, "_blank");
        });
    }

    // =====================================
    // GALLERY IMAGE INTERACTION
    // =====================================

    document.querySelectorAll(".gallery-item img").forEach(function (image) {
        image.style.cursor = "pointer";

        image.addEventListener("click", function () {
            window.open(image.src, "_blank");
        });
    });

    // =====================================
    // WHATSAPP FLOATING BUTTON
    // =====================================

    const whatsappFloat = document.getElementById("whatsappFloat");

    if (whatsappFloat) {
        whatsappFloat.href =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                "Hello Khadija Elite Beauty! 💖 I would like to enquire about your services."
            );

        whatsappFloat.target = "_blank";
        whatsappFloat.rel = "noopener noreferrer";
    }

});

