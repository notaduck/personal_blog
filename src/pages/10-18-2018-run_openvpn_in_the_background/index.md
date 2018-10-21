---
path: '/Run_OpenVPN_in_the_background'
title: 'Run OpenVPN as a background service'
image: '../../images/openvpn.png'
date: '2018-10-18'
type: 'blogpost'
published: true 
---

To run OpenVPN through the terminal can be a PITA since it is a process which lives in the foreground as default and you can't close the terminal window without terminating the connection to your VPN.  
I did manage to figure out how this could be done but there is hopefully a smarter way to do this, however, I haven't been able to figure that out yet. 

The first thing we want to do is to install the OpenVPN package, assuming that you use Arch Linux you can use the following command (Since you are here I would assume that you easily can figure out which package manager you yourself use).

```{bash}
sudo pacman -S openvpn
```

The next thing we want to do is to go into OpenVPN's client directory (if it doesn't exist then feel free to create it).  
```
cd /etc/openvpn/client
```

I myself like to create a new folder for each connection I've so I end up with something like this, so I don't end up with a big mess in the client directory with a lot of `.opvn` files and certificates etc etc.
```
├── client
│   └── home
│       ├── credentials
│       ├── pfSense-UDP4-xxxx-xxxxxxxx.ovpn
│       ├── pfSense-UDP4-xxxx-xxxxxxxx.p12
│       └── pfSense-UDP4-xxxx-xxxxxxxx-tls.key
│   └── PIA-LA 
│       ├── credentials
│       ├── PIA-Los-Angeles.ovpn
└── server
```
  
I'm pretty sure that you can figure out what is going to happen now.
```
sudo mkdir "<service> <location>"
```
And then move your `.opvn` file and the dependencies the file has, such as `.p12` and a `.key` file into the newly created directory.  
You probably have a username and a password you have to fill out each time you use the VPN service, so let's take care of that.
```
cd the-folder-you-created
touch credentials
echo "USER\nPASSWORD" >> credentials
```
you should now have a file named `credentials` with two lines in it, the first with a username and the second one with your password.  
Add the following line to your `.ovpn` file
```

auth-user-pass /etc/openvpn/client/the-folder-you-created/credentials
```

We have come a long way now and you should probably test if everything is working so far, by starting the connection

```
sudo openvpn --config your_open_vpn_file.ovpn
```

If everything runs without any errors then feel free to proceed, otherwise, fix the errors you have encountered so far (use Google or feel free to drop a comment)


The only thing left to do is to create a service with systemd

Create and open the new file

```
sudo vim /lib/systemd/system/OpenVPN-Connection_Name.service
```  
Modify and insert the following lines  
```
[Unit]
Description= VPN Connection to my home
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/sbin/openvpn --config <Path to your ovpn file> 

[Install]
WantedBy=multi-user.target
```  
Reload the `systemctl` daemon
```
sudo systemctl daemon-reload  
```
You can now check the status of your newly created service with
```
sudo systemctl status 
```
and you should see something like this
```
● OpenVPN-Home.service - VPN Connection to my home
   Loaded: loaded (/usr/lib/systemd/system/OpenVPN-Home.service; disabled; vendor preset: disabled)
   Active: active (running) since Thu 2018-10-18 22:19:07 CEST; 2s ago
 Main PID: 7457 (openvpn)
    Tasks: 1 (limit: 4915)
   Memory: 2.2M
   CGroup: /system.slice/OpenVPN-Home.service
           └─7457 /usr/sbin/openvpn --config /etc/openvpn/client/home/pfSense-UDP4-xxxx-xxxxxxxx.ovpn

```
 And that should be it.  
 You can now run `sudo systemctl`,  `start`, `enable` to start on boot and `stop` to stop the service. Feel free to ask if you have any questions.
