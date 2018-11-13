---
path: '/how_to_setup_Jupyter'
title: 'Setup Jupyter Notebook server – Centos/Rhel 7'
image: '../../images/jupyter-notebook.png'
date: '2015-01-03'
type: 'blogpost'
published: true 
---

I bought a python course from udemy because they have some great prices right now, lucky me.
But the instructor recommends his students to use jupyter notebook doing his course and i must admit that
i am impressed! jupyter notebook has it all! you can share and create 
documents that contain live code, equations, visualizations and explanatory text ect ect.

He showed us "me" how to setup jupyter notebook on a localhost machine, but 
within 5 minutes i was annoyed that my laptop had to host the server due 
to performance and heat on my lab. So I decided to setup a jupyter notebook server
instead and it is a fairly simple process and dosn't take more than 5-10 minutes.




>Content  
 - Step 1. Dependencies  
 - Step 2. Setup & Configure Jupyter notebook


#### Step 1. Dependencies

We are going to need the python-pip package to install jupyter.
```
yum install python-pip
```
I tried to install jupyter with pip. Multiple times and it kept failing over and over again and I was banging my head and couldn't figure out what the error was, until I realized that I am using CentOS 7 minimal, and was missing some packages, so if your install fails later then go back to this step and install the package(s) in this command.
```
yum groupinstall 'Development Tools'
```

##### Step 2. Setup & Configure Jupyter notebook

The installation of jupyter itself is fairly simple, just use the command below and you are good to go.
```
pip install jupyter
```
Jupyter is installed. But that isn't enough, we need to configure it so we have "remote access".
Right know it is running on http://127.0.0.0:8888 and are only  assessable through the server itself, what we want to do is make it assessable from remote PC's as well.

To do that we need to generate a configuration file with the following command.
```
jupyter notebook --generate-config
```
you should see an output like this where the path for the configuration file will be defined.

```
[I 16:34:25.366 NotebookApp] Writing notebook server cookie secret to /run/user/0/jupyter/notebook_cookie_secret
Writing default config to: /root/.jupyter/jupyter_notebook_config.py
```
So my path is `/root/.jupyter/jupyter_notebook_config.py` but first we will generate a hashed password. open python in the terminal with `python` and enter the commands below and remember to copy the hashed password

```
>>> from notebook.auth import passwd
>>> passwd()
Enter password:
Verify password:
'sha1:d66351142f0a:9eea3d7f99e434a6837f5e73af18d03cf0353392'
>>> ctrl+z
```
So now that we have created a password, will we open the configuration file and start the configuration of jupyter notebook.

```
vim /root/.jupyter/jupyter_notebook_config.py
```

Go to line 186, you should see something like this

```
#c.NotebookApp.password = u''
```
and paste the hashed password in the string (a string is used in python programming and looks like "" or ''). Don't forget to
uncomment the line (delete #). save and exit.  

If you don't have a valid certificate you should use a self-signed certificate to be able to use https://
you can generate one with the following cmd. (for further explanation read [this](https://techknight.eu/2014/11/15/create-and-setup-self-signed-ssl-apache/) don't use the cmd in the article about SSL but use the one below!) The command to create a self-signed certificate :
```
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mykey.key -out mycert.pem
```
Open the configuration file once again.
```
vim /root/.jupyter/jupyter_notebook_config.py
```
First go to Line 67 and configure it to bind on all IP's so it is assessable from other than localhost, it should look like this (* is a wildcard there tells c.NotebookApp to listen to every IP, you could also make a list of trusted ip's.)
```
c.NotebookApp.ip = '*'
```
Next go to line 119 and insert the path to the cert and key file, you can always move the files to another location, just remember to modify the config file as well!
```
c.NotebookApp.certfile = u'./mycert.pem'
c.NotebookApp.keyfile = u'./mykey.key'
```
and last but not least we will tell jupyter notebook that it doesn't need to open the browser, if you have tried to open jupyter notebook on a headless system you probably have noticed the error message about the missing browser. uncomment line 177 and set it to false
```
c.NotebookApp.open_browser = False
```
That was it. You just need to open port 8888 in the firewall.
Allow port 8888 in your firewall
```
firewall-cmd --zone=public --add-port=8888/tcp --permanent
```
Restart the firewall to load the new settings
```
systemctl restart firewalld
```
And everything should be good by now, just type `jupyter notebook` in the terminal to start the service and then go into the browser,
one thing you should be aware off is that we have enabled https and therefore we cannot reach the server with http you have to type `https://server_ip:8888` in your browser.
