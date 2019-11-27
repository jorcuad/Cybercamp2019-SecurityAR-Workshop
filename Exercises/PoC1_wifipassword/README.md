# Exercice: PoC1: Wifi Password

## Create an asset

```
<a-assets>
  <img id="transpImage" src="static/passwordpanel.png">
</a-assets>
```

## Create an image linked to the asset

```
<a-image rotation="270 0 0" width="1" height="1" src="#transpImage"></a-image>
```

## Create a text in AR

```
<a-entity id="password" rotation="270 0 0" position="0.6 0 0.25" scale="2 2 2" text="value: Password-not-Found;color:black"></a-entity>
```
