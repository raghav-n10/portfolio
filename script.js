// ===== SMOOTH SCROLLING FUNCTIONALITY =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// ===== STICKY HEADER FUNCTIONALITY =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ===== MOBILE MENU FUNCTIONALITY =====
const mobileMenuBtn = document.querySelector('.mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// ===== FORM HANDLING FUNCTIONALITY =====
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');
const successModal = document.getElementById('success-modal');
const modalClose = document.querySelector('.modal-close');
const modalOkBtn = document.getElementById('modal-ok-btn');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Prepare form data for FormSubmit
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('_subject', 'New message from your portfolio website!');
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');
        
        // Send form data using Fetch API
        fetch('https://formsubmit.co/ajax/raghavking1810@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                // Show success modal
                successModal.style.display = 'flex';
                // Reset form
                form.reset();
            } else {
                showMessage('There was an error sending your message. Please try again.', 'error');
            }
        })
        .catch(error => {
            showMessage('There was an error sending your message. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    });
}

// ===== MODAL FUNCTIONALITY =====
modalClose.addEventListener('click', function() {
    successModal.style.display = 'none';
});

modalOkBtn.addEventListener('click', function() {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});

// ===== UTILITY FUNCTIONS =====
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}