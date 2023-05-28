---
name: Teleoperation of Reachy using Mediapipe and BlendArMocap
tools: [Simulation, Python, Blender, Reachy, Mediapipe]
image: https://github.com/vishalgattani/reachy-blender/blob/master/results/pose_transfer.gif?raw=true
description: Using Mediapipe to estimate 3D pose and transfer motion onto a 7-DoF robot arm for teleoperation applications.
---

<!-- ![srrs_compressed_cropped](https://user-images.githubusercontent.com/24211929/170116184-5f5ef498-213a-4ac2-b7c5-38e7c6b45394.gif)
 -->

<!-- PROJECT LOGO -->
<br />
<div align="center">


<h3 align="center">Teleoperation of Reachy using Mediapipe and BlendArMocap</h3>

  <p align="center">
    Using Mediapipe to estimate 3D pose and transfer motion onto a 7-DoF robot arm for teleoperation applications.
    <br />
    <a href="https://github.com/vishalgattani/reachy-blender"><strong>Explore the docs »</strong></a>
    <br />
    <br />

    <a href="https://github.com/vishalgattani/reachy-blender/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/reachy-blender/issues">Request Feature</a>
  </p>
</div>

# Table of contents

* TOC
{:toc}

# About the project

In the case of Reachy, teleoperation could involve using a computer or other control device to remotely move and manipulate the robotic arm. This could be useful in situations where a human operator is not able to physically be present to operate the robot, or when the task requires precision or speed that a human operator may not be able to achieve.

BlendArMocap is a [Blender](https://www.blender.org/) add-on to preform Hand, Face and Pose Detection using [Googles Mediapipe](https://google.github.io/mediapipe/). The detected data can be easily transferred to [rigify rigs](https://docs.blender.org/manual/en/latest/addons/rigging/rigify/index.html).

MediaPipe is a framework for building cross-platform multimodal applied machine learning pipelines. It can be used for tasks such as pose detection and pose transfer.

Pose detection is the process of detecting the posture or position of a person or object in an image or video. This can be useful for applications such as tracking human movement, recognizing gestures, and analyzing body language. MediaPipe provides tools and pre-built models for pose detection that can be used to build pose detection pipelines.

# Pipeline

[![](https://mermaid.ink/img/pako:eNpVkU1vgzAMhv9K5DOtCpS24zCpH7Q7rNrUHSYVOLhJtkYDEoVUagf896VQJBYpku33sePYFVDJOITwrVGdyeshKYg9y3iV8YJxnZLR6Ln-5CeKeU1WcRdfHvaSokrTjl7dIXKM4z1nApVQvFeOrbKuoqvRSA3JsGA56p-y6fR1W36LlNdkEx840vONvOmTMJgOiRebV9Yk6pGdFkrZ7obMuyxtlW2PLHX-v4TMRGkErcnugTzknZVHZDN0oqGzBQdyrnMUzM6puksJmDPPeQKhNZn9TwJJ0VjuohgaHjFhpIbwC7OSO4AXIz9uBYXQ6AvvoY1AO_O8DyosIKzgCqG3GHtzdzqfTRazwPd8P3DgZsOuO_Zm04nv2vsUBE-NA79S2gJum31s7ceTvO1g36223XDzB1bHlZs?type=png)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNpVkU1vgzAMhv9K5DOtCpS24zCpH7Q7rNrUHSYVOLhJtkYDEoVUagf896VQJBYpku33sePYFVDJOITwrVGdyeshKYg9y3iV8YJxnZLR6Ln-5CeKeU1WcRdfHvaSokrTjl7dIXKM4z1nApVQvFeOrbKuoqvRSA3JsGA56p-y6fR1W36LlNdkEx840vONvOmTMJgOiRebV9Yk6pGdFkrZ7obMuyxtlW2PLHX-v4TMRGkErcnugTzknZVHZDN0oqGzBQdyrnMUzM6puksJmDPPeQKhNZn9TwJJ0VjuohgaHjFhpIbwC7OSO4AXIz9uBYXQ6AvvoY1AO_O8DyosIKzgCqG3GHtzdzqfTRazwPd8P3DgZsOuO_Zm04nv2vsUBE-NA79S2gJum31s7ceTvO1g36223XDzB1bHlZs)

# [Mediapipe](https://google.github.io/mediapipe/)

MediaPipe combines individual neural models for face mesh, human pose, and hands and has a total of 543 landmarks (33 pose landmarks, 468 face landmarks, and 21 hand landmarks per hand). All landmarks consist of $x$, $y$, and $z$ coordinates, except pose landmarks, which consist of a visibility coordinate along with $x$, $y$, and $z$ coordinates.

## [Hand Landmark Model](https://google.github.io/mediapipe/solutions/hands.html)

![](https://mediapipe.dev/images/mobile/hand_landmarks.png)


# Results

## Pose Detection using BlendARMocap

![Pose Detection using BlendARMocap](https://github.com/vishalgattani/reachy-blender/blob/master/results/pose_transfer.gif?raw=true)

## Teleoperation - Gripper

![Teleoperation using BlendARMocap on Reachy - Gripper](https://github.com/vishalgattani/reachy-blender/blob/master/results/teleoperation_gripper.gif?raw=true)

# References







