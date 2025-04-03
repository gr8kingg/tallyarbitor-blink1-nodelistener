# tallyarbitor-blink1-nodelistener

installation

format raspberry pi with the 'lite' version

install nodejs

```
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install nodejs npm libudev-dev libusb-1.0-0-dev libhidapi-dev
```

Download this file

```
wget https://github.com/gr8kingg/tallyarbitor-blink1-nodelistener/archive/refs/heads/main.zip
unzip main.zip
cd tallyarbitor-blink1-nodelistener-main
```

Setup

```
npm ci
```

run

```
sudo node index.js -h 192.168.12.29 -p 4455 --deviceid cb681f90 --clientid 5d9aca2a-2e73-495b-964b-6be464dfdb49
```

run at startup

```
sudo crontab -e
```

add the lines

```
@reboot node /home/pi/tallyarbitor-blink1-nodelistener-main/index.js -h 192.168.12.29 -p 4455 --deviceid cb681f90 --clientid 5d9aca2a-2e73-495b-964b-6be464dfdb49
```
