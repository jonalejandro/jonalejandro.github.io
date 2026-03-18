---
layout: single
title: "Notes"
permalink: /notes/
author_profile: true
---

Notes on semiconductor strategy, power architecture, and systems thinking.


{% raw %}
{% for post in site.posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}
{% endraw %}
