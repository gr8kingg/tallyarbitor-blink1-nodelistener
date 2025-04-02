# tallyarbitor-blink1-nodelistener

installation

format raspberry pi with the 'lite' version

install nodejs

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
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
sudo nano /etc/rc.local
```

add the lines

```
#!/bin/bash
sudo node /home/pi/tallyarbitor-blink1-nodelistener-main/index.js -h 192.168.12.29 -p 4455 --deviceid cb681f90 --clientid 5d9aca2a-2e73-495b-964b-6be464dfdb49 &
exit 0
```

now set the file to execute

```
sudo chmod +x /etc/rc.local
```
