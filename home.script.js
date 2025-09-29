document.addEventListener('DOMContentLoaded', function() {
    // UI Element Selections
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = document.getElementById('user-menu-dropdown');
    const userMenuArrow = document.getElementById('user-menu-arrow');
    const messageButton = document.getElementById('message-button');
    const messageDropdown = document.getElementById('message-dropdown');
    const notificationButton = document.getElementById('notification-button');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const moduleToggles = document.querySelectorAll('.module-toggle');
    const mainNavLinks = document.querySelectorAll('nav a[data-page]');

    // Tabs for My Progress section
    const overviewTab = document.getElementById('overview-tab');
    const modulesTab = document.getElementById('modules-tab');
    const overviewContent = document.getElementById('overview-content');
    const modulesContent = document.getElementById('modules-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window-main');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatInputField = document.getElementById('chat-input-field');
    const chatSendButton = document.getElementById('chat-send-button-element');
    const chatMessagesDisplay = document.querySelector('.chat-messages-display');
    const chatInputArea = document.querySelector('.chat-input-area');

    // NEW: Main content container for dynamic loading
    const mainContentContainer = document.getElementById('main-content-container');

    // Map data-page values to their corresponding HTML files
    const pageMap = {
        'home': 'home-content.html',
        'dashboard': 'home-content.html',
        'my-courses': 'my-courses-content.html',
        'profile': 'profile-content.html',
        'grades': 'grades-content.html',
        'calendar': 'calendar-content.html',
        'messages': 'messages-content.html',
        'private-files': 'private-files-content.html',
        'reports': 'reports-content.html',
        'notification-preferences': 'notification-preferences-content.html',
        'course-info': 'course-info-content.html',
        'participants': 'participants-content.html',
        'activities': 'activities-content.html',
        'competencies': 'competencies-content.html',
        'module-1': 'module-1-content.html',
        
        // NEW: Course Information & Resources
        'announcements': 'announcements-content.html',
        'virtual-classroom': 'virtual-classroom-content.html',
        'syllabus': 'syllabus-content.html',
        'career-readiness': 'career-readiness-content.html',
        
        // NEW: Setup Guides
        'windows-setup': 'windows-setup-content.html',
        'chromebook-setup': 'chromebook-setup-content.html',
        'mac-setup': 'mac-setup-content.html',
        'phone-setup': 'phone-setup-content.html',
        'computer-checklist': 'computer-checklist-content.html'
    };

    // New, more robust function to hide all popups except the one clicked on
    function closeOtherPopups(clickedElement) {
        // List of all popup elements and their buttons
        const popups = [
            { dropdown: userMenuDropdown, button: userMenuButton, arrow: userMenuArrow },
            { dropdown: messageDropdown, button: messageButton },
            { dropdown: notificationDropdown, button: notificationButton },
            { dropdown: chatbotWindow, button: chatbotToggle }
        ];

        popups.forEach(popup => {
            if (popup.dropdown && popup.button && popup.button !== clickedElement) {
                popup.dropdown.classList.add('hidden');
                if (popup.arrow) {
                    popup.arrow.classList.remove('active');
                }
            }
        });
    }

    // Toggle User Menu Dropdown
    if (userMenuButton && userMenuDropdown) {
        userMenuButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeOtherPopups(this); // Close others, but not the one clicked
            userMenuDropdown.classList.toggle('hidden');
            if (userMenuArrow) {
                userMenuArrow.classList.toggle('active');
            }
        });
    }

    // Toggle Message Dropdown
    if (messageButton && messageDropdown) {
        messageButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeOtherPopups(this);
            messageDropdown.classList.toggle('hidden');
        });
    }

    // Toggle Notification Dropdown
    if (notificationButton && notificationDropdown) {
        notificationButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeOtherPopups(this);
            notificationDropdown.classList.toggle('hidden');
        });
    }

    // Toggle Chatbot Window
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            closeOtherPopups(this);
            chatbotWindow.classList.toggle('hidden');
            chatbotWindow.classList.toggle('active');
            // If the chatbot is opened, focus the input field
            if (!chatbotWindow.classList.contains('hidden')) {
                chatInputField.focus();
            }
        });
    }
    
    // Close Chatbot Window from its own close button
    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', function(event) {
            event.stopPropagation();
            chatbotWindow.classList.add('hidden');
            chatbotWindow.classList.remove('active');
        });
    }

    // Close all popups when clicking outside of them (robust null checks)
    document.addEventListener('click', function(event) {
        const isUserMenuClick = userMenuButton && userMenuDropdown &&
            (userMenuButton.contains(event.target) || userMenuDropdown.contains(event.target));
        const isMessageClick = messageButton && messageDropdown &&
            (messageButton.contains(event.target) || messageDropdown.contains(event.target));
        const isNotificationClick = notificationButton && notificationDropdown &&
            (notificationButton.contains(event.target) || notificationDropdown.contains(event.target));
        const isChatbotClick = chatbotToggle && chatbotWindow &&
            (chatbotToggle.contains(event.target) || chatbotWindow.contains(event.target));

        if (!isUserMenuClick) {
            if (userMenuDropdown) userMenuDropdown.classList.add('hidden');
            if (userMenuArrow) userMenuArrow.classList.remove('active');
        }
        if (!isMessageClick) {
            if (messageDropdown) messageDropdown.classList.add('hidden');
        }
        if (!isNotificationClick) {
            if (notificationDropdown) notificationDropdown.classList.add('hidden');
        }
        if (!isChatbotClick) {
            if (chatbotWindow) chatbotWindow.classList.add('hidden');
        }
    });

    // Mobile Menu Toggle
    if (menuButton && sidebar && overlay) {
        menuButton.addEventListener('click', function() {
            sidebar.classList.toggle('translate-x-full');
            sidebar.classList.toggle('translate-x-0');
            overlay.classList.toggle('hidden');
        });
        // Overlay click to close sidebar
        overlay.addEventListener('click', function() {
            sidebar.classList.add('translate-x-full');
            sidebar.classList.remove('translate-x-0');
            overlay.classList.add('hidden');
        });
    }

    // Module Dropdown Toggles
    if (moduleToggles.length > 0) {
        moduleToggles.forEach(button => {
            button.addEventListener('click', function() {
                const dropdownContent = this.nextElementSibling;
                const icon = this.querySelector('.rotate-icon');

                dropdownContent.classList.toggle('active');
                if (icon) icon.classList.toggle('active');

                moduleToggles.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherDropdown = otherButton.nextElementSibling;
                        const otherIcon = otherButton.querySelector('.rotate-icon');
                        if (otherDropdown) otherDropdown.classList.remove('active');
                        if (otherIcon) otherIcon.classList.remove('active');
                    }
                });
            });
        });
    }

    // Function to load content dynamically
    async function loadContent(pageName) {
        const url = pageMap[pageName];
        if (!url) {
            console.error('Page not found in map:', pageName);
            if (mainContentContainer) {
                mainContentContainer.innerHTML = '<div class="text-charcoal-dark p-6">Content not found for this page.</div>';
            }
            return;
        }

        try {
            if (mainContentContainer) {
                mainContentContainer.innerHTML = '<div class="text-center p-8 text-charcoal-light">Loading content...</div>';
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            if (mainContentContainer) {
                mainContentContainer.innerHTML = content;
            }
        } catch (error) {
            console.error('Error loading content:', error);
            if (mainContentContainer) {
                mainContentContainer.innerHTML = `<div class="text-red-alert p-6">Failed to load content. Please try again. (${error.message})</div>`;
            }
        }
    }

    // Handle all data-page clicks
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadContent(page);

            if (this.closest('nav')) {
                mainNavLinks.forEach(navLink => {
                    navLink.classList.remove('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
                    navLink.classList.add('text-charcoal-dark', 'hover:bg-subtle-grey');
                });
                this.classList.add('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
                this.classList.remove('text-charcoal-dark', 'hover:bg-subtle-grey');
            }

            if (menuButton && !menuButton.classList.contains('hidden')) {
                sidebar.classList.add('translate-x-full');
                sidebar.classList.remove('translate-x-0');
                overlay.classList.add('hidden');
            }
        });
    });

    // Tab functionality for My Progress
    function activateTab(tabId) {
        if (!tabButtons || !tabContents) return;
        tabButtons.forEach(button => {
            button.classList.remove('border-ocean-blue', 'text-ocean-blue');
            button.classList.add('border-transparent', 'text-charcoal-dark');
        });
        const activeTabButton = document.getElementById(tabId + '-tab');
        if (activeTabButton) {
            activeTabButton.classList.add('border-ocean-blue', 'text-ocean-blue');
            activeTabButton.classList.remove('border-transparent', 'text-charcoal-dark');
        }

        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        const activeTabContent = document.getElementById(tabId + '-content');
        if (activeTabContent) {
            activeTabContent.classList.remove('hidden');
        }
    }

    if (overviewTab) overviewTab.addEventListener('click', () => activateTab('overview'));
    if (modulesTab) modulesTab.addEventListener('click', () => activateTab('modules'));

    // Initialize the default active page and tab
    loadContent('home');
    const initialPageLink = document.querySelector('a[data-page="home"]');
    if (initialPageLink) {
        initialPageLink.classList.add('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
        initialPageLink.classList.remove('text-charcoal-dark', 'hover:bg-subtle-grey');
    }
    activateTab('overview');

    // --- CHATBOT INTEGRATION ---

    let chatHistory = [];
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner mx-auto my-4';

    // Helper function to display messages in the chat window
    function displayMessage(message, sender) {
        if (!chatMessagesDisplay) return;

        const messageContainer = document.createElement('div');
        messageContainer.className = `message-container ${sender === 'user' ? 'message-user' : 'message-bot'}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = message;

        messageContainer.appendChild(messageBubble);
        chatMessagesDisplay.appendChild(messageContainer);

        // Scroll to the bottom of the chat window
        chatMessagesDisplay.scrollTop = chatMessagesDisplay.scrollHeight;
    }

    // Function to handle the Gemini API call with exponential backoff
    async function initiateGeminiApiCall(prompt, retries = 3, delay = 1000) {
        // Display user's message immediately
        displayMessage(prompt, 'user');
        chatInputField.value = '';

        // Add a loading spinner
        chatInputArea.appendChild(loadingSpinner);
        chatInputField.disabled = true;
        chatSendButton.disabled = true;

        let lastBotMessage = null;

        try {
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 429 && retries > 0) { // Rate limit exceeded
                    console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
                    await new Promise(res => setTimeout(res, delay));
                    return initiateGeminiApiCall(prompt, retries - 1, delay * 2); // Exponential backoff
                }
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                lastBotMessage = text;
                displayMessage(text, 'bot');
            } else {
                lastBotMessage = "I'm sorry, I couldn't generate a response. Please try again.";
                displayMessage(lastBotMessage, 'bot');
            }
        } catch (error) {
            console.error('Error generating content:', error);
            lastBotMessage = "An error occurred. Please check the console for details.";
            displayMessage(lastBotMessage, 'bot');
        } finally {
            // Remove the loading spinner and re-enable input
            if (loadingSpinner.parentNode) {
                loadingSpinner.parentNode.removeChild(loadingSpinner);
            }
            chatInputField.disabled = false;
            chatSendButton.disabled = false;
            chatInputField.focus();
            
            // Add bot's response to chat history for context
            if (lastBotMessage) {
                chatHistory.push({ role: "model", parts: [{ text: lastBotMessage }] });
            }
        }
    }

    // Example question click handler for chatbot
    document.querySelectorAll('.example-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.textContent.trim();
            if (prompt) {
                chatInputField.value = prompt;
                chatInputField.focus();
                // Optionally auto-send
                // initiateGeminiApiCall(prompt);
            }
        });
    });

    // Chatbot send button and Enter key handler
    if (chatSendButton && chatInputField) {
        chatSendButton.addEventListener('click', function() {
            const message = chatInputField.value.trim();
            if (message) {
                initiateGeminiApiCall(message);
            }
        });
        chatInputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent new line in input field
                chatSendButton.click();
            }
        });
    }
});

