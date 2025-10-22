document.addEventListener("DOMContentLoaded", () => {

  // 🎵 SPOTIFY INTERAKTION ------------------------
  const spotifyIcon = document.getElementById("spotifyIcon");
  const spotifyFrame = document.getElementById("spotifyFrame");

  if (spotifyIcon && spotifyFrame) {
    let isPlaying = false;

    spotifyIcon.addEventListener("click", () => {
      spotifyIcon.classList.add("spin-once");
      spotifyFrame.classList.toggle("visible");
      setTimeout(() => spotifyIcon.classList.remove("spin-once"), 700);

      if (spotifyFrame.classList.contains("visible")) {
        spotifyIcon.classList.add("spin-slow");
        isPlaying = true;
      } else {
        spotifyIcon.classList.remove("spin-slow");
        isPlaying = false;
      }
    });

    window.addEventListener("message", (event) => {
      if (event.origin.includes("spotify.com") && spotifyFrame.classList.contains("visible")) {
        if (!isPlaying) {
          spotifyIcon.classList.add("spin-slow");
          isPlaying = true;
        }
      }
    });
  }

  // 🎬 YOUTUBE ICON / FRAME ------------------------
  const ytIcon = document.getElementById("youtubeIcon");
  const ytFrame = document.getElementById("youtubeFrame");
  const ytTriangle = ytIcon ? ytIcon.querySelector(".yt-triangle") : null;

  if (ytIcon && ytFrame && ytTriangle) {
    ytIcon.addEventListener("click", () => {
      ytTriangle.classList.add("spinYT");
      ytFrame.classList.toggle("visible");
      setTimeout(() => ytTriangle.classList.remove("spinYT"), 700);
    });
  }

  // 🎥 POPUP VIDEOS ------------------------
  const videos = document.querySelectorAll(".yt-video");
  const popup = document.getElementById("videoPopup");
  const popupFrame = document.getElementById("popupFrame");
  const closeBtn = document.getElementById("closePopup");

  if (videos.length && popup && popupFrame && closeBtn) {
    videos.forEach(video => {
      video.addEventListener("click", async () => {
        const link = video.getAttribute("data-video");
        if (!link) return;

        try {
          const res = await fetch(link);
          if (res.ok) {
            popupFrame.src = link + "?autoplay=1";
            popup.style.display = "flex";
          } else {
            window.open(link.replace("embed/", "watch?v="), "_blank");
          }
        } catch {
          window.open(link.replace("embed/", "watch?v="), "_blank");
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
      popupFrame.src = "";
    });

    popup.addEventListener("click", e => {
      if (e.target === popup) {
        popup.style.display = "none";
        popupFrame.src = "";
      }
    });
  }
});

// Active navigation state management
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

// Function to update active nav link
function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navLinksContainer.classList.remove('active');
    }
});