# FlightRadar

Project for the [MongoDB Atlas Hackathon 2022 on DEV](https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-2022-on-dev-2107).

Flight Radar is a real-time interactive map for flight simulator games, or with simple modifications, a lot more.

Unfortunately, I didn't have enough time to complete everything I wanted, and there are some bugs or unfinished UIs.

### App Link
https://flightradar.kopter.me/
https://flightradar.kopter.me/livemap

### Screenshots
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/50ro92exvvimkx0ii9k9.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y39pbl8hukxnqahcr9qq.png)

### Description
Every time you enter the website, you will be logged annually to MongoDB, so that you can start to fetch the plane's data in real-time and to get alert notifications, and what are those, every time a plane change to squawk code 7600 (Radio/Communications Failure) or 7700 (Emergency Situation), you will get an alert on the bottom right corner of your screen with information and ways to view more information.

On the live map, the planes will update their location every time new data gets uploaded, you can also pause them by clicking the button on the top right, and clicking again will resume them. By clicking on a plane you will open a small window on your middle left with more information about that flight.

On the all flights page, you have the same information as in the live map except in a table and text form.

On your account,  after one is created or logged in, you can log out of your account, check your flights and generate a key to be used to post data about your current flight via the Cloudflare Worker.

A CRON job should be added, to remove flights that were never terminated via the Cloudflare worker.

### Background
I enjoy aviation, so I play flight simulators, so I thought I could create something that could combine both.

### How I built it
The website is built with NextJS, for the interactive map it uses Mapbox, of course for the database and real-time updates, MongoDB, connected via the Web SDK. For state management, Redux, TailwindCSS for styling the website, with help of, Flowbite, TailwindUI, and MUI components.

To upload the data, I also built a Cloudflare Worker, so that no matter the way you want to upload data, you can easily do it with POST requests.