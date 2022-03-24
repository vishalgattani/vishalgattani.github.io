---
name: RadArduino 
tools: [Arduino, Processing]
image: https://user-images.githubusercontent.com/24211929/159839136-8e2f90a6-8b14-4dfd-8d49-e00f13d33ad0.gif
description:  A 2-Dimensional Radar using Ultrasonic sensors & Arduino
---

<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vishalgattani/RadArduino">
    <img src="https://user-images.githubusercontent.com/24211929/159631172-b1f75d0d-b9c2-48c2-8033-221d0694befb.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">RadArduino</h3>

  <p align="center">
    To create a 2-Dimensional Radar which maps the surroundings using SONAR (Ultrasonic Sensors) and Arduino-UNO microcontroller, which displays the distance of obstacles from the SONAR.
    <br />
    <a href="https://github.com/vishalgattani/RadArduino"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://user-images.githubusercontent.com/24211929/159839981-f003f337-ff25-460b-93b3-c094c1be4114.mp4">View Demo</a>
    ·
    <a href="https://github.com/vishalgattani/RadArduino/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/RadArduino/issues">Request Feature</a>
  </p>
</div>



# Table of contents 

* TOC
{:toc}


# Introduction

This project works on the principle of SONAR to detect obstacles in areas where other sensors might not be able to produce effective results. For instance, camera and IR sensors may be able to function properly under extreme conditions, and therefore, an ultrasonic was chosen. 

The Ultrasonic sound waves has an extremely high pitch that humans cannot hear and is also free from external noises from passive or active sources. The sensor transmits an ultrasonic sound that has a frequency of about 40 kHz. The sensor has two main partstransducer that creates an ultrasonic sound wave while the other part listens to its echo.

The HC-SR04 ultrasonic distance sensor is an economical sensor that provides 2cm to 400cm of non-contact measurement functionality with a ranging accuracy that can reach up to 3mm. Each HC-SR04 module includes an ultrasonic transmitter, a receiver and a control circuit.

The implementation of this project starts by constructing a mount for the ultrasonic sensor which allows the sensor to encompass a semi-circle, i.e. rotate 180 degrees and provide results to
map the surroundings. Once this data is obtained from the sensor, it is used to map the surroundings by Processing IDE which generates a Radar like environment on the monitor as it continuously probes converting the 2-Dimensional Cartesian coordinates into polar coordinates. 

![radar4](https://user-images.githubusercontent.com/24211929/159839136-8e2f90a6-8b14-4dfd-8d49-e00f13d33ad0.gif)

# Components

- 2 x Ultrasonic Sensors HC- SR04 for Arduino UNO
- 1 x Servo Motor
- 1 x Stepper Motor
- 1 x Arduino UNO microcontroller
- 1 x Breadboard with Jumper Wires
- 1 x LCD Display

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vishalgattani/RadArduino.git
   ```
   
2. Circuit Schematic (with LCD) is as follows:

<img width="1133" alt="Screen Shot 2022-03-24 at 12 20 02 AM" src="https://user-images.githubusercontent.com/24211929/159841437-b1da91e9-8499-48a6-b705-501c0448685f.png">

3. Circuit Schematic (without LCD) is as follows:

<img width="1143" alt="Screen Shot 2022-03-24 at 12 22 20 AM" src="https://user-images.githubusercontent.com/24211929/159841709-5b0d162c-7bd9-4ba6-a368-a111c124582a.png">

4. The HCSR04 Sensor is mounted atop the servo motor and it is connected to Arduino to send distance data to the Processing IDE.

![image](https://user-images.githubusercontent.com/24211929/159841905-f9ef05b4-f9d4-4722-9e96-bb2a0656e1bb.png)


## Usage

1. Run the Arduino sketch.
2. Simultaneously, run the Processing IDE sketch.

# Output

<iframe width="640" height="480" align="middle" src="https://user-images.githubusercontent.com/24211929/159839981-f003f337-ff25-460b-93b3-c094c1be4114.mp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# Features
- [x] 2D Radar with fading effect

<!-- CONTRIBUTING -->
# Contributing

If you have a suggestion that would make this better, please fork the [repo](https://github.com/vishalgattani/RadArduino) and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

<!-- 1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<!-- LICENSE -->

<!-- CONTACT -->
## Contact

- <a href="mailto:vishalgattani09@gmail.com"><img src="https://img.shields.io/badge/-vishalgattani09@gmail.com-D14836?style=flat&logo=Gmail&logoColor=white"/></a>

Project Link: [https://github.com/vishalgattani/RadArduino](https://github.com/vishalgattani/RadArduino)


# References

- [Ultrasonic Distance Sensor - HC-SR04](https://www.sparkfun.com/products/15569)
- [Arduino Radar](https://www.instructables.com/Arduino-Radar-1/)



