// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}










  class ReactionTimeGame {
    constructor(boxId, resultId, sleepInputId) {
      this.box = document.getElementById(boxId);
      this.result = document.getElementById(resultId);
      this.sleepInput = document.getElementById(sleepInputId);
      this.startTime = null;
      this.timeout = null;
      this.hasStarted = false;

      this.box.addEventListener("click", () => this.handleClick());
    }

    start() {
      const sleep = parseFloat(this.sleepInput.value);
      if (isNaN(sleep)) {
        this.result.innerHTML = "⚠️ Please enter your sleep hours.";
        return;
      }

      this.box.textContent = "Wait for green...";
      this.box.style.backgroundColor = "#d9534f"; // red
      this.result.innerHTML = "";
      this.hasStarted = true;

      this.timeout = setTimeout(() => {
        this.box.style.backgroundColor = "#5cb85c"; // green
        this.box.textContent = "CLICK NOW!";
        this.startTime = new Date().getTime();
      }, Math.random() * 3000 + 2000); // delay between 2–5 sec
    }

    handleClick() {
      const currentColor = window.getComputedStyle(this.box).backgroundColor;
      const sleep = parseFloat(this.sleepInput.value);

      if (!this.hasStarted) {
        this.start();
      } else if (currentColor === "rgb(92, 184, 92)") {
        const reaction = ((Date.now() - this.startTime) / 1000).toFixed(3);
        this.showResult(reaction, sleep);
        this.reset();
      } else {
        clearTimeout(this.timeout);
        this.box.textContent = "Too soon!";
        this.box.style.backgroundColor = "#555";
        this.result.innerHTML = "";
        this.hasStarted = false;
      }
    }

    showResult(reactionTime, sleepHours) {
      let feedback = `⏱️ Reaction time: ${reactionTime} seconds.<br>`;

      if (sleepHours < 6 && reactionTime > 0.4) {
        feedback += "⚠️ Possible impact from sleep deprivation.";
      } else if (sleepHours >= 6 && sleepHours <= 9 && reactionTime <= 0.4) {
        feedback += " 🛌 Great! You’re alert and well-rested.";
      } else {
        feedback += "💤 Try to get 7–9 hours for better performance.";
      }

      this.result.innerHTML = feedback;
    }

    reset() {
      this.box.textContent = "Click to Start Again";
      this.box.style.backgroundColor = "#555";
      this.hasStarted = false;
    }
  }

  // Run safely when page is ready
  window.addEventListener("DOMContentLoaded", () => {
    new ReactionTimeGame("reactionGameBox", "reactionResult", "sleepHoursInput");
  });

