---
layout: none
title: "About"
permalink: /about/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Jon Alejandro</title>
  <link rel="canonical" href="https://jonalejandro.com/about/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink:#0f0f0f; --paper:#f5f2ed; --white:#ffffff; --accent:#1a5c7a;
      --muted:#6b6560; --rule:#d4cfc8; --serif:'DM Serif Display', Georgia, serif;
      --mono:'DM Mono','Courier New',monospace; --sans:'DM Sans',system-ui,sans-serif;
      --nav-h:64px; --max-w:960px; --pad-x:clamp(1.5rem,4vw,3rem);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-weight:300;line-height:1.75}
    .site-nav{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 var(--pad-x);background:var(--paper);border-bottom:1px solid var(--rule)}
    .nav-logo{font-family:var(--mono);font-size:.78rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:var(--ink)}
    .nav-links{display:flex;gap:2.25rem;list-style:none}
    .nav-links a{font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:var(--muted)}
    .nav-links a:hover{color:var(--ink)}
    .page{max-width:var(--max-w);margin:0 auto;padding:calc(var(--nav-h) + 4rem) var(--pad-x) 4rem}
    .eyebrow{font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem}
    h1{font-family:var(--serif);font-size:clamp(2.2rem,4.8vw,3.7rem);line-height:1.1;margin-bottom:2rem}
    .intro{font-size:1rem;color:var(--muted);max-width:68ch;margin-bottom:3rem}
    .grid{display:grid;grid-template-columns:1.2fr .8fr;gap:3rem;align-items:start}
    .block{background:var(--white);border:1px solid var(--rule);padding:2rem}
    .block h2{font-family:var(--serif);font-size:1.5rem;margin-bottom:1rem}
    .block p{margin-bottom:1rem;color:var(--muted)}
    .list{list-style:none}
    .list li{padding:.85rem 0;border-bottom:1px solid var(--rule)}
    .list li:last-child{border-bottom:none}
    .label{font-family:var(--mono);font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
    .footer{max-width:var(--max-w);margin:0 auto;padding:2rem var(--pad-x);border-top:1px solid var(--rule);font-family:var(--mono);font-size:.62rem;letter-spacing:.04em;color:var(--muted);display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
    .footer a{color:inherit;text-decoration:none}
    @media (max-width:800px){.grid{grid-template-columns:1fr}.nav-links{gap:1.25rem}}
  </style>
</head>
<body>
  <header class="site-nav">
    <a class="nav-logo" href="/">Jon Alejandro</a>
    <nav>
      <ul class="nav-links">
        <li><a href="/notes/">Writing</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="https://www.linkedin.com/in/jonalejandro" target="_blank" rel="noopener">LinkedIn ↗</a></li>
      </ul>
    </nav>
  </header>

  <main class="page">
    <div class="eyebrow">About</div>
    <h1>Building product strategy from
      <em style="font-style:italic;color:var(--accent)">power system constraints and market realities</em>.</h1>
    <p class="intro">I operate at the intersection of power management, system architecture, and product strategy — defining how circuit-level tradeoffs translate into product decisions at platform scale.</p>

    <div class="grid">
      <section class="block">
        <h2>How I work</h2>
        <p>My work focuses on translating device capability into system value—balancing efficiency, performance, reliability, and cost across real product constraints and business objectives.</p>
        <p>Increasingly, this involves cross-domain problems where power is not isolated, but tightly coupled with firmware behavior, thermal limits, RF subsystems, and platform-level requirements.</p>
        <p>The core challenge is not identifying tradeoffs—it’s determining which constraints matter most, where integration creates leverage, and how those decisions shape roadmap direction, product positioning, and long-term portfolio value.</p>
        <p>This site is where I write about systems, reliability, and engineering tradeoffs that influence product outcomes.</p>
      </section>

      <aside class="block">
        <div class="label" style="margin-bottom:1rem">Current focus</div>
        <ul class="list">
          <li>PMIC and DC-DC product roadmap strategy</li>
          <li>Power architecture tradeoff analysis</li>
          <li>System-level reliability and integration</li>
          <li>Semiconductor market and portfolio positioning</li>
        </ul>
      </aside>
    </div>
  </main>

  <footer class="footer">
    <span>© {{ site.time | date: '%Y' }} Jon Alejandro</span>
    <span><a href="/notes/">Writing</a> · <a href="/feed.xml">RSS</a></span>
  </footer>
</body>
</html>
