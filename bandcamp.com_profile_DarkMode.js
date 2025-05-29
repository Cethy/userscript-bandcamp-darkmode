// ==UserScript==
// @name        bandcamp.com_profile_DarkMode
// @namespace   cw.bandcamp.com_profile_DarkMode
// @match       https://bandcamp.com/*
// @grant       none
// @version     1.0
// @author      Charles
// @homepage    https://github.com/Cethy/userscript-bandcamp-darkmode
// @description Add switchable dark mode styling + auto-toggle if computer setup for preferred dark color scheme, but only on bandcamp profile pages !
// ==/UserScript==

(function() {
    'use strict';

    console.log("Hello, I'll set some dark mode styles and auto-toggle dark mode if it's your computer preferred color scheme, but only on profile pages !")

    const domParser = new DOMParser()
    const darkModeSvgString = `<svg width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g fill="#323232" fill-rule="nonzero">
              <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z" />
          </g>
      </g>
    </svg>`;
    const darkModeSvgElement = domParser.parseFromString(darkModeSvgString, 'image/svg+xml').documentElement;

    function isElementVisible(element) {
        const style = window.getComputedStyle(element);
        return (style.display !== 'none') && (style.visibility !== 'hidden');
    }

    // profile page detector
    function isProfilePage() {
        return !!document.getElementById("fan-banner")
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');

        const logoLight = document.getElementsByClassName("bclogo aqua")[0]
        const logoDark = document.getElementsByClassName("bclogo white")[0]
        if(isElementVisible(logoLight)) {
            logoDark.style.display = "list-item"
            logoLight.style.display = "none"
        }
        else {
            logoLight.style.display = "list-item"
            logoDark.style.display = "none"
        }
    }

    function init() {
        if(!isProfilePage()) {
            return;
        }

        // Add a dark mode toggle button
        const link = document.createElement('a');
        link.id="cw__toggleDarkMode";
        link.onclick = toggleDarkMode;
        link.appendChild(darkModeSvgElement);
        const liItem = document.createElement('li');
        liItem.classList.add('menubar-item', 'hoverable');
        liItem.appendChild(link);
        document.getElementById('user-nav')?.appendChild(liItem);

        // Apply dark mode styles
        const darkStyles = `
body page-footer {
  border-top: 2px solid transparent;
}
body.dark-mode page-footer {
  border-top: 2px solid #fff;
}

body.dark-mode #propOpenWrapper,
body.dark-mode .menubar-2018,
body.dark-mode #menubar-wrapper.header-rework-2018 .menubar-outer,
body.dark-mode #pgBd,
body.dark-mode #grid-tabs-sticky.fixed,
body.dark-mode #carousel-player,
body.dark-mode .carousel-player-inner,
body.dark-mode .carousel-player .progress-bar,
body.dark-mode .follow-unfollow, 
body.dark-mode .follow-unfollow-inactive,
body.dark-mode .fan-bio .edit-profile > a {
  background-color: #323232;
  color: #fff;
}

body.dark-mode #cw__toggleDarkMode svg g {
    fill: #fff;
}
body.dark-mode .menubar-2018 .svg-icon,
body.dark-mode .carousel-player .queue-icon,
body.dark-mode .carousel-player .vol-icon {
  filter: invert(1);
}
body.dark-mode .menubar-2018 a:hover .svg-icon,
body.dark-mode #cw__toggleDarkMode:hover svg g {
  fill: #333;
}
body.dark-mode .collection-item-title,
body.dark-mode .collection-item-artist,
body.dark-mode .fan-bio,
body.dark-mode .grids,
body.dark-mode .followeer .fan-username, .followeer .genre-name {
  color: #fff;
}
body.dark-mode .grids ol.tabs li.active, 
body.dark-mode .grids ol.tabs li.active:hover {
  color: #fff;
}
body.dark-mode .grids ol.tabs:not(.small) li.active, 
body.dark-mode .grids ol.tabs:not(.small) li.active:hover {
    border-bottom: 2px solid #fff;
}
body.dark-mode .carousel-player .playpause .pause,
body.dark-mode .carousel-player .playpause .play {
  border-left-color: #fff;
  border-right-color: #fff;
}

body.dark-mode .carousel-player .progress-bg {
  background-color: rgba(255,255,255,0.1);
}
body.dark-mode .carousel-player .buffer,
body.dark-mode .carousel-player .vol-bg {
  background-color: rgba(255,255,255,0.4);
}
body.dark-mode .carousel-player .progress,
body.dark-mode .carousel-player .seek-control,
body.dark-mode .carousel-player .vol-amt,
body.dark-mode .carousel-player .vol-control {
  opacity: 1;
  background-color: #fff;
}

body.dark-mode .carousel-player .transport .icon.next-icon,
body.dark-mode .carousel-player .transport .icon.prev-icon {
    filter: invert(1)
}
        `;
        const style = document.createElement('style');
        style.textContent = darkStyles;
        document.head.appendChild(style);

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            // User prefers dark mode
            toggleDarkMode()
        }
    }

    init()
})();