// ==========================================================================
// PORTFOLIO INTERACTIVE LIFECYCLE & PARADIGMS
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
    
    // ─── 1. MODAL BACKGROUND CLOSE INITIALIZATION ───
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

    // ─── 2. CONTACT FORM ASYNCHRONOUS SUBMISSION & REDIRECT ───
    const contactForm = document.getElementById('portfolioContactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Intercept and halt the standard external web page redirect loop
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Visual loading state for premium feel
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Collect layout form parameters dynamically
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Trigger native success browser overlay message
                    alert("Message is sent!");
                    
                    // Clear user data entry text inputs completely
                    contactForm.reset();
                    
                    // Smoothly auto-scroll layout viewport up back to the Hero section
                    const heroSection = document.getElementById('hero');
                    if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Re-align active desktop UI status tracker highlight on home nav node
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    const homeLink = document.querySelector('a[href="#hero"]');
                    if (homeLink) homeLink.classList.add('active');
                } else {
                    // Fallback visual safety if the form transmission key breaks
                    formFeedback.textContent = "❌ Transmission failed. Please try again.";
                    formFeedback.className = "form-feedback error active";
                }
            })
            .catch(error => {
                // Network pipeline drop safety tracking error
                formFeedback.textContent = "❌ Network error. Please check your connection.";
                formFeedback.className = "form-feedback error active";
            })
            .finally(() => {
                // Restore primary CTA element functional submission triggers
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear out visual interface alert text containers safely over short intervals
                setTimeout(() => {
                    if (formFeedback.classList.contains('active')) {
                        formFeedback.classList.remove('active');
                    }
                }, 4000);
            });
        });
    }
});