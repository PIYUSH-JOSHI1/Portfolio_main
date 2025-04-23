document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor effect
    const cursor = document.querySelector(".cursor-effect")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      // Create sparkle effect on mouse move
      createSparkle(e.clientX, e.clientY)
    })
  
    // Create sparkle elements
    function createSparkle(x, y) {
      const colors = ["#4e54c8", "#8f94fb", "#4776E6", "#8E54E9"]
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      sparkle.style.left = x + "px"
      sparkle.style.top = y + "px"
      sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  
      document.body.appendChild(sparkle)
  
      // Remove sparkle after animation completes
      setTimeout(() => {
        sparkle.remove()
      }, 1000)
    }
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled")
      } else {
        navbar.classList.remove("navbar-scrolled")
      }
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return // Skip for '#' links
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for navbar height
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse.classList.contains("show")) {
            document.querySelector(".navbar-toggler").click()
          }
        }
      })
    })
  
    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })
  
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Skills progress animation
    const skillsSection = document.querySelector("#skills")
    const progressBars = document.querySelectorAll(".progress-bar")
  
    function animateProgressBars() {
      progressBars.forEach((bar) => {
        const width = bar.parentElement.parentElement.querySelector(".skill-percentage").textContent
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 200)
      })
    }
  
    // Animate progress bars when skills section is visible
    let skillsSectionAnimated = false
  
    window.addEventListener("scroll", () => {
      if (!skillsSectionAnimated && isElementInViewport(skillsSection)) {
        animateProgressBars()
        skillsSectionAnimated = true
      }
    })
  
    // Add animations for elements with data-aos attributes
    const animatedElements = document.querySelectorAll("[data-aos]")
  
    function checkAnimations() {
      animatedElements.forEach((element) => {
        if (isElementInViewport(element) && !element.classList.contains("animated")) {
          const animationType = element.getAttribute("data-aos")
          element.classList.add("animated", animationType)
        }
      })
    }
  
    window.addEventListener("scroll", checkAnimations)
    window.addEventListener("load", checkAnimations)
  
    // Typing effect for hero text
    const heroTitle = document.querySelector(".hero-content h1")
    const heroSubtitle = document.querySelector(".hero-content h2")
    const heroText = document.querySelector(".hero-content .lead")
  
    function typeWriterEffect(element, text, speed = 100, delay = 0) {
      if (!element) return
  
      const originalText = text || element.textContent
      element.textContent = ""
  
      setTimeout(() => {
        let i = 0
        const timer = setInterval(() => {
          if (i < originalText.length) {
            element.textContent += originalText.charAt(i)
            i++
          } else {
            clearInterval(timer)
          }
        }, speed)
      }, delay)
    }
  
    if (heroTitle && heroSubtitle && heroText) {
      typeWriterEffect(heroTitle, null, 50, 500)
      typeWriterEffect(heroSubtitle, null, 50, 1500)
      typeWriterEffect(heroText, null, 30, 2500)
    }
  
    // 3D tilt effect for project cards
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
  
        const mouseX = e.clientX
        const mouseY = e.clientY
  
        const rotateY = (mouseX - cardCenterX) / 20
        const rotateX = (cardCenterY - mouseY) / 20
  
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      })
    })
  
    // Apply similar hover effects to other cards
    const allCards = document.querySelectorAll(".skills-card, .achievement-card, .contact-info, .contact-form-container")
  
    allCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)"
        card.style.boxShadow = "0 15px 30px rgba(78, 84, 200, 0.15)"
        card.style.borderColor = "rgba(78, 84, 200, 0.3)"
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)"
        card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)"
        card.style.borderColor = "rgba(78, 84, 200, 0.1)"
      })
    })
  
    // Form submission handling
    const contactForm = document.querySelector(".contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent
  
        submitButton.disabled = true
        submitButton.textContent = "Sending..."
  
        // Simulate API call with timeout
        setTimeout(() => {
          // Success message
          const formElements = contactForm.elements
          for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== "submit") {
              formElements[i].value = ""
            }
          }
  
          submitButton.textContent = "Message Sent!"
  
          // Reset button after delay
          setTimeout(() => {
            submitButton.disabled = false
            submitButton.textContent = originalText
          }, 3000)
        }, 1500)
      })
    }
  
    // Floating animation for hero elements
    const floatingShape = document.querySelector(".floating-shape")
    const codeWindow = document.querySelector(".code-window")
  
    function floatAnimation() {
      if (floatingShape) {
        floatingShape.style.animation = "float 6s ease-in-out infinite"
      }
  
      if (codeWindow) {
        codeWindow.style.animation = "float 8s ease-in-out infinite 1s"
      }
    }
  
    floatAnimation()
  
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    }
  
    // Initialize the page with initial animations
    animatedElements.forEach((element) => {
      element.style.opacity = "0"
    })
  
    // Trigger initial animations after a short delay
    setTimeout(() => {
      checkAnimations()
    }, 300)
  })
  
  // Add necessary CSS for JavaScript animations
  ;(function addDynamicStyles() {
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
          .sparkle {
              position: fixed;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              pointer-events: none;
              z-index: 9999;
              animation: sparkleAnimation 1s forwards;
          }
          
          @keyframes sparkleAnimation {
              0% {
                  transform: scale(0);
                  opacity: 1;
              }
              100% {
                  transform: scale(20);
                  opacity: 0;
              }
          }
          
          .cursor-effect {
              position: fixed;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: rgba(78, 84, 200, 0.3);
              transform: translate(-50%, -50%);
              pointer-events: none;
              z-index: 9999;
              transition: width 0.3s, height 0.3s;
          }
          
          .navbar-scrolled {
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
          
          .back-to-top {
              position: fixed;
              right: 15px;
              bottom: 15px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              visibility: hidden;
              transition: 0.3s;
              z-index: 999;
          }
          
          .back-to-top.show {
              opacity: 1;
              visibility: visible;
          }
          
          @keyframes float {
              0% {
                  transform: translateY(0px);
              }
              50% {
                  transform: translateY(-20px);
              }
              100% {
                  transform: translateY(0px);
              }
          }
          
          /* Animation classes */
          [data-aos] {
              transition: opacity 0.8s, transform 0.8s;
          }
          
          .animated {
              opacity: 1 !important;
          }
          
          .fade-left.animated {
              transform: translateX(0);
          }
          
          .fade-right.animated {
              transform: translateX(0);
          }
          
          .fade-up.animated {
              transform: translateY(0);
          }
          
          .fade-left {
              transform: translateX(-50px);
          }
          
          .fade-right {
              transform: translateX(50px);
          }
          
          .fade-up {
              transform: translateY(50px);
          }
      `
    document.head.appendChild(styleSheet)
  })()
  
