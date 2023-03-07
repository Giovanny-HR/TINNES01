# TINNES01
# Docker Compose Steps
```
mkdir [name]
cd [name]
nano docker-compose.yaml
```
#### Nano Terminal
```
version: "3"
services:
  website:
    image: nginx
    ports:
      - "8081:80"
    restart: always
```
```
sudo docker-compose up -d
```

# SSL HTTPS fro Localhost
```
mkdir [name]
cd [name]
mkdir CA
cd CA
openssl genrsa -out CA.key -des3 2048
```
Generate a root CA certificate using the key generated, that will be valid for ten years
```
openssl req -x509 -sha256 -new -nodes -days 3650 -key CA.key -out CA.pem
```
# Generating a certificate 

```
mkdir localhost
cd localhost
touch localhost.ext
```

# Generate Key (Localhost)
Generate a key & use the key to generate a CSR (Certificate Signing Request)
```
openssl genrsa -out localhost.key -des3 2048
```

# Generate CSR
```
openssl req -new -key localhost.key -out localhost.csr
```
## Request CA to sing a certificate
```
openssl x509 -req -in localhost.csr -CA ../CA.pem -CAkey ../CA.key -CAcreateserial -days 3650 -sha256 -extfile localhost.ext -out localhost.crt
 ```

 ### Decrypt `localhost.key`
 ```
 openssl rsa -in localhost.key -out localhost.decrypted.key
 ```

 # Create Node.js Express server
 Test wheter the snippets above are working as expexted
 ```
 npm init -y
 npm i express https
 touch index.js
 ```
 `index.js`
 ```
const fs = require('fs');
const key = fs.readFileSync('./CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./CA/localhost/localhost.crt');

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('Hello world!');
});

const https = require('https');
const server = https.createServer({ key, cert }, app);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});
 ```

 ### Run the server
 ```
 node index.js
 ```

# Setting git with SSH
```
cd ~/.ssh && ssh-keygen
sudo apt install xclip
cat id_rsa.pub | xclip (Linux)
Get-Content id_rsa.pub | Set-Clipboard (Powershell)
```
Verify your connection by typing
```
ssh -T git@github.com
> Hi username! You've successfully authenticated...
```

# NPM Chat-Web Application
```
npm inistall
npm install ws
```

# Mosquitto
Docker-Compose Mosquitto
```
mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    volumes:
      - /opt/mosquitto:/mosquitto
      - /opt/mosquitto/data:/mosquitto/data
      - /opt/mosquitto/log:/mosquitto/log
    ports:
      - 1883:1883
      - 9001:9001
```
`docker-mosquitto v2`
```
version: "3"
services:
  website:
    image: nginx
    ports:
      - "1884:80"
    restart: always

  mosquitto:
    image: eclipse-mosquitto:2
    volumes:
      - ./mosquitto/config:/moquitto/config
      - ./mosquitto/data:/mosquitto/data
    networks:
      - mosquitto
    ports:
      - 1883:1883
      - 8883:8883
      - 9001:9001

networks:
  mosquitto:
    name: mosquitto
    driver: bridge
```
 `mosquitto.conf`
 ```
persistence true
persistence_location /mosquitto/data/

log_dest stdout
log_dest file /mosquitto/log/mosquitto.log
log_type warning
log_timestamp true
connection_messages true

listener 1883

## Authentication ##
#allow_anonymous false
#password_file /mosquitto/config/password.txt
```
`mosquitto.conf` + Authentication
```
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
listener 1883

## Authentication ##
allow_anonymous true
```

# MQTT 
```
npm i mqtt -g
mqtt help

``` 