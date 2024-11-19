import * as THREE from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import anime from 'animejs/lib/anime.es.js'
import { Vector3 } from 'three';


//ADDITIONS DOWN THE LINE
//1 make navigation buttons easier to press because they're fucky when they move
//particles or some sort of background so its better
// ADD CLASS LOAD for specific objects so i can fade them in and out


//THREE

//*********************************** */
//*********************************** */
//*********************************** */


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);


const cssRenderer = new CSS3DRenderer();

cssRenderer.setSize(window.innerWidth,window.innerHeight);
cssRenderer.clear = true;

document.body.appendChild(cssRenderer.domElement);



const backgroundElements = [];

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor();
// document.body.appendChild(renderer.domElement);



function firstDiv(){
    const element = document.querySelector('#my-div');
    const title =   new CSS3DObject(element);
    title.scale.set(.25,.25,.25);
    title.position.set(15,0,-400);
    title.rotation.x = -.2;
    title.rotation.y =.45;
    title.rotation.z = .1;
    
    scene.add(title);
}


function secondDiv(){
    const element = document.querySelector('#about-me-container');
    const title =   new CSS3DObject(element);
    title.scale.set(.30,.30,.30);
    title.position.set(1025,5,-625);
    title.rotation.x = -.2;
    title.rotation.y =.30;
    title.rotation.z = .1;
    
    scene.add(title);
}

function skillsDiv(){
    const element = document.querySelector('#skills-container');
    const title =   new CSS3DObject(element);
    title.scale.set(.30,.30,.30);
    title.position.set(2600,100,-1200);
    title.rotation.x = -.2;
    title.rotation.y =.35;
    title.rotation.z = .1;
    
    scene.add(title);
}



// function background() {
//     var text = ["?", "!", "-", "+", "&&", "="];
//     for (let i = 0; i < 200; i++) {
//         const element = document.createElement("p");
//         element.style.color = "azure";
//         element.style.width = "1rem";
//         element.style.height = "1rem";
//         element.style.fontSize = "2rem";
//         element.style.opacity = ".2"; // Set opacity to semi-transparent
//         element.style.textShadow = "0 0 5px azure, 0 0 5px azure, 0 0 15px azure"; // Add glow effect
//         element.innerHTML = text[getRndInteger(0, 5)];
//         const object = new CSS3DObject(element);
//         object.position.set(getRndInteger(-4000, 4000), getRndInteger(-1500,1500), getRndInteger(-4000, 0));
//         object.rotation.x = getRndInteger(0, 360);
//         object.rotation.y = getRndInteger(0, 360);
//         object.rotation.z = getRndInteger(0, 360);
//         backgroundElements.push(object);
//         scene.add(object);
//     }

//     // Add grain effect
   
// }

// function animateBackgroundElements() {
//     backgroundElements.forEach((object) => {
//         object.position.x += Math.sin(Date.now() * 0.001) * 0.1;
//         object.position.y += Math.cos(Date.now() * 0.001) * 0.1;
//         object.position.z += Math.sin(Date.now() * 0.001) * 0.1;
//         object.rotation.x += 0.001;
//         object.rotation.y += 0.001;
//         object.rotation.z += 0.001;
//     });
// }


firstDiv();
secondDiv();
skillsDiv();
//background();





function animate(){

 
    requestAnimationFrame(animate);
    //animateBackgroundElements();
    //renderer.render(scene,camera);
    cssRenderer.render(scene,camera);

}
animate();
window.onresize = function(e){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();


    cssRenderer.setSize(window.innerWidth,window.innerHeight);
}

let oldx = 0;
let oldy = 0;

window.onmousemove = function(ev){
    if(!isTweeningCamera){
        let changex =ev.x - oldx;
        let changey = ev.y - oldy;
        camera.position.x += changex/100;
        camera.position.y -= changey/100;
        camera.rotation.y -=changey/100000;
        camera.rotation.x +=changex/100000;
        oldx = ev.x;
        oldy = ev.y;
    }
   
}


//Other JS

//************************************************ */
//************************************************ */


//
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
//load function

const onLoadElements = document.querySelectorAll('#my-div > *');
const aboutMeElements = document.querySelectorAll('.transparentAbout');
console.log(aboutMeElements);



function loadFunction(){

    console.log("working");
    anime({
        targets: onLoadElements,
        opacity: 1,
        duration: 2000,
        easing: 'easeOutCirc',
        delay: anime.stagger(600)
    });
}

function loadInAbout(){
    anime({
        targets: aboutMeElements,
        opacity: 1,
        duration: 2000,
        easing: 'linear',
        delay: anime.stagger(100)
    });
}


window.onload = loadFunction();

var isTweeningCamera = false;
const navigationOne = document.querySelector("#navigation");
const learnText = document.querySelector("#learn-text");
const navigationAboutBack = document.querySelector("#navigation-about-back");
const navigationAboutForward = document.querySelector("#navigation-about-forward");

navigationOne.addEventListener('click',moveToTwo);
navigationAboutBack.addEventListener('click',moveBackOne);
navigationAboutForward.addEventListener('click',moveToThree);



//show-skill

//Functions for Other JS


//CAMERA MOVEMENT
const cameraPosition = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  };

  
  let currentAnimation = null;

  function showTextNavigation(opacity, pad, ease, time) {
      if (currentAnimation) {
          currentAnimation.pause(); // Pause the current animation if it exists
      }
  
      currentAnimation = anime({
          targets: learnText,
          opacity: opacity,
          paddingRight: pad,
          duration: time,
          easing: ease,
          complete: function() {
              currentAnimation = null; // Reset the current animation when it completes
          }
      });

  }
  

