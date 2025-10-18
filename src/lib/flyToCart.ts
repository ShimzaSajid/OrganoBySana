// src/lib/flyToCart.ts
import { CATEGORY_ICON } from "./categoryIcons";
import type { CategorySlug } from "./data";

// We'll need to accept the openCart function as a parameter
export function flyToCart(
  startEl: HTMLElement, 
  category: CategorySlug,
  openCart: () => void // Add this parameter
) {
  const cartIcon = document.getElementById("cart-icon");
  if (!startEl || !cartIcon) return;

  const start = startEl.getBoundingClientRect();
  const end = cartIcon.getBoundingClientRect();

  const img = document.createElement("img");
  img.src = CATEGORY_ICON[category];
  img.alt = "flying-to-cart";
  img.style.position = "fixed";
  img.style.left = `${start.left + start.width / 2}px`;
  img.style.top = `${start.top + start.height / 2}px`;
  img.style.width = "70px";
  img.style.height = "70px";
  img.style.borderRadius = "50%";
  img.style.objectFit = "cover";
  img.style.zIndex = "9999";
  img.style.pointerEvents = "none";
  img.style.transform = "translate(-50%, -50%) scale(1)";
  img.style.transition = `
    left 1800ms cubic-bezier(0.34, 1.8, 0.64, 1),
    top 1800ms cubic-bezier(0.34, 1.8, 0.64, 1),
    transform 1800ms cubic-bezier(0.34, 1.8, 0.64, 1),
    opacity 1600ms ease-in-out,
    box-shadow 1800ms ease-in-out
  `;
  img.style.boxShadow = `
    0 0 0 8px rgba(212, 175, 55, 0.3),
    0 0 30px rgba(212, 175, 55, 0.5),
    0 0 60px rgba(42, 77, 42, 0.3)
  `;
  img.style.filter = "brightness(1.2) saturate(1.3)";

  document.body.appendChild(img);

  // Dramatic entrance animation
  requestAnimationFrame(() => {
    img.style.transform = "translate(-50%, -50%) scale(1.8)";
    img.style.boxShadow = `
      0 0 0 15px rgba(212, 175, 55, 0.6),
      0 0 50px rgba(212, 175, 55, 0.8),
      0 0 100px rgba(42, 77, 42, 0.5)
    `;
    
    setTimeout(() => {
      img.style.transform = "translate(-50%, -50%) scale(1.2) rotate(-5deg)";
      img.style.boxShadow = `
        0 0 0 10px rgba(212, 175, 55, 0.4),
        0 0 40px rgba(212, 175, 55, 0.6),
        0 0 80px rgba(42, 77, 42, 0.4)
      `;
    }, 300);
  });

  // Main flight animation
  setTimeout(() => {
    const targetX = end.left + end.width / 2;
    const targetY = end.top + end.height / 2;
    
    const arcHeight = -150;
    
    img.style.left = `${targetX}px`;
    img.style.top = `${targetY + arcHeight}px`;
    img.style.transform = "translate(-50%, -50%) scale(1.1) rotate(15deg)";
    img.style.boxShadow = `
      0 0 0 12px rgba(212, 175, 55, 0.5),
      0 0 60px rgba(212, 175, 55, 0.7),
      0 0 120px rgba(42, 77, 42, 0.4)
    `;

    // Final descent - open cart when icon reaches the target
    setTimeout(() => {
      img.style.top = `${targetY}px`;
      img.style.transform = "translate(-50%, -50%) scale(0.1) rotate(720deg)";
      img.style.opacity = "0.1";
      img.style.boxShadow = `
        0 0 0 20px rgba(212, 175, 55, 0.8),
        0 0 80px rgba(212, 175, 55, 1),
        0 0 150px rgba(42, 77, 42, 0.6)
      `;
      
      // OPEN THE CART DRAWER HERE - when icon hits the target
      openCart();
      
      setTimeout(() => {
        img.style.boxShadow = `
          0 0 0 30px rgba(212, 175, 55, 0.9),
          0 0 100px rgba(212, 175, 55, 1),
          0 0 200px rgba(42, 77, 42, 0.8)
        `;
      }, 200);
    }, 1000); // This timeout controls when the cart opens
  }, 600);

  // Add particle effects
  createParticles(start.left + start.width / 2, start.top + start.height / 2);

  // Cleanup
  setTimeout(() => {
    if (img.parentNode) {
      img.parentNode.removeChild(img);
    }
  }, 2800);
}

function createParticles(startX: number, startY: number) {
  const particles = 8;
  const colors = ['#d4af37', '#2a4d2a', '#f8f4e9', '#3a6b3a'];
  
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = '9998';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.8';
    particle.style.transition = `
      transform 1200ms cubic-bezier(0.34, 1.5, 0.64, 1),
      opacity 1200ms ease-out
    `;
    
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / particles;
    const distance = 40 + Math.random() * 60;
    const translateX = Math.cos(angle) * distance;
    const translateY = Math.sin(angle) * distance;
    
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
      particle.style.opacity = '0';
    });
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1200);
  }
}