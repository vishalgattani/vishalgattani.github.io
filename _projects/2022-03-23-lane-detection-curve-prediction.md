---
name: Car Lane Detection
tools: [Computer Vision,Python,OpenCV]
image: https://github.com/vishalgattani/vishalgattani.github.io/assets/24211929/8d7ffbed-35ff-4611-b795-e28cf1f6d4ea
description: Detect lanes on a road in real time using the OpenCV computer vision library and Python.
# external_url: https://github.com/vishalgattani/PID-self-driving-car/tree/main
---
<!-- gif == https://github.com/plotly/plotly.py/assets/24211929/6fe06dc7-2680-4467-8ef1-fa05840655ae -->

# Table of contents

* TOC
{:toc}

# About the project

<video src="https://github.com/plotly/plotly.py/assets/24211929/54282046-8a60-4cd3-b1b9-252bb5938b3d" controls="controls" style="max-width: 730px;"></video>


A program that reads a video stream and outputs an annotated video that shows the following:
1. The current lane
2. The radius of curvature of the lane
3. The position of the vehicle relative to the middle of the lane

## Steps (Figures pending)
1. Apply homography transformation to the region of interest into bird's eye view image.
2. White lane detection and Yellow lane detection
   1. Grayscale and Thresholding to detect the white lanes.
   2. Transform image to HSV space to set a range for yellow color for yellow lanes.
3. Curve fitting the white and yellow lanes with second order polynomial curve.
   1. Calculate radius of curvature of both lanes.
4. Fill the polygon region formed by lane curves.
5.  Superimposing the polygon region back to the original image by using the inverse of the homography matrix to transform the bird's eye view image back to the original view image.

# Radius of Curvature

The second order polynomial that fits the curve is given by:
$$ y = a_0 x^2 + a_1 x + a_2 $$

The first order derivative is given by:
$$ \frac{\partial y}{\partial x} = 2 a_0 x + a_1 $$

The second order derivative is given by:
$$ \frac{\partial^2 y}{\partial x^2} = 2 a_0$$

Radius of curvature is computed by the following equation:

$$ R = \frac{(1 + (\frac{\partial y}{\partial x})^2)^{\frac{3}{2}}}{\frac{\partial^2 y}{\partial x^2}}$$


## Turn Prediction
Depending on the value of curvature, the lane turn can be detected:
1. The curvature will be **high** when the lane is **straight**.
2. **Positive** when there is a **right** turn.
3. **Negative** when there is a **left** turn.

# Drawbacks

- Using color threshold makes the pipeline sensitive to changes in the environment.
- Choosing four points (Region of Interest - ROI) to warp the image can lead to cases where the lane is not present within the ROI.
- The surrounding area of the lane is set by first finding the histogram of the image and then set boundary with a threshold to the area with highest histogram bar.

## Overcoming Drawbacks

- Lane detection using Deep Neural Networks