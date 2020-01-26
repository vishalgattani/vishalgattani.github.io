---
name: Thesis
tools: [C#, XML, WPF]
image: https://user-images.githubusercontent.com/24211929/72992613-0f00bd80-3e1a-11ea-9b60-6f6660652223.gif
description: Biomimetic Arm using Motion Capture and Inverse Kinematics.
---

# Table of contents 

* TOC
{:toc}

# Biomimetic Arm with Motion Capture v/s Inverse Kinematics

- Human upper limb motion captured through Kinect V2 will be transmitted to various actuators that act as joints on the prosthetic arm.
- The captured data, joint coordinates and angles, will be transmitted through a serial port to arduino and dynamixel shield in order to actuate the servos accordingly.
- The data from both, Motion Capture and Inverse Kinematics, will be synthesised and compared to establish if correlation points exist between the experiments.
- Possible control of the prosthetic may also be achieved through Electromyography (EMG).


# Literature Survey

## 3D Printed Myoelectric Prosthetic Arm

## [Reachy Beta](https://www.frontiersin.org/articles/10.3389/fnbot.2019.00065/full)

**To prove:**

- [x] Inverse Kinematics for Endpoint Position Control
- [ ] MoCap Control of Arm using Kinect v2

## [Anthrob – A Printed Anthropomimetic Robot](http://www.cs.cmu.edu/~cga/shoulder/robot2.pdf)

**To prove:** Example of an elbow joint flexion and subsequent extension induced by the motor position control of the three elbow joint muscles (brachialis, triceps and biceps brachii, respectively). The figure shows the elbow angle (top panel), the reference (dashed) and current (solid) motor positions of all three muscles (center panel) and the corresponding muscle forces (bottom panel).

![image](https://user-images.githubusercontent.com/24211929/72436916-953c5480-37c7-11ea-84c7-32ab21b28385.png)

# Software

## Blender 2.78
## Delicode NI-Mate
## Arduino/Arbotix-M
## RoboPlus from ROBOTIS

# Blender

## Motion Capture

![kinect_nimate](https://user-images.githubusercontent.com/24211929/72427972-cbbba480-37b2-11ea-93d8-a46998d2f054.gif)

The connections for tracking can be followed through this simple image of the pipepline.

![pipeline](https://user-images.githubusercontent.com/24211929/71520910-89562480-28e4-11ea-8fc5-a829d93af095.png)

Before we start, it’s important to note that everything in this post is about the Kinect for Xbox One, what most people call the Kinect Version 2 or the Kinect V2. The Kinect can track up to six skeletons having 25 joints, all at one time. The Kinect’s camera coordinates use the Kinect’s infrared sensor to find 3D points of the joints in space. These are the coordinates to use for joint positioning in 3D projects. For more details, refer to this [article](https://medium.com/@lisajamhoury/understanding-kinect-v2-joints-and-coordinate-system-4f4b90b9df16).

![](https://miro.medium.com/max/433/1*ai7YNHm4yOWC6wFCjDmdAw.png)

In order to have the recorded motion and joint coordinates from the Kinect V2, the open source software Blender has the necessary add-ons from Delicode NI Mate required to create your own moiton capture studio. Before we begin to track all the 25 joints, we have to test if our Kinect is working properly. Follow the tutorial [DIY Kinect Motion Capture Studio](https://www.youtube.com/watch?v=1UPZtS5LVvw) to setup your Kinect with the Blender add-ons.

{% include elements/video.html id="1UPZtS5LVvw" %}

The NI-Mate app captures your movement in the camera and converts it to mocap data you can import into Blender and apply to a rigged armature.

![poserig_anim](https://user-images.githubusercontent.com/24211929/72428043-ebeb6380-37b2-11ea-8d57-5ba95668f69b.gif)

![graph1](https://user-images.githubusercontent.com/24211929/72428044-ebeb6380-37b2-11ea-985c-ca7b7ed71834.gif)

## Blender Controller

![Video](https://user-images.githubusercontent.com/24211929/72426222-569aa000-37af-11ea-8f76-4c122fa8cdb4.gif)

The [Blender Controller](https://github.com/alvaroferran/BlenderController) repo shows how to control a robot from blender using python. To execute the controller first upload the arduino code into the board. Then in the blender file, press on "Run Script", then the play icon and finally hover the mouse over the control bone and press the "G" key.

{% include elements/video.html id="mONTXmDgZSE" %}


Additional changes have been added to he code to effectively send bone angles to the arduino board using serial communication.

![motor control for arduino base file](https://user-images.githubusercontent.com/24211929/72427403-ae3a0b00-37b1-11ea-8c99-d2c0ebe3c827.PNG)

![Screenshot 15-01-2020 15_52_47](https://user-images.githubusercontent.com/24211929/72426076-163b2200-37af-11ea-998e-55999df9a72b.png)


## [IK](https://easyblend.org/html/rigging/posing/inverse_kinematics/introduction.html#arm-rig-example)

IK simplifies the animation process, and makes it possible to make more advanced animations with lesser effort.

IK allows you to position the last bone in a bone chain and the other bones are positioned automatically. This is like how moving someone’s finger would cause his arm to follow it. By normal posing techniques, you would have to start from the root bone, and set bones sequentially till you reach the tip bone: When each parent bone is moved, its child bone would inherit its location and rotation. Thus making tiny precise changes in poses becomes harder farther down the chain, as you may have to adjust all the parent bones first.

This effort is effectively avoided by use of IK.

![](https://easyblend.org/html/_images/ik_arm_example.jpg)

Automatic IK is a tool for quick posing, it can be enabled in the tool shelf in the 3D View, when in pose mode. When the Auto IK option is enabled, translating a bone will activate inverse kinematics and rotate the parent bone, and the parent’s parent, and so on, to follow the selected bone. The IK chain can only extend from a child to a parent bone if the child is connected to it.

![armrig](https://user-images.githubusercontent.com/24211929/72426754-551da780-37b0-11ea-8dc3-07ace41bf16e.JPG)

The code from before, will be used in this rig to transmit the servo motor actuating values through serial communication.

# Servos, Actuators, Motors and Boards

## Towerpro MG996R



## Dynamixel Motors/Actuators

All the motors related information can be found (here)[http://www.robotis.us/dynamixel/]. The required motors which are being used are:

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72440639-3a0e6000-37cf-11ea-8c73-3807fe5aa807.png" caption="Reachy Documentation Specs" %}

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72973880-0d240380-3df4-11ea-9f5f-e480d38feaf8.png" caption="Stall Torque v/s Speed (RPM)" %}

## Arduino UNO

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

### [Arbotix-M Robocontroller](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx)

![image](https://user-images.githubusercontent.com/24211929/72739864-90621100-3bca-11ea-9b6e-19a03bf42da7.png)

* The ArbotiX robocontroller is an advanced control solution for AX/MX/RX/EX DYNAMIXEL servos. 

Being compatible directly without using an Arduino, it functions as an arduino board enabling the control of dynamixel servos. 

Components required alongside the Arbotix-M are:
* FTDI Cable 5V for programming
* 12V 5A Power Supply for the board itself

#### Dynamixel Servos

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

#### Programming

RS-485 DYNAMIXEL servos like the RX and MX-R servos can be controlled from the ArbotiX-M, but require custom hardware and are not officially supported. The ArbotiX-M robocontroller is deisgned to communicate with TTL servos like the AX line of servos and the MX-T servos. On its own, the Arbotix-M can't control RS-485 servos like the RX/EX servos or the MX-R servos.

To program the ArbotiX-M you will need an FTDI USB to Serial Converter. The Standard FTDI Cable is a standard FTDI programmer and will work perfectly for programming the ArbotiX-M. 

#### Power

Run DYNAMIXEL servos at 11-12v. MX series servos can be run at up to 14.8v, but AX servos can not.

12v SMPS(Switched Mode Power Supplies) cab be used with the ArbotiX-M. These supplies will plug directly into the ArbotiX-M via barrel connector.

**To choose the power supply for your project, add up the stall current for all the servos in your chain. Your power supply should exceed this calculated current.**

The MX-64 and MX-106 servos require additional hardware when working with an SMPS. The SMPS2DYNAMIXEL will help smooth the SMPS voltage. 

#### Links - Hardware and Software

Follow these links:
* [https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide](https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide)
* [https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx)
* Download FTDI Drivers: [here](https://www.ftdichip.com/Drivers/VCP.htm)
* Download RoboPlus 1.1.3: [here](http://en.robotis.com/service/downloadpage.php?ca_id=10)
* RoboPlus help: [here](http://support.robotis.com/en/software/roboplus_main.htm)
* Github for [DynaManager repo](https://github.com/Interbotix/dynaManager/releases)
* Download [DynaManager](https://github.com/Interbotix/dynaManager/releases/tag/1.3)	

RoboPlus is needed for [Dynamixel Wizard](http://support.robotis.com/en/software/roboplus/dynamixel_wizard.htm).

#### Usage

Apparently, the [ArbotiX](https://www.trossenrobotics.com/p/arbotix-robot-controller.aspx) hardware and firmware support a variety of DYNAMIXEL servos. The motors being used for this project are directly compatible.

Since we are going to do all our programming in Arduino, we would need an Arduino compatible board unlike the U2D2 (which  I have no idea if it is arduino compatible, probably not).

[Quick Start Guide](https://learn.trossenrobotics.com/arbotix/7-arbotix-quick-start-guide)

To setup ID's using the Arbotix-M board:
	
{% include elements/video.html id="SCO_8nrldDE" %}


### Connections 

![image](https://user-images.githubusercontent.com/24211929/72792820-9e15a600-3c5f-11ea-8b80-16699adca34b.png)

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/72793011-ea60e600-3c5f-11ea-804e-e3aa96e03cd6.png" caption="Program the ArbotiX-M Robocontroller to Control a DYNAMIXEL Servo" %}

### Tutorials

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



