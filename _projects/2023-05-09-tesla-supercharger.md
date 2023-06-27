---
name: Supercharger
tools: [Path Planning, Python]
image: https://github.com/vishalgattani/supercharger/assets/24211929/0a34cde8-8acf-4f1a-af8c-440f88337e48
description: Finding the minimum time path through the tesla network of supercharging stations.
---

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Tesla Supercharger</h3>

  <p align="center">
    Finding the minimum time path through the tesla network of supercharging stations.
    <br />
    <a href="https://github.com/vishalgattani/supercharger"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vishalgattani/supercharger/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/supercharger/issues">Request Feature</a>
  </p>
</div>



# Table of contents

* TOC
{:toc}

# About the project

<!-- <p align="center">
  <img width="1261" alt="supercharger" src="https://github.com/vishalgattani/supercharger/assets/24211929/0a34cde8-8acf-4f1a-af8c-440f88337e48">
</p> -->

<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~vishalgattani/185.embed"></iframe>

> Objective: Construct a search algorithm to find the minimum time path through the tesla network of supercharging stations. Each supercharger will refuel the vehicle at a different rate given in km/hr of charge time. Your route does not have to fully charge at every visited charger, so long as it never runs out of charge between two chargers. You should expect to need no more than 4-6 hours to solve this problem. We suggest implementing a quick brute force method before attempting to find an optimal routine.

This challenge requires to find out how to balance long driving distances accompanied by charging rates of multiple stations. Also, the generated path has to be valid between each charging station.

The challenge can be answered by dividing it into two separate problem sets:
1. How to find the shortest path with reasonable charging time?
2. How to optimally distribute the charging time at each station?

# Assumptions
1. The car begins at the start charger with a full charge of 320 kms.
2. The car travels at a constant speed of 105 km/hr along great circle routes between chargers.
3. The Earth is a sphere of radius 6356.752 kms.

# Methodology

## Shortest Path

Implemented an A-Star like algorithm with the cost heuristic to be as follows:

```python
heuristic = node.get_drivetimetoreach() + node.get_charge_time() + node.get_distancefromgoal()/velocity + 0.1*node.get_distancefromgoal()/node.get_charging_rate()
```

The neighboring nodes that are explored are only the ones that are within driving distance of the vehicle with the remaining fuel (distance) with or without full charge.

## Charging Optimality

If the distance to reach a neighboring node (which is not a goal node) is less than or equal to remaining fuel (distance), then there arises two possibilites:
1. Charge at current node if the charging rate is higher at current node i.e., charging time at current node will not be 0.
2. Charge at neighboring node if charging rate is lesser at current node i.e., charging time at current node will not be 0.

If the distance to reach a neighboring node (which is not a goal node) is greater than remaining fuel (distance), then there arises only one possibility:
1.  Charge at current node and proceed to the neigboring node.





