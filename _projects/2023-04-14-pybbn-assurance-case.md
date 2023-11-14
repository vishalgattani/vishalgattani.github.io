---
name: PyBBN Assurance Cases
tools: [Bayesian Belief Networks, Design of Experiments, Assurance case, Python]
image: https://github.com/vishalgattani/pybbn/assets/24211929/5bd6b900-93ba-47c5-bcc0-38bd9f043345
description: Determining assurance case beliefs using Bayesian Belief Networks and Design of Experiments.
---

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Tesla Supercharger</h3>

  <p align="center">
    Determining assurance case beliefs using Bayesian Belief Networks and Design of Experiments.
    <br />
    <a href="https://github.com/vishalgattani/pybbn"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vishalgattani/pybbn/issues">Report Bug</a>
    ·
    <a href="https://github.com/vishalgattani/pybbn/issues">Request Feature</a>
  </p>
</div>

<img width="1552" alt="pybbn-gui" src="https://github.com/vishalgattani/pybbn/assets/24211929/5bd6b900-93ba-47c5-bcc0-38bd9f043345">

# Bayesian Belief Networks (BBNs)

Going back to [my post on Bayesian Networks](https://vishalgattani.github.io/blog/genie-bayesian-networks), generating assurance case using BBNs using `python` is a simple task.

A BBN is a graphical model that represents probabilistic relationships among a set of variables. Nodes in the graph represent random variables, and edges represent dependencies between the variables. The conditional probability distributions associated with each node given its parents are used to model the joint probability distribution of the entire network.

This node structure can be created using the `pybbn` library where the BBN is defined as a pair, `G`, `P`, where
- `G` is a directed acylic graph (DAG)
- `P` is a joint probability distribution
and `G` satisfies the Markov Condition (nodes are conditionally independent of non-descendants given its parents) according to[ `pybbn` documentation](https://py-bbn.readthedocs.io/probabilistic-inference.html).

# Generating a BBN

```python
bbn = BBN(n_experiments=n_experiments)
mission_success = bbn.create_bbn_node(
    GoalNode(0, "Meeting requirements", n_children=3)
)
mission_all_waypoints = bbn.create_bbn_node(
    node_type=MinThresholdNode(
        id=1,
        name=f"Robot Nav Terrain under Threshold",
        n_experiments=bbn.n_experiments,
        threshold=nav_threshold,
    )
)
mission_times_navigable_terrain = bbn.create_bbn_node(
    node_type=SuccessNode(
        2,
        "P(robot on navigable terrain)",
        n_experiments=bbn.n_experiments,
        probability_of_success=p_correct_navigation,
    ),
)
mission_no_collision = bbn.create_bbn_node(
    MaxThresholdNode(
        3,
        f"Robot Collision under Threshold",
        n_experiments=bbn.n_experiments,
        threshold=collision_threshold,
    )
)
mission_times_collision = bbn.create_bbn_node(
    SuccessNode(
        4,
        "P(robot not collide)",
        n_experiments=bbn.n_experiments,
        probability_of_success=p_no_collision,
    )
)
mission_pose_in_threshold = bbn.create_bbn_node(
    MinThresholdNode(
        5,
        f"Robot Pose under Threshold",
        n_experiments=bbn.n_experiments,
        threshold=pose_threshold,
    )
)
mission_times_pose_within_threshold = bbn.create_bbn_node(
    SuccessNode(
        6,
        "P(robot pose within region)",
        n_experiments=bbn.n_experiments,
        probability_of_success=p_correct_pose,
    )
)
bbn.create_edge(mission_times_navigable_terrain, mission_all_waypoints)
bbn.create_edge(mission_all_waypoints, mission_success)
bbn.create_edge(mission_times_collision, mission_no_collision)
bbn.create_edge(mission_no_collision, mission_success)
bbn.create_edge(mission_times_pose_within_threshold, mission_pose_in_threshold)
bbn.create_edge(mission_pose_in_threshold, mission_success)
bbn.set_join_tree()
```

Once the BBN structure has been established, an assurance case in GSN notation from a YAML format to a scalable vector graphics (SVG) image can be generated using the `gsn2x` program available on Github [here](https://github.com/jonasthewolf/gsn2x).

![assurance_case](https://github.com/vishalgattani/pybbn/assets/24211929/de55caee-7a15-402f-9a8f-76749b823643)

# Design of Experiments (DoE)

Using DoE, it is easier to determine the conditions which would provide greater belief/assurance in achieving the claims put forth by the assurance case.