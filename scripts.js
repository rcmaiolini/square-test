function load() {
  var getBody = document.querySelector('body');

  var createContainerDiv = document.createElement('div');
  createContainerDiv.setAttribute('id', 'container');
  var container = document.querySelector('#container');

  var createTitle = document.createElement('h2');
  createTitle.setAttribute('class', 'title');

  getBody.appendChild(createTitle);
  getBody.appendChild(createContainerDiv);

  var mainDivSize = 200;
  var insideDivSize = 50;
  var amountDivs = 17;

  drawContainer(mainDivSize, insideDivSize, amountDivs);
  document.getElementById("calcButton").addEventListener("click", clickButton);
}
window.onload = load;

function createSquare(size, element, color){
  element.setAttribute('style', 'width: ' + size + 'px; height: ' + size +  'px; background-color: ' + color + ';');
}

function createInsideSquare(childSize, numberOfChildren, element, maxNumberChildren){
  divCount = 0;
  while(divCount < numberOfChildren && divCount < maxNumberChildren){
    var insideDiv = document.createElement('div');
    var color = getRandomColor();
    createSquare(childSize, insideDiv, color);
    element.appendChild(insideDiv);
    removeDiv(insideDiv);
    divCount++;
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createTitle(qtdChildrensTotal, numberOfChildren){
  var getTitle = document.querySelector('h2');
  var title = '';
  if(qtdChildrensTotal < numberOfChildren){
    title = 'From ' + numberOfChildren + ' square(s), ' + qtdChildrensTotal + ' will be rendered!';
  }
  getTitle.innerHTML = title;
}

function removeDiv(element) {
  var timer;
  element.addEventListener('mouseover', function(){
    timer = setTimeout(function(){
      element.remove();
    }, 3000);
  });
  element.addEventListener('mouseout', function(){
    clearTimeout(timer);
  });
}

function calcInsideSquareQtd(containerSize, childSize, numberOfChildren){
  var childrenSideBySide = Math.floor(containerSize / childSize);
  var qtdChildrensTotal = Math.pow(childrenSideBySide, 2);

  return qtdChildrensTotal;
}

function drawContainer(containerSize, childSize, numberOfChildren) {
  createSquare(containerSize, container);
  qtdChildrensTotal = calcInsideSquareQtd(containerSize, childSize, numberOfChildren);
  createInsideSquare(childSize, numberOfChildren, container, qtdChildrensTotal);
  createTitle(qtdChildrensTotal, numberOfChildren);
}

function clickButton(event){
  event.preventDefault();
  mainDivSize = document.querySelector('#mainDivSize').value;
  insideDivSize = document.querySelector('#insideDivSize').value;
  amountDivs = document.querySelector('#amountDivs').value;
  container.innerHTML = '';
  drawContainer(mainDivSize, insideDivSize, amountDivs);
}
