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

      class SimpleScroller {
        constructor() {
          this.grid = document.querySelector(".patient-testimonials-grid");
          if (!this.grid) return;

          this.isMobile = window.innerWidth <= 768;
          this.autoScrollInterval = null;

          if (this.isMobile) {
            this.init();
          }
        }

        init() {
          this.setupAutoScroll();

          window.addEventListener("resize", () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;

            if (wasMobile && !this.isMobile) {
              this.stopAutoScroll();
            } else if (!wasMobile && this.isMobile) {
              this.setupAutoScroll();
            }
          });
        }

        setupAutoScroll() {
          this.stopAutoScroll();

          this.autoScrollInterval = setInterval(() => {
            this.scrollToNext();
          }, 3000);

          this.grid.addEventListener("mouseenter", () => {
            this.stopAutoScroll();
          });

          this.grid.addEventListener("mouseleave", () => {
            this.setupAutoScroll();
          });

          this.grid.addEventListener("touchstart", () => {
            this.stopAutoScroll();
          });
        }

        scrollToNext() {
          const cards = this.grid.querySelectorAll(".patient-testimonial-card");
          if (cards.length === 0) return;

          const cardWidth = cards[0].offsetWidth + 15; 
          const maxScroll = this.grid.scrollWidth - this.grid.clientWidth;

          if (this.grid.scrollLeft >= maxScroll - 10) {
            this.grid.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          } else {
            this.grid.scrollBy({
              left: cardWidth,
              behavior: "smooth",
            });
          }
        }

        stopAutoScroll() {
          if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
          }
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        new SimpleScroller();
      });