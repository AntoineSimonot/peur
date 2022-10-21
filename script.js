// aframe project

document.addEventListener('DOMContentLoaded', async function () {
    let door = document.querySelector('#doorObj')
    let wall = document.getElementById('disappearing-wall')
    let camera = document.getElementById('camera')
    let cameraPos = camera.getAttribute('position')
    let body = document.querySelector('body')

    function blink() {
        body.style.transition = '0.5s'
        body.style.background = 'black'
        body.style.opacity = 0
    }

    function removeWall() {
        return new Promise((resolve, reject) => {
            blink()

            setTimeout(() => {
                console.log('test')
                wall.parentNode.removeChild(wall)
                body.style.background = 'white'
                body.style.opacity = 1
                resolve()
            }, 1000)
        })
    }

    function rotateCamera(rotation) {
        return new Promise((resolve, reject) => {
            camera.setAttribute(
                'animation',
                `property: rotation; to: 0 ${rotation} 0; dur: 5000; easing: linear; loop: false;`
            )

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

    function chuckyEvent() {
        return new Promise((resolve, reject) => {
            let chuckyContainer = document.getElementById('chucky-container')
            chuckyContainer.setAttribute('visible', 'true')

            document.addEventListener('click', () => {
                setTimeout(() => {
                    resolve()
                }, 5000)
            })
        })
    }

    function ghostEvent() {
        return new Promise((resolve, reject) => {
            let ghostSound = document.getElementById('ghost-sound')
            let ghosts = document.querySelectorAll('.ghostItem')
            document.addEventListener(
                'click',
                () => {
                    ghostSound.play()
                    ghosts.forEach((ghost) => {
                        ghost.setAttribute(
                            'animation',
                            'property: position; to: 0 0 0; dur: 5000; easing: linear; loop: false;'
                        )
                    })
                    setTimeout(() => {
                        resolve()
                    }, 5000)
                },
                { once: true }
            )
        })
    }

    function tpToNextRoom(z) {
        return new Promise((resolve, reject) => {
            document.addEventListener(
                'click',
                () => {
                    blink()
                    setTimeout(() => {
                        body.style.background = 'white'
                        body.style.opacity = 1
                        camera.setAttribute('position', `0 4 ${z}`)
                        resolve()
                    }, 1000)
                },
                { once: true }
            )
        })
    }

    let started = false
    if (started === false) {
        document.addEventListener(
            'click',
            async function () {
                started = true
                moveCamera(-10).then(() => {
                    rotateCamera(360).then(() => {
                        removeWall().then(() => {
                            moveCamera(-42.5).then(() => {
                                tpToNextRoom(-60).then(() => {
                                    moveCamera(-160).then(() => {
                                        chuckyEvent()
                                        blink()
                                    })
                                })
                            })
                        })
                    })
                })
            },
            {
                once: true,
            }
        )
    }
})
