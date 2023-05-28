---
name: Laser Communication System
tools: [Analog Ciruits, Sensors]
image: https://user-images.githubusercontent.com/24211929/131023658-0df219bd-4af3-446b-b36b-4f020225de6b.png
<!-- description: To transmit audio from a computer speaker using a power amplifier, a laser diode transmitter and a receiver using photo resistor. -->
description: Audio transmission using a laser diode transmitter and photo resistor receiver.
---


<div align="center">


<h3 align="center">Laser Communication System</h3>

  <p align="center">
    Transmitting audio from a computer speaker using a power amplifier, a laser diode transmitter and a receiver using photo resistor.
  </p>
</div>

# Table of contents

* TOC
{:toc}

# Introduction

The audio is taken from the earphones plugged into a mobile phone. This audio is fed into a microphone and the signal is amplified and sent to the laser diode which acts as a transmitter. On the other side, a photo resistor acts as a receiver. The receiver is connected to a computer speaker resulting in the audio being played.

# Components

- 25LM043 electret microphone
- Photoresistor
- LF411CN operational amplifier
- LM386N power amplifier
- 2N3904 NPN Transistor
- Resistors
- Capacitors
- Speaker


## Lab Equipment

- Function/Signal Generator
- Oscilloscope
- Power Supply


# Audio Amplification Stage
The audio from the headphones is very weak and has less amplitude and so it must be amplified and then transmitted to the laser diode. The audio is amplified using a microphone which is connected to a power amplifier to get a gain of nearly 200 using LM386N. The following circuit shows the connections to the microphone followed by the gain stage of the circuit which is fed to the transmission circuit.


<img width="380" alt="Screen Shot 2021-08-26 at 12 05 18 PM" src="https://user-images.githubusercontent.com/24211929/131034773-e7e34891-f882-41a0-b407-c8d3ffc98656.png">

The output of the above circuit is connected to the input voltage of the gain circuit which is shown below.

<img width="561" alt="Screen Shot 2021-08-26 at 12 17 02 PM" src="https://user-images.githubusercontent.com/24211929/131034777-065b73c6-fe5c-47c2-aa44-759836126a71.png">

The LM386 amplifier is hooked up in bread-board using the circuit shown in the above figure configured for maximum gain (200). A simple audio power amplifier is made using the 25LM043 electret microphone by biasing its output (drain) terminal with a resistor connected to the supply. This output is the capacitively connected to the positive input terminal (pin 3) of the LM386 amplifier.

# Transmission Stage

As sending the audio is a continuous analog signal, the laser bias is needed such that the laser is always on. The circuit biases the laser at 4.5VDC and modulate it from 4V to 5V nearly. Firstly, the measured current drawn of the laser at 5V, was 29mA. This is more than what many op-amps can provide so the laser is powered with a transistor which is set up as a voltage follower. To drive the voltage follower, the use of an operational amplifier will mix the input signal with 5V and attenuate the signal.

![Laser_transmitter_10-21-2015](https://user-images.githubusercontent.com/24211929/131023658-0df219bd-4af3-446b-b36b-4f020225de6b.png)

<img width="576" alt="Screen Shot 2021-08-26 at 12 17 22 PM" src="https://user-images.githubusercontent.com/24211929/131034701-f175835d-d464-48f5-9f9b-59fdd610e47c.png">


To test the transmitter, the function generator is used as an input and measured the voltage across the output with the oscilloscope.

# Receiving Stage

To design the receiver, a voltage divider is made using the photoresistor. This is connected to the input of an inverting amplifier. The inverting amplifier output is then passed into a high-pass RC filter to remove the DC component.

![Laser_reciver_10-21-2015](https://user-images.githubusercontent.com/24211929/131034628-92af90fa-c84f-4cc6-92c5-c7d2eb66f7c4.png)

<img width="583" alt="Screen Shot 2021-08-26 at 12 17 28 PM" src="https://user-images.githubusercontent.com/24211929/131034664-d422b6d8-f429-496d-bd45-1a3250f72bec.png">


# Speaker Stage

Before we connect the computer speaker, we try and understand the grooves that are present on the connector of the speaker. Also, we test the output from the laser diode by connecting an LED at the output stage of the receiver.

<img width="586" alt="Screen Shot 2021-08-26 at 12 17 35 PM" src="https://user-images.githubusercontent.com/24211929/131034477-d7e032b8-5156-455f-9b8f-b84e08a23a54.png">

For this project we have used a PHILLIPS Portable Speaker which has only two grooves which happen to be the ground and the speaker output as shown below.

<img width="450" alt="Screen Shot 2021-08-26 at 12 17 46 PM" src="https://user-images.githubusercontent.com/24211929/131034486-356988ef-ad7a-4690-a6c1-3392ba115d57.png">

A set of alligator clip leads are needed to connect to the grooves of the connector of the speaker. The speaker pin from the connector is taken and attached to the output to the receiver stage.


Figure below shows the output voltage in the oscilloscope at the photoresistors leg which is not connected to Vcc.
<img width="577" alt="Screen Shot 2021-08-26 at 12 17 57 PM" src="https://user-images.githubusercontent.com/24211929/131023813-d2abcbd5-8a3e-466b-815f-bc1b6fbf533e.png">

Figure below shows the output voltage after the receiving stage i.e., at the LF411 output after the capacitor in figure (5) which has an LED connected to it.
<img width="579" alt="Screen Shot 2021-08-26 at 12 18 04 PM" src="https://user-images.githubusercontent.com/24211929/131023816-f5ffcf17-15e3-47e3-9225-cfada68d6220.png">

Figure below shows the output as shown in figure(5) when the laser is blocked by an object preventing the photoresistor from receiving any LASER light.
<img width="575" alt="Screen Shot 2021-08-26 at 12 18 15 PM" src="https://user-images.githubusercontent.com/24211929/131023821-d2cbf5c8-7a8e-4d15-b80d-204fe2f87f5e.png">

- The microphone is very sensitive to sound for Vcc of more than 6 Volts on the transmitter circuit. For better audio resolution, the voltage level of Vcc is kept at 6 Volts for the transmitter circuit.
- If the voltage level of Vcc of the transmitter is more than 6 Volts, the speaker makes a loud noise.
- The receiver circuits voltage level of Vcc is kept at 11 Volts.

# Conclusion

The system works perfectly for about 45 centimeters. The microphone can be made sensitive by increasing the voltage level of Vcc in the transmitter circuit. The speaker reaches the saturation level very easily if Vcc of transmitter is set above 6 volts.

# Future Work
- As the LM386N is used to drive a speaker, we do not require this IC in our experiment. A simple operational amplifier with a gain of about 200 would be sufficient to make the communication system work. Number equations consecutively.
- Increasing the saturation level of the speaker to attain better audio resolution with microphone sensitivity.

# References
1. [https://www.allaboutcircuits.com/projects/build-a-laser-communication-system/](https://www.allaboutcircuits.com/projects/build-a-laser-communication-system/)
2. [http://christine-coenen.de/blog/2012/08/27/how-to-change-a-broken-headphone-plug-urbanears-plattan/](http://christine-coenen.de/blog/2012/08/27/how-to-change-a-broken-headphone-plug-urbanears-plattan/)
