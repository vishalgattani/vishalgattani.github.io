---
title: Minimize steering error with a PID controller
tags: [PID, Robotics, Controls]
style: fill
color: danger
description: Minimize steering error of a self-driving car following a series of waypoints.
---

Source: [Habrador](https://www.habrador.com/tutorials/pid-controller/1-car-follow-path/)


# About the concept

***Why do you need to minimize a steering error?***

We can  determine if the car should steer left or right to reach a waypoint. However, in real-life scenarios, the car gradually steers towards its intended heading and then drives in a mear to perfect straight path. If the gradual steering is not implemented, the wheels will rapidly switch to the left or right when the car is driving straight towards the waypoint. To minimize this behavior, an approach is to take the rolling average of the steering angles, with the addition of a PID controller.

<!--  -->



<video src="https://user-images.githubusercontent.com/24211929/235016579-95dd581d-aaea-47d0-8f94-b5fafc48b6b8.mov" controls="controls" style="max-width: 730px;"></video>

<!-- <iframe align="middle" src="https://user-images.githubusercontent.com/24211929/235016578-0dd0d6f1-bc26-4c44-bcae-62b372e075b8.mov"  allowfullscreen></iframe> -->

<!-- ![Drunk Steering](https://user-images.githubusercontent.com/24211929/235016578-0dd0d6f1-bc26-4c44-bcae-62b372e075b8.mov) -->



# Cross Tracking Error (CTE)

CTE is the distance between the car's actual position and the intended position, which is the position closest to the car on a line between the waypoints.

```shell
  Vector a = Vector carPosition - Vector FromWaypoint
  Vector b = Vector ToWaypoint - Vector FromWaypoint
  proj_a_to_b = (a.b / |b|^2) * b
  progress = (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z)
  Vector errorPerpendicular = FromWaypoint + progress * b;
  error = |(errorPerpendicular - carPosition)|;
```

This is the CTE. But we still do not know if we have to steer left or right to minimize this error.

```shell
  Vector rightDirection = carPosition.right;
  Vector waypointDirection = ToWaypoint - carPosition;
  dotProduct = DotProduct(rightDirection,waypointDirection)
  if (dotProduct > 0)
      steerDirection = 1
  else
      steerDirection = -1
```

Once we know the direction, the total error is given by:
```shell
  error = steerDirection*error
```

Now we apply PID controller to minimize this CTE.

# PID

The input to the controller is the CTE error along with the P,I,D gains. The output is the steering angle at that particular instant of time.

```shell
  steeringAngle = 0
  steeringAngle += P * error

  error_sum +=  error * dt
  steeringAngle += I * error_sum

  float d_dt_error = (error - error_old) / dt
  steeringAngle += D * d_dt_error

  error_old = error
  return steeringAngle
```

We average this steering angle to simulate the time it takes to turn the steering wheel for realism.

```shell
averageSteeringAngle = averageSteeringAngle + ((steeringAngle - averageSteeringAngle) / averageAmount)
```
# Result

<video src="https://user-images.githubusercontent.com/24211929/235016578-0dd0d6f1-bc26-4c44-bcae-62b372e075b8.mov" controls="controls" style="max-width: 730px;"></video>

<!-- https://user-images.githubusercontent.com/24211929/235016579-95dd581d-aaea-47d0-8f94-b5fafc48b6b8.mov -->

<!-- <iframe align="middle" src="https://user-images.githubusercontent.com/24211929/235016579-95dd581d-aaea-47d0-8f94-b5fafc48b6b8.mov" allowfullscreen></iframe> -->
