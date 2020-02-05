---
name: Thesis
tools: [C#, XML, WPF]
image: https://user-images.githubusercontent.com/24211929/72992613-0f00bd80-3e1a-11ea-9b60-6f6660652223.gif
description: Biomimetic Arm using Motion Capture and Inverse Kinematics.
---

# Table of contents 

* TOC
{:toc}

# Abstract

#  Introduction

- Human upper limb motion captured through Kinect V2 will be transmitted to various actuators that act as joints on the prosthetic arm.
- The captured data, joint coordinates and angles, will be transmitted through a serial port to arduino and dynamixel shield in order to actuate the servos accordingly.
- The data from both, Motion Capture and Inverse Kinematics, will be synthesised and compared to establish if correlation points exist between the experiments.
- Possible control of the prosthetic may also be achieved through Electromyography (EMG).


# Literature Survey

## 3D Printed Myoelectric Prosthetic Arm

> ## [Reachy Beta](https://www.frontiersin.org/articles/10.3389/fnbot.2019.00065/full)

**To prove:**

- [x] Inverse Kinematics for Endpoint Position Control
- [ ] MoCap Control of Arm using Kinect v2

> ## [Anthrob – A Printed Anthropomimetic Robot](http://www.cs.cmu.edu/~cga/shoulder/robot2.pdf)

**To prove:** Example of an elbow joint flexion and subsequent extension induced by the motor position control of the three elbow joint muscles (brachialis, triceps and biceps brachii, respectively). The figure shows the elbow angle (top panel), the reference (dashed) and current (solid) motor positions of all three muscles (center panel) and the corresponding muscle forces (bottom panel).

![image](https://user-images.githubusercontent.com/24211929/72436916-953c5480-37c7-11ea-84c7-32ab21b28385.png)


# Chapter 1: Motion Capture Studio

![kinect_nimate](https://user-images.githubusercontent.com/24211929/72427972-cbbba480-37b2-11ea-93d8-a46998d2f054.gif)

To build your very own motion capture studio, you are required to install the ceratin software which are described as sections below.

## Software

### Blender 2.78

You can download any release of Blender from [here](https://download.blender.org/release/).

The project aims at producing simulations of bone/joints, depth and infrared buffer produced by a Kinect V2 which will be used to transmit the bone data through a serial port into an arduino board. The simulation consists of the [NI Mate Mocap Rig](https://remington.pro/resources/assets/misc/nimate-mocap-rig/) is a specially made rig for conduction motion capture with an Xbox Kinect, NI Mate, and Blender 3D.

As we also need to write certain scripts in python for capturing joint graphs and communicating serially, we need to  install Anaconda to ease the process of installing python libraries. In order to do this, we have to forst open python console in Blender. We see that we have `PYTHON INTERACTIVE CONSOLE 3.x.x`. For me it was 3.5.1,  so we have to  create an environment of python 3.5.1 and install the necessary packages.

> Steps:
> 1. Locate where the python is stored for Blender software. 
> 2. Replace the folder name `python` with `___python` which deferences the location as it looking for the python folder.
> 3. Open an Anaconda Prompt using administrator privileges.
> 4. Type in `$ conda create  -n <name of environment> python=3.x.x` where name of the environment can be anything and choose the version for the python to be install same as that of the Blender Python Console.
> 5. Navigate to the created environment in Anaconda folder in `Users -> Anaconda -> envs` to check if new environment is created.
> 6. In the prompt, type `$activate <name of environment>`.
> 7. Open another Anaconda Prompt and change directory into where python is stored for blender i.e, `___python`.
> 8. In the second prompt, we type in `$ Mklink /j python C:\Users\<username>\Anaconda\envs\<name of environment>`. This creates a link from the python in the new environment created to the python that blender uses.
> 9. Install any new libraries after activating the new environment in the first prompt which will reflect in Blender Python Console.

You are now ready to script in Blender using packages installed from Anaconda Prompt using `pip` or `conda`.



### Kinect SDK 2.0 and Kinect Runtime 2.0

* [KinectSDK-v2.0_1409-Setup.exe](https://www.microsoft.com/en-in/download/details.aspx?id=44561)
* [KinectRuntime-v2.0_1409-Setup.exe](https://www.microsoft.com/en-us/download/details.aspx?id=44559)

The Kinect for Windows Software Development Kit (SDK) 2.0 enables developers to create applications that support gesture and voice recognition, using Kinect sensor technology on computers running Windows 8, Windows 8.1, and Windows Embedded Standard 8.

The Kinect for Windows Runtime provides the drivers and runtime environment required by Kinect for Windows applications using Kinect sensor technology.





### NI Mate and add-ons

* Download [Delicode NI Mate](https://ni-mate.com/download/)
* Download NI MATE MOCAP RIG v1.0 - 2.7x from [here](https://remington.pro/resources/assets/misc/nimate-mocap-rig/).

The NI-Mate app captures your movement in the camera and converts it to mocap data you can import into Blender and apply to a rigged armature as shown. If you do not understand the video right now, it is fine. I will detail the steps in the upcoming sections of 'Setting up MoCap'.

## Hardware

### Kinect V2

Before we start, it’s important to note that everything in this post is about the Kinect for Xbox One, what most people call the Kinect Version 2 or the Kinect V2. The Kinect can track up to six skeletons having 25 joints, all at one time. The Kinect’s camera coordinates use the Kinect’s infrared sensor to find 3D points of the joints in space. These are the coordinates to use for joint positioning in 3D projects. For more details, refer to this [article](https://medium.com/@lisajamhoury/understanding-kinect-v2-joints-and-coordinate-system-4f4b90b9df16).

![](https://miro.medium.com/max/433/1*ai7YNHm4yOWC6wFCjDmdAw.png)

In order to have the recorded motion and joint coordinates from the Kinect V2, the open source software Blender has the necessary add-ons from Delicode NI Mate required to create your own motion capture studio.

## Setting up MoCap

By downloading free add-ons and templates made available for a number of 3D software packages, you can instantly transform your Kinect into a powerful interface with high performance.

### Introduction 

* Stage 1: Using Kinect V2 to get the bone joints onto an animated rig from Blender
* Stage 2: Using Inverse Kinematics (IK) to control an arm without tracking human motion
* Stage 3: Using the IK rig inplace of Stage 1 rig to track the motion of an arm
* Stage 4: Transfer serial data from the rigs in Blender to Arbotix-M 
* Experiments

### Stage 1: Using Kinect V2 to get the bone joints onto an animated rig from Blender

**Kinect connections to Windows 10 PC**

![image](https://user-images.githubusercontent.com/24211929/73259031-e9463080-41ec-11ea-867c-2750aab8b87e.png)

**Delicode NI Mate**

Open Delicode NI Mate. On the left, you can find your sensor detected. If you click on `>` beside the sensor, you can choose to transmit the data you want to over an OSC port communication which will be used when we want to use the captured motion to be represented in Blender.

As I am going to opt for tracking of human body joints, I am going to choose `Skeleton Tracking` from the menu. The kinect allows to choose the point of origin when it is tracking joint coordinates. Click on `Skeleton Tracking -> Coordinates` and choose from the options given. I choose the `Sensor` as origin. Remember to checkbox `Skeleton Tracking` from the menu for transporting the coordinates of the joints from kinect to blender for animation and rigging purposes. 

You can `Start Sensor/Stop Sensor` at the top right if you want to restart your device.

**Detecting a User**

![Delicode NI mate  2 14 Free - Default_ 28-01-2020 16_50_25](https://user-images.githubusercontent.com/24211929/73290627-c9326380-4224-11ea-8133-8978418bcfb2.png)


**Getting the Pose**

![Delicode NI mate  2 14 Free - Default_ 28-01-2020 16_50_13](https://user-images.githubusercontent.com/24211929/73290630-c9cafa00-4224-11ea-830b-a7f3df1bd986.png)

> If you are unable to view the sensor data from delicode NI mate despite stopping and starting the sensor repeatedly, click on `File -> Preferences` and uncheck the box for `Use GPU Transfer`. The reasoning for this ...

![Delicode NI mate Preferences 28-01-2020 16_00_20](https://user-images.githubusercontent.com/24211929/73290626-c899cd00-4224-11ea-9500-9a4a57577cd8.png)

Once all the above steps are completed, we are ready to use the kinect data to animate a human-meta rig as taken from Remington Pro's youtube video as continued in Blender section below.

#### Blender 2.78

As of now, the pipeline looks something like the picture below.

![pipeline](https://user-images.githubusercontent.com/24211929/71520910-89562480-28e4-11ea-8fc5-a829d93af095.png)

**Rigging**

{% include elements/video.html id="1UPZtS5LVvw" %} 

This video shows us a blender rig which contains three collections, namely

* Coordinate Data: The raw XYZ location data from the NI Mate add-on

![Blender_  D__vishal_blender_rc_nimate_rig_b2_79_usethis blend  28-01-2020 23_30_34](https://user-images.githubusercontent.com/24211929/73291479-3c88a500-4226-11ea-871d-2d80a938b5ef.png)

* Capture Armature: The armature you should use for capturing motion

![Blender_  D__vishal_blender_rc_nimate_rig_b2_79_usethis blend  28-01-2020 23_30_43](https://user-images.githubusercontent.com/24211929/73291478-3c88a500-4226-11ea-95d6-efca904ecbad.png)

* Example Retargeted Rig: An example armature demonstrating how you should retarget the capture armature to your model’s armature

![Blender_  D__vishal_blender_rc_nimate_rig_b2_79_usethis blend  28-01-2020 23_30_47](https://user-images.githubusercontent.com/24211929/73291481-3d213b80-4226-11ea-8f41-c292a47ff886.png)

**Tracking**

Once ready, either press `Ctrl+Alt+U` or `File -> User Preferences` and add the respective add-ons/plug-ins i.e, from NI Mate [Blender v2.4](https://ni-mate.com/download/). 

Save User Preferences.

You will notice NI Mate tab on the left of the 3D Viewport. Click on `Start` to start transmitting the data from delicode NI Mate which was running in the previous section.

You can now track your motion using Blender. After clicking on `Start`, you can press the `red` button beside the play button and then click on play to record in keyframes. Click on `Stop` and re-click the red button to stop recording the motion as captured from kinect onto the blender rig.


![poserig_anim](https://user-images.githubusercontent.com/24211929/72428043-ebeb6380-37b2-11ea-8d57-5ba95668f69b.gif)

You can switch between the rigs in different layers and choose the coordinate data which will also give us the graphs of all the joints tracked as we select them. Below is a small video to show the graph for Left Knee.

![graph1](https://user-images.githubusercontent.com/24211929/72428044-ebeb6380-37b2-11ea-985c-ca7b7ed71834.gif)


### Stage 2: Using Inverse Kinematics (IK) to control an arm without tracking human motion

[IK](https://easyblend.org/html/rigging/posing/inverse_kinematics/introduction.html#arm-rig-example) simplifies the animation process, and makes it possible to make more advanced animations with lesser effort.

IK allows you to position the last bone in a bone chain and the other bones are positioned automatically. This is like how moving someone’s finger would cause his arm to follow it. By normal posing techniques, you would have to start from the root bone, and set bones sequentially till you reach the tip bone: When each parent bone is moved, its child bone would inherit its location and rotation. Thus making tiny precise changes in poses becomes harder farther down the chain, as you may have to adjust all the parent bones first.

This effort is effectively avoided by use of IK.

![](https://easyblend.org/html/_images/ik_arm_example.jpg)

Automatic IK is a tool for quick posing, it can be enabled in the tool shelf in the 3D View, when in pose mode. When the Auto IK option is enabled, translating a bone will activate inverse kinematics and rotate the parent bone, and the parent’s parent, and so on, to follow the selected bone. The IK chain can only extend from a child to a parent bone if the child is connected to it.

![armrig](https://user-images.githubusercontent.com/24211929/72426754-551da780-37b0-11ea-8dc3-07ace41bf16e.JPG)

### Stage 3: Using the IK rig inplace of Stage 1 rig to track the motion of an arm

[File](https://github.com/vishalgattani/vishalgattani.github.io/blob/master/files/blender/IK_Arm_Example_rigging_with_kinect.blend)

To copy the 3 layers from [rc_nimate_rig_b2_79.blend]() file, ensure the view is in `Object Mode` and not in `Edit or Pose Mode`. Press `Shift` and double press `a` key to select everything in a layer and then click on the second layer pressing `Shift` and press `a` key twice then onto the third. `Shift` key allows you to select multiple objects and pressing `a` twice helps in selecting all the elements. Open the IK file and click the second layer and `Ctrl+V` to paste all the rigs on the second layer. This will not matter as we are only interested in the arm section of the rig.

![Blender  C__Users_IIITB_Downloads_IK_Arm_Example_rigging_with_kinect_demo_29jan blend  28-01-2020 23_58_40](https://user-images.githubusercontent.com/24211929/73293582-27ae1080-422a-11ea-936b-21bbf6d7ad2a.png)

**Adding Bone Contraints**

Bone contraints are needed to be added as there are more armatures in the IK rig than in the Capture Retargeted Armature. We have the arm assembled in such a way that only a few contraints are required to animate it in a way it is Biomimetic in real-time. 

| Arm to be selected | Target | Bone |
|:-------------:|:-------------:|:-:| 
| arma      | Capture Armature |Arm_L/Arm_R|
| armc      | Capture Armature      |Forearm_L/Forearm_R|
| hand | Capture Armature      |Hand_L/Hand_R|

Once these constraints have been added by selecting the `Pose Mode` in 3D viewport and then `Properties -> Bone Contraints` tab, follow the steps from Tracking section above to keep track of recorded motion.

### Stage 4: Transfer serial data from the rigs in Blender to Arduino 

**Blender Controller**

![Video](https://user-images.githubusercontent.com/24211929/72426222-569aa000-37af-11ea-8f76-4c122fa8cdb4.gif)

The [Blender Controller](https://github.com/alvaroferran/BlenderController) repo shows how to control a robot from blender using python. To execute the controller first upload the arduino code into the board. Then in the blender file, press on "Run Script", then the play icon and finally hover the mouse over the control bone and press the "G" key.

{% include elements/video.html id="mONTXmDgZSE" %}

Additional changes have been added to he code to effectively send bone angles to the arduino board using serial communication.


![motor control for arduino base file](https://user-images.githubusercontent.com/24211929/72427403-ae3a0b00-37b1-11ea-8c99-d2c0ebe3c827.PNG)

![Screenshot 15-01-2020 15_52_47](https://user-images.githubusercontent.com/24211929/72426076-163b2200-37af-11ea-998e-55999df9a72b.png)

**Blender Code**

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

**Arduino Code**

```c
#include <Servo.h>

Servo myservo; 
int pos = 0;    // variable to store the servo position
int incomingByte = 0;   // for incoming serial data

String readString(){
  String inString ="";
  char inChar;
  while(Serial.available()>0){
    inChar =(char) Serial.read();
    inString+=inChar;
    delay(1);
  }
  return inString;
}

int parseString(String msg){
    static int a;
    a = msg.toInt();
    return a;
}

void writeValues(int b){
  myservo.write(b); 
}

void setup() {
  myservo.attach(3);
  myservo.write(0);
  Serial.begin(9600);
}

void loop() {
    if(Serial.available()){
        String incoming=readString();
        int angles=parseString(incoming);
        angles = int(angles);
        writeValues(angles);
    }
}
```

# Chapter 2: MoCap Experiments

## Joint Tracking versus Distance from Kinect V2

The purpose of this experiment is to analyse whether the tracking from Kinect V2, although seeming real-time, can result in variation of accuracy of the joint being tracked due to increase in distance from the Kinect sensor. According to [Microsoft Forum](https://social.msdn.microsoft.com/Forums/en-US/c95d3e40-6ed6-47a1-a206-5ff26c889c29/kinect-v2-maximum-range?forum=kinectv2sdk), the Kinect v2 can physically sense depth at 8 meters. So, Yes you can sense objects at 5m. The skeleton tracking range is 0.5m to 4.5m, and it has trouble finding a skeleton at closer than 1.5m because of the field of view of the camera. So the cameraZ value will usually fall somewhere between 1.5 and 4.5. However, 4.5 m  is where the system can reliably track body joints. Anything beyond 4.5 meters will lead to inconsistent results in body joints tracking.

The Blender [file](https://github.com/vishalgattani/vishalgattani.github.io/blob/master/files/blender/IK_Arm_Example_rigging_with_kinect.blend) will enable us to capture graphs from joints and the angles between bone armatures as we track it.

> Before we save the captured data in a `.csv` format to plot graphs using plotly, the recording should be done in the following order to ensure sync in time between different distance-based experiments. 
> 1. Start the transmission through NI-mate add-on for all the joints.
> 2. Click on the record button to start recording. This won't all recording to be saved in blender without pressing the `Play` button in the panel.
> 3. Once record is clicked, click on the `Play` button to start inserting keyframes.
> 4. When satisfied with the time for which motion is captured, click on `Pause` first to stop inserting more keyframes.
> 5. Then click on recording button or `Stop` in NI Mate add-on in tool bar.

After recording the motion, all the data is stored in blender's animation data. This section can be accessed through `id_data.animation_data` and using this ID to get the fcurve by `id_data.animation_data.action.fcurves`. The fcurve's keyframe points can be accessed using `fcurve<index=x,y,z>.keyframe_points`. The detailed code is given below.

**Code for tracking Left Arm**

```python
import serial
import pandas as pd
import numpy as np
import bpy
import math
import os
from datetime import date
os.system('cls')

# utility function for searching fcurves
def find_fcurve(id_data, path, index=0):
    anim_data = id_data.animation_data
    for fcurve in anim_data.action.fcurves:
        if fcurve.data_path == path and fcurve.array_index == index:
            return fcurve

#for o in bpy.data.objects:
#    print(o.name, type(o),o.keys())
# index=2 for the Z curve. Just omit for single value properties.

joints_tracked = []
for i in bpy.data.objects:
    joints_tracked.append(i.name)
    #print(i)
   
     
#keep_joints = ['Head', 'Left_Ankle', 'Left_Elbow', 'Left_Foot', 'Left_Hand', 'Left_Hip', 'Left_Knee', 'Left_Shoulder', 'Left_Wrist', 'Neck', 'Right_Ankle', 'Right_Elbow', 'Right_Foot', 'Right_Hand', 'Right_Hip', 'Right_Knee', 'Right_Shoulder', 'Right_Wrist', 'Torso','Right_Collar','Left_Collar']
larm = ['Left_Shoulder','Left_Elbow','Left_Wrist','Left_Hand']
only = list(set(larm) & set(joints_tracked))
print(only,len(only))


fcurves_x_list = []
fcurves_y_list = []
fcurves_z_list = []
objects_fcurves_x_list = []
objects_fcurves_y_list = []
objects_fcurves_z_list = []

for i in only:
    fcurvex = find_fcurve(bpy.data.objects[i], "location", 0) # x axis
    fcurvey = find_fcurve(bpy.data.objects[i], "location", 1) # y axis
    fcurvez = find_fcurve(bpy.data.objects[i], "location", 2) # z axis
    kfp_x = fcurvex.keyframe_points
    kfp_y = fcurvey.keyframe_points
    kfp_z = fcurvez.keyframe_points
    objects_fcurves_x_list.append(kfp_x)
    objects_fcurves_y_list.append(kfp_y)
    objects_fcurves_z_list.append(kfp_z)
   
df_list = []
for i in range(len(objects_fcurves_x_list)):
    print("Creating dataframe: ",only[i])
    df = pd.DataFrame(columns=['frame', 'x', 'y', 'z'])
    for j in range(len(objects_fcurves_x_list[0])):
        l = [objects_fcurves_x_list[i][j].co[0],objects_fcurves_x_list[i][j].co[1],objects_fcurves_y_list[i][j].co[1],objects_fcurves_z_list[i][j].co[1]]
        df = df.append(pd.Series(l, index=['frame', 'x', 'y', 'z']), ignore_index=True)
    df_list.append(df)

today = date.today()
d = today.strftime("%b-%d-%Y")
print("Saving...")
for i in range(len(df_list)):
    df_list[i].to_csv(str(d)+" "+only[i]+'.csv',index=False)
print("Saved.")

```

This code returns a `.csv` file for every joint with the respective frame numbers, x-axis, y-axis, z-axis coordinate values as taken from Delicode NI Mate's output with the `Sensor as Origin`.

I will run this from varied distances away from the sensor to analyse the recorded motion with respect to distance.

The file which will be used to keep track of graphs is [here](https://github.com/vishalgattani/vishalgattani.github.io/blob/master/files/blender/IK_Arm_Example_rigging_with_kinect_graphs_leftarm.blend).


**Updated Code for tracking Left Arm**

**To track the mesh rig**

```python

import bpy
import pandas as pd
from math import degrees
import numpy as np

def findAnglesBetweenTwoVectors1(v1s, v2s):
    dot = np.einsum('ijk,ijk->ij',[v1s,v1s,v2s],[v2s,v1s,v2s])
    return np.degrees(np.arccos(dot[0,:]/(np.sqrt(dot[1,:])*np.sqrt(dot[2,:]))))



context = bpy.context
ob = context.object
# middle of thigh
tb = ob.pose.bones[2]
print(tb)
B = (tb.head + tb.tail) / 2

# the active pose bone
pb = context.active_pose_bone

print(pb)
A = pb.head
C = pb.tail

# angle AB BC
alpha = (A - B).angle(C - B)
print(degrees(alpha))

sce = bpy.context.scene
ob = bpy.context.object



animation_data = []
for f in range(sce.frame_start, sce.frame_end+1):
    sce.frame_set(f)
    
    framenum = []
    #for pbone in ob.pose.bones:
        #print(pbone.name, pbone.matrix, pbone.head, pbone.tail, pbone.head-pbone.tail)
        #print(pbone.name, pbone.head, pbone.tail, pbone.head-pbone.tail) 
        
    shoulder = ob.pose.bones[2]
    arma = ob.pose.bones[3]
    armb = ob.pose.bones[4]
    armc = ob.pose.bones[5]
    armd = ob.pose.bones[6]
    hand = ob.pose.bones[7]
    
    v1 = shoulder.tail - shoulder.head
    v2 = arma.head - arma.tail
    shouldertoarm = v1.angle(v2)
    
    v1 = armb.head - armb.tail
    v2 = armc.head - armc.tail
    elbow = v1.angle(v2)
    
    v1 = armd.tail - armd.head
    v2 = hand.head - hand.tail
    wrist = v1.angle(v2)
    
    data = [f, degrees(shouldertoarm),180 - degrees(elbow),degrees(wrist)]
    animation_data.append(data)
    print("Frame %i" % f, data)

        
  
    
df = pd.DataFrame(animation_data,columns=['frame', 'shoulder to arm angle', 'elbow angle', 'hand to wrist angle'])

df.to_csv('Mesh Arm Data.csv',index=False)
```


**To track the F-Curve data coming from Kinect and NI Mate** 

```python
import serial
import pandas as pd
import numpy as np
import bpy
import math
import os
from datetime import date
import mathutils

os.system('cls')

import numpy as np
import numpy.linalg as la

def py_ang(v1, v2):
    """ Returns the angle in radians between vectors 'v1' and 'v2'    """
    cosang = np.dot(v1, v2)
    sinang = la.norm(np.cross(v1, v2))
    return np.arctan2(sinang, cosang)


# utility function for searching fcurves
def find_fcurve(id_data, path, index=0):
    anim_data = id_data.animation_data
    for fcurve in anim_data.action.fcurves:
        if fcurve.data_path == path and fcurve.array_index == index:
            return fcurve

#for o in bpy.data.objects:
#    print(o.name, type(o),o.keys())
# index=2 for the Z curve. Just omit for single value properties.

joints_tracked = []
for i in bpy.data.objects:
    joints_tracked.append(i.name) 
    print(i)

#keep_joints = ['Head', 'Left_Ankle', 'Left_Elbow', 'Left_Foot', 'Left_Hand', 'Left_Hip', 'Left_Knee', 'Left_Shoulder', 'Left_Wrist', 'Neck', 'Right_Ankle', 'Right_Elbow', 'Right_Foot', 'Right_Hand', 'Right_Hip', 'Right_Knee', 'Right_Shoulder', 'Right_Wrist', 'Torso','Right_Collar','Left_Collar'] 
larm = ['Left_Shoulder','Left_Elbow','Left_Wrist','Left_Hand']
only = list(set(larm) & set(joints_tracked))
print(only,len(only))


fcurves_x_list = []
fcurves_y_list = []
fcurves_z_list = []
objects_fcurves_x_list = []
objects_fcurves_y_list = []
objects_fcurves_z_list = []

for i in only:
    fcurvex = find_fcurve(bpy.data.objects[i], "location", 0)
    fcurvey = find_fcurve(bpy.data.objects[i], "location", 1)
    fcurvez = find_fcurve(bpy.data.objects[i], "location", 2)
    kfp_x = fcurvex.keyframe_points
    kfp_y = fcurvey.keyframe_points
    kfp_z = fcurvez.keyframe_points
    objects_fcurves_x_list.append(kfp_x)
    objects_fcurves_y_list.append(kfp_y)
    objects_fcurves_z_list.append(kfp_z)
    
df_list = []
for i in range(len(objects_fcurves_x_list)):
    print("Creating dataframe: ",only[i])
    df = pd.DataFrame(columns=['frame', only[i]+'_x', only[i]+'_y', only[i]+'_z'])
    for j in range(len(objects_fcurves_x_list[0])):
        l = [objects_fcurves_x_list[i][j].co[0],objects_fcurves_x_list[i][j].co[1],objects_fcurves_y_list[i][j].co[1],objects_fcurves_z_list[i][j].co[1]]
        df = df.append(pd.Series(l, index=['frame', only[i]+'_x', only[i]+'_y', only[i]+'_z']), ignore_index=True)
    df_list.append(df)
    

dfx = pd.concat([d.set_index('frame') for d in df_list], axis=1).reset_index()
print(dfx.columns)

dfx["shoulder_to_elbow_x"] = dfx["Left_Elbow_x"] - dfx["Left_Shoulder_x"] 
dfx["shoulder_to_elbow_y"] = dfx["Left_Elbow_y"] - dfx["Left_Shoulder_y"] 
dfx["shoulder_to_elbow_z"] = dfx["Left_Elbow_z"] - dfx["Left_Shoulder_z"] 

dfx["elbow_to_hand_x"] = dfx["Left_Hand_x"] - dfx["Left_Elbow_x"] 
dfx["elbow_to_hand_y"] = dfx["Left_Hand_y"] - dfx["Left_Elbow_y"] 
dfx["elbow_to_hand_z"] = dfx["Left_Hand_z"] - dfx["Left_Elbow_z"] 

dfx["hand_to_wrist_x"] = dfx["Left_Wrist_x"] - dfx["Left_Hand_x"] 
dfx["hand_to_wrist_y"] = dfx["Left_Wrist_y"] - dfx["Left_Hand_y"] 
dfx["hand_to_wrist_z"] = dfx["Left_Wrist_z"] - dfx["Left_Hand_z"] 

dfx['shoulder_to_elbow'] = dfx[["shoulder_to_elbow_x","shoulder_to_elbow_y","shoulder_to_elbow_z"]].values.tolist()
dfx['elbow_to_hand'] = dfx[["elbow_to_hand_x","elbow_to_hand_y","elbow_to_hand_z"]].values.tolist()
dfx['hand_to_wrist'] = dfx[["hand_to_wrist_x","hand_to_wrist_y","hand_to_wrist_z"]].values.tolist()

def findAnglesBetweenTwoVectors1(v1s, v2s):
    dot = np.einsum('ijk,ijk->ij',[v1s,v1s,v2s],[v2s,v1s,v2s])
    return np.degrees(np.arccos(dot[0,:]/(np.sqrt(dot[1,:])*np.sqrt(dot[2,:]))))


v0 = np.array(dfx['shoulder_to_elbow'].values.tolist()) 
v1 = np.array(dfx['elbow_to_hand'].values.tolist()) 
v2 = np.array(dfx['hand_to_wrist'].values.tolist()) 


elbow_angle = findAnglesBetweenTwoVectors1(v1,-v0)
wrist_angle = findAnglesBetweenTwoVectors1(v2,v1)

dfx['elbow_angle'] = np.array(elbow_angle)
dfx['wrist_angle'] = np.array(wrist_angle)

#print(dfx)
#today = date.today()
#d = today.strftime("%b-%d-%Y")
#print("Saving...")
#for i in range(len(df_list)):
#    df_list[i].to_csv(only[i]+'.csv',index=False)
#print("Saved.")

dfx.to_csv('Fcurve Data.csv',index=False)

```

**Python Plotly to plot graphs**

```python 
from _plotly_future_ import v4_subplots
import plotly.plotly as py
import plotly.graph_objs as go
import pandas as pd
import plotly.figure_factory as ff

fig = plotly.tools.make_subplots(rows=2, cols=2,shared_xaxes=True,subplot_titles=("Plot 1", "Plot 2", "Plot 3", "Plot 4"))

fig.add_trace(go.Scatter(x=fcurve1.frame, y=fcurve1.elbow_angle,name='fcurve1 1'),row=1,col=1)
fig.add_trace(go.Scatter(x=mesh1.frame, y=mesh1['elbow angle'],name='mesh1 1'),row=1,col=1)

fig.add_trace(go.Scatter(x=fcurve2.frame, y=fcurve2.elbow_angle,name='fcurve2 2'),row=1,col=2)
fig.add_trace(go.Scatter(x=mesh2.frame, y=mesh2['elbow angle'],name='mesh2 2'),row=1,col=2)

fig.add_trace(go.Scatter(x=fcurve3.frame, y=fcurve3.elbow_angle,name='fcurve3 3'),row=2,col=1)
fig.add_trace(go.Scatter(x=mesh3.frame, y=mesh3['elbow angle'],name='mesh3 3'),row=2,col=1)

fig.add_trace(go.Scatter(x=fcurve4.frame, y=fcurve4.elbow_angle,name='fcurve4 4'),row=2,col=2)
fig.add_trace(go.Scatter(x=mesh4.frame, y=mesh4['elbow angle'],name='mesh4 4'),row=2,col=2)

fig.layout.update({'title': 'Elbow Angles vs Distance'})
fig.show()

plotly.offline.plot(fig, filename='Elbow Angles vs Distance.html',auto_open = False)
```

After having tracked the joint trajectories and their respective bone angles that the armature makes after mapping it from the kinect's NI-mate rig to the IK Arm Example rig, I have come to the conclusion that there isn't much of a deviation in the angles with respect to the distance. A maximum of 8-9 degrees has been observed which might be due to the retargeted armature which doesn't fully align with respect to the captured armature from NI mate into the blender. 

However, due to the repetition of motion over varied distances we can see for ourselves that the motion remains mapped as expected onto the armature and the angles closely resemble to that of the actual human arm. We could further analyse by creating such graphs in belnder and having some sensor attached onto the prosthetic arm and figure out the variation and also attach the same sensor on the person whose arm is being tracked. This will establish a closed-loop system and could improve the accuracy of the system in general.

### Graphs

When referring to the **Mesh**, I mean the following rig.

![Blender_  D__vishal_chapters_graphs vs distance_IK_Arm_Example_rigging_with_kinect_demo_29jan_record_new_3_withcode_1 blend  04-02-2020 23_28_40](https://user-images.githubusercontent.com/24211929/73772445-276fc100-47a6-11ea-8f1e-d6411066aad2.png)

When referring to the **F-Curves**, the following coordinate data from the capture and retargeted armature is taken for consideration.

![Blender_  D__vishal_chapters_graphs vs distance_IK_Arm_Example_rigging_with_kinect_demo_29jan_record_new_3_withcode_1 blend  04-02-2020 23_29_14](https://user-images.githubusercontent.com/24211929/73772448-276fc100-47a6-11ea-88b8-17e1b4a26218.png)

The motion that was repeated over the distance is as follows. The blender rig has been modified to capture the motion through the kinect over the distances of 1m,2m,3m and 4m and then the graphs were generated using plotly.

![ezgif com-video-to-gif (3)](https://user-images.githubusercontent.com/24211929/73770273-23da3b00-47a2-11ea-8fda-705571fa2ca0.gif)

The elbow angles for every meter away from the sensor is plotted from the coordinate data available from the kinect sensor through the NI mate add-on.

The F-Curve data from different distances are taken and compared against each other. Though it may seem that these graphs show very little correlation, the response difference is due to the error in recorded the same motion at the exact time as any other recording. However, looking at the bone angles taken during 3 meters and 4 meters, we can safely say that the deviation in the angles which will be transmitted to actuate the dynamixels is very little and has only little to no effect.

<div>
    <a href="https://plot.ly/~vishalgattani/20/?share_key=e4orq2TEO7il8QAYB479x5" target="_blank" title="Fcurve Elbow Angles vs Distance" style="display: block; text-align: center;"><img src="https://plot.ly/~vishalgattani/20.png?share_key=e4orq2TEO7il8QAYB479x5" alt="Fcurve Elbow Angles vs Distance" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="vishalgattani:20" sharekey-plotly="e4orq2TEO7il8QAYB479x5" src="https://plot.ly/embed.js" async></script>
</div>

After receiving the data from the kinect and NI mate add-on and mapping the motion to the IK Arm and then comparing the joint angles in the retargeted rig and the IK Arm rig, we can see that the motion closely resembles that of the recorded motion adn that the transmission from the IK Arm rig to the Dynamixels will be efficient upto a maximum angle difference of 9-10 degrees for rapid motions as it experiences the delay due to the frames per second recording of the kinect.

<div>
    <a href="https://plot.ly/~vishalgattani/18/?share_key=p4u01NOv3N6qOe0DCzdwtz" target="_blank" title="Elbow Angles vs Distance" style="display: block; text-align: center;"><img src="https://plot.ly/~vishalgattani/18.png?share_key=p4u01NOv3N6qOe0DCzdwtz" alt="Elbow Angles vs Distance" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="vishalgattani:18" sharekey-plotly="p4u01NOv3N6qOe0DCzdwtz" src="https://plot.ly/embed.js" async></script>
</div>



<div>
    <a href="https://plot.ly/~vishalgattani/22/?share_key=Nve4ieLly1TkGPerTiOGjX" target="_blank" title="Elbow Angles vs Distance Comparison" style="display: block; text-align: center;"><img src="https://plot.ly/~vishalgattani/22.png?share_key=Nve4ieLly1TkGPerTiOGjX" alt="Elbow Angles vs Distance Comparison" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="vishalgattani:22" sharekey-plotly="Nve4ieLly1TkGPerTiOGjX" src="https://plot.ly/embed.js" async></script>
</div>


Following these set of graphs, individual bone angles with respect to the x,y and z-axis will be taken into consideration to check the wrist flexion and extension, wrist abduction and adduction along with ulnar and radial deviation, and shoulder abduction and adduction, shoulder flexion and extension, humeral rotation, and wrist pronation and sulpination. 

![image](https://user-images.githubusercontent.com/24211929/73772784-da401f00-47a6-11ea-80a6-ff425afa4ae0.png)

Inorder to get these angles and rotations, I will need to get the bone matrix and figure out the angles with respect to the coordinate axes. Then I will be able to actuate the dynamixels according to their positions on the prosthetic arm.

TO begin with, we first need to understand the positioning and the terminology surrounding the armatures in blender. I will be dealing with vectors and matrices and hence, it is important to know which frame values, local or global, will be transmitted serially to the Arbotix-M robocontroller. 


![image](https://user-images.githubusercontent.com/24211929/73831999-53825500-482d-11ea-8541-28aa4734f16e.png)

The bone's orientation or direction can be determined by subtracting the positions of the head and tail and then performing a vector dot product with the global axes in order to determine direction.

The following rig has the armature bone names as shown in the figure.

![Blender_  D__vishal_chapters_graphs vs distance_IK_Arm_Example_rigging_with_kinect_demo_29jan_record_new_3_withcode_1 blend  04-02-2020 23_28_40](https://user-images.githubusercontent.com/24211929/73772445-276fc100-47a6-11ea-8f1e-d6411066aad2.png)

The angles are calculated using vector multiplication.

```python
shoulder = ob.pose.bones.get("shoulder")
arma = ob.pose.bones.get("arma")
armb = ob.pose.bones.get("armb")
armc = ob.pose.bones.get("armd")
armd = ob.pose.bones.get("armd")
hand = ob.pose.bones.get("hand")

shoulder_xangle = math.degrees(Vector((1,0,0)).angle(shoulder.tail - shoulder.head))
shoulder_yangle = math.degrees(Vector((0,1,0)).angle(shoulder.tail - shoulder.head))
shoulder_zangle = math.degrees(Vector((0,0,1)).angle(shoulder.tail - shoulder.head))

arma_x_angle = math.degrees(Vector((1,0,0)).angle(arma.tail - arma.head))
arma_y_angle = math.degrees(Vector((0,1,0)).angle(arma.tail - arma.head))
arma_z_angle = math.degrees(Vector((0,0,1)).angle(arma.tail - arma.head))

armb_x_angle = math.degrees(Vector((1,0,0)).angle(armb.tail - armb.head))
armb_y_angle = math.degrees(Vector((0,1,0)).angle(armb.tail - armb.head))
armb_z_angle = math.degrees(Vector((0,0,1)).angle(armb.tail - armb.head))

armc_x_angle = math.degrees(Vector((1,0,0)).angle(armc.tail - armc.head))
armc_y_angle = math.degrees(Vector((0,1,0)).angle(armc.tail - armc.head))
armc_z_angle = math.degrees(Vector((0,0,1)).angle(armc.tail - armc.head))

armd_x_angle = math.degrees(Vector((1,0,0)).angle(armd.tail - armd.head))
armd_y_angle = math.degrees(Vector((0,1,0)).angle(armd.tail - armd.head))
armd_z_angle = math.degrees(Vector((0,0,1)).angle(armd.tail - armd.head))

hand_x_angle = math.degrees(Vector((1,0,0)).angle(hand.tail - hand.head))
hand_y_angle = math.degrees(Vector((0,1,0)).angle(hand.tail - hand.head))
hand_z_angle = math.degrees(Vector((0,0,1)).angle(hand.tail - hand.head))
```

After running the code, the values have been cross checked with that of the recorded motion. The figures down below justify that the values are indeed approximate to that of the recorded motion and therefore, these values can be transmitted to the dynamixels. The dynamixels also can plot the curves being a smart serial servo using Dynamixel Wizard 2.0 and the graphs can then be compared from the Blender rigs and from the Dynamixels to determine any delay in reaching the end goal.

The values in the terminal in the figures are of the format: `{Frame # , angle from x-axis, angle from y-axis, angle from z-axis}` and the angles are measured from the vector which joints the said armature's tail to head.

![Blender_  D__vishal_chapters_graphs vs distance_IK_Arm_Example_rigging_with_kinect_demo_29jan_record_new_4_withcode_1 blend  05-02-2020 16_06_35](https://user-images.githubusercontent.com/24211929/73834371-99d9b300-4831-11ea-9051-17b9446b3e59.png)

![Blender_  D__vishal_chapters_graphs vs distance_IK_Arm_Example_rigging_with_kinect_demo_29jan_record_new_4_withcode_1 blend  05-02-2020 16_07_31](https://user-images.githubusercontent.com/24211929/73834377-9b0ae000-4831-11ea-9b7f-4c8088694298.png)

At frame 180, the `arma` position is clearly perpendicular to the x-axis and we can see from the values generated that it is indeed nearly perpendicular. 

![tempsnip](https://user-images.githubusercontent.com/24211929/73835034-c04c1e00-4832-11ea-9384-2a44ac392ceb.png)


As stated before, there are commercially-available prosthesis such as the [LUKE arm](https://www.mobiusbionics.com/luke-arm/) from [Mobius Bionics](https://www.mobiusbionics.com/) which enables shoulder abduction and adduction, elbow flexion and extension and wrist with combined ulnar/radial deviation.

The terminology can be explained by the following videos for better understanding.
**Shoulder Abduction and Adduction**
![shoulder-abduction](https://user-images.githubusercontent.com/24211929/73836236-d35fed80-4834-11ea-888c-8fb8aa98d3e5.gif)

**Shoulder Extension and Flexion**
![shoulder-flexion](https://user-images.githubusercontent.com/24211929/73836241-d529b100-4834-11ea-9075-4a4762da34dc.gif)

**Elbow Extension and Flexion**
![elbow-flexion](https://user-images.githubusercontent.com/24211929/73836246-d65ade00-4834-11ea-88c6-e41a2a6faa42.gif)

These gifs are taken from [Mobius Bionics](https://www.mobiusbionics.com/luke-arm/#section-four) for the sole purpose of understanding the terminology.

The graphs of the armature bone `arma` are plotted and analysed for futher insight.

<div>
    <a href="https://plot.ly/~vishalgattani/28/?share_key=JYaOhCXaWD1zNlEJDA315M" target="_blank" title="Shoulder Armature Bone Angles" style="display: block; text-align: center;"><img src="https://plot.ly/~vishalgattani/28.png?share_key=JYaOhCXaWD1zNlEJDA315M" alt="Shoulder Armature Bone Angles" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="vishalgattani:28" sharekey-plotly="JYaOhCXaWD1zNlEJDA315M" src="https://plot.ly/embed.js" async></script>
</div>

From these graphs we can see that the motion, being similar, has resulted in the armature angles to be similar as well. These values, therefore, will not result in massive changes when applied to the prosthetic arm through the Dynamixel motors using Arbotix-M board. 

Furthermore, the need to calculate the humeral rotation and the wrist pronation and supination will enable finer control of the prosthetic arm using Blender. Inorder to achieve these results, the kinect will have to first detect the rotation through the NI mate add-on. Moreover, the radial and ulnar deviation of the wrist and its extension and flexion as detected by the kinect are constrained to a specific range. This range will be calculated next.


























































# Servos, Actuators, Motors and Boards

## Towerpro MG996R



## Dynamixel Motors/Actuators

All the motors related information can be found (here)[http://www.robotis.us/dynamixel/]. The required motors which are being used are:

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72440639-3a0e6000-37cf-11ea-8c73-3807fe5aa807.png" caption="Reachy Documentation Specs" %}

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72973880-0d240380-3df4-11ea-9f5f-e480d38feaf8.png" caption="Stall Torque v/s Speed (RPM)" %}

The ArbotiX-M Robocontroller can directly control and power 3-pin TTL DYNAMIXEL servos like the ones listed below.

* 300° / 10-BIT RESOLUTION SERVOS
 1. AX-12A
 2. AX-18A
* 360 ° / 12-BIT RESOLUTION SERVOS
 1. MX-28T
 2. MX-64T
 3. MX-106T

For more projects that incorporate these Dynamixels, click [here](https://learn.trossenrobotics.com/arbotix/arbotix-getting-started/38-toc/interbotix-robots.html).

Also follow this [link](https://learn.trossenrobotics.com/arbotix/arbotix-getting-started/157-arbotix-m-dynamixel-buying-guide.html) for details on whether MX servos can be controlled or not.

### Programming

RS-485 DYNAMIXEL servos like the RX and MX-R servos can be controlled from the ArbotiX-M, but require custom hardware and are not officially supported. The ArbotiX-M robocontroller is deisgned to communicate with TTL servos like the AX line of servos and the MX-T servos. On its own, the Arbotix-M can't control RS-485 servos like the RX/EX servos or the MX-R servos.

To program the ArbotiX-M you will need an FTDI USB to Serial Converter. The Standard FTDI Cable is a standard FTDI programmer and will work perfectly for programming the ArbotiX-M. 

According to Trossen Robotics Support,

**The MX106 will work with these libraries, however the protocol version has to be reverted to protocol 1. The new MX servos are coming with firmware / protocol 2. You would have to download an older version of DYNAMIXEL wizard that has protocol 1.0 firmware for the 106 servo and ‘reset’ the servo using that software.**

**Alternatively, Trossen Robotics recommends using the CM9.04c or U2D2 to control the 106 servo with protocol 2 firmware.**

What are these protocols?

#### Protocols

Follow this [link](http://emanual.robotis.com/docs/en/dxl/) for more understanding of dynamixel 1.0 and 2.0 servos. 

NOTE - Read the following to ensure proper use of MX series(2.0). In order to use Protocol 2.0 firmware version with MX series, proceed to Firmware Recovery via DYNAMIXEL Wizard 2.0 or R+ Manager 2.0. Protocol 2.0 is available with v39 Firmware version (or above). Proceed to Firmware Update via DYNAMIXEL Wizard 2.0 or R+ Manager 2.0. Protocol 2.0 supports various Operating Modes, Secondary ID, Drive Mode, Bus Watchdog and etc.

Please refer to this [link](http://emanual.robotis.com/docs/en/software/dynamixel/dynamixel_wizard2/) regarding protocol differences.

As far as I can tell, the new Protocol 2.0 has changed some of the registers, by reverting this to an older protocol, Trossen Robotics demos should work.

### Power

Run DYNAMIXEL servos at 11-12v. MX series servos can be run at up to 14.8v, but AX servos can not.

12v SMPS(Switched Mode Power Supplies) cab be used with the ArbotiX-M. These supplies will plug directly into the ArbotiX-M via barrel connector.

**To choose the power supply for your project, add up the stall current for all the servos in your chain. Your power supply should exceed this calculated current.**

The MX-64 and MX-106 servos require additional hardware when working with an SMPS. The SMPS2DYNAMIXEL will help smooth the SMPS voltage. 

### Links - Hardware and Software

Follow these links:
* [https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide](https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide)
* [https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx)
* Download FTDI Drivers: [here](https://www.ftdichip.com/Drivers/VCP.htm)
* Download RoboPlus 1.1.3: [here](http://en.robotis.com/service/downloadpage.php?ca_id=10)
* RoboPlus help: [here](http://support.robotis.com/en/software/roboplus_main.htm)
* Github for [DynaManager repo](https://github.com/Interbotix/dynaManager/releases)
* Download [DynaManager](https://github.com/Interbotix/dynaManager/releases/tag/1.3)  

RoboPlus is needed for [Dynamixel Wizard](http://support.robotis.com/en/software/roboplus/dynamixel_wizard.htm).

### Usage

Apparently, the [ArbotiX](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx) hardware and firmware support a variety of DYNAMIXEL servos. The motors being used for this project are directly compatible.

Since we are going to do all our programming in Arduino, we would need an Arduino compatible board unlike the U2D2 (which  I have no idea if it is arduino compatible, probably not).

[Quick Start Guide](https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide)

To setup ID's using the Arbotix-M board:
  
{% include elements/video.html id="SCO_8nrldDE" %}


### Connections 

![image](https://user-images.githubusercontent.com/24211929/72792820-9e15a600-3c5f-11ea-8b80-16699adca34b.png)

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72793011-ea60e600-3c5f-11ea-804e-e3aa96e03cd6.png" caption="Program the ArbotiX-M Robocontroller to Control a DYNAMIXEL Servo" %}

# Arduino UNO

### 74LS241N Tri-state buffer 

![image](https://user-images.githubusercontent.com/24211929/73072717-bbef3f00-3edb-11ea-9cf9-2aae35a84ffa.png)

These servomotors have difficulty connecting to the Arduino. In fact, the half-duplex communication to 1Mbps requires additional circuitry to make connections to Arduino if there are several servos to be connected. A single servo can be connected directly to the Arduino, in the case of several actuators it is necessary to use a tri-state buffer, which is placed between the Arduino and AX-12A. A simple tri-state buffer is the 74LS241N.

The Dynamixel protocol is a serial protocol, so, Arduino side, the buffer 74LS241 must be connected to the serial port and then on pins 0 and 1.

Refer to this [link](https://robottini.altervista.org/dynamixel-ax-12a-and-arduino-how-to-use-the-serial-port) for dual serial comms.

{% include elements/video.html id="svD-m-NUD3I" %}


### Dynamixel Shield
Refer to the [link](http://emanual.robotis.com/docs/en/parts/interface/dynamixel_shield/) to understand the specifics related to the shield that will be used to control dynamixel actuators accordingly.

![image](https://user-images.githubusercontent.com/24211929/72668580-5966f080-3a4e-11ea-96df-fe6a5fed0005.png)

The layout to be used is as follows (TTL):

![image](https://user-images.githubusercontent.com/24211929/72668585-6a176680-3a4e-11ea-9461-ccb1dff9b345.png)

Unable to receive or transmit data using the shield.Either it must be some connection issue or the API alongside dynamixel shield such as the [Dynamixel2Arduino](https://github.com/ROBOTIS-GIT/dynamixel2arduino) and [DynamixelShield](https://github.com/ROBOTIS-GIT/DynamixelShield). These APIs aren't functioning as expected and there is no further documentation left in this direction.

Without the Arbotix-M board or Dynamixel Shield, we will need the USB2Dynamixel component.

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72972589-bd443d00-3df1-11ea-8b92-78526b53beba.png" caption="USB2Dynamixel which is now deprecated and replaced with U2D2" %}

# [Arbotix-M Robocontroller](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx)

![image](https://user-images.githubusercontent.com/24211929/72739864-90621100-3bca-11ea-9b6e-19a03bf42da7.png)

* The ArbotiX robocontroller is an advanced control solution for AX/MX/RX/EX DYNAMIXEL servos. 

Being compatible directly with an Arduino, it functions as an arduino board enabling the control of dynamixel servos. 

Components required alongside the Arbotix-M are:
* FTDI Cable 5V for programming
* 12V 5A Power Supply for the board itself

### Getting Started with the Arbotix-M
Trossen Robotics has their documentation on their [webpage](http://www.trossenrobotics.com/p/arbotix-robot-controller.aspx) under the 'Documentation and Downloads' tab. Therefore the documentation here is a bit spare in nature, and may focus on things specific to the setup here in the SARL Labs.

### Steps to setup your PC to program the Arbotix-M and run a demo.
1. Download the Arduino IDE (version 1.0.6)
2. Download the Arbotix-M libraries and hardware description files.
3. Connect to the ArbotiX-M and upload the sketch.
4. Watch it work (or start debugging.)

##### Download the Arduino IDE
You need to install the Arduino IDE to program the controller. Currently (10-09-2015), the Arbotix-M runs on the old Arduino 1.0.6 version. This means that you will need to get and install the old IDE. This, however is actually quite simple. If you have the newest IDE installed already, you don't need uninstall it, the two IDEs can live along side each other. The files are [here](https://www.arduino.cc/en/Main/OldSoftwareReleases).

> ##### Why use the old Arduino IDE?
The Arduino IDE 1.0.6 has a different implementation of the Arduino core code than the 1.6. Actually looking at the [release notes](https://www.arduino.cc/en/Main/ReleaseNotes), the Arduino IDE 1.0.1 went into a 1.5 BETA branch in late 2012. The new IDE was an attemt to make a unified IDE for both 8-bit AVR and 32-bit ARM based Arduinos. While the 1.5 BETA developed into 1.6 and went out of the BETA stage, the 1.0.1 developed into the 1.0.6. The big difference is how the hardware definition files are handled in the IDE. Also the original Arduino Serial code is too slow to handle the 1Mbps that we run the Crust Crawler Arms at, so a custom implementation was developed in Vanadium Labs. But looking at the developments in the [code on GitHub](https://github.com/vanadiumlabs/arbotix) it seems branches for the 1.5 and 1.6 IDE are popping up. So maybe we can use the new IDE in the near future.

##### Download the Arbotix-M Libraries and Hardware Description Files
The Arbotix-M is arduino _compatible_, not a true arduino. So we need to install some additional hardware description files and finally some libraries to work with the Dynamixel servos. You can download a [zip-file](https://github.com/trossenrobotics/arbotix/archive/master.zip) from Trossen Robotics with everything you need.

In the zip-archive there are three folders, you have to manually move these into your sketchbook folder.

The sketchbook folder is not the same as your newly created installation folder. The default folder is `~/Documents/Arduino` (~ being your user folder). This will most likely be the same for any Arduino installation on your system, so to keep things separate, change the sketchbook folder location in the IDE to a folder exclusively for use with this project, e.g. `~/Documents/Arduino-arbotix`. You do this in `Files -> Preferences` and simply writing in your desired location in the `Sketchbook Location` box. The IDE will create the new folder and populate it with a `libraries` folder.

Now, extract the three folders (hardware/libraries/ArbotiX Sketches) in the newly downloaded zip-archive into your sketchbook folder. You can test if this was succesful by checking `File -> Sketchbook ->` in the IDE, this should now contain a menu with ArbotiX Sketches. If the menu does not show up, you may need to reopen your Arduino IDE.

### Working With the Arbotix-M

We will go through:

1. How the communication with the servos work.
2. How to read the position, velocity, acceleration and torque of the servos.
3. How to give the servos a setpoint.
4. How to set the controller's PID parameters.
5. What NOT to do.

This tutorial assumes that you have a working installation of the Arduino IDE, and connection to the ArbotiX-M as described above.

##### How the Communication With the Servos Work

The Dynamixel servos are called smart servos. This is because they have both a motor, reduction gear, encoder and a position controller; traditional servos rely on an external controller. This enables us to simply control the servo by giving it a position setpoint, but if we choose, we can control the torque of the motor directly.

The communication works by polling (asking) the servo for a piece of information, which it then provides. The protocol is described on [Robotis' support page](http://support.robotis.com/en/techsupport_eng.htm#product/dynamixel/dxl_communication.htm). Basically, the servos has a memory-mapped interface called the control table with a range of registers holding static and dynamic content. For example, have a look at the MX-64 servo's [control table at the Robotis support page](http://support.robotis.com/en/techsupport_eng.htm#product/dynamixel/mx_series/mx-64.htm#Control_Table).

Every register can be read, but only some can be written to (and some can be written to, but shouldn't be). E.g. a couple of interesting registers to look at is registers 36 and 37, which hold the present position of the servo. The reason for having two registers is that each register holds 8 bits of information, but the encoder on the servo provides 10 bits of resolution. So register 36 holds the lowest eight bits and 37 holds the highest two bits. To read the two registers, the ArbotiX-M must send a request to the relevant servo asking for two bytes starting from register 36, and the servo will respond with a packet containing these. This is all outlined in the article on the protocol from Robotis.

Fortunately, a set of convenience functions for the ArbotiX-M has been written, so that you do not have to fiddle with high bytes and low bytes, checksums and sending and receiving raw bytes to and from the serial port. The basic convenience funtions are:
```
// From ax12.h
int ax12GetRegister(int id, int regstart, int length);
void ax12SetRegister(int id, int regstart, int data);
void ax12SetRegister2(int id, int regstart, int data);
```
**These functions are defined in `ax12.h`, a library originally written for the ArbotiX to control AX-12 servos, but now also works with most other Dynamixel servos.**

With these three functions we can read from or (attempt to) write to any register in the servos. Note that the functions needs and ID. This is name of the sevo that we want to communicat to. The servos are numbered from 1 to 5:

 Servo        | ID
 -------------|---
 Base         | 1
 Shoulder     | 2
 Elbow        | 3
 Left finger  | 4
 Right finger | 5

For even more comfort a set of macros is also defined in `ax12.h`:
```
// From ax12.h
#define SetPosition(id, pos) (ax12SetRegister2(id, AX_GOAL_POSITION_L, pos))
#define GetPosition(id) (ax12GetRegister(id, AX_PRESENT_POSITION_L, 2))
#define TorqueOn(id) (ax12SetRegister(id, AX_TORQUE_ENABLE, 1))
#define Relax(id) (ax12SetRegister(id, AX_TORQUE_ENABLE, 0))
```
Using these, this code:
```
int pos = ax12GetRegister(1, 36, 2);
```
can be written as:
```
int pos = GetPosition(1);
```
which is easier to read.

Equivalently we can send a setpoint:
```
ax12SetRegister2(1, 36, 2500);
```
Here we are using `ax12SetRegister2`, as we need to set two registers at once. Alternatively, we can use the convenience-convenice function:
```
SetPosition(1, 2500);
```


### Reference

* [Aalborg University - Control Labs](https://github.com/AalborgUniversity-ControlLabs/start-here/tree/master/crust-crawler-arms)

# Tutorials on Arbotix-M

{% include elements/video.html id="R2yca-9yHy0" %}



# Experiments

## Videos

### Fingers Actuating using single Arduino Board

![ezgif com-video-to-gif (2)](https://user-images.githubusercontent.com/24211929/72687313-a3210b00-3b22-11ea-8ffa-faed88cfc93e.gif)

- Can power only one/two servo motors
- Additional Boards ordered for actuating multiple motors namely
  - PCA9685
  ![](https://robu.in/wp-content/uploads/2017/09/1pcs-16-Channel-12-bit-PWM-Servo-Driver-I2C-interface-PCA9685-for-Arduino-Raspberry-Pi-DIY.jpg)

  - 16x12-Bit PWM Servo Shield
  ![image](https://user-images.githubusercontent.com/24211929/72687392-51c54b80-3b23-11ea-9dbe-92b64d22040c.png)

### Multiple Fingers - Power Supply used

I will have to work on this soon.

## Codes

### Blender Controller - Quarternion Values
This [file](https://github.com/vishalgattani/vishalgattani.github.io/blob/master/files/blender/blendercontroller_quarternionvalues_serialcomm.blend) can transmit quarternion values through serial port. But we need to get the armature actual local space rotations in order to move the wrist. Possible updates will follow this section.

![Screenshot 18-01-2020 20_56_54](https://user-images.githubusercontent.com/24211929/72666112-0af92800-3a35-11ea-8700-7a7f5c979bdf.png)

```python
import bpy
import math
import time

ob = bpy.data.objects['Armature']
bpy.context.scene.objects.active = ob

wristrot = bpy.context.scene.objects['Armature']
wr = wristrot.pose.bones['armd']

bpy.ops.object.mode_set(mode='POSE')

shoulder = ob.pose.bones.get("shoulder")
arma = ob.pose.bones.get("arma")
armb = ob.pose.bones.get("armb")
armc = ob.pose.bones.get("armd")
armd = ob.pose.bones.get("armd")
hand = ob.pose.bones.get("hand")

print(wr)

for b in bpy.context.scene.objects.active.pose.bones:
    # use the decompose method
    loc, rot, sca = b.matrix_basis.decompose()
    # or use the to_quaternion method
    rot = b.matrix_basis.to_quaternion()
    print(b)

def sendAngles():
    mat = wr.matrix.to_euler()
    #print(math.degrees(mat.x),math.degrees(mat.y),math.degrees(mat.z))
    loc, rot, sca = armd.matrix_basis.decompose()
    # or use the to_quaternion method
    rot = armd.matrix_basis.to_quaternion()
    print(rot)
        
def frameChange(passedScene):
  sendAngles()
    
bpy.app.handlers.frame_change_pre.append(frameChange)
```

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/24211929/72666340-2bc27d00-3a37-11ea-8874-11f2e36e7afb.gif)

### Blender Controller - Quarternion to Euler

```python
def sendAngles():
    mat = wr.matrix.to_euler()
    loc, rot, sca = armd.matrix_basis.decompose()
    rot = armd.matrix_basis.to_quaternion()
    euler = rot.to_euler('XYZ')
    Xangle = math.degrees(euler.x)
```

Transmitting X angle of the bone rotation in local axis.


![Blender_  D__vishal_files_blender_blendercontroller_quarternionvalues_to_euler_serialcomm_original blend  18-01-2020 21_39_40](https://user-images.githubusercontent.com/24211929/72666732-12bbcb00-3a3b-11ea-97a6-e6076abf8069.png)

### Blender Controller - Euler Angles - Wrist Rotation (Real-time)

Blender File: [here](https://github.com/vishalgattani/vishalgattani.github.io/blob/master/files/blender/blendercontroller_wristrotation.blend)

#### Blender Code:
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
wristrot = bpy.context.scene.objects['Armature']
wr = wristrot.pose.bones['armd']
bpy.ops.object.mode_set(mode='POSE')

shoulder = ob.pose.bones.get("shoulder")
arma = ob.pose.bones.get("arma")
armb = ob.pose.bones.get("armb")
armc = ob.pose.bones.get("armd")
armd = ob.pose.bones.get("armd")
hand = ob.pose.bones.get("hand")
print(wr)

for b in bpy.context.scene.objects.active.pose.bones:
    # use the decompose method
    loc, rot, sca = b.matrix_basis.decompose()
    # or use the to_quaternion method
    rot = b.matrix_basis.to_quaternion()
    print(b)

def sendAngles():
    mat = wr.matrix.to_euler()
    loc, rot, sca = armd.matrix_basis.decompose()
    # or use the to_quaternion method
    rot = armd.matrix_basis.to_quaternion()
    
    euler = rot.to_euler('XYZ')
    Xangle = math.degrees(euler.x)
    val = math.degrees(euler.x)
    val = str(int(val))
    print(val)
    ser.write((val).encode('UTF-8'))

def frameChange(passedScene):
  sendAngles()    
  
bpy.app.handlers.frame_change_pre.append(frameChange)
```

#### Arduino Code:

```c
#include <Servo.h>

Servo myservo; 
// create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int incomingByte = 0;   // for incoming serial data

String readString(){
  String inString ="";
  char inChar;
  while(Serial.available()>0){
    inChar =(char) Serial.read();
    inString+=inChar;
    delay(1);
  }
  return inString;
}

int parseString(String msg){
    static int a;
    a = msg.toInt();
    return a;
}

void writeValues(int b){
  myservo.write(b);
  
}

void setup() {
  myservo.attach(3);
  myservo.write(0);
  // attaches the servo on pin 9 to the servo object
  Serial.begin(9600);
}

void loop() {
  

   if(Serial.available()){
        String incoming=readString();
        int angles=parseString(incoming);
        angles = map(angles,0, 90, 140, 11);
        angles = int(angles);
  writeValues(angles);
    }
}
```
## Arduino Related Code

### Arduino Serial Communication - Fingers Movement

```c
#include <Servo.h>

Servo servo1;
/*
Servo servo2;
Servo servo3;
Servo servo4;
Servo servo5;
Servo servo6;
*/
int servo_position = 0;

void setup() {

  servo1.attach (3);
  /*
  servo2.attach (5);
  servo3.attach (6);
  servo4.attach (9);
  servo5.attach (10);
  servo6.attach (11);
  */
  Serial.begin(9600);
  while (!Serial);
  Serial.println("-------------------------");
  Serial.println("Comand input online, write command to perform action");
  Serial.println("-------------------------");
}

void loop() {
  if (Serial.available()){
    int servo_position = Serial.parseInt();
    //servo_position = map(servo_position, 0, 90, 10, 170);
    //servo_position = map(sensor postion, 0, 90, 120, 11);
    if (servo_position >= 10 && servo_position < 170){
      Serial.print(">");
      Serial.println(servo_position);
      Serial.print("turning servo to ");
      Serial.print(servo_position);
      Serial.println(" degrees");
      servo1.write(servo_position);
      /*
      servo2.write(servo_position);
      servo3.write(servo_position);
      servo4.write(servo_position);
      servo5.write(servo_position);
      */
      delay(10);
    }
  }
}
```

### Arduino Wrist Rotation 

```c
#include <Servo.h>

Servo myservo; 
// create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int incomingByte = 0;   // for incoming serial data

String readString(){
  String inString ="";
  char inChar;
  while(Serial.available()>0){
    inChar =(char) Serial.read();
    inString+=inChar;
    delay(1);
  }
  return inString;
}

int parseString(String msg){
    static int a;
    a = msg.toInt();
    return a;
}

void writeValues(int b){
  myservo.write(b);
  
}

void setup() {
  myservo.attach(3);
  myservo.write(0);
  // attaches the servo on pin 9 to the servo object
  Serial.begin(9600);
}

void loop() {
  

   if(Serial.available()){
        String incoming=readString();
        int angles=parseString(incoming);
        angles = map(angles,0, 90, 140, 11);
        angles = int(angles);
  writeValues(angles);
    }
}
```



