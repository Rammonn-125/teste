const registerForm = document.getElementById('registerForm');
const registerError = document.getElementById('registerError');
const registerSuccess = document.getElementById('registerSuccess');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // prevents default behavior from sending form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // checking if passowrds match
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        // sending data do server for new user registration
        const response = await axios.post('http://localhost:5000/api/register', {
            username,
            password
        });

        // show success message
        registerSuccess.style.display = 'block';
        registerError.style.display = 'none';
        registerForm.reset();

    } catch (error) {
        registerSuccess.style.display = 'none';
        registerError.style.display = 'block';
    }
});