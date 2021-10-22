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
    container.lastElementChild.style.opacity = "0";
    if (index === i) {
      container.classList.add("active");
      container.classList.remove("inactive");
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

const showImagesMenu = () => {
  const dishes = document.querySelectorAll(".item-food");
  const retail = document.querySelectorAll(".item-retail");
  showImageHover(dishes, "food");
  showImageHover(retail, "retail", "jpg");
};

const showImageHover = (items, section, extension = "png") => {
  const itemImg = document.querySelector(".item-img");
  const retailItem = document.querySelector(".retail-img");
  items.forEach((item, i) => {
    item.addEventListener("mouseover", () => {
      let randomTop = Math.floor(Math.random() * (70 - 0));
      let randomLeft = Math.floor(Math.random() * (70 - 0));
      if (section === "food") {
        itemImg.classList.add("hover");
        itemImg.style.backgroundImage = `url('./app/images/${section}${
          i + 1
        }.${extension}')`;
        itemImg.style.top = `${randomTop}%`;
        itemImg.style.left = `${randomLeft}%`;
      } else {
        retailItem.classList.add("hover");
        retailItem.style.backgroundImage = `url('./app/images/${section}${
          i + 1
        }.${extension}')`;
        retailItem.style.top = `${randomTop}%`;
        retailItem.style.left = `${randomLeft}%`;
      }
    });
    if (section === "food") {
      item.addEventListener("mouseout", () => {
        itemImg.classList.remove("hover");
      });
    }
    item.addEventListener("mouseout", () => {
      retailItem.classList.remove("hover");
    });
  });
};

const addAnimationsContainer = () => {
  containers.forEach((container) => {
    container.classList.add("slide");
  });
  setTimeout(() => {
    containers.forEach((container) => {
      container.classList.remove("slide");
    });
  }, 1200);
};

function init() {
  if (document.readyState === "complete") {
    btnMenu.addEventListener("click", btnMenuHandler);
    closeX.addEventListener("click", btnMenuHandler);
    addFadeInImages();
    showContainerSelectedDesktop();
    showImagesMenu();
    addAnimationsContainer();
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        addFadeInImages();
      }
    });
  }
}
document.addEventListener("readystatechange", init);
