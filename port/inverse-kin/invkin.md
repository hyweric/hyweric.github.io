<div id = "divider"></div>
<div class="image-column-container" style="max-width: none; margin-bottom:20px;">
    <div class="image-column">
        <strong>Project Status:</strong> Completed
    </div>
    <div class="image-column">
        <strong>Project Type:</strong> Personal Tool
    </div>
    <div class="image-column">
        <strong>Created on:</strong> Oct 16, 2023
    </div>
</div>

---
**Links:** 

- [**Website**](https://inverse-kin-8a5e0cc0768d.herokuapp.com/) (Hosted on Heroku Github Student Plan.)

- [**Github**](https://github.com/hyweric/inverseKinematics)

---
### Synopsis:
Built on Flask, this tool computes 2D and 3D kinematics calculations. Using the sliders to adjust joint lengths and end coordinates, the website real-time updates the graphs (made with HTML5 Canvas for 2D and Plotly for 3D).  Every robotics enthusiast will one day build, program, or interact with a robotic arm, a robot dog, or similar device but may be confused about how to accurately control its movements. Recognizing this, the idea was to create an interactive platform that simplifies these complex calculations and provides an intuitive understanding of inverse kinematics. The first version of this website won a small ~ 90 person hackathon.

## Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/Hqi0FWwL94A?si=BV1rYklUnuVagTMf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Usage (Guide section on website)

## 2DOF Inverse Kinematics Tool

The 2DOF (Degrees of Freedom) inverse kinematics tool allows you to manipulate a two-jointed arm in a 2D plane.

### How to Use the 2DOF Tool

1. Navigate to the [2DOF page](https://inverse-kinematics.onrender.com/).
2. Adjust sliders to set the lengths of the two arm segments.
3. Set the X and Y Coordinates using the sliders.

### How it works

The tool uses trigonometric inverse kinematic calculations to calculate the angles between each of the joints. To plot the points on the graph, rather than using the forward kinematics with the inverse kinematics inputs, the plot is directly created by HTML5 Canvas, an element to generate graphics directly in JavaScript. Calculations are shown below:

### Use Cases

The 2DOF tool is useful in applications such as in robotic arms, animation and rigging, and linkage systems where motion is confined to a single plane. Examples include:

- Robotic arm used in assembly lines.
- Animation of characters in 2D games.
- Mechanical linkages in planar mechanisms.

## 3DOF Inverse Kinematics Tool

The 3DOF inverse kinematics tool allows you to control a three-jointed arm/leg in a 3D space. This is just one specific type of 3 degree of freedom system, where there is one base joint rotating about the y axis, and the other 2 orthogonal along another axis (diagram below). This type of 3 degree of freedom joint configuration is typically seen in robot dogs.

### How to Use the 3DOF Tool

1. Navigate to the [3DOF page](https://inverse-kinematics.onrender.com/dof3).
2. Adjust the sliders to set the lengths of the three arm segments.
3. Set the X, Y, Z Coordinates using the sliders.

### How it works

Similar to the 2 degree of freedom version, this tool can convert XYZ coordinates to angles between each of the joints. However, instead of using HTML5 Canvas for the diagram, it plots the points using the library Plotly. To arrive at each of the point's coordinates, it performs a set of forward kinematic calculations using the angles it derived.

### Use Cases

The 3DOF tool is useful in applications such as in robotic arms, animation and rigging, and linkage systems where movement is required in three dimensions. Examples include:

- Leg system of a Robot Dog.
- Animation of 3D characters in games or simulations.
- Design of mechanical linkages in 3D.

![Untitled](Inverse%20Kinematics%20Simulator%20bc620c7216b84aee8fa7be3b776b4766/Untitled%201.png)

*Right image: Wenkai Sun | [Balance Control of a Quadruped Robot Based on Foot Fall Adjustment](https://www.researchgate.net/figure/Billy-robot-dog-simplified-structural-model-The-model-uses-the-D-H-method-to-determine_fig1_358926865) - Creative Common License 4.0*