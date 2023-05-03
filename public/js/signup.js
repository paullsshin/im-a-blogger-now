async function signupFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log(username, password);
      if (response.ok) {
        // console.log('SUCCESS ---------------------------------------------------')
  
        document.location.replace('/dashboard/');
      } else {
        console.log(response);
        // console.log(response);
        // console.log(response.statusText);
  
      }
    }
  }
  

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);