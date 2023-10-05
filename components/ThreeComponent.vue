<template>
  <div></div>
</template>

<script>
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "@/utils/CSS3DRenderer.js";
import OrbitControls from "three-orbitcontrols";

export default {
  mounted() {
    var camera, scene, renderer;
    var scene2, renderer2;
    var stringHTML =
      '<button type="button" class="v-btn v-btn--flat v-btn--text theme--light v-size--default" id="refreshBtn">' +
      '<span class="v-btn__content">' +
      "refresh" +
      "</span>" +
      "</button>" +
      '<div id="copypdf">' +
      "</div>";
    var lights = [];

    init();
    animate(performance.now());

    function init() {
      //scene :
      scene = new THREE.Scene();
      scene2 = new THREE.Scene();

      //CSS3DObject :
      for (var i = 0; i < 1; i++) {
        var element = document.createElement("div");
        element.innerHTML = stringHTML;
        var domObject = new CSS3DObject(element);
        domObject.position.x = 0;
        domObject.position.y = 0;
        domObject.position.z = 0;
        domObject.rotation.x = 0;
        domObject.rotation.y = 0;
        domObject.rotation.z = 0;
        //domObject.scale.x = Math.random() + 0.5;
        //domObject.scale.y = Math.random() + 0.5;
        scene2.add(domObject);

        // make an invisible plane for the DOM element to chop
        // clip a WebGL geometry with it.

        //plane Geometry :
        var material = new THREE.MeshBasicMaterial({
          wireframe: true,
          opacity: 1,
          color: new THREE.Color("black"),
          blending: THREE.NoBlending,
          side: THREE.DoubleSide
        });
        var geometry = new THREE.PlaneGeometry(600, 600);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(domObject.position);
        mesh.rotation.copy(domObject.rotation);
        //mesh.scale.copy( domObject.scale );
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        scene.add(mesh);
        //~function() {
        //var material = new THREE.ShadowMaterial({
        //opacity	: 0.2,
        ////color	: new THREE.Color('black'),
        ////blending: THREE.NoBlending,
        ////side	: THREE.DoubleSide,
        //});
        //var geometry = new THREE.PlaneGeometry( 100, 100 );
        //var mesh = new THREE.Mesh( geometry, material );
        //mesh.position.copy( domObject.position );
        //mesh.rotation.copy( domObject.rotation );
        ////mesh.scale.copy( domObject.scale );
        //scene.add( mesh );
        //}()
      }

      // make a geometry to see if we can clip it with the DOM elememt.

      // light :
      var ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      lights[0] = new THREE.PointLight(0x404040, 1, 0);
      lights[0].castShadow = true;
      lights[0].position.z = 300;
      lights[0].shadow.mapSize.width = 256; // default
      lights[0].shadow.mapSize.height = 256; // default
      lights[0].shadow.camera.near = 1; // default
      lights[0].shadow.camera.far = 2000; // default
      scene.add(lights[0]);

      //Renderers :
      renderer2 = new CSS3DRenderer();
      renderer2.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      renderer2.domElement.style.position = "absolute";
      renderer2.domElement.style.top = 0;
      document.querySelector("#ThreeCanvas").appendChild(renderer2.domElement);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.zIndex = 1;
      renderer.domElement.style.top = 0;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
      document.querySelector("#ThreeCanvas").appendChild(renderer.domElement);

      //Camera :
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.set(0, 0, 600);

      //axesHelper :
      var axesHelper = new THREE.AxesHelper(200);
      scene.add(axesHelper);
      var gridHelper = new THREE.GridHelper(500, 40); // 500 is grid size, 20 is grid step
      scene.add(gridHelper);

      //controlsOrbit :
      var controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
      var controls2 = new OrbitControls(camera, renderer2.domElement);
      controls2.update();
    }

    //Add evenlistener and function for the button "refresh" :
    var refreshBtn = document.getElementById("refreshBtn");
    refreshBtn.onclick = function refreshAfterImport() {
      alert("this is working");
      renderer.domElement.style.zIndex = 1;
      renderer2.domElement.style.zIndex = 0;
    };

    //Add evenlistener and fuction for the button "create cube ('cuberBtn')" :
    var createCubeBtn = document.getElementById("cuberBtn");
    createCubeBtn.onclick = function refreshAfterImport() {
      var geometry = new THREE.BoxGeometry(100, 100, 100);
      var material = new THREE.MeshNormalMaterial({
        blending: THREE.NoBlending
      });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 50, 100);
      scene.add(cube);
      alert("New cube Add to the Three scene!");
    };

    function animate(time) {
      lights[0].position.x = 200 * Math.sin(time * 0.003);
      lights[0].position.y = 200 * Math.cos(time * 0.002);

      scene.updateMatrixWorld();

      renderer.render(scene, camera);
      renderer2.render(scene2, camera);

      requestAnimationFrame(animate);
    }
  }
};
</script>

<style>
</style>