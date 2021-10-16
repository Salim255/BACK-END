const login = async (email, password) => {
  try {
    const res = await axios({
      //axios return a promis, and when ever there are an error axios will throght the error
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    
    if (res.data.status === 'Success') {
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/'); //We use this in order to load another page
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
