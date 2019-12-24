const anchorTag = document.getElementById('login');
const outputText = document.getElementById('output');


anchorTag.addEventListener('click', (e) => {
  e.preventDefault();

  /* eslint-disable new-cap */
  /* eslint-disable no-undef */
  const authenticator = new netlify.default({});
  authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, data) => {
    async function goForAvatar() {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      const json = await response.json();

      function draw() {
        const avatar = new Image();
        avatar.src = json.avatar_url;
        avatar.classList.add('ava');
        document.querySelector('#login').before(avatar);

        // прячем через семь секунд
        setTimeout(() => {
          avatar.remove();
        }, 7000);
      }
      draw();
    }

    if (err) {
      outputText.innerHTML = '<div class="pane pane_error"><button class="remove-button">[x]</button><p>Error Authenticating with GitHub.</p></div>';
    } else {
      outputText.innerHTML = '<div class="pane pane-success"><button class="remove-button">[x]</button><p>Success! You have authenticated with GitHub.</p></div>';
      goForAvatar();
    }

    const pane = document.querySelector('.pane');
    document.querySelector('.remove-button').onclick = () => pane.remove();
  });
});
