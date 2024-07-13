 // Создаем сцену
 const scene = new THREE.Scene();
 scene.background = new THREE.Color(0xffffff); 

 // Создаем камеру
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera.position.z = 5;

 // Создаем рендерер
 const renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 // Добавляем свет
 const light = new THREE.AmbientLight(0xffffff); // soft white light
 scene.add(light);

 const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
 directionalLight.position.set(1, 1, 1).normalize();
 scene.add(directionalLight);

 // Загружаем 3D модель
 const loader = new THREE.GLTFLoader();
 loader.load('scene.gltf', function (gltf) {
     scene.add(gltf.scene);
     animate();
 }, undefined, function (error) {
     console.error(error);
 });

 // Добавляем контроллеры OrbitControls
 const controls = new THREE.OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true; // Включаем инерцию
 controls.dampingFactor = 0.25; // Коэффициент инерции
 controls.screenSpacePanning = false; // Отключаем панорамирование
 controls.maxPolarAngle = Math.PI / 2; // Ограничиваем вертикальное вращение

 // Анимация
 function animate() {
     requestAnimationFrame(animate);
     controls.update(); // Обновляем контроллеры
     renderer.render(scene, camera);
 }

 // Обработка изменения размера окна
 window.addEventListener('resize', () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 });

 animate();