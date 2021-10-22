# Remote Devtools

Connect and debug a remote JS device via websockets

<img src="https://raw.githubusercontent.com/lmckeen/remote-devtools/main/logo.png"/>

## How to Use Remote Devtools

Run server on the device you want to view devtools on
```
npm run build // Build Code
npm run server // Start Server
npm run start // Quick Start (build code and start server) 
```

Client and Inspect URLs will be provided in the terminal

```
Client: http://<ip-of-server>:<port>/
Inspect: http://<ip-of-server>:<port>/inspect
```
### Client URL
This URL will need to be loaded on the remote device and will be used as a redirect site for easy access to remotely type in the URL to the site that is wanted to be debugged.

### Inspect URL
This URL will be run on the device that you want to use to view the devtools

<br>

## Adding the Client Script

The server will host a script that will need to be running as early as possible on the remote device that is wanted to be inspected. This is so the debugger can capture and log as much information as possible

```
http://<ip-of-server>:<port>/client/client.js
```

This script can also be downloaded and inlined at the top of the page

<br>

## Using the Inspector

Once the server and the inspect page are running, a URL to the site that is wanted to be debugged will need to be provided in the inspector address bar. 

After loading the URL, the client page will redirect to the URL specified and will establish a websocket connection between the server and site redirected to.

When the websocket connection has been established, the inspector will display a new item on the page that represents the inspectable remote device.

After clicking the inspect button on the remote device that is wanted to be debugged, a new tab/window will open, establish another websocket connection with the server, retrieve the information that was sent from the remote device and display it
