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
opnessl genrsa -out CA.key -des3 2048
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
## Step 1
```

```
## Step 2
```
cd ~/.ssh
```
If terminal displays `bash: cd: ./ssh "No file or directory"` you should generate a public/private key continue to "step 3". If the terminal changes to `~/.ssh directory` continue to step 5
## Step 3
```
ssh-keygen -t rsa -C "your_email@youremail.com"
```
## Step 4
```
Enter a suitable passphrase > 4
```
## Step 5
Follow this step pnly if your terminal changed to `~/.ssh`
```
mkdir key_backup
cd key_backup
rm id_rsa*
```
## Step 6
Add the SSH-key to github
```
sudo apt install gedit
gedit id_rsa.pub
```
## Step 7
Ubuntu will open a file, copy it's entire content
```
1. open the github site and login
2. Go to "Account Settings" ( in the upper right corner from your page)
3. Click "SSH Keys"
4. Click : "Add another public key"
5. Paste the copied content ino the "key field" and press "Add key"
```
## Step 8
```
ssh-add
```
## Step 2
```

```
