const newFormHandler = async (event) => {
    event.preventDefault();
    
    if (username && post) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ username, post }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to create a post');
      }
    }
  };
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);