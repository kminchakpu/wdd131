document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const feedbackWrapper = document.getElementById("form-feedback-wrapper");
    const submitButton = document.getElementById("submit-button");

    if (!contactForm) return;

    // Custom helper rules to clear interface errors cleanly
    function clearFieldError(inputField, errorSpan) {
        inputField.classList.remove("input-invalid-state");
        errorSpan.textContent = "";
    }

    function triggerFieldError(inputField, errorSpan, localizedMessage) {
        inputField.classList.add("input-invalid-state");
        errorSpan.textContent = localizedMessage;
    }

    // Input-specific processing validations
    function validateField(inputField, errorSpan) {
        if (!inputField.validity.valid) {
            if (inputField.validity.valueMissing) {
                triggerFieldError(inputField, errorSpan, "This structural field is required.");
            } else if (inputField.validity.typeMismatch) {
                triggerFieldError(inputField, errorSpan, "Please enter a standard valid email target address.");
            }
            return false;
        }
        clearFieldError(inputField, errorSpan);
        return true;
    }

    // Live feedback listener checks
    const fieldsMap = [
        { input: document.getElementById("user-name"), error: document.getElementById("name-error") },
        { input: document.getElementById("user-email"), error: document.getElementById("email-error") },
        { input: document.getElementById("user-message"), error: document.getElementById("message-error") }
    ];

    fieldsMap.forEach((pair) => {
        if (pair.input && pair.error) {
            pair.input.addEventListener("input", () => {
                validateField(pair.input, pair.error);
            });
        }
    });

    // Form operational submission block
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let isFormValid = true;

        // Perform total run checking validation
        fieldsMap.forEach((pair) => {
            if (pair.input && pair.error) {
                const currentFieldValid = validateField(pair.input, pair.error);
                if (!currentFieldValid) {
                    isFormValid = false;
                }
            }
        });

        if (!isFormValid) return;

        // Visual feedback management for active processing states
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // Extracting standard body data properties
        const formData = new FormData(contactForm);
        const requestPayload = {
            name: formData.get("name") || "",
            email: formData.get("email") || "",
            message: formData.get("message") || ""
        };

        // Simulating functional server async requests layout API endpoint setup 
        setTimeout(() => {
            console.log("Form payload processing submitted directly:", requestPayload);

            // Render operational success container interface
            if (feedbackWrapper) {
                feedbackWrapper.innerHTML = `
                    <div class="feedback-alert success-state">
                        Thank you! Your message has been sent successfully. We will follow up shortly.
                    </div>
                `;
                feedbackWrapper.classList.remove("hidden");
            }

            // Clean data tracking state properties upon success execution context
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }, 1200);
    });
});