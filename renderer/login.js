document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await window.api.login({ username, password });

    if (result.success) {
        window.api.navigate('dashboard');
    } else {
        const errorMsg = document.getElementById('error-msg');
        errorMsg.textContent = 'Invalid username or password';
        errorMsg.style.display = 'block';
    }
});