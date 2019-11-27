# Exercice: PoC0: My first project
In order to understand AR, the best approach is start coding. We will see how to develop a simple AR project that will show us a rotating cube. Here you can find the different pieces of code if you want following us during the workshop.

## The libraries that should be imported to our Project
```
<script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
<script src="https://raw.githack.com/jeromeetienne/AR.js/2.0.8/aframe/build/aframe-ar.js"></script>
```

Don't forget about the styles!

```
<link rel="stylesheet" type="text/css" href="css/style.css">
```

## The ARjs elements
If we want to start an AR project, the second step is creating an scene where all our element will be placed.

```
<a-scene embedded vr-mode-ui='enabled: false' arjs='sourceType: webcam; trackingMethod: best;
   debugUIEnabled: false;' renderer='logarithmicDepthBuffer: true;'>
```

Then, How and Where our element will be placed by AR.js? We have to place a Marker inside the scene. The most common in this porject is the hiro marker that is included in the library.

```
<a-marker preset="hiro">
</a-marker>
```

Almost done. We need... The element to be shown where the marker is detected by our camera!

```
<a-box color="tomato" depth="2" height="2" width="2"
  animation="property: rotation; dur: 3000; to: 0 360 0; loop: true" >
</a-box>
```

Play with the animation parameters and see how the movement of the cube changes!

And finally, we have to add the camera to the scene.

```
<a-entity camera></a-entity>
```

If you are using our styles and the workshop interface, thats all for the first project. Now you can try to modify and experiment with it.
