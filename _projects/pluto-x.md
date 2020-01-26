---
name: PlutoX Programmable Drone
tools: [C#, XML, WPF]
image: https://user-images.githubusercontent.com/24211929/73069259-4d0de800-3ed3-11ea-890c-4421e8a01061.png
description: Programming the PlutoX drone for collision avoidance, target following and sensor fusion.
---

# Table of contents 

* TOC
{:toc}


# Pluto X

In this project, we worked on programming the PlutoX drone to achieve results such as collision avoidance, following a target and getting sensor data mounted on top of the drone. The sensors used to achieve the above said behavior are the IR sensors (V53LOX) and analog sensors to determine the temperature and pressure when the drone is in flight mode.

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069496-e0dfb400-3ed3-11ea-8336-217f73147548.png" caption="Pluto X Drone" %}

# Pluto Controller Android/ IOS App

The PlutoX drone comes with an android app ‘Pluto controller’. The android app provides the following functionalities:

1.	Calibrate the drift of the drone
2.	Calibrating accelerometer & magnetometer
3.	Drone Arming & take off
4.	Controlling the drone movement
5.	Flashing the drone with the firmware
6.	Developer mode

## Installation

The android app is available on the playstore under the name [Pluto Controller](https://play.google.com/store/apps/details?id=com.drona.controller&hl=en_IN).

## Calibrating Drift

In most of the cases, when you try to start the drone and fly it with/ without the android app the drone keeps drifting to one or two directions. To stabilize it, the drone drift needs to be calibrated. In the android app, it can be calibrated under the ‘Drone Settings’.

The drone works on three different axes as shown in the image below
1.	Roll
2.	Pitch
3.	Yaw

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069643-3ddb6a00-3ed4-11ea-9ed4-47d80b07dc4e.png" caption="Roll, Pitch and Yaw axes" %}

There are two parameters ‘Roll’ & ‘Pitch’ that can be changed to calibrate the drift. Refer to the below table:

| Drift Direction        | Input set           |
| :-------------: |:-------------:| 
| forward      | -ve pitch |
| backward      | +ve pitch |
| left      | -ve roll |
| right      | +ve roll |

These settings can be calibrated in the ‘Drone Settings’ section of the app. It is advised to change the values in multiples on 5 first and then it can be calibrated more accurately after finding a upper limit.

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069796-b04c4a00-3ed4-11ea-81ff-c9a26dc466d2.png" caption="Settings" %}

## Calibrating Accelerometer & Magnetometer

In some cases, the drone does not fly properly & will keep moving in random directions. In such cases, the accelerometer and magnetometer have to be calibrated. While in other cases, the android app prompts to calibrate. These can be calibrated in the ‘Drone Settings’ section. For calibrating the accelerometer, ‘calibrate accelerometer’ button should be pressed  & the drone has to be just placed on a flat surface. For calibrating the magnetometer, ‘calibrate accelerometer’ button should be pressed & the drone has to be rotated in all the three axis namely pitch, yaw and roll as shown in the ‘Calibrating Drift’ section.

## Testing PlutoX connection

The connection to plutoX from the android app can be tested by running the propeller motors. In the ‘Drone Settings’ section, after scrolling down a bit, a model drone image can be seen. By clicking on each of the motors, the propeller connected to that motor can be spinned. All the motors can be run at the same time, by clicking on the ‘Spin all’ button. This feature is useful to verify connection with the drone.

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069842-d8d44400-3ed4-11ea-9935-ef717a47826d.png" caption="Motor test" %}

## Sensor Graphs

The plutox has the following sensors on board (by default)
1.	Accelerometer
2.	Gyroscope
3.	Magnetometer
4.	Barometer

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069922-04efc500-3ed5-11ea-8c17-12cafcc3e7c0.png" caption="Motor test" %}


## Flashing default firmware

At times when the drone is not functioning properly, or when there are issues with communication, or to reset the drone, it needs to flashed with the default firmware. The same can be achieved using the android app, from menu > Update Firmware. For the first time, by clicking on latest firmware the latest version for Pluto X will be downloaded from the web. Or if already downloaded, it can be browsed using the browse button. Once the firmware is selected (from the dropdown list), by clicking on Flash. This will sort of reset the drone with the original firmware. All the codes flashed on top of the default firmware will be erased by doing this. 

{% include elements/figure.html image="https://user-images.githubusercontent.com/24211929/73069954-15a03b00-3ed5-11ea-9942-f6500ab0c3e9.png" caption="Flashing" %}

# CYGNUS IDE v1.0.6

## Installation

To install the IDE required to program PlutoX, download the IDE from the [link](https://www.dronaaviation.com/support/).
Extract in the folder required and run ‘cygnus.exe’. There are binaries supported for Linux as well as Windows for this version.

## Creating a Project

* Click on File -> New -> Pluto-X Project and enter the name of the project.

The resulting project folder is generated consisting of the libraries and the Makefile that is required by the project for compilation and flashing to the drone purposes.

The different functions that a PlutoX program has are as follows:
1.	void plutoInit() 
2.	void onPilotStart()
3.	void plutoPilot()
4.	void onPilotFinish()

![image](https://user-images.githubusercontent.com/24211929/73070074-6c0d7980-3ed5-11ea-9259-0b5edaeb1c4c.png)


## Functions

### plutoInit()
This function is executed immediately after the drone powers up. This function is particularly useful for initializing hardware.

### onPilotStart() 
This function is executed once, after user the user turns the developer mode on. This function can be useful for initialising some variables  

### plutoPilot()
This function is executed in loop, along with drones internal primary stabilization code. By default this loop runs every 3.5ms. Using APIs, you can modify this loop frequency.  This will not affect the drones internal stabilization loop.

### onPilotFinish()
This function is executed once, after the user turns off the developer mode. 

## Building a Project
* Once the program is ready to be executed by the drone, the first step is to build the project which is just a basic compiling of the code.

![image](https://user-images.githubusercontent.com/24211929/73070160-9f500880-3ed5-11ea-9f00-36e4b0fe6df7.png)

* Click on the blue icon that will build and output any errors in the code. Once the code is built, a command prompt stating “Project Built Successfully” appears.

![image](https://user-images.githubusercontent.com/24211929/73070167-a840da00-3ed5-11ea-9b53-58bae6fd04a2.png)

To flash the code to the PlutoX drone, follow the following steps:
1.	Ensure that the Android Application is not connected to the Drone.
2.	Connect your computer to the WiFi of the Drone’s SSID.
3.	Click on the ‘green’ link button  on the top left to establish Pluto and Cygnus IDE connection (Chain will turn into red colour if connected). This is required to flash to the firmware of the drone. 
4.	Once clicked, the color of the button turns to ‘red’   if it’s connected to the WiFi of the drone. 
5.	After connecting Pluto WiFi to computer to flash the code select Flash command from toolbar. Flash command burn the code from the project you have selected or it burns the code from the project of current file opened in editor by default. 

There are two categories of Flashing the device, namely:
1. **Full Flash:** burn the code with erasing ROM data like accelerometer and magnetometer calibration. 
2. **Normal Flash:** burn code without erasing ROM data like sensor calibration. 

It is recommended to use Full Flash when programming first time and make sure you calibrate accelerometer and magnetometer after Full Flash. Onwards you can use Normal Flash, If you observe any weird behaviour of Pluto after Normal Flash, prefer Full Flashing it again. 

## Running the code

* When you flash your program on Pluto it doesn’t directly starts executing, it’s in default mode. The User code execution starts when the drone is in developer mode. The developer mode can be controlled using the Pluto Controller app using the button </>. Please note that this button is accessible only when we choose “I am a Developer” from user profile in the App. 

![image](https://user-images.githubusercontent.com/24211929/73070285-f1912980-3ed5-11ea-8955-602b8250e032.png)

* To run your program you need to activate Developer Mode using Pluto Controller Android or iOS application.

![image](https://user-images.githubusercontent.com/24211929/73070299-f950ce00-3ed5-11ea-8d54-5e3de6c58a78.png)

* Once you have activated Developer Mode, the drone will execute the code running in the loop. When Developer Mode is deactivated, it will go back to its default mode.

The API documentation for v1.0.6 is available at this [link](https://drive.google.com/open?id=1wtU-nnGNTPaOsXZ0_GVQ2klOFnSw--eA).

{% include elements/highlight.html text="Note: There are two different versions of CygnusIDE that we have worked on to support different functionalities. The reason for this is because the new firmware supports Breakout Board API functionalities regarding the ADC pins and the GPIO pins.The only difference between the two versions of Cygnus build are the function names and their implementations. The programs written with Cygnus v1.0.6 are not explained here, but are included on the github repository. The same programs are written with Cygnus v2.0.0 and they are included in the further section." %}


# CYGNUS IDE v2.0.0


## Installation

* To install the IDE required to program PlutoX,  the new Cygnus build is available at the following [link](https://drive.google.com/file/d/1oFHE1I-wxGi8gmjj3N78j8dfCduer1L6/view)
* Extract in the folder required and run ‘cygnus.exe’. Note: The installation is supported only on Windows.

The different functions that a PlutoX program in this build are as follows:
* plutoInit()
* onLoopStart()
* plutoLoop()
* onLoopStop()

The functionalities of these functions are same as that of the previous build. However, the implementation of the in-built functions are different. The API documentation for v2.0.0 is available [here](https://docs.google.com/document/d/1qUzQ2eYyPjvnZ2zWgFSVFsRz8hdydEv4QQBmXz5xt9M/edit).

{% include elements/highlight.html text="Note: There are two different versions of CygnusIDE that we have worked on to support different functionalities. The following code snippets are compatible with the new build of Cygnus which can be downloaded by the link shown above. (Cygnus 2.0 on Windows)%}



