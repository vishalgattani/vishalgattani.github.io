---
title: Day Night Cycle using Unity and C#
tags: [Unity, Game Development, C#]
style: fill
color: warning
description: Creating a Day Night Cycle to control time in the game, and adding a day/night cycle.
---

# Motivation

Implementing a day-night cycle in Unity game development for robotic simulations or any other type of game can add realism and complexity to the environment. This cycle mimics the natural progression of time and lighting conditions, which can be crucial for various reasons in robotic simulations:

1. Realism: A day-night cycle makes the virtual world more realistic, helping the robotic AI systems and sensors adapt to changing lighting conditions just as they would in the real world.
2. Testing and Training: Robotics often operate in dynamic environments with changing lighting conditions. By simulating a day-night cycle, you can test and train robotic systems to operate effectively in various lighting scenarios.
3. Sensor Testing: Robots often use cameras and other sensors that can be affected by lighting conditions. Implementing a day-night cycle allows you to test how these sensors perform under different lighting conditions.

# Steps
To implement a day-night cycle in Unity, the general steps include:

1. Skybox and Lighting: Use a skybox to simulate the sky's appearance and adjust Unity's lighting settings to create realistic lighting changes.
2. Time Management: Create a script to manage the passage of time. Using Unity's `Time.deltaTime` to control the speed of the day-night cycle, the simulator shall update the sun's position and the sky's appearance based on the time of day.
3. Environmental Changes: Adjust other environmental factors like fog, weather, and sound effects to match the time of day. For example, fog might be denser at night, or you might have different ambient sounds during the day and night.
4. UI and Feedback: Provide feedback to the player or user about the current time of day by using visual cues like changing the color of the sky and lighting.


# Features:

# Future developments

1. Seasonal changes
2. Weather conditions

# References

1. [One Wheel Studio: Day Night Cycle](https://youtube.com/playlist?list=PL7S-IAgf3dlVMLTHQ6U1vgLkfwtPD8P0R&si=1hYXFy_LE7SgVaeF)