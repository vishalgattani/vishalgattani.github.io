---
name: A* Algorithm - Path Planning
tools: [Python, matplotlib]
image: https://user-images.githubusercontent.com/24211929/159390771-bf0cce5e-5255-43c1-9010-149fa303ebdf.gif
description: Implementation of A* algorithm for a Robot
---

<div id="top"></div>

<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->
<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vishalgattani/Path-Planning">
    <img src="https://user-images.githubusercontent.com/24211929/159631172-b1f75d0d-b9c2-48c2-8033-221d0694befb.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">A* Algorithm - Path Planning</h3>

  <p align="center">
    Implementation of A* algorithm for a Robot
    <br />
    <a href="https://github.com/vishalgattani/Path-Planning"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://user-images.githubusercontent.com/24211929/159383851-806f3025-10d9-41f4-8f0a-ae68fdd7b860.mp4">View Demo</a>
    ·
    <a href="https://github.com/vishalgattani/Path-Planning/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/Path-Planning/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->

# Table of contents 

* TOC
{:toc}


<!-- ABOUT THE PROJECT -->
# About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)


This project aims to implement A* Algorithm to find a path between start and end point on a given map for a point/rigid robot. The obstacle space is represented as follows:


<img width="889" alt="Screen Shot 2022-03-07 at 11 04 12 PM" src="https://user-images.githubusercontent.com/24211929/157164038-0c720159-7a3e-45ec-85ed-8869977ec686.png">

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* Python
* matplotlib

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

### Prerequisites

* matplotlib
  ```sh
  pip install matplotlib
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vishalgattani/Path-Planning.git
   ```
2. Change to A* directory
   ```sh
   cd A\*/
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
# Usage

1. Run the python file: 
   ```sh
   python astar.py
   ```
2. Input the following values:
  - Robot dimension: 
  - Obstacle clearance: 
  - Start X (integer)
  - Start Y (integer)
  - Start ϴ (degrees)
  - Goal X (integer)
  - Goal Y (integer)
  - Step Size (1-10)


<p align="right">(<a href="#top">back to top</a>)</p>




<!-- ROADMAP -->
# Roadmap

- [x] Implement robot action set in 5 directions.
<img width="214" alt="image" src="https://user-images.githubusercontent.com/24211929/159387188-b8116171-10df-4ea6-b3bf-e5c6e9180d4c.png">

- [x] Implement obstacle space.
<img width="889" alt="Screen Shot 2022-03-07 at 11 04 12 PM" src="https://user-images.githubusercontent.com/24211929/157164038-0c720159-7a3e-45ec-85ed-8869977ec686.png">

- [ ] Generate enlarged obstacle space when robot dimensions and clearance values are given:
    - [x] Enlarge obstacle spaces using half-plane methods.
    - [ ] Enlarge obstacle spaces by moving the robot around the osbtacle to better the configuration space.

- [x] Implement the A* algorithm to search the graph for goal node.
  - [x] Generate the cost to travel to the goal.
  - [x] Implement a threshold distance around the goal.
  - [x] Find duplicate nodes by applying a threshold of 0.5 units in by matrix method. 
    - [x] `visited[width/threshold][height/threshold][12]` where 12 stands for `360/30` as the robot can only rotate 30 degrees.

- [x] Implement the backtracking to find the optimal path.

- [x] Visualize output
  - Black: Obstacles
  - Red: Enlarged obstacle space by Robot's dimension and clearance 
  - White: Confiugration space
  - During exploration:
    1. Yellow dots are the explored nodes
    2. Green: Chosen nodes of A* (Backtracking) with robot's direction
    3. Blue: Connects the chosen nodes to see the path (visual aid)

<p align="right">(<a href="#top">back to top</a>)</p>

# Output
---
<iframe width="640" height="480" align="middle" src="https://user-images.githubusercontent.com/24211929/159383851-806f3025-10d9-41f4-8f0a-ae68fdd7b860.mp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
<iframe width="640" height="480" align="middle" src="https://user-images.githubusercontent.com/24211929/159383893-be4f017e-e750-4c95-81d1-a3952eaba50b.mp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
- The [Figure 1](https://user-images.githubusercontent.com/24211929/159389056-93f225ea-fa74-459f-9e20-4b16cae289d6.png) below is an output for searching a path using A*.
![fig1](https://user-images.githubusercontent.com/24211929/159389056-93f225ea-fa74-459f-9e20-4b16cae289d6.png)
- The expanded version of the output is shown in [Figure 2](https://user-images.githubusercontent.com/24211929/159389057-849f4d6f-4c67-4656-b1f6-49865181848d.png)
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


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
# Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

<!-- 1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/vishalgattani/Path-Planning/blob/main/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

- <a href="mailto:vishalgattani09@gmail.com"><img src="https://img.shields.io/badge/-vishalgattani09@gmail.com-D14836?style=flat&logo=Gmail&logoColor=white"/></a>

Project Link: [https://github.com/vishalgattani/Path-Planning](https://github.com/vishalgattani/Path-Planning)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p> -->


# References

- [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)

<p align="right">(<a href="#top">back to top</a>)</p>


