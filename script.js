document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor effect
  const cursor = document.querySelector(".cursor-effect");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Create sparkle effect on mouse move
    createSparkle(e.clientX, e.clientY);
  });

  // Create sparkle elements
  function createSparkle(x, y) {
    const colors = ["#4e54c8", "#8f94fb", "#4776E6", "#8E54E9"];
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    // Remove sparkle after animation completes
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Skip for '#' links

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for navbar height
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click();
        }
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Skills progress animation
  const skillsSection = document.querySelector("#skills");
  const progressBars = document.querySelectorAll(".progress-bar");

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const width = bar.parentElement.parentElement.querySelector(".skill-percentage").textContent;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    });
  }

  // Animate progress bars when skills section is visible
  let skillsSectionAnimated = false;

  window.addEventListener("scroll", () => {
    if (!skillsSectionAnimated && isElementInViewport(skillsSection)) {
      animateProgressBars();
      skillsSectionAnimated = true;
    }
  });

  // Add animations for elements with data-aos attributes
  const animatedElements = document.querySelectorAll("[data-aos]");

  function checkAnimations() {
    animatedElements.forEach((element) => {
      if (isElementInViewport(element) && !element.classList.contains("animated")) {
        const animationType = element.getAttribute("data-aos");
        element.classList.add("animated", animationType);
      }
    });
  }

  window.addEventListener("scroll", checkAnimations);
  window.addEventListener("load", checkAnimations);

  // Typing effect for hero text
  const heroTitle = document.querySelector(".hero-content h1");
  const heroSubtitle = document.querySelector(".hero-content h2");
  const heroText = document.querySelector(".hero-content .lead");

  function typeWriterEffect(element, text, speed = 100, delay = 0) {
    if (!element) return;

    const originalText = text || element.textContent;
    element.textContent = "";

    setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < originalText.length) {
          element.textContent += originalText.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);
  }

  if (heroTitle && heroSubtitle && heroText) {
    typeWriterEffect(heroTitle, null, 50, 500);
    typeWriterEffect(heroSubtitle, null, 50, 1500);
    typeWriterEffect(heroText, null, 30, 2500);
  }

  // 3D tilt effect for project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const rotateY = (mouseX - cardCenterX) / 20;
      const rotateX = (cardCenterY - mouseY) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Apply similar hover effects to other cards
  const allCards = document.querySelectorAll(".skills-card, .achievement-card, .contact-info, .contact-form-container, .hackathon-card, .certification-card");

  allCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 15px 30px rgba(78, 84, 200, 0.15)";
      card.style.borderColor = "rgba(78, 84, 200, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
      card.style.borderColor = "rgba(78, 84, 200, 0.1)";
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      // Simulate API call with timeout
      setTimeout(() => {
        // Success message
        const formElements = contactForm.elements;
        let i; // Declare i here
        for (i = 0; i < formElements.length; i++) {
          if (formElements[i].type !== "submit") {
            formElements[i].value = "";
          }
        }

        submitButton.textContent = "Message Sent!";

        // Reset button after delay
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 3000);
      }, 1500);
    });
  }

  // Floating animation for hero elements
  const floatingShape = document.querySelector(".floating-shape");
  const codeWindow = document.querySelector(".code-window");

  function floatAnimation() {
    if (floatingShape) {
      floatingShape.style.animation = "float 6s ease-in-out infinite";
    }

    if (codeWindow) {
      codeWindow.style.animation = "float 8s ease-in-out infinite 1s";
    }
  }

  floatAnimation();

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
  }

  // Initialize the page with initial animations
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
  });

  // Trigger initial animations after a short delay
  setTimeout(() => {
    checkAnimations();
  }, 300);

  // Toggle Projects View More/Less
  const toggleProjectsBtn = document.getElementById('toggle-projects');
  const extraProjects = document.getElementById('extra-projects');

  if (toggleProjectsBtn && extraProjects) {
    toggleProjectsBtn.addEventListener('click', function() {
      if (extraProjects.classList.contains('d-none')) {
        extraProjects.classList.remove('d-none');
        toggleProjectsBtn.textContent = 'View Less';
      } else {
        extraProjects.classList.add('d-none');
        toggleProjectsBtn.textContent = 'View More';
      }
    });
  }

  // Immersive Photo Viewer
  const aboutImage = document.querySelector('.about-image');
  const immersiveViewer = document.getElementById('immersive-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const viewerClose = document.querySelector('.viewer-close');
  const viewerZoomIn = document.getElementById('viewer-zoom-in');
  const viewerZoomOut = document.getElementById('viewer-zoom-out');
  const viewerRotate = document.getElementById('viewer-rotate');
  const hotspots = document.querySelectorAll('.hotspot');
  const viewerDescriptionText = document.getElementById('viewer-description-text');

  // Open immersive viewer
  if (aboutImage && immersiveViewer) {
    aboutImage.addEventListener('click', () => {
      viewerImage.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grayscale%20Circuit%20Board%20Twitter%20Post%20%284%29-e7H40Nsv07uCJdMf2G7tLJECRJx753.png';
      immersiveViewer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close immersive viewer
  if (viewerClose) {
    viewerClose.addEventListener('click', () => {
      immersiveViewer.classList.remove('active');
      document.body.style.overflow = '';
      resetViewerImage();
    });
  }

  // Close on click outside the content
  if (immersiveViewer) {
    immersiveViewer.addEventListener('click', (e) => {
      if (e.target === immersiveViewer) {
        immersiveViewer.classList.remove('active');
        document.body.style.overflow = '';
        resetViewerImage();
      }
    });
  }

  // Zoom in
  if (viewerZoomIn) {
    viewerZoomIn.addEventListener('click', () => {
      const currentScale = getScale(viewerImage);
      viewerImage.style.transform = `scale(${currentScale + 0.2}) rotate(${getRotation(viewerImage)}deg)`;
    });
  }

  // Zoom out
  if (viewerZoomOut) {
    viewerZoomOut.addEventListener('click', () => {
      const currentScale = getScale(viewerImage);
      if (currentScale > 0.5) {
        viewerImage.style.transform = `scale(${currentScale - 0.2}) rotate(${getRotation(viewerImage)}deg)`;
      }
    });
  }

  // Rotate image
  if (viewerRotate) {
    viewerRotate.addEventListener('click', () => {
      const currentRotation = getRotation(viewerImage);
      const currentScale = getScale(viewerImage);
      viewerImage.style.transform = `scale(${currentScale}) rotate(${currentRotation + 90}deg)`;
    });
  }

  // Reset image transformations
  function resetViewerImage() {
    viewerImage.style.transform = 'scale(1) rotate(0deg)';
  }

  // Get current scale from transform
  function getScale(element) {
    const transform = element.style.transform;
    const match = transform.match(/scale$$([^)]+)$$/);
    return match ? parseFloat(match[1]) : 1;
  }

  // Get current rotation from transform
  function getRotation(element) {
    const transform = element.style.transform;
    const match = transform.match(/rotate$$([^)]+)deg$$/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Hotspot interactions
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      const info = hotspot.getAttribute('data-info');
      viewerDescriptionText.textContent = info;
      
      // Highlight the clicked hotspot
      hotspots.forEach(h => h.classList.remove('active'));
      hotspot.classList.add('active');
    });
  });

  // Drag to move image
  let isDragging = false;
  let startX, startY, initialTranslateX = 0, initialTranslateY = 0;

  if (viewerImage) {
    viewerImage.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      
      // Get current translation if any
      const transform = viewerImage.style.transform;
      const translateMatch = transform.match(/translate$$([^,]+)px,\s*([^)]+)px$$/);
      if (translateMatch) {
        initialTranslateX = parseFloat(translateMatch[1]);
        initialTranslateY = parseFloat(translateMatch[2]);
      } else {
        initialTranslateX = 0;
        initialTranslateY = 0;
      }
      
      viewerImage.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      const currentScale = getScale(viewerImage);
      const currentRotation = getRotation(viewerImage);
      
      viewerImage.style.transform = `translate(${initialTranslateX + dx}px, ${initialTranslateY + dy}px) scale(${currentScale}) rotate(${currentRotation}deg)`;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      viewerImage.style.cursor = 'grab';
    });
  }

  // Hackathon data
  const hackathonData = [
    {
      title: "UST Global D3code Challenge",
      image: "./images/ust.jpeg",
      description: "Participating in the UST D3Code Hackathon was a challenging yet rewarding experience that tested our innovation and technical depth. Our team developed a practical solution addressing real-world needs, showcasing our problem-solving capabilities. Competing among top national finalists, we proudly secured 4th place for our impactful project. The exposure to industry mentors and intense competition enriched our development skills. It was a significant milestone in our journey of building meaningful tech solutions.",
      techStack: ["Flask", "Agents","Python", "OpenCv","TensorFlow","Firebase", "Web3.js", "React"],
      link: "https://track-v-two.vercel.app/"
    },
    {
      title: "Smart India Hackathon",
      image: "./images/sih.jpeg",
      description: "Participated in India's largest hackathon.Participating in the SIH Chennai Final was an incredible experience, where our team worked on a **Mental Health Cognitive Assistant** project. We developed an innovative solution aimed at improving mental well-being through AI-driven support. With guidance from industry mentors, we refined our approach and presented our solution to the judges. Although we didn’t win, the experience provided invaluable insights into problem-solving, teamwork, and real-world impact. It was a great opportunity to showcase our abilities and grow as developers. ",
      techStack: ["HTML", "Javascript", "MySQL", "CSS", "REST API" ,"Firebase" ,"Node.js"],
      link: "https://piyush-joshi1.github.io/COGNO-SOLUTION/"
    },
    
    {
      title: "Purple Jhallosh Hackathon",
      image: "./images/purple jhallosh.jpg",
      description: "Winning the Purple Jhallosh Hackathon was a proud and unforgettable milestone in our journey. Our team was awarded by the Governor of Maharashtra, Ramesh Bais, for creating the Best Mental Health Cognitive Disorder Assistant. The hackathon focused on inclusive innovation, and our project stood out for its societal impact and real-world applicability. Competing among top teams from across India, this win validated our dedication and vision. The experience deepened our commitment to building solutions that truly make a difference.",
      techStack: ["Python", "TensorFlow", "OpenCV", "Flask", "React"],
      link: "https://piyush-joshi1.github.io/COGNO-SOLUTION/"
    },
    {
      title: "Tantra Tech Fest",
      image: "./images/tantra.jpg",
      description: "Participating in Tantra Hackathon was a memorable experience as it was my very first hackathon. Our team built the fastest-loading website, focusing on performance optimization and user efficiency. The energy and learning environment pushed us to explore new ideas and work under real-time pressure. Presenting our project to the panel gave us a huge confidence boost. It laid the foundation for my hackathon journey and ignited my passion for innovation.",
      techStack: ["Botpress", "Bootstrap", "HTML", "CSS", "JS"],
      link: "https://piyush-joshi1.github.io/Probot/"
    },
    {
      title: "Racathon Code Sprint",
      image: "./images/racathon.jpg",
      description: "Winning Racathon was a defining moment for our team, Tech Tribe, as we secured 1st place and a ₹1,00,000 prize. Our project focused on AI-powered healthcare innovation, offering real-time patient monitoring, diagnosis assistance, and mental wellness features. The 24-hour national-level hackathon tested our creativity, endurance, and teamwork. Competing against top talent, our solution was recognized for its practicality and impact. This victory reinforced our belief in building tech for social good.",
      techStack: ["Kafka", "Node.js", "Grafana", "MongoDB", "Express"],
      link: "https://piyush-joshi1.github.io/COGNO-SOLUTION/"
    },
    {
      title: "IIC Innovation Challenge",
      image: "./images/iic.jpeg",
      description: "We secured 4th rank internationally at the prestigious International Innovation Challenge (IIC) hosted by Manipal University Jaipur. Our project focused on predicting green signal time based on real-time traffic flow, aiming to optimize urban mobility. Competing against global teams, our innovation stood out for its scalability and real-world relevance. The event offered valuable exposure to international problem-solving standards. It marked a key milestone in our journey toward building smart city solutions.",
      techStack: ["IoT", "Arduino", "React Native", "Firebase", "Node.js"],
      link: "https://greenspirits.vercel.app/"
    }
  ];

  // Populate hackathon section
  const hackathonRow = document.querySelector('.hackathon-row');
  const hackathonRowExtra = document.querySelector('.hackathon-row-extra');
  const toggleHackathonsBtn = document.getElementById('toggle-hackathons');

  if (hackathonRow && hackathonRowExtra) {
    // Display first 3 hackathons initially
    hackathonData.slice(0, 3).forEach(hackathon => {
      hackathonRow.appendChild(createHackathonCard(hackathon));
    });

    // Add remaining hackathons to the hidden section
    hackathonData.slice(3).forEach(hackathon => {
      hackathonRowExtra.appendChild(createHackathonCard(hackathon));
    });

    // Toggle hackathons visibility
    if (toggleHackathonsBtn) {
      toggleHackathonsBtn.addEventListener('click', function() {
        if (hackathonRowExtra.classList.contains('d-none')) {
          hackathonRowExtra.classList.remove('d-none');
          toggleHackathonsBtn.textContent = 'View Less';
        } else {
          hackathonRowExtra.classList.add('d-none');
          toggleHackathonsBtn.textContent = 'View More';
        }
      });
    }
  }

  // Create hackathon card
  function createHackathonCard(hackathon) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'hackathon-card';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'hackathon-img';
    
    const img = document.createElement('img');
    img.src = hackathon.image;
    img.alt = hackathon.title;
    imgDiv.appendChild(img);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'hackathon-content';

    const title = document.createElement('h3');
    title.textContent = hackathon.title;

    const description = document.createElement('p');
    // Truncate description for card view
    description.textContent = hackathon.description.length > 100 
      ? hackathon.description.substring(0, 100) + '...' 
      : hackathon.description;

    const techDiv = document.createElement('div');
    techDiv.className = 'hackathon-tech';

    // Add up to 3 tech stack items
    hackathon.techStack.slice(0, 3).forEach(tech => {
      const techSpan = document.createElement('span');
      techSpan.textContent = tech;
      techDiv.appendChild(techSpan);
    });

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'hackathon-actions';

    const infoBtn = document.createElement('div');
    infoBtn.className = 'hackathon-info-btn';
    infoBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    infoBtn.addEventListener('click', () => openHackathonModal(hackathon));

    const viewLink = document.createElement('a');
    viewLink.href = hackathon.link;
    viewLink.className = 'btn btn-primary btn-sm';
    viewLink.textContent = 'View Project';
    viewLink.target = '_blank';

    actionsDiv.appendChild(infoBtn);
    actionsDiv.appendChild(viewLink);

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(techDiv);
    contentDiv.appendChild(actionsDiv);

    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(contentDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
  }

  // Hackathon modal functionality
  const modal = document.getElementById('hackathon-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.querySelector('.modal-close');

  function openHackathonModal(hackathon) {
    modalTitle.textContent = hackathon.title;
    modalImage.src = hackathon.image;
    modalImage.alt = hackathon.title;
    modalDescription.textContent = hackathon.description;
    
    // Clear previous tech stack
    modalTechStack.innerHTML = '<h4>Technologies Used:</h4><div class="tech-badges"></div>';
    const techBadges = modalTechStack.querySelector('.tech-badges');
    
    // Add tech stack badges
    hackathon.techStack.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      techBadges.appendChild(badge);
    });
    
    modalLink.href = hackathon.link;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeHackathonModal);
  }

  function closeHackathonModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeHackathonModal();
    }
  });

  // Certifications data
  const certificationsData = [
    {
      title: "Google Digital Marketing",
      issuer: "Google",
      date: "2023",
      description: "Comprehensive certification covering SEO, SEM, social media marketing, and analytics.",
      icon: "fas fa-ad",
      issuerIcon: "fab fa-google",
      link: "https://drive.google.com/file/d/19T8344ievy5WesHTI9xwh0HSVEMzxLvt/view?usp=sharing/preview" // Google Drive preview link
    },
    {
      title: "TCS Communication Skills",
      issuer: "Tata Consultancy Services",
      date: "2023",
      description: "Professional certification in business communication, presentation, and technical writing.",
      icon: "fas fa-comments",
      issuerIcon: "fas fa-building",
      link: "https://drive.google.com/file/d/1-P8OK8aXfkPwKK-KcHdDC3n4yLu0wKL5/view?usp=sharing"
    },
    {
      title: "IBM Cloud Essentials",
      issuer: "IBM",
      date: "2022",
      description: "Cloud computing fundamentals, including deployment models, services, and security.",
      icon: "fas fa-cloud",
      issuerIcon: "fas fa-building",
      link: "https://drive.google.com/file/d/1Q3FhCJC3bJ4ASCGJCHJvPpXgUsW3sMoq/view?usp=sharing"
    },
    {
      title: "Achievement Drive",
      issuer: "Microsoft",
      date: "2022",
      description: "Recognition for exceptional problem-solving skills and project management capabilities.",
      icon: "fas fa-award",
      issuerIcon: "fab fa-microsoft",
      link: "https://drive.google.com/drive/folders/1Aehnr6KUCr_x_WzXqiEKWN9tYpbJeyLd?usp=sharing"
    }
  ];

  // Populate certifications section
  const certificationsContainer = document.querySelector('.certifications-container');
  
  if (certificationsContainer) {
    certificationsData.forEach(cert => {
      const certCard = document.createElement('div');
      certCard.className = 'certification-card';
      
      const certContent = document.createElement('div');
      certContent.className = 'certification-content';
      
      const certIcon = document.createElement('div');
      certIcon.className = 'certification-icon';
      certIcon.innerHTML = `<i class="${cert.icon}"></i>`;
      
      const title = document.createElement('h3');
      title.textContent = cert.title;
      
      const description = document.createElement('p');
      description.textContent = cert.description;
      
      const issuer = document.createElement('div');
      issuer.className = 'certification-issuer';
      
      const issuerIcon = document.createElement('div');
      issuerIcon.className = 'certification-issuer-icon';
      issuerIcon.innerHTML = `<i class="${cert.issuerIcon}"></i>`;
      
      const issuerName = document.createElement('div');
      issuerName.className = 'certification-issuer-name';
      issuerName.textContent = cert.issuer;
      
      issuer.appendChild(issuerIcon);
      issuer.appendChild(issuerName);
      
      const date = document.createElement('div');
      date.className = 'certification-date';
      date.textContent = cert.date;
      
      const link = document.createElement('a');
      link.href = cert.link;
      link.className = 'certification-link';
      link.textContent = 'View Certificate';
      link.target = '_blank';
      
      certContent.appendChild(certIcon);
      certContent.appendChild(title);
      certContent.appendChild(description);
      certContent.appendChild(issuer);
      certContent.appendChild(date);
      certContent.appendChild(link);
      
      certCard.appendChild(certContent);
      certificationsContainer.appendChild(certCard);
    });
  }

  // Add necessary CSS for JavaScript animations
  (function addDynamicStyles() {
    const styleSheet = document.createElement("style");
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
      
      /* Hotspot active state */
      .hotspot.active .hotspot-dot {
          background-color:rgb(83, 253, 120);
          box-shadow: 0 0 0 4px rgba(255, 95, 86, 0.3);
      }
    `;
    document.head.appendChild(styleSheet);
  })();
});
