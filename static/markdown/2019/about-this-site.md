---
title: "About this site"
author: "Larsson"
date: 2019-01-01 18:00:00 +2
hero: DSC02436.JPG
heroCredit: Photo by me
---

## How it's built

This site is built with Nuxt and Tailwild.
I'm using GitHub and Travis CI to build a Docker image that's deployed to a computer running Rancher 1.6.

Images are served by Imaginary for dynamic image size and optimization.

The domain-name is managed by Cloudflare which also provides the SSL-certificate.
Finally, UptimeRobot is used to monitor that the site is up and running.

## Things todo
- Tests
- Rollback or commit deployment
