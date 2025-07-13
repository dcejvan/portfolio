import * as THREE from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import anime from 'animejs/lib/anime.es.js'
import driftCentralImg from './images/driftcentral.png';
import niwaGardenImg from './images/niwagarden.png';
import treasureRushImg from './images/treasurerush.png';
import resume from './Dennis_Portfolio_Resume.pdf?url'; // Add this line


//ADDITIONS DOWN THE LINE
//1 make navigation buttons easier to press because they're fucky when they move
//particles or some sort of background so its better
// ADD CLASS LOAD for specific objects so i can fade them in and out

function createOrientationMessage() {
    const orientationDiv = document.createElement('div');
    orientationDiv.id = 'orientation-message';
    orientationDiv.innerHTML = `
        <div style="
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins&family=Source+Code+Pro:wght@500&display=swap')
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: black;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: Source Code Pro, sans-serif;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        ">
            <h2>please rotate your device</h2>
            <p>turn your device horizontally for the best experience :)</p>
        </div>
    `;
    document.body.appendChild(orientationDiv);
    return orientationDiv;
}

function checkOrientation() {
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    
    if (isMobile && isPortrait) {
        let orientationMessage = document.getElementById('orientation-message');
        if (!orientationMessage) {
            orientationMessage = createOrientationMessage();
        }
        orientationMessage.style.display = 'block';
        

        document.body.style.overflow = 'hidden';
        if (renderer && renderer.domElement) {
            renderer.domElement.style.display = 'none';
        }
        if (cssRenderer && cssRenderer.domElement) {
            cssRenderer.domElement.style.display = 'none';
        }
    } else {
        const orientationMessage = document.getElementById('orientation-message');
        if (orientationMessage) {
            orientationMessage.style.display = 'none';
        }
        
        document.body.style.overflow = 'visible';
        if (renderer && renderer.domElement) {
            renderer.domElement.style.display = 'block';
        }
        if (cssRenderer && cssRenderer.domElement) {
            cssRenderer.domElement.style.display = 'block';
        }
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', () => {
    setTimeout(checkOrientation, 100); 
});
//THREE

//*********************************** */
//*********************************** */
//*********************************** */


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 10000);
// Add fog to the scene
scene.fog = new THREE.FogExp2(0x000000, 0.00015); // Black fog with density 0.001





const backgroundElements = [];

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 0.7); // Reduce pixel ratio for better performance
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor();
document.body.appendChild(renderer.domElement);

const cssRenderer = new CSS3DRenderer();

cssRenderer.setSize(window.innerWidth,window.innerHeight);

cssRenderer.clear = true;
cssRenderer.domElement.classList.add('css3d-renderer');

document.body.appendChild(cssRenderer.domElement);



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
    title.position.set(1075,5,-650);
    title.rotation.x = -.2;
    title.rotation.y =.45;
    title.rotation.z = .1;
    
    scene.add(title);
}

function skillsDiv(){
    const element = document.querySelector('#skills-total-container');
    const title =   new CSS3DObject(element);
    title.scale.set(.30,.30,.30);
    title.position.set(2550,100,-1200);
    title.rotation.x = -.2;
    title.rotation.y =.45;
    title.rotation.z = .1;
    
    scene.add(title);
}
function contactDiv(){ 
    const element = document.querySelector('#contact-container');
    const title =   new CSS3DObject(element);
    title.scale.set(.30,.30,.30);
    title.position.set(4500,100,-1750);
    title.rotation.x = -.2;
    title.rotation.y =.45;
    title.rotation.z = .1;
    scene.add(title);

}




function background() {
    const gridHelper = new THREE.GridHelper(1000, 20, 0xffffff, 0xffffff);
    
    gridHelper.scale.set(25,25,25);
    gridHelper.position.set(15,-700,-1000);
    gridHelper.rotation.x = -.2;
    gridHelper.rotation.y =.45;
    gridHelper.rotation.z = .1;
    gridHelper.material.opacity = 0.08;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
}

function animateBackgroundElements() {
    backgroundElements.forEach((object) => {
        object.position.x += Math.sin(Date.now() * 0.001) * 0.1;
        object.position.y += Math.cos(Date.now() * 0.001) * 0.1;
        object.position.z += Math.sin(Date.now() * 0.001) * 0.1;
        object.rotation.x += 0.001;
        object.rotation.y += 0.001;
        object.rotation.z += 0.001;
    });
}



// Add the gradient background



firstDiv();
secondDiv();
skillsDiv();
contactDiv();
background();
const backgroundAnimation = background();







