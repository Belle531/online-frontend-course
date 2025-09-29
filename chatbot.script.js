<script>
        document.addEventListener('DOMContentLoaded', function() {
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
            const chatbotWindow = document.getElementById('chatbot-window');
            const chatbotClose = document.getElementById('chatbot-close');

            // NEW: Main content container for dynamic loading
            const mainContentContainer = document.getElementById('main-content-container');

            // Map data-page values to their corresponding HTML files
            const pageMap = {
                'home': 'home-content.html',
                'dashboard': 'home-content.html', // Alias for home
                'my-courses': 'my-courses-content.html',
                'profile': 'profile-content.html',
                'grades': 'grades-content.html',
                'calendar': 'calendar-content.html',
                'messages': 'messages-content.html', // You'd create this file
                'private-files': 'private-files-content.html',
                'reports': 'reports-content.html',
                'notification-preferences': 'notification-preferences-content.html', // You'd create this file
                'course-info': 'course-info-content.html', // You'd create this file
                'participants': 'participants-content.html', // You'd create this file
                'activities': 'activities-content.html', // You'd create this file
                'competencies': 'competencies-content.html', // You'd create this file
            };


            // Function to hide all dropdowns and chatbot
            function hideAllPopups() {
                userMenuDropdown.classList.add('hidden');
                userMenuArrow.classList.remove('active');
                messageDropdown.classList.add('hidden');
                notificationDropdown.classList.add('hidden');
                chatbotWindow.classList.add('hidden'); // Also hide chatbot
            }

            // Toggle User Menu Dropdown
            userMenuButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent document click from closing immediately
                hideAllPopups(); // Close other popups
                userMenuDropdown.classList.toggle('hidden');
                userMenuArrow.classList.toggle('active');
            });

            // Toggle Message Dropdown
            messageButton.addEventListener('click', function(event) {
                event.stopPropagation();
                hideAllPopups();
                messageDropdown.classList.toggle('hidden');
            });

            // Toggle Notification Dropdown
            notificationButton.addEventListener('click', function(event) {
                event.stopPropagation();
                hideAllPopups();
                notificationDropdown.classList.toggle('hidden');
            });

            // Toggle Chatbot Window
            chatbotToggle.addEventListener('click', function(event) {
                event.stopPropagation();
                hideAllPopups(); // Close other popups
                chatbotWindow.classList.toggle('hidden');
            });

            // Close Chatbot Window from its own close button
            chatbotClose.addEventListener('click', function(event) {
                event.stopPropagation();
                chatbotWindow.classList.add('hidden');
            });

            // Close all popups when clicking outside
            document.addEventListener('click', function(event) {
                if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                    userMenuDropdown.classList.add('hidden');
                    userMenuArrow.classList.remove('active');
                }
                if (!messageButton.contains(event.target) && !messageDropdown.contains(event.target)) {
                    messageDropdown.classList.add('hidden');
                }
                if (!notificationButton.contains(event.target) && !notificationDropdown.contains(event.target)) {
                    notificationDropdown.classList.add('hidden');
                }
                if (!chatbotToggle.contains(event.target) && !chatbotWindow.contains(event.target)) {
                    chatbotWindow.classList.add('hidden');
                }
            });

            // Mobile Menu Toggle
            menuButton.addEventListener('click', function() {
                sidebar.classList.toggle('translate-x-full'); // Tailwind's `translate-x-full` moves it off-screen
                sidebar.classList.toggle('translate-x-0'); // `translate-x-0` moves it into view
                overlay.classList.toggle('hidden');
            });

            // Overlay click to close sidebar
            overlay.addEventListener('click', function() {
                sidebar.classList.add('translate-x-full');
                sidebar.classList.remove('translate-x-0');
                overlay.classList.add('hidden');
            });

            // Module Dropdown Toggles
            moduleToggles.forEach(button => {
                button.addEventListener('click', function() {
                    const dropdownContent = this.nextElementSibling;
                    const icon = this.querySelector('.rotate-icon');

                    dropdownContent.classList.toggle('active');
                    icon.classList.toggle('active');

                    // Close other module dropdowns
                    moduleToggles.forEach(otherButton => {
                        if (otherButton !== button) {
                            otherButton.nextElementSibling.classList.remove('active');
                            otherButton.querySelector('.rotate-icon').classList.remove('active');
                        }
                    });
                });
            });

            // NEW: Function to load content dynamically
            async function loadContent(pageName) {
                const url = pageMap[pageName];
                if (!url) {
                    console.error('Page not found in map:', pageName);
                    mainContentContainer.innerHTML = '<div class="text-charcoal-dark p-6">Content not found for this page.</div>';
                    return;
                }

                try {
                    // Display a loading indicator (optional)
                    mainContentContainer.innerHTML = '<div class="text-center p-8 text-charcoal-light">Loading content...</div>';

                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const content = await response.text();
                    mainContentContainer.innerHTML = content;
                } catch (error) {
                    console.error('Error loading content:', error);
                    mainContentContainer.innerHTML = `<div class="text-red-alert p-6">Failed to load content. Please try again. (${error.message})</div>`;
                }
            }

            // Handle all data-page clicks
            document.querySelectorAll('[data-page]').forEach(element => {
                element.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default link/button behavior
                    const page = this.dataset.page;
                    loadContent(page); // Load content dynamically

                    // Update active link styling in sidebar for main navigation items
                    if (this.closest('nav')) { // Only apply to links within the sidebar nav
                        mainNavLinks.forEach(navLink => {
                            navLink.classList.remove('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
                            navLink.classList.add('text-charcoal-dark', 'hover:bg-subtle-grey');
                        });
                        this.classList.add('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
                        this.classList.remove('text-charcoal-dark', 'hover:bg-subtle-grey');
                    }

                    // If on mobile, close sidebar after navigation
                    if (!menuButton.classList.contains('hidden')) { // Check if menu button is visible (i.e., on mobile)
                        sidebar.classList.add('translate-x-full');
                        sidebar.classList.remove('translate-x-0');
                        overlay.classList.add('hidden');
                    }
                });
            });

            // Tab functionality for My Progress
            function activateTab(tabId) {
                tabButtons.forEach(button => {
                    button.classList.remove('border-ocean-blue', 'text-ocean-blue');
                    button.classList.add('border-transparent', 'text-charcoal-dark');
                });
                document.getElementById(tabId + '-tab').classList.add('border-ocean-blue', 'text-ocean-blue');
                document.getElementById(tabId + '-tab').classList.remove('border-transparent', 'text-charcoal-dark');

                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });
                document.getElementById(tabId + '-content').classList.remove('hidden');
            }

            overviewTab.addEventListener('click', () => activateTab('overview'));
            modulesTab.addEventListener('click', () => activateTab('modules'));

            // Initialize the default active page and tab (e.g., 'home' and 'overview' tab)
            // Call loadContent for the initial page
            loadContent('home'); // Load home-content.html by default
            const initialPageLink = document.querySelector('a[data-page="home"]');
            if (initialPageLink) {
                initialPageLink.classList.add('text-ocean-blue', 'font-semibold', 'bg-subtle-grey');
                initialPageLink.classList.remove('text-charcoal-dark', 'hover:bg-subtle-grey');
            }
            activateTab('overview'); // Set initial active tab
        });
    </script>