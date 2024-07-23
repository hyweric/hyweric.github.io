<div id = "divider"></div>
<div class="image-column-container" style="max-width: none; margin-bottom:20px;">
    <div class="image-column">
        <strong>Project Status:</strong> Completed
    </div>
    <div class="image-column">
        <strong>Project Type:</strong> Extension
    </div>
    <div class="image-column">
        <strong>Created on:</strong> Feb 6, 2024
    </div>
</div>

---

**Links:** 

- [**Download From Fusion 360 App Store**](https://apps.autodesk.com/FUSION/en/Detail/Index?id=1866257341742728249&appLang=en&os=Win64)

- [**Usage Instructions**](https://apps.autodesk.com/FUSION/en/Detail/HelpDoc?appId=1866257341742728249&appLang=en&os=Mac) 

- [**Github**](https://github.com/hyweric/F360WireGenerator)

---

### Synopsis:

Creating wires has always been a tedious process in Fusion 360, tediously tracing spline points on 3D sketches. The Fusion 360 Wire Generator Add-on simplies wire creation in Fusion 360. Simply select start and end points, set parameters, and generate multiple spline options effortlessly. Choose the best fit for the wire and adjust spline points easily.

## Demo

<iframe width="750rem" height="415rem" src="https://www.youtube.com/embed/lG5Qj6rc2vY?si=n3UTtvtNdkGCfIKm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Users / Impact:

<div class="image-column-container">
    <div class="image-column">
        <p>800+ Downloads, 11 Countries less than <strong>Four Months</strong> of release</p>
        <img src="Fusion%20360%20Wire%20Generator%20b0d26a36a8bc42ae80f501d29330f68f/7-22.png" alt="">
    </div>
    <div class="image-column">
        <p>Featured On Autodesk App Store Front Page for 3 Months</p>
        <img src="Fusion%20360%20Wire%20Generator%20b0d26a36a8bc42ae80f501d29330f68f/Untitled.png" alt="Untitled">
    </div>
</div>


## How it works:

Written in python using Fusion-360 API. 

How it works: 

1. The `HandlerOneCreation` class initializes when the user clicks the custom UI button
    - Sets up inputs for selecting the start point (`startPoint`), end point (`endPoint`), and the sketch plane (`plane`) where wire is generated
2. A perpendicular line (`perpendicular_line`) is drawn from the midpoint between `startPoint` and `endPoint`
    - Constraints applied to orient the `perpendicular_line` correctly relative to the line segment between `startPoint` and `endPoint`
3. The `rand_point` function generates points along a random path between `startPoint` and `endPoint`
    - Calculates a midpoint and then generates points randomly around this midpoint using the Rodriguez rotation formula (`rodriguez_rotation`).
       
       <img src="Fusion%20360%20Wire%20Generator%20b0d26a36a8bc42ae80f501d29330f68f/rodriguez_formula.webp" alt="rodriguez_formula" width = "80%"> 
       
       <img src="Fusion%20360%20Wire%20Generator%20b0d26a36a8bc42ae80f501d29330f68f/vectorimg.png" alt="vectorimg" width = "40%"> 
    - Adjusts vectors to provide a varied path for the wire, influenced by parameters such as `varc` (spread) and `angle_variance` (angle variation)
4. On the `sketch` object, derived from the selected `plane`, sketch lines and sketch Fitted splines are added.
    - Each iteration adds a new spline (`spline`) to the sketch
5. The `SplineHandler` classes manages user interaction with the generated splines (`splines`)
    - Sets up a selection input (`spline`), retrieves the `selected_spline` sweeps a path to create the body of the wire.
--- 