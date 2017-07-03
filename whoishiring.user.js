// ==UserScript==
// @name        hiring tools
// @namespace   djent-
// @include     https://news.ycombinator.com/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// Put buttons on each post to mark red or green
var d0 = new Date();
var start = d0.getTime();
console.log("Working");

window.onload = function(e) {
  var d1 = new Date();
  var loaded = d1.getTime();
  if (document.title.indexOf("Who is hiring?") !== -1) {
    addButtons();
    //console.log("Added all buttons.");
    applyColors();
    console.log("Done");
  }
  var d2 = new Date();
  var finished = d2.getTime();
  var loading = loaded - start;
  console.log("Spent " + loading + " ms loading.");
  var scripting = finished - loaded;
  console.log("Spent " + scripting + " ms scripting.");
}

function addButtons() {
  var toggles = document.getElementsByClassName("togg");
  //console.log(toggles.length);
  for (x = 0; x < toggles.length; x++) {
    var id = toggles[x].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    var red = document.createElement("a");
    red.onclick = markRed;
    red.text = "[x]";
    red.href = "javascript:void(0);";
    var green = document.createElement("a");
    green.onclick = markGreen;
    green.text = "[=]";
    green.href = "javascript:void(0);";
    var next = document.createElement("a");
    next.onclick = goToNext;
    next.text = "[v]";
    next.href = "javascript:void(0);";
    toggles[x].parentNode.insertBefore(red, toggles[x].nextSibling);
    toggles[x].parentNode.insertBefore(green, toggles[x].nextSibling);
    toggles[x].parentNode.insertBefore(next, toggles[x].nextSibling);
  }
}

function markRed() {
  this.parentNode.parentNode.parentNode.children[2].style.background = "red";
  var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  GM_setValue(id, "red");
  /*
  var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  console.log("Marking " + id + " red.");
  var element = document.getElementById(id);
  element.children[0].children[0].children[0].children[0].children[2].children[2].style.background = "red";
  element.children[0].children[0].children[0].children[0].children[2].children[1].style = "background:red;";
  */
}

function markGreen(id) {
  this.parentNode.parentNode.parentNode.children[2].style.background = "green";
  var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  GM_setValue(id, "green");
  /*
  var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  console.log("Marking " + id + " green.");
  var element = document.getElementById(id);
  element.children[0].children[0].children[0].children[0].children[2].children[2].style.background = "green";
  */
}

function goToNext(id) {
  var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  if (id) {
    // Find the location of the current div within
    var comments = document.getElementsByClassName("comment-tree")[0].children[0].children;
    var found = false;
    for (x = 0; x < comments.length; x++) {
      if (id == comments[x].id) {
        found = true;
        continue;
      }
      if (!found) {
        continue;
      }
      var color = GM_getValue(comments[x].id, false);
      if (color != "red") {
        location.hash = comments[x].id;
        break;
      }
    }
  }
}

function applyColors() {
  var comments = document.getElementsByClassName("comment-tree")[0].children[0].children;
  //console.log(comments.length);
  for (x = 0; x < comments.length; x++) {
    var color = GM_getValue(comments[x].id, false);
    //console.log(color);
    if (color == false) {
      continue;
    }
    var element = document.getElementById(comments[x].id);
    element.children[0].children[0].children[0].children[0].children[2].children[2].style.background = color;
  }
}
