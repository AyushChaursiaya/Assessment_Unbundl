class SmoothScroller {
  constructor(container, speed = 1) {
    this.container = container;
    this.section = container.querySelector(".stats-section");
    this.speed = speed;
    this.position = 0;
    this.animationId = null;
    this.items = Array.from(this.section.children);

    this.items.forEach((item) => {
      const clone = item.cloneNode(true);
      this.section.appendChild(clone);
    });

    this.itemWidth = this.items[0].offsetWidth + 40;
    this.startScroll();
  }

  startScroll() {
    const scroll = () => {
      this.position -= this.speed;

      if (Math.abs(this.position) >= this.itemWidth * this.items.length) {
        this.position = 0;
      }

      this.section.style.transform = `translateX(${this.position}px)`;
      this.animationId = requestAnimationFrame(scroll);
    };

    this.animationId = requestAnimationFrame(scroll);
  }

  stopScroll() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.querySelector(".stats-container");
  new SmoothScroller(statsContainer, 0.5);
});

class PatientTestimonialsScroller {
  constructor() {
    this.track = document.getElementById("patientTestimonialsTrack");
    if (!this.track) return;

    this.isMobile = window.innerWidth <= 768;
    this.autoScrollInterval = null;
    this.scrollPosition = 0;
    this.cardWidth = 0;
    this.maxScroll = 0;
    this.scrollSpeed = 0.5;

    this.init();
  }

  init() {
    this.calculateDimensions();

    if (this.isMobile) {
      this.setupAutoScroll();
    }

    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      this.calculateDimensions();

      if (wasMobile && !this.isMobile) {
        this.stopAutoScroll();
        this.resetPosition();
      } else if (!wasMobile && this.isMobile) {
        this.setupAutoScroll();
      }
    });

    this.track.addEventListener("mouseenter", () => {
      this.stopAutoScroll();
    });

    this.track.addEventListener("mouseleave", () => {
      if (this.isMobile) {
        this.setupAutoScroll();
      }
    });

    this.track.addEventListener("touchstart", () => {
      this.stopAutoScroll();
    });
  }

  calculateDimensions() {
    const cards = this.track.querySelectorAll(".patient-testimonial-card");
    if (cards.length > 0) {
      this.cardWidth = cards[0].offsetWidth + 24;
      this.maxScroll =
        this.track.scrollWidth - this.track.parentElement.offsetWidth;
    }
  }

  setupAutoScroll() {
    this.stopAutoScroll();

    this.autoScrollInterval = setInterval(() => {
      this.autoScroll();
    }, 16);
  }

  autoScroll() {
    this.scrollPosition += this.scrollSpeed;

    if (this.scrollPosition >= this.maxScroll) {
      this.scrollPosition = 0;
    }

    this.track.style.transform = `translateX(-${this.scrollPosition}px)`;
  }

  resetPosition() {
    this.scrollPosition = 0;
    this.track.style.transform = `translateX(0)`;
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PatientTestimonialsScroller();
});

class TestimonialsAutoScroller {
  constructor() {
    this.track = document.getElementById("testimonialsTrack");
    if (!this.track) return;

    this.isMobile = window.innerWidth <= 768;
    this.autoScrollInterval = null;
    this.scrollPosition = 0;
    this.cardWidth = 0;
    this.maxScroll = 0;
    this.scrollSpeed = 0.5;

    this.init();
  }

