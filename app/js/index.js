let isMenuOpen = false;
const btnMenu = document.querySelector(".btn-menu");
const closeX = document.querySelector(".btn-close");
const menu = document.querySelector(".menu");
const container = document.querySelector(".container");
const nav = document.querySelector(".nav");
const containers = document.querySelectorAll(".menus");

const openMenu = () => {
  btnMenu.classList.add("active");
  closeX.classList.add("active");
  menu.classList.add("active");
  nav.classList.add("active");
  isMenuOpen = true;
  setTimeout(() => {
    document.body.classList.add("locked");
  }, 600);
};

const closeMenu = () => {
  btnMenu.classList.remove("active");
  closeX.classList.remove("active");
  menu.classList.remove("active");

  nav.classList.remove("active");
  container.classList.remove("none");
  document.body.classList.remove("locked");
  isMenuOpen = false;
};

function btnMenuHandler() {
  if (!isMenuOpen) {
    openMenu();
    setTimeout(() => {
      menuOptionsHandler();
    }, 600);
  } else {
    closeMenu();
  }
}

const addFadeInImages = () => {
  const SCREEN_POINT = window.innerHeight / 2 + window.innerHeight / 6;
  const images = document.querySelectorAll(".pic");

  images.forEach((image) => {
    if (
      image.getBoundingClientRect().top < SCREEN_POINT &&
      !container.classList.contains("none")
    ) {
      image.classList.add("show");
    }
  });
};

const menuOptionsHandler = () => {
  const options = document.querySelectorAll(".option");
  const menuInfo = document.querySelector(".menu-info");

  options.forEach((option, i) => {
    option.addEventListener("click", () => {
      if (!containers[i].classList.contains("active")) {
        showContainerSelected(containers, i);
        option.classList.add("selected");
        container.style.display = "none";
        setTimeout(() => {
          menu.classList.add("fade");
          container.classList.remove("none");
          container.classList.remove("hide");
          menuInfo.classList.add("fade");
          container.style.display = "block";
        }, 600);

        setTimeout(() => {
          closeMenu();
          menu.classList.remove("fade");
          option.classList.remove("selected");
        }, 650);
      }
    });
  });
};

const showContainerSelected = (containers, i) => {
  containers.forEach((container, index) => {
    container.classList.add("inactive");
    container.classList.remove("active");

    if (index === i) {
      container.classList.add("active");
      container.classList.remove("inactive");
      container.lastElementChild.style.opacity = "0";

      setTimeout(() => {
        container.lastElementChild.style.opacity = "1";
      }, 550);
    }
  });
};

const showContainerSelectedDesktop = () => {
  containers.forEach((container, i) => {
    container.addEventListener("click", () => {
      if (!container.classList.contains("active")) {
        showContainerSelected(containers, i);
      }
    });
  });
};

const showImagesWithHover = () => {
  const dishes = document.querySelectorAll(".item");
  console.log(dishes);
};

function init() {
  if (document.readyState === "complete") {
    btnMenu.addEventListener("click", btnMenuHandler);
    closeX.addEventListener("click", btnMenuHandler);
    addFadeInImages();
    showContainerSelectedDesktop();
    showImagesWithHover();
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        addFadeInImages();
      }
    });
  }
}
document.addEventListener("readystatechange", init);
