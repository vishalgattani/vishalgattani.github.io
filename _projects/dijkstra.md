---
name: Dijkstra's Algorithm - Path Planning
tools: [Python, OpenCV]
image: https://user-images.githubusercontent.com/24211929/157163680-38a9d0ac-95a9-40a3-99bd-0cd015e46b15.gif
description: Implementation of Dijkstra algorithm for a Point Robot
---

# Table of contents 

* TOC
{:toc}


# Introduction 

This project aims to implement Dijkstra’s Algorithm to find a path between start and end point on a given map for a point robot. 
The obstacle space is represented in the following image.


<img width="889" alt="Screen Shot 2022-03-07 at 11 04 12 PM" src="https://user-images.githubusercontent.com/24211929/157164038-0c720159-7a3e-45ec-85ed-8869977ec686.png">

The optimal path generation animation between start and goal point is shown using a simple graphical interface implemented using Python and OpenCV. 

# Assumptions

The following image shows the action set that can be performed by the Point Robot in consideration. It is capable of moving in 8 directions namely: 
Up, Up-Right, Right, Down-Right, Down, Down-Left, Left, Up-Left. The robot follows the actions in this particular order when exploring in the environment testbed. 

<img width="430" alt="Screen Shot 2022-03-07 at 11 02 17 PM" src="https://user-images.githubusercontent.com/24211929/157163896-96cfe8de-aaa2-4da9-aa47-67e0f408f0ea.png">

<!-- 
#  3D Rendering Using MVC Architecture

Render a 3D scene using more than two objects in the scene. The objects will be rendered using their surface
meshes given in .ply file format.

![beethoven_model(1)](https://user-images.githubusercontent.com/24211929/54107033-04098e00-43fe-11e9-9055-62d5bbdd6024.png)
![beethoven_model(2)](https://user-images.githubusercontent.com/24211929/54107034-04a22480-43fe-11e9-8bb8-cef48b541ef1.png)

![beethoven_models(1)](https://user-images.githubusercontent.com/24211929/54107094-30250f00-43fe-11e9-9edc-ee9af4b41774.png)
![beethoven_models(2)](https://user-images.githubusercontent.com/24211929/54107095-30250f00-43fe-11e9-9047-caffd43c1fa4.png) -->

# Visualization 

![dijkstragiffinal](https://user-images.githubusercontent.com/24211929/157163680-38a9d0ac-95a9-40a3-99bd-0cd015e46b15.gif)

The above video shows the node exploration and the optimal path generation after the goal node is reached. 

# Dijkstra's Algortithm Pseudocode

<!-- 
> while Q is not empty:
>   u ← vertex in Q with min dist[u]   
>   for each neighbor v of u still in Q:
>   alt ← dist[u] + Graph.Edges(u, v)
>     if alt < dist[v]:              
>       dist[v] ← alt
>       prev[v] ← u
> return dist[], prev[] -->

```{python, eval = FALSE}
open_set, closed_set = (),()
open_set[start index] = start

while open_set is not empty:
		
    current_id ← minimum_cost_index(open_set)

		current ← open_set[current_id]

		if current = goal:
      goal.parent ← current.parent
			goal.cost ← current.cost
      return True
		
    delete open_set(current_id)
		closed_set(current_id) ← current
		
    neighbors ← expand(current)

		for each node v in neighbors of current c:
        new_node_id ← v
        if new_node_id is in closed_set:
					continue
				if new_node_id is not in open_set:
					open_set(new_node_id) ← v 
				else:
					if cost of open_set(new_node_id) >= cost of v:
						open_set(new_node_id) ← v  

```


# References

- [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
