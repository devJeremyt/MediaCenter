## Media Center

Media Center is a home media server running off of NodeJS, Express, MongoDB, and ffmpeg

# Before Use
- Install MongoDB
- Install Node
- Create a directory "Videos" in the root
- Create a directory "photos" in the Public folder
- Install ffmpeg
- Create .env file in root and enter a value for PORT

# How to use

1. Do all the Before Use actions above
2. Open terminal and cd to the root directory
3. Run "node app.js"
4. Navigate to 127.0.0.1:PORT with PORT being the one defined in your .env
5. Enjoy :)

# Viewing on other devices
 The app can be viewed on any other device connected to your network, assume you don't have network device segregation.
 Simply open any browser and navigate to the IP address and port for the node server, eg. 192.168.1.12:3000. If you have a fancy router you can input your own DNS
 so you can have something like "myhomemediacenter.com" redirect to to the node server's address and port.