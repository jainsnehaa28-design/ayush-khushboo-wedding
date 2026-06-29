/* =========================================================
   FIREBASE CONFIGURATION
   =========================================================
   This file connects your wedding site to a free Firebase
   Realtime Database, so RSVPs and guestbook wishes are
   saved for real and shown live to every visitor.

   HOW TO GET YOUR OWN KEYS (free):
   1. Go to https://console.firebase.google.com
   2. Click "Add project" -> name it (e.g. "ayush-khushboo-wedding")
      -> you can disable Google Analytics, it's not needed
   3. Once created, click the "</>" (Web) icon to add a web app
      -> nickname it anything -> click "Register app"
   4. Firebase will show you a code block with a "firebaseConfig"
      object. Copy those values into the object below.
   5. In the left sidebar, go to Build -> Realtime Database
      -> click "Create Database" -> choose a location -> 
      start in "test mode" (we'll lock it down below).
   6. Go to the "Rules" tab of the Realtime Database and paste:

      {
        "rules": {
          "rsvps": {
            ".read": true,
            ".write": true
          },
          "wishes": {
            ".read": true,
            ".write": true
          }
        }
      }

      Click "Publish". This allows anyone to submit/read RSVPs
      and wishes (needed for a public invite site) without
      needing a login system.

   7. Replace the placeholder values below with your real keys.
   8. Save this file and re-upload it to GitHub. Done!

   NOTE: It's normal/safe for these keys to be visible in your
   public site's code — Firebase API keys are not secret, the
   database Rules (step 6) are what actually control access.
   ========================================================= */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* Don't edit below this line */
try{
  if(firebaseConfig.apiKey !== "YOUR_API_KEY"){
    firebase.initializeApp(firebaseConfig);
    window.firebaseDB = firebase.database();
  } else {
    console.warn("Firebase not configured yet — RSVP/wishes will run in local-only fallback mode. See firebase-config.js for setup steps.");
  }
}catch(err){
  console.error("Firebase failed to initialize:", err);
}
