// Function to show/hide payment method sections (used in payment.html)
function showPaymentMethod(method) {
    const sections = document.querySelectorAll('.payment-form-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(method + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
    } else {
        console.error(`Element with ID '${method}-section' not found.`);
    }
}

// Script to update the current year in the footer (used in multiple HTML files)
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElements = document.querySelectorAll('#current-year, #current-year-footer');
    currentYearElements.forEach(element => {
        if (element) {
            element.textContent = new Date().getFullYear();
        }
    });

    // Specific logic for payment.html if it's the current page
    const paymentFormExists = document.getElementById('credit-card-section');
    if (paymentFormExists) { // Only run payment-specific JS if the payment form is present
        showPaymentMethod('credit-card'); // Initialize payment method display

        const promoCodeInput = document.getElementById('promo-code-input');
        const applyPromoButton = document.getElementById('apply-promo-button');
        const promoMessage = document.getElementById('promo-message');
        const freeCourseCode = "FREECMOORE"; // Define your free course code here

        if (applyPromoButton) {
            applyPromoButton.addEventListener('click', () => {
                const enteredCode = promoCodeInput.value.trim().toUpperCase(); // Convert to uppercase for case-insensitivity
                if (enteredCode === freeCourseCode) {
                    promoMessage.textContent = "Code applied! Redirecting to login..."; // Updated message
                    promoMessage.classList.remove('text-red-alert', 'hidden');
                    promoMessage.classList.add('text-sage-green'); // Green for success
                    // Redirect to the login page after promo code
                    setTimeout(() => {
                        window.location.href = 'login.html'; // Redirect to login.html
                    }, 1500); // Redirect after a short delay
                } else {
                    promoMessage.textContent = "Invalid promotion code. Please try again.";
                    promoMessage.classList.remove('hidden', 'text-sage-green');
                    promoMessage.classList.add('text-red-alert'); // Red for error
                }
            });
        }
        // Event listeners for payment method radio buttons
        document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                showPaymentMethod(event.target.value);
            });
        });

        // Handle submission for the Credit Card form (Pay Now button)
        const creditCardForm = document.getElementById('credit-card-section');
        if (creditCardForm) {
            creditCardForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                // Simulate payment processing
                console.log('Payment submitted (simulated)! Redirecting to login...');
                // Redirect to the login page after payment
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login.html
                }, 1500);
            });
        }
        // For PayPal and Apple Pay buttons, you'd add similar redirection logic to login.html
        // For example, if PayPal button is clicked:
        const payPalButton = document.querySelector('#paypal-section button');
        if (payPalButton) {
            payPalButton.addEventListener('click', () => {
                console.log('Redirecting to PayPal (simulated)! Then to login...');
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login.html
                }, 1500);
            });
        }
        const applePayButton = document.querySelector('#apple-pay-section button');
        if (applePayButton) {
            applePayButton.addEventListener('click', () => {
                console.log('Redirecting to Apple Pay (simulated)! Then to login...');
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login.html
                }, 1500);
            });
        }
    }
});


// --- Password Toggle Functionality (for login.html) ---
document.addEventListener('DOMContentLoaded', () => {
    const togglePasswordVisibilityButton = document.getElementById('toggle-password-visibility');
    const loginPasswordField = document.getElementById('login-password');

    if (togglePasswordVisibilityButton && loginPasswordField) { // Ensure elements exist on the page
        togglePasswordVisibilityButton.addEventListener('click', () => {
            const type = loginPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPasswordField.setAttribute('type', type);

            // Toggle eye icon
            const icon = togglePasswordVisibilityButton.querySelector('i');
            if (icon) { // Check if icon exists
                if (type === 'password') {
                    // Show password (text type)
                    icon.classList.remove('fa-eye-slash'); // Remove the hidden eye
                    icon.classList.add('fa-eye'); // Add the visible eye
                } else {
                    // Hide password (password type)
                    icon.classList.remove('fa-eye'); // Remove the visible eye
                    icon.classList.add('fa-eye-slash'); // Add the hidden eye
                }
            }
        });
    }
});


