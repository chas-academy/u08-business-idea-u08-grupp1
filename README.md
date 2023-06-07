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
# What does this codebase solve?

## Overview
We have made an app called Stockholm Workout Companion so that the population of Stockholm will easily be able to find the closest outdoor gym, and the way to get there. They can use their own location to see where the closest gyms are located and also see on a map where the gyms are, to better help plan their day. 
The users can also filter gyms depending on equipment.
Our user interface can get members to find other people to workout with, and also collect points to get free items, to keep them motivated. In our survey, as many as 86% of the participants would appreciate an app where they can find a workout companion.
There is no app like this on the market today, and we have made the graphics similar to Stockholm city’s webpage so people will recognise the interface.
This is a part of Stockholm city’s plan to have a happier and healthier population.
## Goals
- To raise the current performance rating of 20% According to our thorough investigation, it turns out that only 40% of the population uses outdoor gyms sometimes, 0% uses them frequently.
- To increase the health of the population of Stockholm by 25% in the next 5 years. Since workout prevents illness, both physical and mental, we aim to ease the future work for our healthcare system by 25% in the coming years. We strive to keep the users of the app motivated.
## Unique selling point
We are six competent and professional web developers, designers and testers that can produce a user oriented and interactive app/website that will have the high standard that the market demands. Since we are of different age, gender and are at different points in our lives, we cover a broad part of the target audience, and can better understand the users points of view.

# Usage

## Find closest gyms
The app will display the 9 gyms closest to the users position. The user may use the map to get direction and information about the gyms or scroll down to see our gym cards where images and information is displayed.

# Documentation
[Project documentation (OneNote)](https://1drv.ms/o/s!AtmJd2tDQ-CNgSu68NDxDSZbgdKF?e=r8u9x6)

[Business plan](https://docs.google.com/document/d/1w7-FuE6tZFyE6CDUOxONT7RMdXzNCmHFuLaj6N8IH1Q/edit?usp=sharing)

# Developers
- https://github.com/VictorHedegran
- https://github.com/Arron-Reed
- https://github.com/FredrikGullin
- https://github.com/MalinBrag
- https://github.com/khadizatulqubra
- https://github.com/skojarduva

## License

The code in this repository is licensed under the MIT License.

---

## Attribution

This project utilizes the following external APIs:

- [Stockholm Stads Service API](https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits)
- [Google Maps API](https://developers.google.com/maps)

Please make sure to review and comply with the terms of use and licensing of these external APIs.

---

## Disclaimer

This project is a school assignment and is provided as-is, without any warranties or guarantees of any kind. The creators of this project are not responsible for any misuse, damages, or consequences resulting from the use of this application.

---

Feel free to modify and adapt this license to fit your specific project and requirements.
