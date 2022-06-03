---
name: Modeling Self-Replicating Robotic Systems
tools: [Python]
image: https://user-images.githubusercontent.com/24211929/170116184-5f5ef498-213a-4ac2-b7c5-38e7c6b45394.gif
description: A simulation system, modelled and designed, to determine how a SRRS performs based on its system configuration, attributes, and operating environment. 
---

<!-- ![srrs_compressed_cropped](https://user-images.githubusercontent.com/24211929/170116184-5f5ef498-213a-4ac2-b7c5-38e7c6b45394.gif)
 -->

<!-- PROJECT LOGO -->
<br />
<div align="center">


<h3 align="center">Modeling Self-Replicating Robotic Systems</h3>

  <p align="center">
    A simulation system, modelled and designed, to determine how a SRRS performs based on its system configuration, attributes, and operating environment.  
    <br />
    <a href="https://github.com/vishalgattani/srrs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    
    <a href="https://github.com/vishalgattani/srrs/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/srrs/issues">Request Feature</a>
  </p>
</div>

# Table of contents 

* TOC
{:toc}

# About the project

The project aims to simulate the performance of 6 different system configurations for self-replicating robot systems (SRRSs). A simulation shall be developed to provide a means to implement, assess and compare these system configurations and to perform trade-off analysis to yield a recommendation of the best course of action (COA) for the user to employ.

For this analysis, the self-replicating robot systems are categorized into 6 categories (system configurations). The simulation is conducted with parameters that may fit a variety of mission constraints in order to inform the decision-makers on how an SRRS should be configured and commanded. 

As launching materials into space can be prohibitively expensive, which may drive a need for utilizing in-situ materials, the primary consumer for this analysis is the aerospace industry with organizations such as National Aeronautics and Space Administration (NASA) and SpaceX. In an aerospace application, a mission might use an SRRS to print a larger structure (such as a habitat), and therefore, a number of 3D print-capable robots would be needed. 

The simulation of different system configurations of the SRRSs will be used to formulate results that shall be utilized as heuristics which shall aid in determining which types of buildable robots or how many such robots shall be built for a particular mission or objective. For instance, the initial resources provided to the system may influence the rate at which different system configurations can expand. The 6 configurations shall be compared against the following metrics; assembly capacity, collection capacity, printing capacity, and the number of robots built.

# System Description
There are four different types of resources that shall be considered in the simulation system. These resource types are as follows:

1.  Non-Printable components: components that the robot system does not have the capability to print (or otherwise make in-situ), such as control units (processors) and motors.
2.  Printable components: components that are fabricated by the robot system during the simulation, such as frames and other structural elements for new robots.
3.  Raw printing materials: materials that are used in the printing process. The printing process would yield the printable component resource type, so the raw material type requires a fabricating step before materials are usable (as components) to build new robots.
4.  The environment also has a certain amount of raw printing material available that robots can collect.

There are four task types in the simulation: three which perform an action (depicted in Figure 1) and one which represents a default state indicating that a robot is currently performing no action (idle).

1.  Collect: A task type where the robot gathers raw printing materials from the environment and adds the gathered materials to the robot system’s inventory. Upon completion of this task, raw printing materials are removed from the environment and added to the robot system’s resource pool. 
2.  Print: A task type where the robot takes raw printing materials and fabricates them into printable components. Upon completion of this task, raw printing materials are removed from the robot system’s resource pool, and printable components are added to the robot system’s resource pool. 
3.  Assemble: A task type where the robot takes non-printable components and printable components from the robot system’s resource pool and assembles them into a new robot. This task type has a duration that varies by the robot type being assembled. Upon completion of this task, the newly assembled robot is added to the robot system.
4.  Idle: A default task type that is assigned to any robot not performing any other action during a time step. This task type has no associated duration because it does not have any completion actions/events.

There are four types of robots: normal, printer, assembler, and replicator. In each time-step, each robot is either idle, gathering resources, printing components, or assembling a new robot. However, certain robot types are restricted in what types of tasks they can perform as shown in following table.


| Cost per capability | Non-Printable cost | Printable cost | Build duration cost |
| ------------------- | ------------------ | -------------- | ------------------- |
| Base Cost           | 1                  | 2              | 2                   |
| Printing Capability | 1                  | 2              | 2                   |
| Assembling Capacity | 1                  | 2              | 2                   |

| Robot Type | Collects Resources | Print Components | Assembles Robots |
| ---------- | ------------------ | ---------------- | ---------------- |
| Normal     | TRUE               | FALSE            | FALSE            |
| Assembler  | TRUE               | FALSE            | TRUE             |
| Printer    | TRUE               | TRUE             | FALSE            |
| Replicator | TRUE               | TRUE             | TRUE             |


The material cost of each robot type is directly related to its capabilities. Capability costs for each included capability are added together to determine the cost of the robot type. For example, the normal robot type cost is just the base cost, while the printer robot type’s cost is calculated by adding the base cost plus the printing capability cost.

The categorization consists of a combination of two separate classifications. The first classification, the replication approach, consists of centralized, decentralized, and hierarchical. The second classification, the production approach, consists of heterogeneous and homogeneous. Table 3 shows which robot types are produced in a certain system configuration.

| Buildable Robot Types | Centralized | Decentralized      | Hierarchical               |
| --------------------- | ----------- | ------------------ | -------------------------- |
| Homogeneous           | Normal      | Replicator         | Replicator, Normal         |
| Heterogeneous         | Normal      | Assembler, Printer | Assembler, Printer, Normal |

An important capability of a self-replicating robot system is the ability to fabricate parts and assemble new robots. This introduces the question of the quality of the built robot, as a robot built in-situ may have quality defects (without the ability to simply discard it with minimal impacts, such as in a factory setting). To facilitate assessment, the simulation assigns each robot a build quality. A robot’s build quality value ranges from zero to one, with one being very high quality and zero being very poor quality. The quality value is a decimal value.

| ID | Design Option                     | Characteristics                                                                                                                                                                                                                                               |
| -- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Centralized homogeneous (CHO)     | One robot is responsible for both printing components and assembling them. Constructed robots are of the normal type and either gather resources or complete other objectives.                                                                                |
| 2  | Decentralized homogeneous (DHO)   | All robots have the capability to print components, assemble them, and gather resources or complete other objectives.                                                                                                                                         |
| 3  | Hierarchical homogeneous (HHO)    | There are a variable number of robots capable of printing components and assembling them. There are also a variable number of<br>normal type robots.                                                                                                          |
| 4  | Centralized heterogeneous (CHE)   | One robot is responsible for printing components, and another (distinct) robot is responsible for assembling them. Constructed robots are of the normal type and either gather resources or complete other objectives.                                        |
| 5  | Decentralized heterogeneous (DHE) | Robots have either the capability to print components or the capability to assemble them. All robots can gather resources or complete other objectives.                                                                                                       |
| 6  | Hierarchical heterogeneous (CHE)  | There are a variable number of robots capable of printing components, a variable number capable of assembling them (distinct from printing group), and a variable number of normal type robots. All robots can gather resources or complete other objectives. |

# Analysis Metrics

The primary metrics for which data are collected by the simulation include are as follows:
1. Assembly capacity: The number of robots that have the assembly capability at the end of a simulation run. This includes replicator and assembler robot types, which have not succumbed to a task risk and lost their capability. 
2. Collection capacity: The number of robots that have the collect capability at the end of a simulation run. All robot types have this capability in this simulation, so this is always equal to the current number of robots in the system. 
3. Print capacity: The number of robots that have the print capability at the end of a simulation run. This includes replicator and printer robot types, which have not succumbed to a task risk and lost their capability. 
4. The total number of robots built using the system configuration.
***
# SysML BDD

<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/SRRS_BDD.jpg?raw=true">

***
# SysML IBD

<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/IBD%20SRRS.jpg?raw=true">

***
# SysML SMD Replicator
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/SMDReplicator.jpg?raw=true">

***
# SysML Activity - Rotational Decision Making
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/Activity%20Replicator%20Rotational.jpg?raw=true">

***
# SysML Activity - APC Decision Making
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/Activity%20Replicator%20APC.jpg?raw=true">

***
# SysML Activity - Replicator Assembly task
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/Activity%20Replicator%20-%20Assembling%20Task.jpg?raw=true">

# SysML SMD Assembler
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/SMDAssembler.jpg?raw=true">

# SysML SMD Printer
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/SMDPrinter.jpg?raw=true">


# SysML SMD Normal
<img src="https://github.com/vishalgattani/srrs/blob/main/sysml/SMDNormal.jpg?raw=true">

# Output 
## Habitat Growth Visualization
The number of Robots 'In-service' and 'Out-of-service' are plotted as results for the different configurations. The report link decribes the intrinsic nature of these 6 different configurations and the analysis performed. 

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/74/?share_key=r8oB4JL6MEMexQFL0w2jyc" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/78/?share_key=T91UzaxWdNdwDnX1ZmcPeC" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/82/?share_key=DBaf6zpBxI5Lj5UM8KzaIC" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/86/?share_key=jRHAUy9Jn8pJHZSIY1lHUq" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/90/?share_key=LrBlYzbhjVcVLNHAOn9JU6" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/94/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

## Characteristics Visualization

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/76/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/80/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/84/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/88/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/92/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="https://plotly.com/~vishalgattani/96/?share_key=uSdHNAypo5q3zOxpEApyE2" height="525" width="100%"></iframe>

# References
- Jones, A., & Straub, J. (2021). Simulation and Analysis of Self-Replicating Robot Decision-Making Systems. Computers, 10(1), 9. [https://doi.org/10.3390/computers10010009](https://doi.org/10.3390/computers10010009)
- Jones A, Straub J. Concepts for 3D Printing-Based Self-Replicating Robot Command and Coordination Techniques. Machines. 2017; 5(2):12. [https://doi.org/10.3390/machines5020012](https://doi.org/10.3390/machines5020012)







