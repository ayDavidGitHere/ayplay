Number.prototype.map = function(in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

//main app
class App {
	constructor(main) {
		this.time = 0;
		this.clock = new THREE.Clock();
		this.init(main);
		window.addEventListener("resize", this.onWindowResize.bind(this), false);
	}

	init(main) {
		// renderer
        this.renderer = main.renderer
		// scene
		this.scene = main.scene;
		// camera
		this.camera = main.camera;
		this.camera.position.set(10, 2, 10);

		// controls
		this.controls = main.controls
		this.controls.enabled = true;
		this.controls.enablePan = false;

		// ambient light
		this.scene.add(new THREE.AmbientLight(0x222222));

		var geometry = new THREE.SphereGeometry(10, 100, 100);
		var material = new THREE.ShaderMaterial({ 
			uniforms: {
				uTime: {
					value: 0.0
				},
				uColor1: {
					value: [255,0.5,0.0]
				},
				uColor2: {
					value: [255,0.0,177.0]
				},
				uNoise: {
					value: 1.111
				},
				uSpeed: {
					value: 1.0
				}
			},
			vertexShader: document.querySelector('#vertexShader').innerText,
			fragmentShader: document.querySelector('#fragmentShader').innerText,
			transparent: true,
			side: THREE.DoubleSide,
			depthWrite: false,
			depthTest: false
		});
		this.cube = new THREE.Mesh(geometry, material);    
		//this.cube.scale.set(10, 10, 10); 
        /*this.cube.position.x = 0;//getRandomArbitrary(-250, 250);
        this.cube.position.y =  50;//0+b/2;
        this.cube.position.z = -800;//getRandomArbitrary(-4000, -5000); */
		this.scene.add(this.cube);
        
        /*
		this.load().then((assets)=>{
			this.addPostProcessing(assets);
			this.isPostProcessingEnabled = true;
			this.addGUI();
		});
		*/
		
		//animation loop
		this.renderer.setAnimationLoop(this.render.bind(this));
	}
	
	load() {
		const assets = new Map();
		const loadingManager = new THREE.LoadingManager();
		
		return new Promise((resolve, reject) => {

			loadingManager.onError = reject;
			loadingManager.onProgress = (item, loaded, total) => {
				if(loaded === total) {
					resolve(assets);
				}
			};

			const searchImage = new Image();
			const areaImage = new Image();

			searchImage.addEventListener("load", function() {
				assets.set("smaa-search", this);
				loadingManager.itemEnd("smaa-search");
			});

			areaImage.addEventListener("load", function() {
				assets.set("smaa-area", this);
				loadingManager.itemEnd("smaa-area");
			});

			// Register the new image assets.
			loadingManager.itemStart("smaa-search");
			loadingManager.itemStart("smaa-area");

			// Load the images asynchronously.
			searchImage.src = PP.SMAAEffect.searchImageDataURL;
			areaImage.src = PP.SMAAEffect.areaImageDataURL;
		});
	}

	addPostProcessing(assets) {
		// this.renderer = renderer;
		this.composer = new PP.EffectComposer(this.renderer);

		this.noiseEffect = new PP.NoiseEffect({ premultiply: true });
		this.vignetteEffect = new PP.VignetteEffect();
		this.bloomEffect = new PP.BloomEffect();

		this.SMAAEffect = new PP.SMAAEffect(assets.get("smaa-search"), assets.get("smaa-area"));
		this.SMAAEffect.setOrthogonalSearchSteps(112);
		this.SMAAEffect.setEdgeDetectionThreshold(0.5);
		this.chromaticAberrationEffect = new PP.ChromaticAberrationEffect();

		this.renderPass = new PP.RenderPass(this.scene, this.camera);
		this.effectPass = new PP.EffectPass(
			this.camera,
			this.SMAAEffect
			
			// this.SMAAEffect
		);
		
		this.effectPass2 = new PP.EffectPass(
			this.chromaticAberrationEffect,
			this.bloomEffect,
		)

		// this.noiseEffect.blendMode.opacity.value = 0.75;
		this.effectPass2.renderToScreen = true;

		this.composer.addPass(this.renderPass);
		this.composer.addPass(this.effectPass);
		this.composer.addPass(this.effectPass2);
	}

	render() {
		// this.clock.update();
		this.time = this.time + this.clock.getDelta();
		
		this.cube.material.uniforms.uTime.value = this.time;

		Boolean(this.isPostProcessingEnabled)
		? this.composer.render(this.clock.getDelta())
		: this.renderer.render(this.scene, this.camera);
		
	}

	addGUI() {
		this.gui = new dat.GUI();

		this.params = {
			postprocessing: {
				enabled: true,
				bloom: {
					blendFunction: PP.BlendFunction.SCREEN,
					resolutionScale: 0.5,
					kernelSize: PP.KernelSize.LARGE,
					distinction: 1.0,
					dithering: false
				},
				chroma: {
					offset: {
						x:0,
						y:0
					}
				},
				SMAA: {
					searchStep: 112,
					edgeDetectionThreshold:0.5
				}
			}
		};

		let pp = this.gui.addFolder("post-processing");
		pp.open();
		pp.add(this,'isPostProcessingEnabled').name('enabled')
		
		let parameters = this.gui.addFolder("parameters");
		parameters.open()
		parameters.addColor(this.cube.material.uniforms.uColor1,'value').name('color1')
		parameters.addColor(this.cube.material.uniforms.uColor2,'value').name('color2')
		parameters.add(this.cube.material.uniforms.uNoise,'value').name('noise').min(0.1).max(2.0).name('scale')

	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}//EO class app



const PP = POSTPROCESSING;    
const simplex = new SimplexNoise();
//init app

