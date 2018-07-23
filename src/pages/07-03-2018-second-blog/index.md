---
path: '/markdown-post'
title: 'Setup Graylog2 - Centos 7'
image: '../../images/Graylog2.png'
date: '2018-08-24'
type: 'blogpost'
published: false 
---

Graylog2 is a centralized log management system. It is based on Elasticsearch
and MongoDB, and are able to analyze and aggregate log messages from multiple sources.
I don't think it would be wrong to say that Graylog2 is one of the big players when
it comes to centralized log management systems.
It won't take you a long time to understand how to use Graylog2 and when you do, then
you wouldn't be with out it!

I am using Graylog2 to pull log files from all my servers and a PfSense firewall,
and my life have become much more simple afterwards! it is so easy to create a stream of the exact log files you want to collect.
Just to give you a example of what a stream is then i have createated a stream
there is showing me Accepted/Failed SSH and OpenVPN login attempts. And one for every
time a root user is being used.   

> Table of Content :
- Step 1. Pre-requisites
- Step 2. Install & configure Elasticsearch
- Step 3. Install MongoDB
- Step 4. Install & Configure Graylog2
- Step 5. Install Graylog- web interface

#### Step 1. Pre-requisites
You have to be **root**!
the first thing we are gonna do is to disable Centos firewall and SeLinux as a start. (we will enable the firewall  later.)
```
systemctl disable firewalld
systemctl status firewalld
systemctl status firewalld
```
to see if SeLinux is enabled on your system type `sestatus` if it is disabled then skip this part,
```
[root@graylog2 ~]# sestatus
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          disabled
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Max kernel policy version:      28

```
If it is enabled then open the .config file
```
vim /etc/sysconfig/selinux
```
find the line below and set it to SELINUX=disabled
```
SELINUX=enforced
```
and restart your system. once you are in again then try to see the status again. It should have changed disabled now
```
[root@graylog2 ~]# sestatus
SELinux status:                 disabled
```
Enable [EPEL Repository](https://fedoraproject.org/wiki/EPEL)
```
# wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
# rpm -ivh epel-release-7-5.noarch.rpm
```
and after you have enabled EPEL then install Java.
```
# yum install Java
```
Verify that Java have been installed
```
# java -version
openjdk version "1.8.0_65"
OpenJDK Runtime Environment (build 1.8.0_65-b17)
OpenJDK 64-Bit Server VM (build 25.65-b01, mixed mode)
```

We are also going to need pwgen later
```
yum -y install pwgen
```
#### Step 2. Install & configure Elasticsearch

First import the GPG-Key
```
rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
```
Add Elasticsearch to your repositoriy
```
vim /etc/yum.repos.d/elasticsearch.repo
```
And insert the following lines
```
[elasticsearch-1.7]
name=Elasticsearch repository for 1.7.x packages
baseurl=http://packages.elastic.co/elasticsearch/1.7/centos
gpgcheck=1
gpgkey=http://packages.elastic.co/GPG-KEY-elasticsearch
enabled=1
```
You should be ready to install Elasticsearch now
```
# yum -y install elasticsearch
```
Configure Elasticseach to start during system startup.
```
# systemctl daemon-reload
# systemctl enable elasticsearch.service
```

There is only one important configuration we have to set in Elasticsearch
to make it work with Graylog2
```
# vim /etc/elasticsearch/elasticsearch.yml
```
Find line 32 in the file and set the cluster name to graylog2
```
 27 ################################### Cluster ###################################
 28
 29 # Cluster name identifies your cluster for auto-discovery. If you're running
 30 # multiple clusters on the same network, make sure you're using unique names.
 31 #
 32 cluster.name: graylog2
 33
 34
```

that should be it. now restart the service to make it read the new settings
```
#systemctl restart elasticsearch.service
```

#### Step 3. Install MongoDB

Almos same procedure as in step 2. but this time will we add the repository
for MongoDB

```
# vim /etc/yum.repos.d/mongodb-org-3.0.repo

```
Add the lines below quit and save.
```
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=http://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
```
Install MongoDB

```
# yum -y install mongodb-org
```

#### Step 4. Install & Configure Graylog2

First install Graylog2's repository
```
# rpm -Uvh https://packages.graylog2.org/repo/packages/graylog-1.2-repository-el7_latest.
```
Then install Graylog2
```
# yum -y install graylog-server
```

Before we are going to configure Graylog2's .conf file i want you to do two things.
remember to copy and save the output.!

Number 1. Create a password with pwgen for password_secret

```
# pwgen -N 1 -s 96
Hz63qI3vRiJezJ6U44PmgtNV5eh0ixiBlRImqPwJAOeUDaWb5wopeSXavxFdzHlAP6BZtJBol8fdHqDjrOCoUq2fczBGhud6
```

Number 2. Get  the sha265 sum of your accounts password

```
# echo -n yourpassword | sha256sum
e3c652f0ba0b4801205814f8b6bc49672c4c74e25b497770bb89b22cdeb4e951  -
```

And now is the time to configure Graylog2.  
open the .conf file
```
vim /etc/graylog/server/server.conf
```
Find the lines below in the configuration file and edit them. (This is a configuration example for only one host)
```
password_secret = Insert number 1. output

root_password_sha2 = insert number 2. output

root_timezone = UTC

elasticsearch_http_enabled = false

elasticsearch_discovery_zen_ping_unicast_hosts = graylog2-server-ip:9300

elasticsearch_shards = 1

elasticsearch_replicas = 0

mongodb_useauth = false
```
and restart the Graylog2 server to make it load the new configuration.

```
systemctl restart graylog-server
```

#### Step 5. Install Graylog- web interface
We are going to install a web interface for Graylog2 as well.
```
yum -y install graylog-web
```
And first create a new password with pwgen(remember to copy the output)
```
pwgen -N 1 -s 96
```

```
vim /etc/graylog/web/web.conf
```

edit the following lines in the configuration file. if you want to add more Graylog2 nodes in the future then just separate the IP with a comma.
```
graylog2-server.uris="http://127.0.0.1:12900/"
application.secret=""
```
we are going to let CentOS start graylog-web on boot.
```
systemctl enable graylog-web
systemctl restart graylog-web
```
and open your web-browser and type in `raylog2_ip:9000`. You should see a screen like this. your
username is **admin** and the password is the one you created earlier in the guide.

See also how you can :
> - Create syslog input and configure rsyslog.
> - Add extractors
> - How to let Gratlog2 send mails with Gmail SMTP
> - Connect Pfsense with the snort package to Graylog2
