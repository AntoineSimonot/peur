// aframe project

document.addEventListener('DOMContentLoaded', async function () {
    let door = document.querySelector('#doorObj')
    let wall = document.getElementById('disappearing-wall')
    let camera = document.getElementById('camera')
    let cameraPos = camera.getAttribute('position')

    function removeWall() {
        return new Promise((resolve, reject) => {
            let body = document.querySelector('body')

            body.style.transition = '0.5s'
            body.style.background = 'black'
            body.style.opacity = 0

            setTimeout(() => {
                wall.parentNode.removeChild(wall)
                body.style.background = 'white'
                body.style.opacity = 1
                resolve()
            }, 2000)
        })
    }

    function rotateCamera() {
        return new Promise((resolve, reject) => {
            camera.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: false;')
            setTimeout(() => {
                resolve()
            }, 5000)
        })
    }

    function moveCamera(z) {
        return new Promise((resolve, reject) => {
            camera.setAttribute(
                'animation',
                `property: position; to: 0 4 ${z}; dur: 5000; easing: linear; loop: false;`
            )
            setTimeout(() => {
                resolve()
            }, 5000)
        })
    }

    moveCamera(-10).then(() => {
        rotateCamera().then(() => {
            removeWall().then(() => {
                moveCamera(-30)
            })
        })
    })
})
