---
path: '/Dell_XPS_9550_AND_WD10TB_DOCK'
title: 'WD19TB Dock and Dell XPS 9550 plays nicely with Linux'
image: '../../images/coming-soon.jpg'
date: '2019-13-08'
type: 'blogpost'
published: true 
---


When I initially bought my Dell XPS 9550 I also bought a [ Dell WD15 dock ](https://www.dell.com/support/article/dk/da/dkdhs1/sln304627/dell-dock-wd15-usb-type-c-oplysninger-kompatibilitet-og-specifikationer?lang=da), it was fine for the purpose at the time but as time fly I felt the need to upgrade my monitor to a Dell u2715h and later on I got a great deal on a Dell u2515h.  Unfortunately does the WD15 not support two times 1440p monitors but only one, I then began the search for a new dock which could support two 1440p monitors and also plays nice with Linux.  
I started with a Lenovo USB-C/A Hybrid dock but unfortunately, the performance of the DisplayLink driver on Linux is terrible and the screen would often freeze, or take up to 5 seconds to render a new character on the monitor if I played a Youtube movie at the same time.  
After that, I tried a Lenovo Thunderbolt 3 2. gen. which refused to give me video output ( I tried about 8 different cable combinations ) and my laptop would freeze if I hotplugged the dock, so I quickly returned that. I then downgraded to the 1. gen of the Lenovo Thunderbolt 3 series, but the dock was not powerful enough and could not charge my laptop.  
And then I heard about the Dell WD19TB, there was not much information about that dock since it was pretty new on the market and no have tried to pair it up with a Dell XPS 9550. I guess the reason for that is that it isn't on the supported devices list. But I got a sweet deal on the WD19TB, and against all odds, this dock just works!.
It was immediately recognized by [ bolt ]( https://github.com/gicmo/bolt )

```
[~] boltctl
 
 ● Dell WD19TB Thunderbolt Dock
   ├─ type:          peripheral
   ├─ name:          WD19TB Thunderbolt Dock
   ├─ vendor:        Dell
   ├─ uuid:          c6030000-0070-7c1e-8354-001686d0ca21
   ├─ status:        authorized
   │  ├─ domain:     cf030000-0000-a508-2218-32cad4b1c116
   │  └─ authflags:  boot
   ├─ authorized:    2019-08-13T15:50:46 UTC
   ├─ connected:     2019-08-13T15:50:46 UTC
   └─ stored:        2019-08-13T14:56:24 UTC
      ├─ policy:     iommu
      └─ key:        no

```

I could not get one of the monitors to work with HDMI, but I swapped the HDMI out with a DP cable and everything seems to work, all of the USB ports seem to work just fine, the network card is also functional.

```
11: enp11s0u2u4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether d8:d0:90:13:fd:49 brd ff:ff:ff:ff:ff:ff
    inet 10.0.1.104/24 brd 10.0.1.255 scope global dynamic noprefixroute enp11s0u2u4
       valid_lft 4048sec preferred_lft 4048sec
    inet 10.0.1.103/24 brd 10.0.1.255 scope global secondary dynamic enp11s0u2u4
       valid_lft 7198sec preferred_lft 7198sec
    inet6 fe80::f8cc:a196:806:abb8/64 scope link noprefixroute
       valid_lft forever preferred_lft forever

```
 and according to [Richard](https://blogs.gnome.org/hughsie/2019/05/02/updating-the-firmware-on-new-dell-docks/) it should even be possible to upgrade the WD19TB's firmware from Linux so we don't have to shrink out `/` partition, install windows, upgrade the firmware, delete windows, resize `/` and reinstall our bootloader in order to do a simple firmware upgrade. I have not had the time myself to try this out but in theory, it should just work, just like the rest of the dock does. 
```

[~] fwupdmgr get-topology
○
├─ XPS15 9550 Thunderbolt Controller         14ce37fee930afa047cd70912e57b0f44ac670b3
├─ WD19TB                                    a455a3a21752e5d31c228f1f5b51761dad88a432
│ ├─ Thunderbolt controller in Dell dock     066b387c36dacecf094a95e188fb9317fcc226c0
│ ├─ RTS5487 in Dell dock                    acb404019656654d44f80922d94735e831d9bb40
│ ├─ Package level of Dell dock              1eca9eabb0c992c136e1deb1f89e3f70c465aa1c
│ ├─ VMM5331 in Dell dock                    58931e8c9ef5eead9c007563814f96fcadb1b993
│ └─ RTS5413 in Dell dock                    ca36279eeac13463fd5d974c88794859294fbfb1
├─ XPS 15 9550 System Firmware               2da31270d317b076424992de14a0f08ae373c137
```
