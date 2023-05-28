---
name: Robotic Arm Control using Blender and Kinect
tools: [Simulation, C, Python, Blender, Arduino]
image: https://user-images.githubusercontent.com/24211929/72992613-0f00bd80-3e1a-11ea-9b60-6f6660652223.gif
description: Control of an 8-DoF Robot Arm using Blender Game Engine (BGE) and Kinect.
---

* TOC
{:toc}

# Abstract

In this study, two control strategies to drive an 8-DoF robot arm are presented. With the use of motion capture technology such as the Kinect, the robot arm was able to reproduce the actions of a human operator to perform simple tasks such as reaching and grasping objects. A visual representation of the human arm is modeled in Blender Game Engine which formed the basis of understanding the kinematics for the human upper limb and use of Blender as a visualization, simulation and emulation tool to gain qualitative information about the robot’s behavior and effectiveness. Through inverse kinematics using Blender Game Engine, new human-like motions can be modeled to perform various telerobotic tasks.  This study demonstrated the abilities of Blender as an interface to control and program the robot arm, as well as providing support for motion capture using NI-Mate to capture human motions in real-time. The capabilities of the robotic arm is demonstrated by conducting experiments based on: forward kinematics, inverse kinematics, path following based on inverse kinematics, applying a recorded motion onto the arm using Motion Capture. The biomimetic robot design and control strategies makes it highly suitable for telerobotic medical and surgical applications in the future.

**Keywords: Motion Capture · Forward Kinematics · Inverse kinematics · Biomimetics · Graphical Models · Anthropomorphic Motion**

The motivation of this thesis is to implement control strategies on a Hybrid Prosthetic arm that combines the motion capture technology derived from the Kinect through implementing a marker-less motion capture system, which will complement the equipment from Trossen Robotics and the prosthetic design from Reachy. In doing so, two new control strategies are compared and performed - Motion Capture (MoCap) based control and Endpoint control through Inverse Kinematics using Blender Game Engine.

# Experiments (Videos)

---

**Real-time Forward Kinematic control**
<iframe width="560" height="315" align="middle" src="https://www.youtube.com/embed/z2TQiBxfes8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

**Real-time Inverse Kinematic control**
<iframe width="560" height="315" align="middle" src="https://www.youtube.com/embed/jVuarIHhB2E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

**Inverse Kinematics - Path Following**
<iframe width="560" height="315" align="middle" src="https://www.youtube.com/embed/puwA0zmrOlI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

**Inverse Kinematics - Teleoperation mode**
<iframe width="560" height="315" align="middle" src="https://www.youtube.com/embed/BEpcV4U-CsI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

**Applying recorded motion through MoCap using Kinect onto the Robotic arm**
<iframe width="560" height="315" align="middle" src="https://www.youtube.com/embed/gIVJBudU4Do" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

