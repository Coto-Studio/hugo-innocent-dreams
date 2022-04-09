const star5 = document.getElementById("star-5");
if (!star5) return false;

const star4 = document.getElementById("star-4");
const star3 = document.getElementById("star-3");
const star2 = document.getElementById("star-2");
const star1 = document.getElementById("star-1");

function changeStasApperance(star) {
  star.content = "🌟";
}

function checkStars(id) {
  switch (id) {
    case 5:
      star5.checked = true;
      changeStarsAppearance(star5);
    case 4:
      star4.checked = true;
    case 3:
      star3.checked = true;
    case 2:
      star2.checked = true;
    case 1:
      star1.checked = true;
  }
}

function uncheckStars(id) {
  switch (id) {
    case 1:
      star1.checked = false;
    case 2:
      star2.checked = false;
    case 3:
      star3.checked = false;
    case 4:
      star4.checked = false;
    case 5:
      star5.checked = false;
  }
}

function updateStars(star) {
  if (star.checked) {
    checkStars(star.id);
  } else {
    uncheckStars(sta.id);
  }
}

star5.addEventListener("change", updateStars);
star4.addEventListener("change", updateStars);
star3.addEventListener("change", updateStars);
star2.addEventListener("change", updateStars);
star1.addEventListener("change", updateStars);
