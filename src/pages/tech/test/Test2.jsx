import React, {useEffect} from 'react';
import * as THREE from "three";
import "./Test.less"

function Test2(){
    const init = () => {
        const canvasTest = document.querySelector(".canvas");
        canvasTest.innerHTML="";

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( 700, 400 );
        canvasTest.appendChild( renderer.domElement );

        let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 1, 500);
        camera.position.set(0,0,100);
        camera.lookAt(0,0,0);

        let scene = new THREE.Scene();

        let material = new THREE.LineBasicMaterial({color:0x0000ff});

        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10,0,0));
        geometry.vertices.push(new THREE.Vector3(0,10,0));
        geometry.vertices.push(new THREE.Vector3(10,0,0));

        let line = new THREE.Line( geometry, material);

        scene.add(line);
        renderer.render(scene, camera);

    }
    useEffect(()=>{
        init();
    })
    return (
        <div className="canvas"></div>
    )
}

export default Test2;