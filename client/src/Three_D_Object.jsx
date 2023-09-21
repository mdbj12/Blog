import React from 'react'
import { useEffect } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Three_D_Object() {
    useEffect(() => {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.z = 96

        const canvas = document.getElementById('threeCanvas')
        const renderer = new THREE.WebGL1Renderer(canvas)
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        // creating the 3d object
        const boxGeometry = new THREE.BoxGeometry(16, 16, 16)
        const boxMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
        scene.add(boxMesh)

        const controls = new OrbitControls(camera, renderer.domElement)

        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            window.requestAnimationFrame(animate)
        }
        animate()
    }, [])

    return (
        <div>
            <canvas id='threeCanvas' />
        </div>
    )
}