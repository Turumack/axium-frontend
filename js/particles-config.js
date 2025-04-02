particlesJS("particles-js", {
  particles: {
    number: {
      value: 50,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#bb86fc" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" }
    },
    opacity: {
      value: 0.4,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#bb86fc",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.6,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false }
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.5 } }
    }
  },
  retina_detect: true
});
