    // --- DOM Elements ---
    const mainContainer = document.getElementById('mainContainer');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const showModuleSelectionButton = document.getElementById('showModuleSelectionButton');
    const moduleSelectionScreen = document.getElementById('moduleSelectionScreen');
    const gameArea = document.getElementById('gameArea');
    const backToModulesButton = document.getElementById('backToModulesButton');
    
    const moduleTitle = document.getElementById('moduleTitle');
    const moduleInstruction = document.getElementById('moduleInstruction');

    // Module containers
    const hardwareModule = document.getElementById('hardwareModule');
    const keyboardConquerorModule = document.getElementById('keyboardConquerorModule');
    const mouseMasterModule = document.getElementById('mouseMasterModule');
    const allModuleContents = document.querySelectorAll('.module-content');

    // Completion Modal
    const completionModal = document.getElementById('completionModal');
    const modalTitleEl = document.getElementById('modalTitle'); // Renamed to avoid conflict
    const modalMessageEl = document.getElementById('modalMessage');
    const modalImageEl = document.getElementById('modalImage');
    const modalCloseButton = document.getElementById('modalCloseButton');

    let activeModuleName = null; // To know which module is active for modal logic

    // --- Global Game State ---
    let draggedItem = null;

    // --- Hardware Module Elements & State ---
    const hw_labelsContainer = document.getElementById('labelsContainer');
    const hw_dropZonesContainer = document.getElementById('dropZonesContainer');
    const hw_scoreDisplay = document.getElementById('hw-score');
    const hw_totalItemsDisplay = document.getElementById('hw-totalItems');
    const hw_feedbackMessage = document.getElementById('hw-feedbackMessage');
    const hw_resetModuleButton = document.getElementById('hw-resetModuleButton');
    let hw_currentScore = 0;
    let hw_itemsToMatch = 0;
    const hardwareItems = [
        { id: 'monitor', name: 'Monitor', imgSrc: 'https://placehold.co/200x150/A5B4FC/FFFFFF?text=Monitor' },
        { id: 'keyboard', name: 'Keyboard', imgSrc: 'https://placehold.co/200x150/A78BFA/FFFFFF?text=Keyboard' },
        { id: 'mouse', name: 'Mouse', imgSrc: 'https://placehold.co/200x150/F472B6/FFFFFF?text=Mouse' },
        { id: 'cpu', name: 'CPU (Tower)', imgSrc: 'https://placehold.co/200x150/FBBF24/FFFFFF?text=CPU' },
        { id: 'printer', name: 'Printer', imgSrc: 'https://placehold.co/200x150/34D399/FFFFFF?text=Printer' },
        { id: 'speakers', name: 'Speakers', imgSrc: 'https://placehold.co/200x150/60A5FA/FFFFFF?text=Speakers' }
    ];

    // --- Keyboard Conqueror Elements & State ---
    const kc_charDisplay = document.getElementById('kc-char-display');
    const kc_feedbackMessage = document.getElementById('kc-feedbackMessage');
    const kc_scoreDisplay = document.getElementById('kc-score');
    const kc_attemptsDisplay = document.getElementById('kc-attempts');
    const kc_resetModuleButton = document.getElementById('kc-resetModuleButton');
    let kc_currentScore = 0;
    let kc_attemptsLeft = 10;
    let kc_targetChar = '';
    const kc_chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let kc_gameActive = false;


    // --- Mouse Master Elements & State ---
    const mm_playArea = document.getElementById('mm-play-area');
    const mm_feedbackMessage = document.getElementById('mm-feedbackMessage');
    const mm_scoreDisplay = document.getElementById('mm-score');
    const mm_targetsLeftDisplay = document.getElementById('mm-targetsLeft');
    const mm_startResetButton = document.getElementById('mm-startResetButton');
    let mm_currentScore = 0;
    let mm_targetsToClick = 10;
    let mm_currentTarget = null;
    let mm_gameActive = false;


    // --- Event Listeners ---
    showModuleSelectionButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        moduleSelectionScreen.classList.remove('hidden');
    });

    moduleSelectionScreen.addEventListener('click', (e) => {
        const button = e.target.closest('.button-module');
        if (button) {
            const moduleName = button.dataset.module;
            loadModule(moduleName);
        }
    });

    backToModulesButton.addEventListener('click', () => {
        gameArea.classList.add('hidden');
        allModuleContents.forEach(mc => mc.classList.add('hidden'));
        moduleSelectionScreen.classList.remove('hidden');
        activeModuleName = null; // Reset active module
        // Stop any active game logic if necessary
        if (kc_gameActive) stopKeyboardConqueror();
        if (mm_gameActive) stopMouseMaster();
    });
    
    modalCloseButton.addEventListener('click', closeCompletionModal);

    // --- Module Loading ---
    function loadModule(moduleName) {
        activeModuleName = moduleName;
        moduleSelectionScreen.classList.add('hidden');
        gameArea.classList.remove('hidden');
        allModuleContents.forEach(mc => mc.classList.add('hidden')); // Hide all modules first

        if (moduleName === 'hardware') {
            hardwareModule.classList.remove('hidden');
            moduleTitle.textContent = "Hardware Unscramble";
            moduleInstruction.textContent = "Drag the name of each computer part to its correct picture.";
            initializeHardwareModule();
        } else if (moduleName === 'keyboard') {
            keyboardConquerorModule.classList.remove('hidden');
            moduleTitle.textContent = "Keyboard Conqueror";
            moduleInstruction.textContent = "Type the character that appears on the screen. Focus on accuracy!";
            initializeKeyboardConqueror();
        } else if (moduleName === 'mouse') {
            mouseMasterModule.classList.remove('hidden');
            moduleTitle.textContent = "Mouse Master";
            moduleInstruction.textContent = "Click the red circles as quickly and accurately as you can.";
            initializeMouseMaster();
        }
    }

    // --- Hardware Module Logic ---
    function initializeHardwareModule() {
        hw_currentScore = 0;
        hw_itemsToMatch = hardwareItems.length;
        updateHardwareScoreDisplay();
        hw_feedbackMessage.textContent = 'Drag a label to a picture.';
        hw_feedbackMessage.className = 'feedback-message text-slate-500';
        hw_labelsContainer.innerHTML = '';
        hw_dropZonesContainer.innerHTML = '';

        const shuffledItems = [...hardwareItems].sort(() => Math.random() - 0.5);

        shuffledItems.forEach(item => {
            const label = document.createElement('div');
            label.id = `label-${item.id}`;
            label.textContent = item.name;
            label.draggable = true;
            label.classList.add('draggable', 'p-2', 'bg-white', 'rounded-md', 'shadow', 'text-center', 'font-semibold', 'text-blue-700', 'border', 'border-blue-300');
            label.dataset.itemId = item.id;
            hw_labelsContainer.appendChild(label);
            label.addEventListener('dragstart', handleDragStart);
            label.addEventListener('dragend', handleDragEnd);
        });
        
        hardwareItems.forEach(item => { // Keep dropzones in consistent order for predictability
            const dropZoneWrapper = document.createElement('div');
            dropZoneWrapper.classList.add('p-3', 'bg-slate-50', 'rounded-lg', 'shadow-sm');
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.name;
            img.classList.add('component-image', 'mx-auto', 'mb-2');
            img.onerror = function() { this.src='https://placehold.co/200x150/CCCCCC/FFFFFF?text=Error'; };
            const dropZone = document.createElement('div');
            dropZone.id = `dropzone-${item.id}`;
            dropZone.classList.add('drop-zone', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-slate-500', 'italic', 'p-2');
            dropZone.dataset.expectedItem = item.id;
            dropZone.textContent = `Place ${item.name}`;
            dropZone.addEventListener('dragover', handleDragOver);
            dropZone.addEventListener('dragenter', handleDragEnter);
            dropZone.addEventListener('dragleave', handleDragLeave);
            dropZone.addEventListener('drop', handleDrop);
            dropZoneWrapper.appendChild(img);
            dropZoneWrapper.appendChild(dropZone);
            hw_dropZonesContainer.appendChild(dropZoneWrapper);
        });
        hw_totalItemsDisplay.textContent = hw_itemsToMatch;
    }
    hw_resetModuleButton.addEventListener('click', initializeHardwareModule);

    function updateHardwareScoreDisplay() {
        hw_scoreDisplay.textContent = hw_currentScore;
    }
    function handleDragStart(event) {
        draggedItem = event.target;
        event.dataTransfer.setData('text/plain', event.target.id);
        setTimeout(() => event.target.classList.add('dragging', 'opacity-50'), 0);
        hw_feedbackMessage.textContent = `Dragging ${draggedItem.textContent}...`;
        hw_feedbackMessage.className = 'feedback-message text-slate-500';
    }
    function handleDragEnd(event) {
        event.target.classList.remove('dragging', 'opacity-50');
        draggedItem = null;
        document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('hovered'));
    }
    function handleDragOver(event) { event.preventDefault(); }
    function handleDragEnter(event) {
        event.preventDefault();
        if (event.target.classList.contains('drop-zone') && !event.target.classList.contains('correct')) {
            event.target.classList.add('hovered');
        }
    }
    function handleDragLeave(event) {
        if (event.target.classList.contains('drop-zone')) {
            event.target.classList.remove('hovered');
        }
    }
    function handleDrop(event) {
        event.preventDefault();
        const dropZone = event.target.closest('.drop-zone');
        if (!dropZone || !draggedItem) return;
        dropZone.classList.remove('hovered');
        const droppedItemId = draggedItem.dataset.itemId;
        const expectedItemId = dropZone.dataset.expectedItem;

        if (droppedItemId === expectedItemId && !dropZone.classList.contains('correct')) {
            hw_currentScore++;
            updateHardwareScoreDisplay();
            dropZone.textContent = `Correct: ${draggedItem.textContent}`;
            dropZone.classList.add('correct', 'text-green-700', 'font-semibold');
            dropZone.classList.remove('incorrect', 'italic', 'text-slate-500');
            draggedItem.draggable = false;
            draggedItem.classList.remove('draggable', 'bg-white', 'border-blue-300');
            draggedItem.classList.add('opacity-50', 'bg-green-100', 'border-green-400', 'cursor-not-allowed');
            hw_feedbackMessage.textContent = `Great! ${draggedItem.textContent} is correct.`;
            hw_feedbackMessage.className = 'feedback-message text-green-600';
            if (hw_currentScore === hw_itemsToMatch) {
                hw_feedbackMessage.textContent = 'All items matched! Well done!';
                hw_feedbackMessage.className = 'feedback-message text-green-600 font-bold';
                showCompletionModal("Hardware Module Complete!", "You've identified all parts. Excellent!", 'https://placehold.co/100x100/22C55E/FFFFFF?text=Done!');
            }
        } else if (dropZone.classList.contains('correct')) {
            hw_feedbackMessage.textContent = `This spot is already correct.`;
            hw_feedbackMessage.className = 'feedback-message text-orange-600';
        } else {
            hw_feedbackMessage.textContent = `Oops! That's not for ${draggedItem.textContent}. Try again.`;
            hw_feedbackMessage.className = 'feedback-message text-red-600';
            dropZone.classList.add('incorrect');
            setTimeout(() => dropZone.classList.remove('incorrect'), 1000);
        }
        draggedItem = null;
    }

    // --- Keyboard Conqueror Logic ---
    function initializeKeyboardConqueror() {
        kc_currentScore = 0;
        kc_attemptsLeft = 10; // Or based on levels
        updateKeyboardConquerorDisplay();
        kc_feedbackMessage.textContent = "Press 'Start/Reset' to begin.";
        kc_feedbackMessage.className = 'feedback-message text-slate-500';
        kc_charDisplay.textContent = '...';
        kc_charDisplay.classList.remove('correct', 'incorrect');
        kc_gameActive = false;
        document.removeEventListener('keydown', handleKeyPress); // Ensure old listeners are off
    }
    kc_resetModuleButton.addEventListener('click', startKeyboardConqueror);

    function startKeyboardConqueror() {
        kc_gameActive = true;
        kc_currentScore = 0;
        kc_attemptsLeft = 10; // Total characters to type in a round
        updateKeyboardConquerorDisplay();
        kc_feedbackMessage.textContent = "Type the character!";
        kc_feedbackMessage.className = 'feedback-message text-slate-500';
        kc_resetModuleButton.textContent = "Reset Game";
        nextKeyboardChar();
        document.addEventListener('keydown', handleKeyPress);
    }
    
    function stopKeyboardConqueror() {
        kc_gameActive = false;
        document.removeEventListener('keydown', handleKeyPress);
        kc_resetModuleButton.textContent = "Start/Reset";
    }

    function nextKeyboardChar() {
        if (kc_attemptsLeft <= 0 || !kc_gameActive) {
            stopKeyboardConqueror();
            kc_feedbackMessage.textContent = "Round over! Great job!";
            kc_feedbackMessage.className = 'feedback-message text-green-600 font-bold';
             showCompletionModal("Keyboard Practice Complete!", `Your score: ${kc_currentScore}. Keep practicing!`, 'https://placehold.co/100x100/22C55E/FFFFFF?text=Typed!');
            return;
        }
        const randomIndex = Math.floor(Math.random() * kc_chars.length);
        kc_targetChar = kc_chars[randomIndex];
        kc_charDisplay.textContent = kc_targetChar;
        kc_charDisplay.classList.remove('correct', 'incorrect');
    }

    function handleKeyPress(event) {
        if (!kc_gameActive || event.key.length > 1) return; // Ignore control keys, etc.

        const typedChar = event.key.toLowerCase();
        if (typedChar === kc_targetChar) {
            kc_currentScore++;
            kc_charDisplay.classList.add('correct');
            kc_charDisplay.classList.remove('incorrect');
            kc_feedbackMessage.textContent = "Correct!";
            kc_feedbackMessage.className = 'feedback-message text-green-600';
        } else {
            kc_charDisplay.classList.add('incorrect');
            kc_charDisplay.classList.remove('correct');
            kc_feedbackMessage.textContent = `Oops! Typed: ${typedChar}, Expected: ${kc_targetChar}`;
            kc_feedbackMessage.className = 'feedback-message text-red-600';
        }
        kc_attemptsLeft--;
        updateKeyboardConquerorDisplay();
        if(kc_gameActive) { // Only proceed if game still active
            setTimeout(nextKeyboardChar, 500); // Delay before showing next character
        }
    }
    function updateKeyboardConquerorDisplay() {
        kc_scoreDisplay.textContent = kc_currentScore;
        kc_attemptsDisplay.textContent = kc_attemptsLeft;
    }


    // --- Mouse Master Logic ---
    function initializeMouseMaster() {
        mm_currentScore = 0;
        mm_targetsToClick = 10; // Number of targets per round
        updateMouseMasterDisplay();
        mm_feedbackMessage.textContent = "Click 'Start/Reset' to begin.";
        mm_feedbackMessage.className = 'feedback-message text-slate-500';
        mm_playArea.innerHTML = ''; // Clear any old targets
        mm_gameActive = false;
        if (mm_currentTarget) {
            mm_currentTarget.removeEventListener('click', handleTargetClick);
            mm_currentTarget = null;
        }
    }
    mm_startResetButton.addEventListener('click', startMouseMaster);

    function startMouseMaster() {
        mm_gameActive = true;
        mm_currentScore = 0;
        mm_targetsToClick = 10;
        updateMouseMasterDisplay();
        mm_feedbackMessage.textContent = "Click the red circles!";
        mm_feedbackMessage.className = 'feedback-message text-slate-500';
        mm_startResetButton.textContent = "Reset Game";
        spawnMouseTarget();
    }

    function stopMouseMaster() {
        mm_gameActive = false;
        if (mm_currentTarget) {
            mm_currentTarget.remove();
            mm_currentTarget = null;
        }
        mm_startResetButton.textContent = "Start/Reset";
    }

    function spawnMouseTarget() {
        if (mm_targetsToClick <= 0 || !mm_gameActive) {
            stopMouseMaster();
            mm_feedbackMessage.textContent = "Round complete! Excellent clicking!";
            mm_feedbackMessage.className = 'feedback-message text-green-600 font-bold';
            showCompletionModal("Mouse Practice Complete!", `Your score: ${mm_currentScore}. Great agility!`, 'https://placehold.co/100x100/22C55E/FFFFFF?text=Clicked!');
            return;
        }

        if (mm_currentTarget) mm_currentTarget.remove(); // Remove old target if any

        mm_currentTarget = document.createElement('div');
        mm_currentTarget.classList.add('mm-target');
        
        // Ensure target is fully within play area
        const playAreaRect = mm_playArea.getBoundingClientRect();
        const targetSize = 50; // Must match CSS
        const maxX = playAreaRect.width - targetSize;
        const maxY = playAreaRect.height - targetSize;

        mm_currentTarget.style.left = `${Math.random() * maxX}px`;
        mm_currentTarget.style.top = `${Math.random() * maxY}px`;
        
        mm_currentTarget.addEventListener('click', handleTargetClick, { once: true }); // Auto-remove listener after click
        mm_playArea.appendChild(mm_currentTarget);
    }

    function handleTargetClick() {
        if (!mm_gameActive) return;

        mm_currentScore++;
        mm_targetsToClick--;
        updateMouseMasterDisplay();
        mm_feedbackMessage.textContent = "Nice shot!";
        mm_feedbackMessage.className = 'feedback-message text-green-600';
        
        // Remove clicked target and spawn a new one after a brief delay
        if (mm_currentTarget) mm_currentTarget.remove(); 
        mm_currentTarget = null; // Clear reference
        
        if(mm_gameActive && mm_targetsToClick > 0) {
            setTimeout(spawnMouseTarget, 200); // Short delay before next target
        } else if (mm_gameActive && mm_targetsToClick <=0) {
            spawnMouseTarget(); // This will trigger the end game condition
        }
    }
    function updateMouseMasterDisplay() {
        mm_scoreDisplay.textContent = mm_currentScore;
        mm_targetsLeftDisplay.textContent = mm_targetsToClick;
    }


    // --- Modal Functions ---
    function showCompletionModal(title, message, imageUrl) {
        modalTitleEl.textContent = title;
        modalMessageEl.textContent = message;
        if (imageUrl) {
            modalImageEl.src = imageUrl;
            modalImageEl.classList.remove('hidden');
        } else {
            modalImageEl.classList.add('hidden');
        }
        completionModal.style.display = 'flex';
    }

    function closeCompletionModal() {
        completionModal.style.display = 'none';
        // Optionally, navigate back to module selection or reset the current module view
        // For now, it just closes. The user can use "Back to Modules" or reset.
        if (activeModuleName) { // If a module was active
            // Could add logic here, e.g., if keyboard game ended, reset button text
             if (activeModuleName === 'keyboard' && !kc_gameActive) {
                kc_resetModuleButton.textContent = "Start/Reset";
            }
            if (activeModuleName === 'mouse' && !mm_gameActive) {
                mm_startResetButton.textContent = "Start/Reset";
            }
        }
    }

