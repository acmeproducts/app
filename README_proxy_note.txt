
In your Render server code (combined_oauth_server_for_repo.js):

Change your /google/callback route to:

app.get('/google/callback', async (req, res) => {
    // (after obtaining and storing refresh_token)
    res.redirect('https://yourusername.github.io/app/');
});

This never changes again.
Your GitHub Pages app can now be updated as often as you want inside /app/.
