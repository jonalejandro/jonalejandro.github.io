---
title: "Winning a Reference Design: Aligning SoC, OEM, and ODM"
date: 2026-03-18
tags: [semiconductors, systems, business, reference-design, servers, storage]
permalink: /notes/winning-a-reference-design/
---
# Winning a Reference Design: Aligning SoC, OEM, and ODM

If you’ve ever chased a “reference design win,” you already know it’s not really about having the best part on paper. Plenty of great components never make it into production systems. What actually matters is how well you navigate the three groups that control the outcome: the SoC vendor, the OEM, and the ODM.

Each of them plays a different role. Each of them cares about different things. And most importantly, each of them takes control at a different point in the process.

If you don’t adjust your approach as that control shifts, you can look like you’re winning—right up until your part quietly disappears from the final build.

Let’s break down how this actually plays out.

## First: The SoC Vendor Sets the Direction

Everything starts with the SoC vendor. They define the platform that everyone else is going to build around.

At this stage, the conversation is very technical. It’s about things like power budgets, interface choices, memory architecture, and overall system constraints. In a server, that might mean PCIe lane allocation and power delivery limits. In an enterprise SSD, it’s NAND channels and controller behavior. In a camera, it’s sensor interfaces and image processing pipelines.

The key point is this: the SoC vendor’s reference design becomes the starting point for everyone else. ODMs will copy large parts of it. OEMs will evaluate against it.

So if you’re not in that reference design—or at least closely aligned with it—you’re already behind.

Winning here doesn’t come from marketing. It comes from being useful early. That usually means having solid models, good simulation data, and a clear answer to a real system problem. Maybe you help them hit an efficiency target. Maybe you simplify layout. Maybe you solve a signal integrity issue they’re worried about.

If you can tie your component to something the SoC vendor *needs* to make their platform work, you’re in a strong position. If you’re just “another option,” you’re not.

## Then: The OEM Decides What Actually Ships

Once the platform is defined, the center of gravity shifts to the OEM.

The OEM isn’t designing circuits. They’re deciding what product they’re going to bring to market, and why it will win.

Their questions are different. They care about performance per watt, total system cost, feature differentiation, and supply chain confidence. A server OEM might be thinking about datacenter operating costs at scale. A camera company might care about low-light performance or AI features. An SSD OEM is probably focused on latency consistency and reliability under real workloads.

This is where a lot of technically strong solutions lose momentum.

If your value only shows up in a datasheet, it’s easy to ignore. The OEM needs to see how your part changes the *system outcome*. Does it lower power in a way that actually reduces cooling costs? Does it enable a feature they can sell? Does it improve reliability in a measurable way?

You have to connect the dots for them.

A small efficiency gain might not sound impressive in isolation, but if it scales across thousands of servers, it becomes real money. On the other hand, a great spec that doesn’t move a system-level metric is basically invisible.

At this stage, winning is less about being technically correct and more about being *relevant*.

## Finally: The ODM Makes It Real

After the OEM selects a platform, the ODM takes over—and this is where things often fall apart.

The ODM is responsible for actually building the system. That includes layout, validation, sourcing, and manufacturing. Their job is to make the design work reliably, at scale, and at the right cost.

They are not trying to preserve your design win. They are trying to reduce risk.

If your component is hard to source, sensitive to layout, or poorly documented, it becomes a problem. And problems get removed.

This is why parts get “designed out” late in the cycle, even after strong early support. It’s not personal—it’s practical.

In systems like servers and SSDs, the margins are tight. High-speed interfaces, dense layouts, and thermal constraints leave very little room for error. A component that only works under ideal conditions is a liability. A component that is easy to implement, tolerant of variation, and well-supported is valuable.

The vendors that win here make life easier for the ODM. They provide clean reference layouts, clear guidelines, and fast support when something doesn’t behave as expected. They think about manufacturability, not just performance.

At this stage, execution matters more than theory.

## The Pattern Is Always the Same

Even though servers, cameras, and SSDs look very different on the surface, the pattern underneath is consistent.

The SoC vendor defines the architecture.  
The OEM decides if the platform is worth building.  
The ODM decides if it can actually be built.

And control moves from one to the next.

The mistake is focusing on only one of them.

If you only work with the SoC vendor, you might end up in a reference design that never turns into a product. If you only convince the OEM, you might get stuck when the ODM can’t implement your solution cleanly. If you ignore the ODM entirely, you risk getting optimized out at the last minute.

You need all three.

## What Actually Works

The teams that consistently win reference designs tend to do a few things well.

They engage early with the SoC vendor and become part of the baseline, not an afterthought. They translate their technical advantages into system-level impact when talking to the OEM. And they make implementation as smooth as possible for the ODM.

None of this is complicated, but it does require awareness. You have to know who you’re talking to, what they care about, and how that changes over time.

## One Subtle but Important Point

A reference design isn’t just a technical document. It’s a form of alignment.

When things are working well, the SoC vendor, OEM, and ODM are all moving in the same direction. The design reflects that alignment.

If you’re part of it early and in a meaningful way, you don’t just get selected—you become hard to remove. Swapping you out would create risk, delay, or require rework somewhere else in the system.

That’s really the goal.

Not just to win the design, but to make sure it stays won all the way to production.
