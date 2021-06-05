const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    }
    else {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
