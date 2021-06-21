//array = [][];
for (i = 1; i <= 9; i++) {
    var newDiv = document.createElement("div"); 
    newDiv.id = i;
    newDiv.style.width = "200px";
    newDiv.style.height = "200px";
    newDiv.style.display = 'inline-block';
    newDiv.style.color = getRandomColor();
    newDiv.style.background = getRandomColor();

    newDiv.onclick = setMarker;

    var newContent = document.createTextNode("Hi there and greetings!"); 
    newDiv.appendChild(newContent);  
    var canvas = document.getElementById('canvas');
    canvas.appendChild(newDiv)
}

function setMarker() {
    console.log(this.id);
    var tile = document.getElementById(this.id);
    console.log(tile);
};







function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }




  /*
  var showX = document.getElementById(this.id);

function showX2() {
    showX.style.visibility = 'block';
}

function closeX2(){
    showX.style.visibility = 'none';
}

document.getElementById('block2').onclick = function() {
	if (showX.style.visibility === 'block') {
        closeX2()
    } else {
        showX2()
    }
}

*/