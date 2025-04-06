// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if(menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    // Close navbar when clicking outside
    document.addEventListener('click', function(e) {
        if(!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
        }
    });
});