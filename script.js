// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the 3D cursor effect
    initCursorEffect()
  
    // Initialize the typewriter effect
    initTypewriter()
  
    // Initialize the navbar scroll effect
    initNavbarScroll()
  
    // Initialize the back to top button
    initBackToTop()
  
    // Initialize the contact form
    initContactForm()
  
    // Initialize smooth scrolling for anchor links
    initSmoothScroll()
  })
  
  // 3D Cursor Effect with color sprinkling
  function initCursorEffect() {
    const canvas = document.getElementById("cursor-canvas")
    const ctx = canvas.getContext("2d")
  
    // Set canvas size to window size
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
  
    // Particle class for the cursor effect
    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.size = Math.random() * 5 + 2
        this.color = color || getRandomColor()
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.opacity = 1
        this.fadeSpeed = 0.02
      }
  
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity -= this.fadeSpeed
        this.size -= 0.05
      }
  
      draw() {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
  
    // Array to store particles
    const particles = []
  
    // Mouse position
    let mouseX = 0
    let mouseY = 0
  
    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
  
      // Create particles on mouse move
      createParticles(mouseX, mouseY, 2)
    })
  
    // Create particles
    function createParticles(x, y, count) {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y))
      }
    }
  
    // Get random color
    function getRandomColor() {
      const colors = [
        "#4361ee", // primary
        "#3a0ca3", // secondary
        "#4cc9f0", // accent
        "#f72585", // pink
        "#7209b7", // purple
        "#480ca8", // deep purple
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
  
        // Remove particles that are too small or transparent
        if (particles[i].size <= 0.5 || particles[i].opacity <= 0) {
          particles.splice(i, 1)
          i--
        }
      }
  
      requestAnimationFrame(animate)
    }
  
    animate()
  }
  
  // Typewriter effect
  function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter-text")
    const phrases = [
      "Full-Stack Developer",
      "Java Developer",
      "Machine Learning Enthusiast",
      "Hackathon Winner",
      "Problem Solver",
    ]
  
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
  
    function type() {
      const currentPhrase = phrases[phraseIndex]
  
      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        // Typing text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }
  
      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end
        isDeleting = true
        typingSpeed = 1000
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500
      }
  
      setTimeout(type, typingSpeed)
    }
  
    // Start the typewriter effect
    setTimeout(type, 1000)
  }
  
  // Navbar scroll effect
  function initNavbarScroll() {
    const navbar = document.getElementById("mainNav")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-shrink")
      } else {
        navbar.classList.remove("navbar-shrink")
      }
    })
  }
  
  // Back to top button
  function initBackToTop() {
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  }
  
  // Contact form
  function initContactForm() {
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log("Form submitted:", { name, email, subject, message })
  
        // Show success message (in a real app, you'd do this after successful submission)
        alert("Thank you for your message! I will get back to you soon.")
  
        // Reset the form
        contactForm.reset()
      })
    }
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
  
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          // Close mobile menu if open
          const navbarToggler = document.querySelector(".navbar-toggler")
          const navbarCollapse = document.querySelector(".navbar-collapse")
  
          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click()
          }
  
          // Scroll to the target element
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for navbar height
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Add animation to elements when they come into view
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll) functionality manually
    const sections = document.querySelectorAll("section")
  
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          // Stop observing after animation is triggered
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    sections.forEach((section) => {
      observer.observe(section)
    })
  })
  
  // Skills animation
  document.addEventListener("DOMContentLoaded", () => {
    const skillBars = document.querySelectorAll(".skill-progress .progress-bar")
  
    // Initially set width to 0
    skillBars.forEach((bar) => {
      bar.style.width = "0"
    })
  
    // Animate when skills section comes into view
    const skillsSection = document.getElementById("skills")
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate skill bars
          skillBars.forEach((bar) => {
            const targetWidth = bar.getAttribute("style").split("width:")[1].trim()
            bar.style.width = "0"
            setTimeout(() => {
              bar.style.transition = "width 1s ease-in-out"
              bar.style.width = targetWidth
            }, 200)
          })
  
          // Stop observing
          observer.unobserve(skillsSection)
        }
      },
      { threshold: 0.5 },
    )
  
    observer.observe(skillsSection)
  })
  
  