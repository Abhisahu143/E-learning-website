// Three.js configuration
let scene, camera, renderer, particles, starField;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

function initBackground() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bgCanvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    // Generate particles
    for (let i = 0; i < 1500; i++) {
        vertices.push(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000
        );

        // Add colors
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5);
        colors.push(color.r, color.g, color.b);

        // Random sizes
        sizes.push(Math.random() * 4 + 1);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Custom shader material
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            pixelRatio: { value: window.devicePixelRatio }
        },
        vertexShader: `
            uniform float time;
            uniform float pixelRatio;
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            
            void main() {
                vColor = color;
                vec3 pos = position;
                pos.y += sin(time * 0.001 + position.x * 0.05) * 2.0;
                pos.x += cos(time * 0.001 + position.y * 0.05) * 2.0;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Add starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starColors = [];
    
    for (let i = 0; i < 2000; i++) {
        starVertices.push(
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000
        );
        
        const starColor = new THREE.Color();
        starColor.setHSL(Math.random(), 0.2, 0.8);
        starColors.push(starColor.r, starColor.g, starColor.b);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    camera.position.z = 100;

    // Add mouse interaction
    document.addEventListener('mousemove', onMouseMove);
    
    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth camera movement
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    camera.position.x += (targetX - camera.position.x) * 0.01;
    camera.position.y += (-targetY - camera.position.y) * 0.01;
    camera.lookAt(scene.position);

    // Update particle animation
    const time = Date.now();
    particles.material.uniforms.time.value = time;
    
    particles.rotation.y += 0.0005;
    starField.rotation.y += 0.0002;
    starField.rotation.x += 0.0001;

    // Wave effect for particles
    const positions = particles.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin((time * 0.001 + x * 0.05)) * 5 
                        + Math.cos((time * 0.001 + y * 0.05)) * 5;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (particles && particles.material.uniforms) {
        particles.material.uniforms.pixelRatio.value = window.devicePixelRatio;
    }
}

window.addEventListener('resize', onWindowResize);

// Initialize background
document.addEventListener('DOMContentLoaded', initBackground); 