// Wait for Tailwind to be available, then set config
(function() {
    // Function to set the config
    function setTailwindConfig() {
        if (typeof tailwind !== 'undefined') {
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'ocean-blue': '#0E5B75',        /* Primary Accent: Deep Ocean Blue */
                            'ocean-blue-dark': '#0A4A5D',   /* Darker shade for hover states */
                            'sage-green': '#8DAA9D',        /* Secondary Accent: Soft Sage Green */
                            'sage-green-dark': '#759185',   /* Darker shade for hover states */
                            'sage-green-light': '#D6E2DD',  /* Lighter shade for backgrounds */
                            'off-white': '#F9F9F9',         /* Background: Very Light Grey / Off-White */
                            'charcoal-dark': '#333333',     /* Text: Dark Charcoal Grey */
                            'charcoal-light': '#555555',    /* Slightly lighter text for secondary info */
                            'subtle-grey': '#E0E0E0',       /* Borders, Dividers, Disabled states */
                            'code-block-bg': '#EEEEEE',     /* Background for code blocks */
                            'goldenrod': '#EBA83A',         /* Highlight/Alert: Muted Goldenrod */
                            'goldenrod-dark': '#C28B2F',    /* Darker goldenrod for hover */
                            'vibrant-teal': '#14B8A6',      /* Vibrant Teal */
                            'emerald-600': '#059669',       /* Emerald 600 for hover states */
                            'red-alert': '#EF4444',         /* Red for overdue assignments */
                        },
                        fontFamily: {
                            inter: ['Inter', 'sans-serif'],
                            montserrat: ['Montserrat', 'sans-serif'],
                            firacode: ['Fira Code', 'monospace'],
                        },
                        boxShadow: {
                            'custom': '0 4px 12px rgba(0, 0, 0, 0.05)', /* Subtle shadow for cards */
                        },
                        keyframes: {
                            pulseOnce: {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.03)' },
                            }
                        },
                        animation: {
                            'pulse-once': 'pulseOnce 1s ease-in-out 1', // Runs once on load
                        }
                    }
                }
            };
            return true;
        }
        return false;
    }

    // Try to set config immediately
    if (!setTailwindConfig()) {
        // If tailwind is not ready, wait for it
        let attempts = 0;
        const maxAttempts = 50;
        const checkInterval = setInterval(function() {
            attempts++;
            if (setTailwindConfig() || attempts >= maxAttempts) {
                clearInterval(checkInterval);
            }
        }, 100);
    }
})();