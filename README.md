# MQTT Automatic Bridge

Listen to websocket events from Automatic and post them to your IoT setup using
MQTT

## Getting Started

### Create a Developer Account and an Application

https://developer.automatic.com/

If you'd like access to real-time location of your vehicle you'll need to
request access to that scope. The process is relatively simple and turn around
is less than 24 hours.

### Clone the Repo
```bash
$ git clone https://github.com/drGrove/mqtt-automatic-bridge
```

### Update Your Config
```bash
$ cp config/default.json5 config/local.json5
$ vim config/local.json5
```

Update the following fields:

- Automatic Client_id
- Automatic Client_secret
- MQTT Host
- MQTT Port
- MQTT Username (Optional)
- MQTT Password (Optional)

### Start the service
```bash
$ npm start
```
