---
name: Dijkstra's Algorithm - Path Planning
tools: [Python, OpenCV]
image: https://user-images.githubusercontent.com/24211929/157163680-38a9d0ac-95a9-40a3-99bd-0cd015e46b15.gif
description: Implementation of Dijkstra algorithm for a Point Robot
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

<h3 align="center">Dijkstra's Algorithm - Path Planning</h3>

  <p align="center">
    Implementation of Dijkstra's algorithm for a Robot
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


This project aims to implement Dijkstra’s Algorithm to find a path between start and end point on a given map for a point robot. 
The obstacle space is represented in the following image.


<img width="889" alt="Screen Shot 2022-03-07 at 11 04 12 PM" src="https://user-images.githubusercontent.com/24211929/157164038-0c720159-7a3e-45ec-85ed-8869977ec686.png">

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* Python
* OpenCV

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

### Prerequisites

* opencv
  ```sh
  pip install opencv-python
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vishalgattani/Path-Planning.git
   ```
2. Change to Djikstra directory
   ```sh
   cd Djikstra
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
# Usage

1. Run the python file: 
   ```sh
   python dijkstra.py
   ```
2. Input the following values:
  - dimension 
  - clearance 
  - startx 
  - starty 
  - goalx 
  - goaly 
  - live animation
  - video save

3. If the user wishes a live animation, the opencv library will show node exploration.
4. If the user wishes to save the video, user requires to to input `[y/n]`.


<p align="right">(<a href="#top">back to top</a>)</p>




<!-- ROADMAP -->
# Roadmap

- [x] Implement robot action set in 8 directions; Up, Up-Right, Right, Down-Right, Down, Down-Left, Left, Up-Left.

<img width="430" alt="Screen Shot 2022-03-07 at 11 02 17 PM" src="https://user-images.githubusercontent.com/24211929/157163896-96cfe8de-aaa2-4da9-aa47-67e0f408f0ea.png">

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
    1. Green: Explored nodes
    2. Blue: Connects the chosen nodes to see the path (visual aid)

<p align="right">(<a href="#top">back to top</a>)</p>

# Output
---
![dijkstragiffinal](https://user-images.githubusercontent.com/24211929/157163680-38a9d0ac-95a9-40a3-99bd-0cd015e46b15.gif)

---

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

- [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

<p align="right">(<a href="#top">back to top</a>)</p>


