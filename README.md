## Media Center

Media Center is a home media server running off of NodeJS, Express, MongoDB, and ffmpeg

# Before Use
- Install MongoDB
- Install Node
- Install ffmpeg
- Create .env file in root and enter a value for the following
  - DATABASEURL for the location of your DB, a localhost would be something like "mongodb://localhost:27017/MediaCenter"
  - PORT for whatever port you want to run on
  - BASEDIR this will be the directory where thumbnail and video folders for content are
  - VIDEOSPATH for the folder name or path under the BASEDIR where videos are located'
  - PHOTOSPATH for the folder name or path under the BASEDIR where photo are located, the thumbnails are created automatically if there isn't a png with the same name as      the video file
  - FFMPEG_PATH the path to the ffmpeg executable
  

# How to use

1. Do all the Before Use actions above
2. Open terminal and cd to the root directory
3. Run "node app.js"
4. Navigate to 127.0.0.1:PORT with PORT being the one defined in your .env
5. Enjoy :)

# Viewing on other devices
 The app can be viewed on any other device connected to your network, assuming you don't have network device segregation.
 Simply open any browser and navigate to the IP address and port for the node server, eg. 192.168.1.12:3000. If you have a fancy router you can input your own DNS
 so you can have something like "myhomemediacenter.com" redirect to to the node server's address and port.
