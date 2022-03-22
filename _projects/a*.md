---
name: A* Algorithm - Path Planning
tools: [Python, matplotlib]
image: https://user-images.githubusercontent.com/24211929/159390771-bf0cce5e-5255-43c1-9010-149fa303ebdf.gif
description: Implementation of A* algorithm for a Robot
---

# Table of contents 

* TOC
{:toc}


# Introduction 

This project aims to implement Dijkstra’s Algorithm to find a path between start and end point on a given map for a point robot. 
The obstacle space is represented in the following image.


<img width="889" alt="Screen Shot 2022-03-07 at 11 04 12 PM" src="https://user-images.githubusercontent.com/24211929/157164038-0c720159-7a3e-45ec-85ed-8869977ec686.png">

The optimal path generation animation between start and goal point is shown using a simple graphical interface implemented using Python and matplotlib. 

# Assumptions

The following image shows the action set that can be performed by the Robot in consideration. It is capable of moving in 5 directions only: 

<img width="214" alt="image" src="https://user-images.githubusercontent.com/24211929/159387188-b8116171-10df-4ea6-b3bf-e5c6e9180d4c.png">


# Visualization 

<!-- ![astar](https://user-images.githubusercontent.com/24211929/159390771-bf0cce5e-5255-43c1-9010-149fa303ebdf.gif) -->

<!-- https://user-images.githubusercontent.com/24211929/159383851-806f3025-10d9-41f4-8f0a-ae68fdd7b860.mp4 -->

https://user-images.githubusercontent.com/24211929/159383893-be4f017e-e750-4c95-81d1-a3952eaba50b.mp4

The above videos shows the node exploration and the optimal path generation after the goal node is reached. 

# Program Output

- The [Figure 1](https://user-images.githubusercontent.com/24211929/159389056-93f225ea-fa74-459f-9e20-4b16cae289d6.png) below is an output for searching a path using A*
- The expanded version of the output is shown in [Figure 2](https://user-images.githubusercontent.com/24211929/159389057-849f4d6f-4c67-4656-b1f6-49865181848d.png)
![fig1](https://user-images.githubusercontent.com/24211929/159389056-93f225ea-fa74-459f-9e20-4b16cae289d6.png)
![fig2](https://user-images.githubusercontent.com/24211929/159389057-849f4d6f-4c67-4656-b1f6-49865181848d.png)
- [Figure 3](https://user-images.githubusercontent.com/24211929/159389058-ea8c24bc-f172-4b42-99cf-bfe898cd3322.png) is an output for the following initial conditions.
  - Robot dimension: 2
  - Obstacle clearance: 3
  - Start X (integer): 10
  - Start Y (integer): 10
  - Start ϴ (degrees): 0
  - Goal X (integer): 375
  - Goal Y (integer): 225
  - Step Size (1-10): 3

![fig3](https://user-images.githubusercontent.com/24211929/159389058-ea8c24bc-f172-4b42-99cf-bfe898cd3322.png)


# References

- [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
