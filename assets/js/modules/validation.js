/**
 * Form Validation & Wizard Helper Module
 */
window.Validation = {
    /**
     * Validate email syntax using strict RFC regex.
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate phone format (must begin with + or numbers and have length bounds).
     */
    isValidPhone(phone) {
        const phoneRegex = /^\+?[0-9\s\-()]{7,25}$/;
        return phoneRegex.test(phone);
    },

    /**
     * Show validation error for a field.
     */
    showError(inputElement, message) {
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.classList.add('form-control--error');
        
        // Find or create error element
        const parent = inputElement.closest('.form-group');
        let errorSpan = parent.querySelector('.form-error-msg');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'form-error-msg';
            parent.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    },

    /**
     * Clear validation errors for a field.
     */
    clearError(inputElement) {
        inputElement.removeAttribute('aria-invalid');
        inputElement.classList.remove('form-control--error');
        
        const parent = inputElement.closest('.form-group');
        const errorSpan = parent.querySelector('.form-error-msg');
        if (errorSpan) {
            errorSpan.remove();
        }
    },

    /**
     * Setup drag-and-drop file inputs.
     */
    initDragAndDrop(uploadContainer, fileInput, onFileSelected) {
        if (!uploadContainer || !fileInput) return;

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadContainer.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadContainer.classList.add('form-upload--dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadContainer.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadContainer.classList.remove('form-upload--dragover');
            }, false);
        });

        uploadContainer.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                if (typeof onFileSelected === 'function') {
                    onFileSelected(files[0]);
                }
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                if (typeof onFileSelected === 'function') {
                    onFileSelected(fileInput.files[0]);
                }
            }
        });
    }
};