  init() {
    this.calculateDimensions();

    if (this.isMobile) {
      this.setupAutoScroll();
    }

    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      this.calculateDimensions();

      if (wasMobile && !this.isMobile) {
        this.stopAutoScroll();
        this.resetPosition();
      } else if (!wasMobile && this.isMobile) {
        this.setupAutoScroll();
      }
    });

    this.track.addEventListener("mouseenter", () => {
      this.stopAutoScroll();
    });

    this.track.addEventListener("mouseleave", () => {
      if (this.isMobile) {
        this.setupAutoScroll();
      }
    });

    this.track.addEventListener("touchstart", () => {
      this.stopAutoScroll();
    });
  }

  calculateDimensions() {
    const cards = this.track.querySelectorAll(".testimonial-card");
    if (cards.length > 0) {
      this.cardWidth = cards[0].offsetWidth + 24;
      this.maxScroll =
        this.track.scrollWidth - this.track.parentElement.offsetWidth;
    }
  }

  setupAutoScroll() {
    this.stopAutoScroll();

    this.autoScrollInterval = setInterval(() => {
      this.autoScroll();
    }, 16);
  }

  autoScroll() {
    this.scrollPosition += this.scrollSpeed;

    if (this.scrollPosition >= this.maxScroll) {
      this.scrollPosition = 0;
    }

    this.track.style.transform = `translateX(-${this.scrollPosition}px)`;
  }

  resetPosition() {
    this.scrollPosition = 0;
    this.track.style.transform = `translateX(0)`;
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsAutoScroller();
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".safety-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

class SafetySectionScroller {
  constructor() {
    this.section = document.getElementById("safetySection");
    this.container = document.querySelector(".safety-scroll-container");
    if (!this.section || !this.container) return;

    this.isMobile = window.innerWidth <= 768;
    this.autoScrollInterval = null;
    this.scrollPosition = 0;
    this.cardWidth = 0;
    this.maxScroll = 0;
    this.scrollSpeed = 0.5;
    this.isPaused = false;

    this.init();
  }

  init() {
    if (this.isMobile) {
      this.calculateDimensions();
      this.setupAutoScroll();
    }

    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;

      if (wasMobile && !this.isMobile) {
        this.stopAutoScroll();
        this.resetPosition();
      } else if (!wasMobile && this.isMobile) {
        this.calculateDimensions();
        this.setupAutoScroll();
      }
    });

    if (this.isMobile) {
      this.container.addEventListener("mouseenter", () => {
        this.pauseAutoScroll();
      });

      this.container.addEventListener("mouseleave", () => {
        this.resumeAutoScroll();
      });

      this.container.addEventListener("touchstart", () => {
        this.pauseAutoScroll();
      });

      this.container.addEventListener("touchend", () => {
        setTimeout(() => this.resumeAutoScroll(), 3000);
      });
    }
  }

  calculateDimensions() {
    const cards = this.section.querySelectorAll(".card-content");
    if (cards.length > 0) {
      this.cardWidth = cards[0].offsetWidth + 20;
      this.maxScroll = this.section.scrollWidth - this.container.offsetWidth;
    }
  }

  setupAutoScroll() {
    this.stopAutoScroll();
    this.isPaused = false;

    this.autoScrollInterval = setInterval(() => {
      if (!this.isPaused) {
        this.autoScroll();
      }
    }, 16);
  }

  autoScroll() {
    this.scrollPosition += this.scrollSpeed;

    if (this.scrollPosition >= this.maxScroll + 100) {
      this.scrollPosition = 0;
    }

    this.section.style.transform = `translateX(-${this.scrollPosition}px)`;
  }

  pauseAutoScroll() {
    this.isPaused = true;
  }

  resumeAutoScroll() {
    this.isPaused = false;
  }

  resetPosition() {
    this.scrollPosition = 0;
    this.section.style.transform = `translateX(0)`;
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SafetySectionScroller();
});

class ReviewsAutoScroller {
  constructor() {
    this.track = document.getElementById("reviewsTrack");
    if (!this.track) return;

    this.isMobile = window.innerWidth <= 768;
    this.autoScrollInterval = null;
    this.scrollPosition = 0;
    this.cardWidth = 0;
    this.maxScroll = 0;
    this.scrollSpeed = 0.5;
    this.isPaused = false;
    this.animationId = null;

    this.init();
  }

