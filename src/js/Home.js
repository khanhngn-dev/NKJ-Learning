const dropHeaderButton = document.querySelector(".drop-menu-header");
let dropHeaderList = document.querySelector(".nav-bar");
const outMenu = document.querySelector(".outMenu");

function topDropDown() {
    function clickDropDown(parent, list) {
      // Add a click event to the parent element; if clicked, call function()
      parent.addEventListener("click", function () {
        // Check if the list is open
        if (!list.classList.contains("open")) {
          // If not, open it, close the other list
          list.classList.add("open");
        } else {
          list.classList.remove("open");
        document.querySelector(".alphabet-table").style.opacity = "1";
        }
      });
    }
    clickDropDown(dropHeaderButton, dropHeaderList);
    // Every time cart is opened, update the subtotal and total
  }

outMenu.addEventListener('click', function() {
    dropHeaderList.classList.remove("open");
})


function start() {
    topDropDown();
  }
window.onload = start;