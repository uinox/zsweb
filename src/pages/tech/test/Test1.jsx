import React, {useEffect} from 'react';
import * as THREE from "three";
import "./Test.less"

function Test1(){
    const init = () => {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        let renderer = new THREE.WebGLRenderer();
        const canvasTest = document.querySelector(".canvas");
        // renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        renderer.setSize( 700, 400 )
        canvasTest.appendChild( renderer.domElement );
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        };

        animate();
    }
    useEffect(()=>{
        init();
    })
    return (
        <div className="canvas"></div>
    )
}

export default Test1;