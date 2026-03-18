---
layout: single
title: "Notes"
permalink: /notes/
author_profile: true
---

Notes on semiconductor strategy, power architecture, and systems thinking.


{% raw %}
<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <small> — {{ post.date | date: "%b %d, %Y" }}</small>
  </li>
{% endfor %}
</ul>
{% endraw %}
