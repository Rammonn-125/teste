const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // prevents default behavior from sending form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // sending credentials to server for authentication
        const response = await axios.post('http://localhost:5000/api/login', {
            username,
            password
        });

        // redirect to tasks page if login well succeed
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            window.location.href = 'index.html';
        }
    } catch (error) {
        loginError.style.display = 'block';
    }
});