function moveBackOne(){

    
    anime({
        targets: cameraPosition,
        // Define animation properties
        x: 0, // Example target x position
        y: 0, // Example target y position
        z: 0, // Example target z position
        duration: 2000, // Animation duration in milliseconds
        easing: 'easeInOutQuad', // Animation easing function
        update: () => {
          // Update camera position on each animation frame
          camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        }
      });
      anime({
        targets: aboutMeElements,
        opacity: 0,
        duration: 2000,
        easing: 'linear',
        delay: anime.stagger(100)
    });

}
function moveToTwo(){
    loadInAbout();
   // isTweeningCamera = true;
    anime({
        targets: cameraPosition,
        // Define animation properties
        x: 1000, // Example target x position
        y: 0, // Example target y position
        z: -250, // Example target z position
        duration: 2000, // Animation duration in milliseconds
        easing: 'easeInOutQuad', // Animation easing function
        update: () => {
          // Update camera position on each animation frame
          camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        }
      });
      //isTweeningCamera = false;
}

function moveToThree(){
    loadInAbout();
   // isTweeningCamera = true;
    anime({
        targets: cameraPosition,
        // Define animation properties
        x: 2500, // Example target x position
        y: 20, // Example target y position
        z: -700, // Example target z position
        duration: 2000, // Animation duration in milliseconds
        easing: 'easeInOutQuad', // Animation easing function
        update: () => {
          // Update camera position on each animation frame
          camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        }
      });
}

//TO DO: add javascript on hover for skills for text to pop up.


navigationOne.addEventListener("mouseenter", function() {
   
    showTextNavigation("1", "35rem", "easeOutCirc","2000");
}, false);
navigationOne.addEventListener("mouseleave", function() {
    showTextNavigation("0", "40rem", "easeInCirc","1000");
}, false);

//work page

const projectPicture = document.querySelector("#project-image");
const projectLeft = document.querySelector("#project-left");
const projectRight = document.querySelector("#project-right");
const projectTitle = document.querySelector("#project-title");
const projectYear = document.querySelector("#year-project");
const projectTechText = document.querySelector("#project-tech-text");

const jobPicture = ["./images/driftcentral.png", "./images/niwagarden.png", "./images/driftcentral.png"];
const jobTexts = ["Job 1", "Job 2", "Job 3"];
const descTexts = ["Description 1", "Description 2", "Description 3"];
const achTexts = ["Achievement 1", "Achievement 2", "Achievement 3"];
const techTexts = ["Tech 1", "Tech 2", "Tech 3"];
const projectTitleTexts = ["//drift central", "//niwagarden", "//personal website"];

let currentIndex = 0;
function animateButton(button){
    if(button == projectLeft){
        anime({
            targets: button,
            translateX: -200, // Move button to the left
            opacity: 0, // Fade out
            duration: 500,
            easing: 'easeOutQuad',
            complete: function() {
                setTimeout(() => {
                    button.style.transform = 'translateX(0)';
                    anime({
                        targets: button,
                        opacity: 1, // Fade back in
                        duration: 1000,
                        easing: 'easeInQuad'
                    });
                }, 500);
            // Reset position
            
           
            }
        });
    }else{
        anime({
            targets: button,
            translateX: 200, // Move button to the right
            opacity: 0, // Fade out
            duration: 500,
            easing: 'easeOutQuad',
            complete: function() {
                setTimeout(() => {
                    button.style.transform = 'translateX(0)';
                    anime({
                        targets: button,
                        opacity: 1, // Fade back in
                        duration: 1000,
                        easing: 'easeInQuad'
                    });
                }, 500);
            // Reset position
            
           
            }
        });
        
    }
}
function updateProjectTexts(index, button) {
    animateButton(button);
    // anime({
    //     targets: [projectJobText, projectDescText, projectAchText, projectTechText, projectTitle, projectPicture],
    //     opacity: 0,
    //     duration: 500,
    //     easing: 'easeOutQuad',
    //     delay: anime.stagger(100), // Add stagger delay for fade out
    //     complete: function() {
    //         projectJobText.innerText = jobTexts[index];
    //         projectDescText.innerText = descTexts[index];
    //         projectAchText.innerText = achTexts[index];
    //         projectTechText.innerText = techTexts[index];
    //         projectTitle.innerText = projectTitleTexts[index];
    //         projectPicture.style.backgroundImage = `url(${jobPicture[index]})`;  // Update the image source
    //         anime({
    //             targets: [projectJobText, projectDescText, projectAchText, projectTechText, projectTitle, projectPicture],
    //             opacity: 1,
    //             duration: 500,
    //             easing: 'easeInQuad',
    //             delay: anime.stagger(100) // Add stagger delay for fade in
    //         });
    //     }
    // });
}

projectLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + jobTexts.length) % jobTexts.length;
    updateProjectTexts(currentIndex, projectLeft);
});

projectRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % jobTexts.length;
    updateProjectTexts(currentIndex, projectRight);
});
//POP UP SHIT
// function showSkills(info){
//     skillShow.style.width = 0;
//     skillShow.style.opacity = 0;
//     skillShow.innerHTML = info;
//     anime({
//         targets: skillShow,
//         width: "70%",
//         opacity: 1,
//         duration: 1500,
//         easing: 'easeOutQuart',
//         complete: function() {
//             // Set final styles after the animation completes
//             skillShow.style.width = '70%';
//             skillShow.style.opacity = 1;
//         }
//     });
// }
// function hideSkills(){
   
//     console.log(skillShow.style.width + "RRRR");  
//     anime({
//       targets: skillShow,
//       width: "0%",
//       opacity: 0,
//       duration: 2000,
//       easing: 'easeOutQuart'
//      });
     
//   }

