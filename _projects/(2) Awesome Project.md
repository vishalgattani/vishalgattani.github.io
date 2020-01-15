---
name: IIITB Thesis
tools: [C#, XML, WPF]
image: https://www.sketchappsources.com/resources/source-image/movie-badges-jurajjurik.png
description: This project has an individual showcase page, not just a direct link to the project site or repo. Now you have more space to describe your awesome project!
---

# Biomimetic Arm with Motion Capture v/s Inverse Kinematics

- Human upper limb motion captured through Kinect V2 will be transmitted to various actuators that act as joints on the prosthetic arm.
- The captured data, joint coordinates and angles, will be transmitted through a serial port to arduino and dynamixel shield in order to actuate the servos accordingly.
- The data from both, Motion Capture and Inverse Kinematics, will be synthesised and compared to establish if correlation points exist between the experiments.
- Possible control of the prosthetic may also be achieved through Electromyography (EMG).

![preview](https://www.sketchappsources.com/resources/source-image/we-were-soldiers-landing-page-dbruggisser.jpg)

# Blender

## Motion Capture

![kinect_nimate](https://user-images.githubusercontent.com/24211929/72427972-cbbba480-37b2-11ea-93d8-a46998d2f054.gif)

The connections for tracking can be followed through this simple image of the pipepline.

![pipeline](https://user-images.githubusercontent.com/24211929/71520910-89562480-28e4-11ea-8fc5-a829d93af095.png)

Before we start, it’s important to note that everything in this post is about the Kinect for Xbox One, what most people call the Kinect Version 2 or the Kinect V2. The Kinect can track up to six skeletons having 25 joints, all at one time. The Kinect’s camera coordinates use the Kinect’s infrared sensor to find 3D points of the joints in space. These are the coordinates to use for joint positioning in 3D projects. For more details, refer to this [article](https://medium.com/@lisajamhoury/understanding-kinect-v2-joints-and-coordinate-system-4f4b90b9df16).

![](https://miro.medium.com/max/433/1*ai7YNHm4yOWC6wFCjDmdAw.png)

In order to have the recorded motion and joint coordinates from the Kinect V2, the open source software Blender has the necessary add-ons from Delicode NI Mate required to create your own moiton capture studio. Before we begin to track all the 25 joints, we have to test if our Kinect is working properly. Follow the tutorial [DIY Kinect Motion Capture Studio](https://www.youtube.com/watch?v=1UPZtS5LVvw) to setup your Kinect with the Blender add-ons.

<div align="center">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/1UPZtS5LVvw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


The NI-Mate app captures your movement in the camera and converts it to mocap data you can import into Blender and apply to a rigged armature.

![poserig_anim](https://user-images.githubusercontent.com/24211929/72428043-ebeb6380-37b2-11ea-8d57-5ba95668f69b.gif)

![graph1](https://user-images.githubusercontent.com/24211929/72428044-ebeb6380-37b2-11ea-985c-ca7b7ed71834.gif)

## BlenderController

![Video](https://user-images.githubusercontent.com/24211929/72426222-569aa000-37af-11ea-8f76-4c122fa8cdb4.gif)

The (Blender Controller)[https://github.com/alvaroferran/BlenderController] repo shows how to control a robot from blender using python. To execute the controller first upload the arduino code into the board. Then in the blender file, press on "Run Script", then the play icon and finally hover the mouse over the control bone and press the "G" key.

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/mONTXmDgZSE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Additional changes have been added to he code to effectively send bone angles to the arduino board using serial communication.

![motor control for arduino base file](https://user-images.githubusercontent.com/24211929/72427403-ae3a0b00-37b1-11ea-8c99-d2c0ebe3c827.PNG)

![Screenshot 15-01-2020 15_52_47](https://user-images.githubusercontent.com/24211929/72426076-163b2200-37af-11ea-998e-55999df9a72b.png)

The code for sending bone angles is as follows:

```python
import bpy
import math
import time
import sys
import serial
import glob

port=''.join(glob.glob("/dev/ttyUSB*"))
ser = serial.Serial('COM3',9600)
print("connected to: " + ser.portstr)

ob = bpy.data.objects['Armature']
bpy.context.scene.objects.active = ob
bpy.ops.object.mode_set(mode='POSE')

def sendAngles():
    bone1=ob.pose.bones['Link1IK']
    bone2=ob.pose.bones['Link2IK']
    pb1 = ob.pose.bones.get("Link1IK")
    pb2 = ob.pose.bones.get("Link2IK")
    v1 = pb1.head - pb1.tail
    v2 = pb2.head - pb2.tail
    if pb1 and pb2:
        val = math.degrees(v1.angle(v2))
        val = str(int(val))
        print(val)
        ser.write((val).encode('UTF-8'))

def frameChange(passedScene):
	sendAngles()
    
bpy.app.handlers.frame_change_pre.append(frameChange)
```

## (IK)[https://easyblend.org/html/rigging/posing/inverse_kinematics/introduction.html#arm-rig-example]

IK simplifies the animation process, and makes it possible to make more advanced animations with lesser effort.

IK allows you to position the last bone in a bone chain and the other bones are positioned automatically. This is like how moving someone’s finger would cause his arm to follow it. By normal posing techniques, you would have to start from the root bone, and set bones sequentially till you reach the tip bone: When each parent bone is moved, its child bone would inherit its location and rotation. Thus making tiny precise changes in poses becomes harder farther down the chain, as you may have to adjust all the parent bones first.

This effort is effectively avoided by use of IK.

![](https://easyblend.org/html/_images/ik_arm_example.jpg)

Automatic IK is a tool for quick posing, it can be enabled in the tool shelf in the 3D View, when in pose mode. When the Auto IK option is enabled, translating a bone will activate inverse kinematics and rotate the parent bone, and the parent’s parent, and so on, to follow the selected bone. The IK chain can only extend from a child to a parent bone if the child is connected to it.

![armrig](https://user-images.githubusercontent.com/24211929/72426754-551da780-37b0-11ea-8dc3-07ace41bf16e.JPG)

The code from before, will be used in this rig to transmit the servo motor actuating values through serial communication.


# STL Designs

## 3D Printed Myoelectric Prosthetic Arm



<div align="center"><script src="https://embed.github.com/view/3d/vishalgattani/vishalgattani.github.io/stl/Printable Files 4.0 - Myoelectric Arm/Palm/Palm _ Optimised Connector.stl"></script></div>

## Reachy Beta

![search](https://www.sketchappsources.com/resources/source-image/microsoft-windows-10-virtual-keyboard-diogo-sousa.png)




<p class="text-center">
{% include elements/button.html link="https://github.com/YoussefRaafatNasry/portfolYOU" text="Learn More" %}
</p>
