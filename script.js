$(document).ready(function () {
  $('#toggle-facts').click(function () {
    $('#fun-facts').toggleClass('d-none');
  });
  
  $('#skillsAccordion').accordion();
  $('#contact-date').datepicker();
  $('#skill-list').on('click', 'li', function () {
    $('#skill-list li').removeClass('active');
    $(this).addClass('active');
  });

  $('#contactForm').submit(function (e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    if (name.length >= 2 && email.includes('@') && message !== '') {
      $('#success-message').removeClass('d-none').hide().fadeIn();
      this.reset();
    } else {
      alert('Please fill out all fields correctly.');
    }
  });

  $('#fetchGitHub').click(function () {
    const username = $('#githubUsername').val().trim();
    if (!username) {
      alert('Please enter a GitHub username.');
      return;
    }

    $('#githubData').html('<p>Loading...</p>');

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      method: 'GET',
      success: function (data) {
        $('#githubData').html(`
          <div class="text-center">
            <img src="${data.avatar_url}" class="img-thumbnail" width="120" />
            <h5 class="mt-2">@${data.login}</h5>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
            <a href="${data.html_url}" target="_blank" class="btn btn-outline-primary btn-sm">View GitHub</a>
          </div>
        `);
      },
      error: function () {
        $('#githubData').html('<p class="text-danger">User not found or error fetching data.</p>');
      }
    });
  });
});
