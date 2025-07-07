---
layout: post
title:  "Hello DaBrain"
date:   2025-03-30 18:10:21 +0000
tags: 
  - docker
  - k3s
  - k8s
  - kubernetes
  - cluster
  - dabrain
image:  /assets/images/blog-posts/hello-dabrain/lekoarts-KRxytJLjQ4I-unsplash.jpg
---

This is a story that starts on October 30th, 2017, when i bought my first Raspberry Pi. At the time i was a junior software developer and was discovering technologies like Docker, open source tools and going a little deeper on Linux, so needed to have a place to act as a home lab for my experiments.

<img src="/assets/images/blog-posts/hello-dabrain/17d0e1a9609c8ef665a810866d9ed3fa.JPEG" alt="Raspberry Pi 3B+">

During the following years, the number of experiments increased as well the number of tools that i wanted to host. On my plans were already WireGuard VPN, Nextcloud, PiHole and Home Assistant to be hosted permanently so I needed more resources and, luckily for me, Raspberry Pi released the 4th iteration of the Raspberry Pi board. Time to go shopping 😎

<a name="cluster-v1"></a>
### Cluster v1

On the shopping list were two new RaspberryPi 4 with 4GB of RAM, the SD cards to store the OS, a stack mount system, and SSD and a TP-link router that used to create a network just for the RaspberryPis and connect them via ethernet.

<img src="/assets/images/blog-posts/hello-dabrain/d8c12e7489c969dfa8eab0c47b1dcf79.JPEG" alt="Hardware bought for the new cluster">

The plan was simple, put them on a stack, install the RaspberryPi OS and use Ansible to configure the device, install all the software needed, deploy the containers using Docker-Compose and copy some scripts to do backups from one RaspberryPi to the other and set them up using cron jobs. On the diagram below we can find the distribution of the different tools.

<img src="/assets/images/blog-posts/hello-dabrain/First_raspberrypi_cluster.drawio.svg" alt="Diagram with the plan for the 3 RaspberryPis" width="800">

p.s.: Already had an hard drive from a old laptop and the UPS.

Here's an overview of the software installed and tools deployed:
- [Grafana Agent](https://grafana.com/docs/agent/latest/) to collect metrics from the devices
- [NUT tools](https://networkupstools.org/) to check for the status of the UPS and, if needed, perform a safe shutdown of the devices
- [smartctl](https://www.smartmontools.org/) to monitor the SSD and HDD for issues and possible failures
- [WireGuard VPN](https://www.wireguard.com/) to provide me access to the system when out of home
- Backup scripts that copy files from Turing via SCP and store them on the HDD
- [Prometheus](https://prometheus.io/) server to collect metrics from the exporters and send them to Prometheus cloud
- Prometheus exporters to collect metrics from the WireGuard VPN, UPS and the internet speed
- [pi-hole](https://pi-hole.net/) for blocking ADs and also manage custom URLs for the tools hosted on the cluster
- [Nextcloud](https://nextcloud.com/) to save files, pictures and videos replacing OneDrive and iCloud
- [Jellyfin](https://jellyfin.org/) to consume pictures and videos from the Nextcloud
- [Home Assistant](https://www.home-assistant.io/) to automate some actions at home and make it smarter

But, this is not the end...

- Nextcloud has a feature that uses image recognition to tag people, places and tag images and requires some memory to work fine
- Started to looking for a tool to replace Notion (love it, but can bring questions regarding data security)
- Needed a tool to store my favorite recipes (currently spread across dozens of websites and without the option to take notes and with the risk of the website being shutdown)
- Needed a better solution to take and manage backups (the custom scripts are fine but missing a proper dashboard with the job status, incremental backups instead of full dumps)
- Needed an orchestration system to deploy and manage the workloads instead of having to worry about where to deploy them
- Having Home Assistant running on K8s rather than on a dedicated device
- and a lot more...

So it was time to rethink the existing setup and that's where **DaBrain** comes in 🎉

<a name="cluster-v2"></a>
### DaBrain (v2)

For about a couple of years have been thinking about recreating the whole system and starting using Kubernetes, but the installation and managing it wasn't simple based on previous experiments. Until i found the [K3s](https://k3s.io/) project.

The K3s project promises a kubernetes environment without all complexity of installing the k8s itself, then installing and managing the add-ons just to get a working k8s cluster ready to use. So started to investigate more and decided to give it a chance. That's where the `DaBrain` cluster came to life.

<img src="/assets/images/blog-posts/hello-dabrain/DaBrain.drawio.svg" alt="Diagram with the DaBrain cluster" width="800">

The system is made of 1 k8s master, 4 k8s workers and 1 storage device with 4 SSDs running on RAID10, giving me almost 4TB of storage that can be accessed via NFS from any of the worker nodes. There's a second system on a different location dedicated to offsite backups and that is connected to the main one via WireGuard VPN.

As the first version of the cluster, all the configuration and software installation was done using Ansible. The applications were deployed using Helm.

But it's not done yet. There are a few topics to investigate and finish such as:
- Internet failover using an old smartphone with ethernet tethering (because the Ubiquiti Dream Machine is my main network system and the fiber connection sometimes fails)
- The big observability topic (currently only have Kubernetes metrics on Grafana, missing device metrics, RAID/SSD metrics, UPS metrics)
- Finish the configuration of k8s workers using labels to specifically assign pods to a given node (since they have different combinations of CPU/RAM)
- Migrate the Home Assistant to k8s
- Deploy the new applications to the cluster
- Figure out a solution for backups (looking into [Minarca](https://minarca.org/en_CA) but there's no native support for arm64, want to work on this and test the tool)
- Disaster recovery plans for easy and fast recovery of the system

And a lot more will come. This is just the beginning of the DaBrain cluster project with a lot of things to investigate and try 🤓

<img src="/assets/images/blog-posts/githug-page-v3/EC135F05-F762-4DF4-A4E3-D730BB6794C8.jpg" alt="DaBrain cluster" width="400">

<a name="cluster-v3"></a>
### Fun fact: cluster v1.5

Between the two versions, there was a v1.5 with a Kubernetes installation. That version was created during Covid19 (a lot of time to burn during the lockdown) and relied on a full/native installation of Kubernetes. It was based on the same architecture as V1 plus an old laptop acting as the master node. It was a nice experiment but revealed to be a "good" challenge to make it work and maintain, hence the revert to the V1.

<a name="closing"></a>
### Closing 

If you reached this section, wow!! 👏
It's been such a big adventure creating this kind of HomeLab. Faced a lot of challenges and learned a lot. But still excited to continue this project.
If you have any question feel free to open a discussion on my [GitHub page](https://github.com/JoaoPPCastelo/JoaoPPCastelo.github.io/discussions).

<br>
---

<a name="credits"></a>
### Credits

Photo by <a href="https://unsplash.com/@lekoarts?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">LekoArts</a> on <a href="https://unsplash.com/photos/a-heart-shaped-object-with-a-blue-background-KRxytJLjQ4I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      