window.show3D = function () {
  var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({antialias: true}),
    controls = new THREE.TrackballControls(camera),
    loader = new THREE.JSONLoader();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 3;


  loader.load('/assets/models/monkey.json', function (geometry) {
    var mesh,
      uniforms = {
        lightColor: {type: "c", value: new THREE.Color(0xffffff)},
        lightDir: {type: "v3", value: new THREE.Vector3(0, 0, 1)},
        ambient: {type: "c", value: new THREE.Color(0x222222)},
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "/assets/textures/colours.jpg" ) }

      },
      shaderMaterial = new THREE.ShaderMaterial({
        shading: THREE.SmoothShading,
        skinning: true,
        uniforms: uniforms,
        wireframe: true,
        vertexColors: THREE.FaceColors,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }),
      mesh = new THREE.Mesh(geometry, shaderMaterial);

    scene.add(mesh);
    animate();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
}