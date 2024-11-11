---
name: Unity Simulator
tools: [Unity, C#]
image: https://cdn.dribbble.com/users/60266/screenshots/1896503/attachments/323320/game-development_2.png?resize=800x600&vertical=center
description: Building simulator for robotic applications.
experitise: [Game Development, Simulation, Robotics]
# external_url: https://gitlab.com/vishalgattani/unity-simulator/-/wikis/home
---

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">PyBBN Assurance Cases</h3>

  <p align="center">
    Determining assurance case beliefs using Bayesian Belief Networks and Design of Experiments.
    <br />
    <a href="https://gitlab.com/vishalgattani/unity-simulator/-/wikis/home"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.com/vishalgattani/unity-simulator/issues">Report Bug</a>
    ·
    <a href="https://gitlab.com/vishalgattani/unity-simulator/">Request Feature</a>
  </p>
</div>

# Motivation

This project is solely being built from scratch for learning purposes. The project aims to improve skills in the following areas:
1. Game development
2. Robotics
3. Artificial Intelligence

# Features of Simulator

## Unity-ROS

## Asset inventory system

1. [x] Browse an asset bundle
2. [x] Load an asset bundle
3. [ ] Load multiple asset bundles
4. [x] Spawn an obstacle using raycasting to the ground layers
5. [x] Save configuration in a `.json`
6. [ ] Load configuration from a `.json`
7. [ ] Need to load the asset bundles for assets within the `.json` first
8. [x] Unload an asset bundle

## Randomization of scenario using `Scenic`

1. Create asset bundle
2. Get asset bundle information in a `.csv` format
3. Use `scenic` config writer script to generate model classes for the assets within the asset bundle
4. Create a `.scenic` file using the model classes generated in Step 3
5. Run the `.scenic` file to generate randomized scenarios and dump them into a `.json` file for the simulator to use.
6. Use the Unity simulator to spawn the assets within the `.json` by accessing paths to the asset bundles

## Time of day

- [x] Sun color with time
- [x] Moon color with time
- [x] Sky horizon color with time
- [ ] Time scale
- [ ] Dynamic time of day

## [Traffic waypoint system](https://github.com/vishalgattani/unity-traffic-system/)

In my blog post regarding animating mixamo characters in Unity using the Animator component, I have created a simple character controller that is used to animate the NPC in the Unity project to move from one waypoint to another. This project aims to create a traffic waypoint system that can be used to control the movement of the NPC.
- [x] Create an NPC: For simulating the behavior of the NPC, I have used animations from Mixamo and added a character controller to the NPC.
- [x] Create Waypoint system: Using the Unity editor, I have created a waypoint system that can be used to set the waypoints for the traffic. This would include branching off points and randomization of directions. Also, ath each branch the NPC decides to take the branch in a random manner using a probability.
  - [x] Create waypoints
  - [x] Create branching points
- [x] Create pedestrian traffic: Spawning a certain number of pedestrians at random points along the waypoints, randomizing their directions and speeds.

# Simulations

## Planning
- [ ] Hybrid A* with Voronoi fields
- [ ] Dubins paths

## Perception
- [ ] Terrain segmentation
- [ ] Object detection
- [ ] Pedestrian detection
- [ ] Lidar object detection
  - [ ] Bounding boxes
  - [ ] Estimation

## Control

- [x] [PID controller for a self-driving car following waypoints](https://github.com/vishalgattani/PID-self-driving-car/tree/main)




