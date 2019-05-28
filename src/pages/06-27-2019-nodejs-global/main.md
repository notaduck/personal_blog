---
path: '/npm_global'
title: 'Install npm global packages without root acces ( sudo )'
image: '../../images/coming-soon.jpg'
date: '2019-06-27'
type: 'blogpost'

published: true 
---

There is a lot of `npm` packages out there, and some which is useful to have installed globally so you can run them from the terminal no matter where you are. However you don't really want to give all `npm` packages root access to your system.  
  

So let's start with creating a directory for the global packages in our home directory.

```sh
mkdir ~/.npm-global
```

Give `npm` instructions to use the newly created directory for the global packages

```sh
npm config set prefix '~/.npm-global'
```

Next step is to add the directory to our `$PATH`, so add the following line to your `.bashrc`/`.zshrc` or what shell you use
```sh
export PATH=~/.npm-global/bin:$PATH
```

You can either close the terminal or you can update it while it is opened with

```sh
source ~/.<bashrc, zshrc or whatever shell you are usin>
```

I'm about to create a site with the Gatsby framework, so let's install that to see if it works.

```sh
npm install -g <package_name> 
```

And as you can see, that `gatsby-cli` packages is installed in the new directory without giving it root access

```sh
[~] tree ~/.npm-global -L 3
.npm-global
├── bin
│   └── gatsby -> ../lib/node_modules/gatsby-cli/lib/index.js
└── lib
    └── node_modules
        └── gatsby-cli
```
