---
title: "About this site"
author: "Larsson"
date: 2019-01-01 18:00:00 +2
hero: "https://source.unsplash.com/random"
---

Info about this site,
Nuxt, vue, tailwind, static, pagespeed,
VSCode - Git push - Travis - Test - Docker build - Testrun - Deploy - Live check - Rollback or Commit -

Everything is served by at least 2 Docker-instances for zero-downtime deployments, these instances are orchestrated by Cattle (Racher 1.6),
This is running behind an HAProxy Docker-instance and Cloudflare which also provides the SSL-cert.
Finally, UptimeRobot is used to monitor that everything is up and running.

Reasoning for choosing some of the technologies compared to an alternative:
+ Nuxt & Vue - Vue is very pleasant to work with and the documentation is great. Nuxt comes with SSR, SPA and a whole lot more out of the box.
- Next & React - While React is a very nice, it does not offer the same complete package with [everyghing] as Nuxt, I also find documentation to be confusing compared to the Vue-ecosystem.
+ Tailwind - Atomic CSS works great with Nuxt and makes a rapid project such this a joy to create.
- StyledComponents - I really like the idea behind component-based styling, but I think Atomic CSS is better and mostly more fun to use for a small site like this. StyledSystem maybe would have made it more fun tough.
+ Rancher 1.6 - I like the simplicity of Rancher and its container orchestrator Cattle.
- Kubernetes - My personal website does not need the , the documentation also fails to explain ... Guess i could have used Rancher 2.0 for the setup.
