import React, { useEffect } from "react";

import * as THREE from 'three/build/three.module.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

function Test4(){

    useEffect(()=>{
        var renderer, stats, scene, camera, gui, guiData;

        init();
        animate();

        //

        function init() {

            var container = document.querySelector(".canvas");
            container.innerHTML="";
            //

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 0, 0, 200 );

            //

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( 700, 400 );
            container.appendChild( renderer.domElement );

            //

            var controls = new OrbitControls( camera, renderer.domElement );
            controls.screenSpacePanning = true;

            //

            stats = new Stats();
            container.appendChild( stats.dom );

            //

            window.addEventListener( 'resize', onWindowResize, false );

            guiData = {
                currentURL: '/models/svg/tiger.svg',
                drawFillShapes: true,
                drawStrokes: true,
                fillShapesWireframe: false,
                strokesWireframe: false
            };

            loadSVG( guiData.currentURL );

            createGUI();

        }

        function createGUI() {

            if ( gui ) gui.destroy();

            gui = new GUI( { width: 350 } );

            gui.add( guiData, 'currentURL', {

                "Tiger": '/models/svg/tiger.svg',
                "Three.js": '/models/svg/threejs.svg',
                "Joins and caps": '/models/svg/lineJoinsAndCaps.svg',
                "Hexagon": '/models/svg/hexagon.svg',
                "Test 1": '/models/svg/tests/1.svg',
                "Test 2": '/models/svg/tests/2.svg',
                "Test 3": '/models/svg/tests/3.svg',
                "Test 4": '/models/svg/tests/4.svg',
                "Test 5": '/models/svg/tests/5.svg',
                "Test 6": '/models/svg/tests/6.svg',
                "Test 7": '/models/svg/tests/7.svg',
                "Test 8": '/models/svg/tests/8.svg'

            } ).name( 'SVG File' ).onChange( update );

            gui.add( guiData, 'drawStrokes' ).name( 'Draw strokes' ).onChange( update );

            gui.add( guiData, 'drawFillShapes' ).name( 'Draw fill shapes' ).onChange( update );

            gui.add( guiData, 'strokesWireframe' ).name( 'Wireframe strokes' ).onChange( update );

            gui.add( guiData, 'fillShapesWireframe' ).name( 'Wireframe fill shapes' ).onChange( update );

            function update() {

                loadSVG( guiData.currentURL );

            }

        }

        function loadSVG( url ) {

            //

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xb0b0b0 );

            //

            var helper = new THREE.GridHelper( 160, 10 );
            helper.rotation.x = Math.PI / 2;
            scene.add( helper );

            //

            var loader = new SVGLoader();

            loader.load( url, function ( data ) {

                var paths = data.paths;

                var group = new THREE.Group();
                group.scale.multiplyScalar( 0.25 );
                group.position.x = - 70;
                group.position.y = 70;
                group.scale.y *= - 1;

                for ( var i = 0; i < paths.length; i ++ ) {

                    var path = paths[ i ];

                    var fillColor = path.userData.style.fill;
                    if ( guiData.drawFillShapes && fillColor !== undefined && fillColor !== 'none' ) {

                        var material = new THREE.MeshBasicMaterial( {
                            color: new THREE.Color().setStyle( fillColor ),
                            opacity: path.userData.style.fillOpacity,
                            transparent: path.userData.style.fillOpacity < 1,
                            side: THREE.DoubleSide,
                            depthWrite: false,
                            wireframe: guiData.fillShapesWireframe
                        } );

                        var shapes = path.toShapes( true );

                        for ( var j = 0; j < shapes.length; j ++ ) {

                            var shape = shapes[ j ];

                            var geometry = new THREE.ShapeBufferGeometry( shape );
                            var mesh = new THREE.Mesh( geometry, material );

                            group.add( mesh );

                        }

                    }

                    var strokeColor = path.userData.style.stroke;

                    if ( guiData.drawStrokes && strokeColor !== undefined && strokeColor !== 'none' ) {

                        var material1 = new THREE.MeshBasicMaterial( {
                            color: new THREE.Color().setStyle( strokeColor ),
                            opacity: path.userData.style.strokeOpacity,
                            transparent: path.userData.style.strokeOpacity < 1,
                            side: THREE.DoubleSide,
                            depthWrite: false,
                            wireframe: guiData.strokesWireframe
                        } );

                        for ( var k = 0, jl = path.subPaths.length; k < jl; k ++ ) {

                            var subPath = path.subPaths[ k ];

                            var geometry1 = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );

                            if ( geometry ) {

                                var mesh1 = new THREE.Mesh( geometry1, material1 );

                                group.add( mesh1 );

                            }

                        }

                    }

                }

                scene.add( group );

            } );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestAnimationFrame( animate );

            render();
            stats.update();

        }

        function render() {

            renderer.render( scene, camera );

        }
    })
    
    return (
        <div className="canvas"></div>
    )
}

export default Test4;