// --- Login Form Validation with Modal (for login.html) ---
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const validationModal = document.getElementById('validation-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalButton = document.getElementById('close-modal-button');

    if (loginForm) { // Ensure login form exists
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const emailValue = loginEmailInput.value.trim();
            const passwordValue = loginPasswordInput.value.trim();

            if (emailValue === '' || passwordValue === '') {
                modalMessage.textContent = "Please fill out both your email/username and password.";
                validationModal.classList.remove('hidden');
            } else {
                // If validation passes, simulate login success for now
                // In a real application, you would send this data to a server for authentication
                // alert('Login successful (simulated)! Redirecting to home page.'); // Removed alert for smoother flow
                window.location.href = 'cmoore-my-home-page.html'; // Redirect to student home page
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            validationModal.classList.add('hidden');
        });
    }
});


// --- Chatbot Functionality (Centralized) ---
// Note: This chatbot logic will only run if chatbot-toggle and chatbot-window-main exist on the current page.
document.addEventListener('DOMContentLoaded', () => {
    // Select elements based on their common IDs/classes across pages
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window') || document.getElementById('chatbot-window-main'); // Robustly find the chatbot window

    // Ensure elements exist before querying their children
    const chatbotClose = chatbotWindow ? chatbotWindow.querySelector('#chatbot-close') : null;
    const chatInput = chatbotWindow ? (chatbotWindow.querySelector('.chat-input-field') || chatbotWindow.querySelector('.chat-input-area input[type="text"]')) : null;
    const chatSendButton = chatbotWindow ? (chatbotWindow.querySelector('.chat-send-button-element') || chatbotWindow.querySelector('.chat-input-area button')) : null;
    const chatMessages = chatbotWindow ? (chatbotWindow.querySelector('.chat-messages-display') || chatbotWindow.querySelector('.chat-messages')) : null;

    // Initialize chat history for the chatbot
    let chatHistory = [{ role: "model", parts: [{ text: "Hello! I'm your CMoore Learning Lab AI Assistant. How can I help you today?" }] }];

    // Function to add a message to the chat display
    function addMessage(text, sender) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container'); // Apply flex for alignment
        const messageBubble = document.createElement('span');
        messageBubble.classList.add('message-bubble'); // Apply bubble styling

        if (sender === 'user') {
            messageContainer.classList.add('message-user');
        } else {
            messageContainer.classList.add('message-bot');
        }
        messageBubble.textContent = text;
        messageContainer.appendChild(messageBubble);
        if (chatMessages) {
            chatMessages.appendChild(messageContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        }
    }

    // Function to send message to Gemini API
    async function sendMessageToGemini(prompt) {
        addMessage(prompt, 'user');
        if (chatInput) chatInput.value = ''; // Clear input immediately

        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('message-container', 'message-bot');
        const loadingBubble = document.createElement('span');
        loadingBubble.classList.add('message-bubble', 'animate-pulse');
        loadingBubble.textContent = 'Typing...';
        loadingIndicator.appendChild(loadingBubble);
        if (chatMessages) {
            chatMessages.appendChild(loadingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        try {
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will provide this at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (chatMessages && chatMessages.contains(loadingIndicator)) {
                chatMessages.removeChild(loadingIndicator);
            }

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const botResponse = result.candidates[0].content.parts[0].text;
                addMessage(botResponse, 'bot');
                chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
            } else {
                addMessage("Sorry, I couldn't get a response. Please try again.", 'bot');
                console.error("Gemini API response structure unexpected:", result);
            }
        } catch (error) {
            if (chatMessages && chatMessages.contains(loadingIndicator)) {
                chatMessages.removeChild(loadingIndicator);
            }
            addMessage("Oops! Something went wrong. Please try again later.", 'bot');
            console.error("Error calling Gemini API:", error);
        }
    }

    // Event Listeners for Chatbot (only attach if elements exist on the current page)
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            if (!chatbotWindow.classList.contains('hidden')) {
                chatbotWindow.style.display = 'flex';
            } else {
                chatbotWindow.style.display = '';
            }
        });
    }

    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
            chatbotWindow.style.display = '';
        });
    }

    if (chatSendButton && chatInput) {
        chatSendButton.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendMessageToGemini(message);
            }
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    sendMessageToGemini(message);
                }
            }
        });
    }
});
