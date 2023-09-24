import React from 'react'
import { useEffect } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function THREE_D_OBJECT() {
    useEffect(() => {
        const scene = new THREE.Scene()

        // adding camera angles
        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
        // the .set() changes all values for (x, y, z) simultaneously
        camera.position.set(50, -40, 75)

        // creating the canvas
        const canvas = document.getElementById('threeCanvas')
        const renderer = new THREE.WebGL1Renderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)

        // creating lighting for the object
        const ambientLight = new THREE.AmbientLight(0x404040)
        scene.add(ambientLight)

        // adding a light source
        const light = new THREE.DirectionalLight(0x222222)
        light.position.set(0, 0, 6)
        scene.add(light)

        // creating the 3d object (W x H x D)
        const boxGeometry = new THREE.BoxGeometry(20, 32, 3)
        const boxMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
        scene.add(boxMesh)

        // adding custom controls to the object
        const controls = new OrbitControls(camera, canvas)
        controls.enableZoom = false

        let currentScrollState = window.scrollY / 3000
        let finalScrollState = window.scrollY / 3000

        const animate = () => {
            // animates the object on mouse click, drag and zoom
            window.requestAnimationFrame(animate)

            // animate based on scroll
            // currentScrollState is adding in a buffer so the animation is smoother
            currentScrollState += (finalScrollState - currentScrollState) * 0.1
            const currentXState = currentScrollState * Math.PI
            const currentYState = (currentScrollState * 0.9 + 0.1) * Math.PI
            boxMesh.rotation.set(currentXState, currentYState, 0)

            renderer.render(scene, camera)
        }
        animate()

        // adding a smoother scroll animation
        window.addEventListener('scroll', function(){
            finalScrollState = window.scrollY / 3000
        })
    }, [])

    return (
        <canvas id='threeCanvas' />
    )
}