function animate(){

 
    requestAnimationFrame(animate);
   
   // animateBackgroundElements();
    renderer.render(scene,camera);
    cssRenderer.render(scene,camera);

}
animate();
window.onresize = function(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight); // Update the WebGL renderer size
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
const skillsElements = document.querySelectorAll('.transparentSkills');
const contactElements = document.querySelectorAll('.transparentContact');
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
function loadInSkills(){
    anime({
        targets: skillsElements,
        opacity: 1,
        duration: 2000,
        easing: 'linear',
        delay: anime.stagger(100)
    });
}
function loadInContact(){
    anime({
        targets: contactElements,
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
const navigationSkillBack = document.querySelector("#navigation-skill-back");
const navigationSkillForward = document.querySelector("#navigation-skill-forward");
const navigationContactBack = document.querySelector("#navigation-contact-back");
navigationOne.addEventListener('click',moveToTwo);
navigationAboutBack.addEventListener('click',moveBackOne);
navigationAboutForward.addEventListener('click',moveToThree);
navigationSkillBack.addEventListener('click',moveToTwo);
navigationSkillForward.addEventListener('click',moveToFour);
navigationContactBack.addEventListener('click',moveToThree);

const navButtons = document.querySelectorAll('#nav-start, #nav-about, #nav-skills, #nav-contact'); // Explicitly select all navigation buttons

function resetNavButtonColors() {
    navButtons.forEach(button => {
        button.style.color = ''; // Reset to original text color
    });
}

document.getElementById('nav-start').addEventListener('click', () => {
    resetNavButtonColors();
    // Set text color to semi-transparent green
    moveBackOne(); // Move camera to START section
});

document.getElementById('nav-about').addEventListener('click', () => {
    resetNavButtonColors();
    // Set text color to green
    moveToTwo(); // Move camera to ABOUT section
});

document.getElementById('nav-skills').addEventListener('click', () => {
    resetNavButtonColors();
    // Set text color to green
    moveToThree(); // Move camera to SKILLS section
});

document.getElementById('nav-contact').addEventListener('click', () => {
    resetNavButtonColors();
     // Set text color to green
    moveToFour(); // Move camera to CONTACT section
});

//resume
document.addEventListener('DOMContentLoaded', () => {
    const resumeLink = document.querySelector('a[href="./Dennis_Portfolio_Resume.pdf"]');
    if (resumeLink) {
        resumeLink.href = resume; // Update the href to use the imported resume
        console.log("Resume link updated successfully.");
    }
});

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
    resetNavButtonColors();
    document.getElementById('nav-start').style.color = 'rgba(98, 160, 146, 0.6)';
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
    resetNavButtonColors();
    document.getElementById('nav-about').style.color = 'rgba(98, 160, 146, 0.6)'; 
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
    resetNavButtonColors();
    document.getElementById('nav-skills').style.color = 'rgba(98, 160, 146, 0.6)';
    loadInSkills();
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
function moveToFour(){
    resetNavButtonColors();
    document.getElementById('nav-contact').style.color = 'rgba(98, 160, 146, 0.6)';
    loadInContact();
   // isTweeningCamera = true;
    anime({
        targets: cameraPosition,
        // Define animation properties
        x: 4400, // Example target x position
        y: 100, // Example target y position
        z: -1200, // Example target z position
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

//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\
//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\
//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\//WORK PAGE\\

const projectPicture = document.querySelector("#project-image-container");
const projectLeft = document.querySelector("#project-left");
const projectRight = document.querySelector("#project-right");
const projectTitle = document.querySelector("#project-title");
const projectYear = document.querySelector("#year-project");
const projectTechText = document.querySelector("#project-tech-text");
const projectAchText = document.querySelector("#project-ach-text");
const projectDescText = document.querySelector("#project-description-text");

const jobPicture = [driftCentralImg, niwaGardenImg, treasureRushImg];
const jobTexts = ["drift central", "niwagarden", "treasure rush"];
const descTexts = ["Developed and directed a car drifting video game on the platform Roblox with an advanced chassis system that supported 10+ customizable features and 15+ usable vehicles.", 
    "developed a 3D study technique web game in 36 hours for HackIllinois, featuring 5+ user-retention focused tools and a customizable virtual workspace for users to create their own study environment.", 
    "designed, developed, and directed a progression-based Roblobx game with scalable digging mechanics, currency systems, gameplay loops, and data persistence."];
const achTexts = ["80,000 plays • 1,000 likes", "Completed and designed full product in 36 hours", "500,000 plays • 1,000 likes • 6,000 favorites"];
const techTexts = ["Roblox Studio • Lua • Blender", "JavaScript • Three.js • anime.js • Github", "Roblox Studio • Lua • Blender"];
const yearTexts = ["(2023-2024)", "(2024)", "(2023)"];
const projectTitleTexts = ["//drift central", "//niwagarden", "//treasure rush"];

let currentIndex = 0;
function handleText(index) {
    setTimeout(() => {
        projectDescText.innerText = descTexts[index];
        projectAchText.innerText = achTexts[index];
        projectYear.innerText = yearTexts[index];
        projectTechText.innerText = techTexts[index];
        projectTitle.innerText = projectTitleTexts[index];
        projectPicture.style.backgroundImage = `url(${jobPicture[index]})`;  // Update the image source 
        // Wait for 1 second before continuing
    }, 300);
    
}
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
    anime({
        targets: [projectTechText, projectTitle, projectPicture, projectAchText, projectDescText, projectYear],
        opacity: 0,
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(50), // Add stagger delay for fade out
        complete: function() {
            if(button == projectLeft){
                console.log("left button");
                if(currentIndex == 0){
                    currentIndex = jobTexts.length - 1;
                    handleText(currentIndex);
                }else{
                    console.log("currentIndex called: " + currentIndex);
                    currentIndex--;
                    handleText(currentIndex);
                }
            }else{ //right button
                if(currentIndex == jobTexts.length - 1){
                    currentIndex = 0;
                    handleText(currentIndex);
                }else{
                    currentIndex++;
                    handleText(currentIndex);
                }
            }
            
            
            setTimeout(() => {
                anime({
                    targets: [projectTechText, projectTitle, projectPicture, projectAchText, projectDescText, projectYear],
                    opacity: 1,
                    duration: 500,
                    easing: 'easeInQuad',
                    delay: anime.stagger(50) // Add stagger delay for fade in
                });
            }, 250);
          
        }
    });
}

projectLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + jobTexts.length) % jobTexts.length;
    updateProjectTexts(currentIndex, projectLeft);
});

projectRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % jobTexts.length;
    updateProjectTexts(currentIndex, projectRight);
});


//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\
//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\//CONTACT PAGE\\

