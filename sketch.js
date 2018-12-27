let rgbs = [];
let names = [];
let currentName;
let selectedColor;


function preload() {
  table = loadTable("colornames.csv", "csv", "header");
}

function setup() {

  for (let r = 0; r < table.getRowCount(); r++) {
    rgbs.push(hexTorgb(table.getString(r, 1)));
    names.push(table.getString(r, 0));
  }

  var p = document.querySelectorAll('p')[1], // put color picker panel in the second `<p>` element
    picker = new CP(document.querySelector('input'), false, p);



  picker.on("change", function(color) {

    this.source.value = '#' + color;


    currentName = getName(this.source.value);
    whiteText = textColor(this.source.value);

    //  console.log(this.source.value);
    let bg = select('.background');
    bg.style('background', this.source.value);


    let nameText = select('.name');
    nameText.html(currentName);

    let hexText = select('.hex');
    hexText.html('#' + color);

    if (whiteText == false) {
      nameText.style('color', '#262626');
      hexText.style('color', '#262626');

    } else {
      nameText.style('color', '#fff');
      hexText.style('color', '#fff');
    }
  });
  let colorString = 'rgb(' + floor(random(255)) + ', ' + floor(random(255)) + ', ' + floor(random(255)) + ')';
  picker.set(colorString);
  // ...
  picker.fit = function() { // do nothing ...
    this.self.style.left = this.self.style.top = "";
  };

  // add a `static` class to the color picker panel
  picker.self.classList.add('static');

  // force to show the color picker panel
  picker.enter();


}



function hexTorgb(hexcode) {
  this.hexcode = hexcode;
  splits = this.hexcode.split('');
  let r = splits[1] + splits[2];
  let g = splits[3] + splits[4];
  let b = splits[5] + splits[6];
  return unhex([r, g, b]);
}

function getDifference(rgbs, currentRGB) {
  this.rgbs = rgbs;
  this.currentRGB = currentRGB;
  let difference = [];

  for (let i = 0; i < this.rgbs.length; i++) {
    difference.push(abs(this.currentRGB[0] - this.rgbs[i][0]));
  }

  for (let i = 0; i < this.rgbs.length; i++) {
    difference[i] += abs(this.currentRGB[1] - this.rgbs[i][1]);
  }

  for (let i = 0; i < this.rgbs.length; i++) {
    difference[i] += abs(this.currentRGB[2] - this.rgbs[i][2]);
  }

  return difference;

}

Array.min = function(difference) {
  return Math.min.apply(Math, difference);
};

function minIndex(minimum, difference) {
  var order = difference.indexOf(minimum);
  return order;
}

function getName(inputHex) {
  let currentHex = inputHex;
  let currentRGB = hexTorgb(currentHex);
  let difference = getDifference(rgbs, currentRGB);
  let minimum = Array.min(difference);
  let order = minIndex(minimum, difference);
  let colorname = names[order];

  return colorname;

}

function textColor(inputHex) {
  let currentRGB = hexTorgb(inputHex);
  if (currentRGB[0] + currentRGB[1] + currentRGB[2] > 510) {
    return false;
  } else {
    return true;
  }
}