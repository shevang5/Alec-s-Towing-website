document.addEventListener("DOMContentLoaded", () => {
  // Navigation menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-menu a")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-testimonial")
  const nextBtn = document.querySelector(".next-testimonial")
  let currentSlide = 0

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the current slide and activate the corresponding dot
    testimonialSlides[index].classList.add("active")
    dots[index].classList.add("active")
  }

  // Initialize dots click event
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  }

  // Initialize prev/next buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide--
      if (currentSlide < 0) {
        currentSlide = testimonialSlides.length - 1
      }
      showSlide(currentSlide)
    })

    nextBtn.addEventListener("click", () => {
      currentSlide++
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0
      }
      showSlide(currentSlide)
    })
  }

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    currentSlide++
    if (currentSlide >= testimonialSlides.length) {
      currentSlide = 0
    }
    showSlide(currentSlide)
  }, 5000)

  // Pause auto slide on hover
  const testimonialSlider = document.querySelector(".testimonial-slider")

  if (testimonialSlider) {
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval)
    })

    testimonialSlider.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(() => {
        currentSlide++
        if (currentSlide >= testimonialSlides.length) {
          currentSlide = 0
        }
        showSlide(currentSlide)
      }, 5000)
    })
  }

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("active")
    } else {
      scrollToTopBtn.classList.remove("active")
    }
  })

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const message = document.getElementById("message").value

      if (!name || !email || !phone || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Phone validation
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
        alert("Please enter a valid 10-digit phone number.")
        return
      }

      // Form submission would go here
      // For now, just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }

  // Initialize active nav link based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navbarHeight = navbar.offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const scrollPosition = window.scrollY

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentId = section.getAttribute("id")

        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", setActiveNavLink)

  // Call once on page load
  setActiveNavLink()
})
