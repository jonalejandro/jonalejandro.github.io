---
layout: themed
title: "Career overview"
permalink: /resume/
eyebrow: "Jon Alejandro"
description: "Jon Alejandro’s semiconductor career spans product line ownership, product marketing, customer accounts, and technical project management."
---
<p class="subtitle">A decade of experience across RF, analog, and power, from technical execution to product line ownership.</p>
<section aria-labelledby="experience-title">
  <h2 id="experience-title">Experience</h2>
  <ol class="career-list">{% for item in site.data.career %}<li><div><h3>{{ item.role | escape }}</h3><p>{{ item.company | escape }}</p></div><span>{{ item.years }}</span></li>{% endfor %}</ol>
</section>
<div class="rich"><h2>Education</h2><p>M.S. and B.S. in Electrical Engineering<br>The University of Texas at Dallas</p><h2>Full résumé</h2><p>For a detailed résumé or a conversation about my experience, reach out through LinkedIn.</p></div>
<a class="button" href="https://www.linkedin.com/in/jonalejandro">Connect on LinkedIn</a>
