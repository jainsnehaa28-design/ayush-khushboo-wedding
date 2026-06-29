# Ayush & Khushboo — Wedding Invitation Website

A digital wedding invitation, built to live on GitHub Pages.

## Files

- `index.html` — page structure and content
- `style.css` — all visual styling (colors, fonts, layout, animations)
- `script.js` — countdown timer, card carousel, gate animation, form handling
- `firebase-config.js` — connects RSVP + guestbook forms to a free Firebase database (see setup instructions inside that file)

## To edit content

- **Names, dates, venue:** edit directly in `index.html`
- **Event details (Myra, Sangeet, Carnival, Baarat, Pheras, Reception):** edit the `EVENTS` array at the top of `script.js`
- **Countdown target date:** edit `COUNTDOWN_TARGET` in `script.js`
- **Colors/fonts:** edit the `:root` variables at the top of `style.css`

## To connect RSVP + guestbook (make them actually save data)

Open `firebase-config.js` — full step-by-step instructions are written inside as comments. Takes about 10 minutes, completely free.

## To go live

This site is built to be hosted via **GitHub Pages**. See the setup guide provided alongside this project for the full walkthrough.
