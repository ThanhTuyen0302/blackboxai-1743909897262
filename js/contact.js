// Contact form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    const contactBtn = document.getElementById('contact-btn');
    
    if(contactForm && contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if(!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission handling
            const formData = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            // In a real app, you would send this to a server
            console.log('Form submitted:', formData);
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }
});