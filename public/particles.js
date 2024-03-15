// By wrapping the entire code inside an IIFE, we create a separate scope for the variables and functions defined within it. This prevents them from polluting the global scope and avoids naming conflicts with other scripts or variables.
// The IIFE also ensures that the code is executed only once, even if the script is loaded multiple times.

(function () {
  // IIFE Immediately Invoked Function Expression
  console.log("Particle JS running!");
  // Before executing the rest of the code, we check if the canvas element exists in the DOM using ===>
  let canvas = document.getElementById("canvas");
  if (!canvas) {
    console.log("Canvas not found");
    return;
  }

  let ctx = canvas.getContext("2d");
  let particles = [];
  let randoSpeed = 2;

  class Particle {
    constructor() {
      this.coordinates = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      };
      this.speedY =
      Math.random() > 0.5
        ? (Math.random() * randoSpeed) / 4 * -1
        : (Math.random() * randoSpeed) / 4;
    this.speedX =
      Math.random() > 0.5
        ? (Math.random() * randoSpeed) / 4 * -1
        : (Math.random() * randoSpeed) / 4;
    }

    reset() {
      this.coordinates = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      };
    }

    move() {
      if (this.coordinates.x >= canvas.width) {
        this.speedX = this.speedX * -1;
      }
      if (this.coordinates.y >= canvas.height) {
        this.speedY = this.speedY * -1;
      }

      if (this.coordinates.y <= 0) {
        this.speedY = this.speedY * -1;
      }
      if (this.coordinates.x <= 0) {
        this.speedX = this.speedX * -1;
      }
      for (let i = 0; i < particles.length; i++) {
        let { x, y } = this.coordinates;
        if (
          Math.abs(x - particles[i].coordinates.x) <= 200 &&
          Math.abs(y - particles[i].coordinates.y) <= 150
        ) {
          // Generate a random color
          let r = Math.floor(Math.random() * 256);
          let g = Math.floor(Math.random() * 256);
          let b = Math.floor(Math.random() * 256);
          let color = `rgb(${r}, ${g}, ${b})`;

          ctx.strokeStyle = color;
          ctx.lineWidth = 2

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(particles[i].coordinates.x, particles[i].coordinates.y);
          ctx.stroke();
        }
      }

      this.coordinates.x += this.speedX;
      this.coordinates.y += this.speedY;
    }
  }

  function setDimensions() {
    particles = [];

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `100%`;
    canvas.style.height = `100dvh`;
    particles.forEach((particle) => {
      particle.reset();
    });
    let w = window.innerWidth;
    let particleTotal = w > 1000 ? 75 : 50;

    for (let i = 0; i < particleTotal; i++) {
      let particle = new Particle();
      particles.push(particle);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      let { x, y } = particles[i].coordinates;
      particles[i].move();
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
    requestAnimationFrame(animate);
  }

  setDimensions();
  animate();
})();
