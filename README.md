# Installation guide
## Frontend
---
The program is written in React and requires the following to set up the program locally
```bash
cd u08Frontend/
npm istall
npm run dev
```
The Google Maps API is an integral part of this app. You'll need to set up your own Google account to get an API key, [this guide](https://developers.google.com/maps) should help you set that up. The key should then be placed in a .env file like this: `VITE_GOOGLE_API_KEY=YOUR_KEY_HERE`.
## Backend
---
The backend is written in Express.js with a MongoDB.

To start the backend locally for development purposes do the following
```bash
cd u08Backend/
npm istall
npm run dev
```
