---
path: '/deploy-pritunl'
title: 'Deploy Pritunl on Ubuntu'
image: '../../images/pritunl.png'
date: '2016-05-15'
published: true
---

DESCRIPTION

> Table of Content :
> - Step 1. Pre-requisites
- Step 2. Install & configure Elasticsearch
- Step 3. Install MongoDB
- Step 4. Install & Configure Graylog2
- Step 5. Install Graylog- web interface

#### Step 1. Pre-requisites

You will need:
> - Ubuntu server  
> - Sudo access  
> - Access to port forward on you router

#### Step 2. Install MongoDB & Pritunl
First add mongodb to apt sources list.
```
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-3.0.list
```
and then pritunl as-well.
```
echo "deb http://repo.pritunl.com/stable/apt trusty main" > /etc/apt/sources.list.d/pritunl.list
```

add the apt-keys for the two repos so apt can validte them.
```
apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv 7F0CEB10
apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv CF8E292A
```

we have added two repos to our apt sources list now, the next thing on the list is going to be update the list and then install mongodb and privtunl

```
sudo apt-get update && sudo apt-get install mongodb pritunl
```

I am assuming you are using UFW as your firewall. We are going to open a couple of ports to get access to the web ui and also to be abloe to connect to the vpn.
```
sudo ufw enabled
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 12973/udp
sudo ufw enabled
sudo ufw reload
```

```
sudo service pritunl start
```

We are going to need a setup key in a few seconds so create the key now and copy it for later use

```
pritunl setup-key
```
[INSERT KEY-PNG HERE]
