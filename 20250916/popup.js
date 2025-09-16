document.addEventListener('DOMContentLoaded', () => {
  const applyButton = document.getElementById('apply-button');
  const selectorInput = document.getElementById('selector-input');

  applyButton.addEventListener('click', async () => {
    const selector = selectorInput.value.trim();
    if (!selector) {
      console.log('Selector is empty');
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: applyAnimationToElements,
      args: [selector]
    });
  });
});

function applyAnimationToElements(selector) {
  const styleId = 'gemini-burn-explode-animation-style';
  const animationClass = 'gemini-animated-burn-explode';

  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes gemini-burn-explode-animation {
        0% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
          box-shadow: 0 0 10px 0 rgba(255, 87, 34, 0.5), 0 0 20px 0 rgba(255, 87, 34, 0.5);
        }
        50% {
          transform: rotate(360deg) scale(1);
          opacity: 1;
          box-shadow: 0 0 15px 5px rgba(255, 87, 34, 0.8), 0 0 25px 5px rgba(255, 87, 34, 0.8);
        }
        75% {
          transform: rotate(720deg) scale(1);
          opacity: 1;
          box-shadow: 0 0 20px 10px rgba(255, 152, 0, 0.9), 0 0 35px 10px rgba(255, 152, 0, 0.9);
        }
        90% {
            transform: rotate(720deg) scale(1.2);
            opacity: 1;
            box-shadow: 0 0 30px 20px #ff0000, 0 0 50px 20px #ff0000;
        }
        99% {
            transform: rotate(720deg) scale(1.5);
            opacity: 0.5;
        }
        100% {
          transform: rotate(720deg) scale(2);
          opacity: 0;
          box-shadow: 0 0 50px 40px #ff0000, 
                      50px 50px 30px #ffcc00, -50px -50px 30px #ffcc00, 
                      50px -50px 30px #ffcc00, -50px 50px 30px #ffcc00, 
                      100px 0 30px #ff9900, -100px 0 30px #ff9900, 
                      0 100px 30px #ff9900, 0 -100px 30px #ff9900;
        }
      }
      .${animationClass} {
        animation: gemini-burn-explode-animation 4s forwards;
      }
    `;
    document.head.appendChild(style);
  }

  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.log(`No elements found for selector: ${selector}`);
      return;
    }
    elements.forEach(el => {
      el.classList.remove(animationClass);
      void el.offsetWidth;
      el.classList.add(animationClass);
    });
  } catch (e) {
    console.error(`Invalid CSS selector: ${selector}`, e);
  }
}