  init() {
    this.calculateDimensions();

    if (this.isMobile) {
      this.setupAutoScroll();
    }

    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      this.calculateDimensions();

      if (wasMobile && !this.isMobile) {
        this.stopAutoScroll();
        this.resetPosition();
      } else if (!wasMobile && this.isMobile) {
        this.setupAutoScroll();
      }
    });

    if (this.isMobile) {
      this.track.addEventListener("mouseenter", () => {
        this.pauseAutoScroll();
      });

      this.track.addEventListener("touchstart", () => {
        this.pauseAutoScroll();
      });
    }
  }

  calculateDimensions() {
    const cards = this.track.querySelectorAll(".review-card");
    if (cards.length > 0) {
      const cardStyle = window.getComputedStyle(cards[0]);
      const cardWidth = cards[0].offsetWidth;
      const cardMargin = parseInt(cardStyle.marginRight) || 0;

      this.cardWidth = cardWidth + cardMargin;
      this.maxScroll =
        this.track.scrollWidth - this.track.parentElement.offsetWidth;
    }
  }

  adjustScrollSpeed() {
    if (window.innerWidth <= 480) {
      this.scrollSpeed = 0.3;
    } else {
      this.scrollSpeed = 0.4;
    }
  }

  setupAutoScroll() {
    this.stopAutoScroll();
    this.adjustScrollSpeed();
    this.isPaused = false;

    const scroll = () => {
      if (!this.isPaused && this.isMobile) {
        this.scrollPosition += this.scrollSpeed;

        if (this.scrollPosition >= this.maxScroll + 100) {
          this.scrollPosition = 0;
        }

        this.track.style.transform = `translateX(-${this.scrollPosition}px)`;
      }
      this.animationId = requestAnimationFrame(scroll);
    };

    this.animationId = requestAnimationFrame(scroll);
  }

  pauseAutoScroll() {
    this.isPaused = true;
  }

  resetPosition() {
    this.scrollPosition = 0;
    this.track.style.transform = `translateX(0)`;
  }

  stopAutoScroll() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ReviewsAutoScroller();
});

class FindUsScroller {
  constructor() {
    this.track = document.getElementById("mapImagesContainer");
    if (!this.track) return;

    this.isMobile = window.innerWidth <= 768;
    this.scrollPosition = 0;
    this.cardWidth = 0;
    this.maxScroll = 0;
    this.scrollSpeed = 0.5;
    this.isPaused = false;
    this.animationId = null;

    this.init();
  }

  init() {
    this.calculateDimensions();

    if (this.isMobile) {
      this.setupAutoScroll();
    }

    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      this.calculateDimensions();

      if (wasMobile && !this.isMobile) {
        this.stopAutoScroll();
        this.resetPosition();
      } else if (!wasMobile && this.isMobile) {
        this.setupAutoScroll();
      }
    });

    if (this.isMobile) {
      this.track.addEventListener("mouseenter", () => {
        this.pauseAutoScroll();
      });

      this.track.addEventListener("touchstart", () => {
        this.pauseAutoScroll();
      });
    }
  }

  calculateDimensions() {
    const cards = this.track.querySelectorAll(".map-image");
    if (cards.length > 0) {
      const cardStyle = window.getComputedStyle(cards[0]);
      const cardWidth = cards[0].offsetWidth;
      const cardMargin = parseInt(cardStyle.marginRight) || 0;

      this.cardWidth = cardWidth + cardMargin;
      this.maxScroll =
        this.track.scrollWidth - this.track.parentElement.offsetWidth;
    }
  }

  adjustScrollSpeed() {
    if (window.innerWidth <= 480) {
      this.scrollSpeed = 0.3;
    } else {
      this.scrollSpeed = 0.4;
    }
  }

  setupAutoScroll() {
    this.stopAutoScroll();
    this.adjustScrollSpeed();
    this.isPaused = false;

    const scroll = () => {
      if (!this.isPaused && this.isMobile) {
        this.scrollPosition += this.scrollSpeed;

        if (this.scrollPosition >= this.maxScroll + 100) {
          this.scrollPosition = 0;
        }

        this.track.style.transform = `translateX(-${this.scrollPosition}px)`;
      }
      this.animationId = requestAnimationFrame(scroll);
    };

    this.animationId = requestAnimationFrame(scroll);
  }

  pauseAutoScroll() {
    this.isPaused = true;
  }

  resetPosition() {
    this.scrollPosition = 0;
    this.track.style.transform = `translateX(0)`;
  }

  stopAutoScroll() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FindUsScroller();
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});
