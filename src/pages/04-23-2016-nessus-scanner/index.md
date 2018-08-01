---
path: '/install-nessus-ubuntu'
title: 'How to install Nessus vulnerability scanner'
image: '../../images/coming-soon.jpg'
date: '2016-04-24'
type: 'blogpost'
published: true 
---

Nessus has a free version for personal use where you can scan your
local network remotely for vulnerabilities that malicious hackers could use to
gain access for you servers or computers at home.  
It is fairly easy to start a scan and even more easy to understand
the output of the scan because there is a ELI5 description to each alert
and every alert is being ranked from information to high risk.  
This should only take a couple of minutes before your can start the first scan
of your computers at home.

>Content  
 - Step 1. Dependencies  
 - Step 2. Install  Nessus
 - Step 3. Start Nessus

 #### Step 1. Dependencies

 the only requirements this guide have is that you computer/server is connected to the Internet and it is running a flavour of Debian or Ubuntu.

 #### Step 2. Install Nessus

First go to [Nessus download page](http://www.tenable.com/products/nessus/select-your-operating-system)
and choose Nessus home and download the Debian or Ubuntu package.

if you are using a headless system then you should find the latest version for Nessus and download it with wget. otherwise skip this step.

```
cd ~
cd tmp
wget http://downloads.nessus.org/nessus3dl.php?file=Nessus-6.6.1-debian6_amd64.deb&licence_accept=yes&t=f7aa904ae5609c7ac593e61d2f68042e
```

The file will probably be saved in your download folder so run the following commands to install Nessus. if you did download the package with wget then go to cd tmp instead of Downloads.

```
cd ~
cd Downloads/
sudo dpkg -i Nessus*.deb
```

the output of the dpkg command will or should look like this
```
sudo dpkg -i Nessus*.deb
[sudo] password for techknight:
Selecting previously unselected package nessus.
(Reading database ... 294969 files and directories currently installed.)
Preparing to unpack Nessus-6.6.1-debian6_amd64.deb ...
Unpacking nessus (6.6.1) ...
Setting up nessus (6.6.1) ...
Unpacking Nessus Core Components...
nessusd (Nessus) 6.6.1 [build M20056] for Linux
Copyright (C) 1998 - 2016 Tenable Network Security, Inc

Processing the Nessus plugins...
[##################################################]

All plugins loaded (215sec)

 - You can start Nessus by typing /etc/init.d/nessusd start
 - Then go to https://techknight:8834/ to configure your scanner

Processing triggers for systemd (229-2) ...

```

#### Step 3. Start Nessus

Nessus is installed by now and you should be ready to start it and add a user.

To start Nessus enter the following command from the output of the installation
```
sudo /etc/init.d/nessusd start
```
And open your browser and insert the link from the installation output. In my case it would be https://techknight:8843 you should see a page like this. It can take a couple of minutes to Download and Initializze just hang in there.

The next thing is to create a user.

And that should be it! Congrats you have you own selfhosted vulnerability scanner running now and are ready to find the most obvious security holes in your network! 
