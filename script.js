// ==========================================================================
// PORTFOLIO INTERACTIVE CASE STUDY EXPANSION PARADIGMS
// ==========================================================================

function openProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Prevent background container elements from scrolling out underneath active views
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Restore background baseline scrolling mechanics smoothly
        document.body.style.overflow = 'auto';
    }
}

// Global Event Registration
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.project-modal');
    
    // Clicking the background dark blur overlay area automatically dismisses the popup window
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            // Only close if they click the overlay backdrop itself, not inside content box
            if (event.target === modal) {
                closeProjectModal(modal.id);
            }
        });
    });
});