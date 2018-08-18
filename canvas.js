var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var press = false;
var lastpoint;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var img = new Image();
var filePicker = document.getElementById("filePicker");

var tool = {
    x: 0,
    y: 0,
    color: 'black',
    name: null,
    group: null,
    join: "round",
    cap: "round",
    opac: 1,
    shape: null,
    size: 10,
    cursor: null,
    down: false,
    img: null,
    font: 'sans-serif',
    fstyle: '',
    fweight: '',
    fstroke: false,
    text: null,
    lborder: 2,
    lcolor: 'black',
    width: canvas.width,
    height: canvas.height
};
var strokes = [];
var currentStroke = null;
var texting;

var undoVar = 0;
var hasInput = false;
var curColor, curJoin, curOpac, curCap, curShape, curImg;

var newClick = 0;
var clickPoint;
var upPoint;
var rectStack;

canvas.width = window.innerWidth*9/10;
canvas.height = window.innerHeight*8/10;

canvas.addEventListener('mousedown', function(event){down(event);});
canvas.addEventListener('mouseup', function(event){up(event);});
canvas.addEventListener('mousemove', function(event){move(event);});

var penTool = {
    brush: document.getElementById("brush") 
}
var imgTool = {
    marker: document.getElementById("marker")
}
var shapeTool = {
    line: document.getElementById("line"),
    rectangle: document.getElementById("rectangle"),
    circle: document.getElementById("circle"),
    triangle: document.getElementById("triangle")
}
var attributeTool = {
    colorPicker: document.getElementById("colorPicker"),
    colorPickerBorder: document.getElementById("colorPickerBorder"),
    sizeValue: document.getElementById("sizeValue"),
    sizeSlider: document.getElementById("sizeSlider"),
    borderValue: document.getElementById("borderValue"),
    borderSlider: document.getElementById("borderSlider"),
    opacValue: document.getElementById("opacValue"),
    opacSlider: document.getElementById("opacSlider")
}
var eraserTool = {
    eraser: document.getElementById("eraser")
}
var textTool = {
    text: document.getElementById("text")
}
var doTool = {
    undo: document.getElementById("undo"),
    redo: document.getElementById("redo"),
    trash: document.getElementById("trash")
}
var toolDrop = document.getElementById("toolDrop");
var attributeDone = document.getElementById("attributeDone");
var attributeReset = document.getElementById("attributeReset");
var fontName = document.getElementById("fontName");
var fontStyle = {
    italic: document.getElementById("italic"),
    bold: document.getElementById("bold")
}
var checkTool = {
    fillCheck: document.getElementById("fillCheck"),
    borderCheck: document.getElementById("borderCheck")
}
var borderGroup =  document.getElementById("borderGroup");
var s = document.getElementById("s");
var filled = true;
var bordered = true;

penTool.brush.addEventListener('click', function(event){chooseTool("penTool", event.target.id);});
//imgTool.marker.addEventListener('click', function(event){chooseTool("imgTool", event.target.id);});
shapeTool.rectangle.addEventListener('click', function(event){chooseTool("shapeTool", event.target.id);});
shapeTool.circle.addEventListener('click', function(event){chooseTool("shapeTool", event.target.id);});
shapeTool.line.addEventListener('click', function(event){chooseTool("shapeTool", event.target.id);});
shapeTool.triangle.addEventListener('click', function(event){chooseTool("shapeTool", event.target.id);});

eraserTool.eraser.addEventListener('click', function(event){chooseTool("eraserTool", event.target.id);});
textTool.text.addEventListener('click', function(event){chooseTool("textTool", event.target.id);});
doTool.undo.addEventListener('click', function(event){undo(event);});
doTool.redo.addEventListener('click', function(event){redo(event);});
doTool.trash.addEventListener('click', function(event){trash(event);});
toolDrop.addEventListener('click', function(event){edrop(event);});
attributeDone.addEventListener('click', function(event){close(event);});
attributeReset.addEventListener('click', function(event){reset(event);});
fontStyle.bold.addEventListener('click', function(event){boldPress(event);});
fontStyle.italic.addEventListener('click', function(event){italicPress(event);});
//fontStyle.textStroke.addEventListener('click', function(event){strokePress(event);});

colorPicker.addEventListener("input", function(event){updateColor(event);});
colorPickerBorder.addEventListener("input", function(event){updateColorBorder(event);});
sizeValue.addEventListener("input", function(event){updateSize(event);});
sizeSlider.addEventListener("input", function(event){updateSize(event);});
opacValue.addEventListener("input", function(event){updateOpac(event);});
opacSlider.addEventListener("input", function(event){updateOpac(event);});
borderValue.addEventListener("input", function(event){updateBorder(event);});
borderSlider.addEventListener("input", function(event){updateBorder(event);});
fontName.addEventListener("change",function(event){updateFont(event);});
filePicker.addEventListener("change",function(event){loadImage(event);});
checkTool.fillCheck.addEventListener("change",function(event){fCheck(event);});
checkTool.borderCheck.addEventListener("change",function(event){bCheck(event);});


//save.addEventListener('click', function(event){savePic(event);});
//colorPicker.addEventListener("change", function(event){updateColor(event);});
/*function savePic(event) {
    save.href = canvas.toDataURL();
    save.download = "mypainting.png";
    
}*/

/*$(document).ready(function(){
    //$("attributeDropdown").hide();
    $("#toolDrop").click(function(){
        
    });
});*/

function reset(event) {
    tool = {
        x: 0,
        y: 0,
        color: 'black',
        name: null,
        group: null,
        join: "round",
        cap: "round",
        opac: 1,
        shape: null,
        size: 10,
        cursor: null,
        down: false,
        img: null,
        font: 'sans-serif',
        fstyle: '',
        fweight: '',
        fstroke: false,
        text: null,
        lborder: 2,
        lcolor: 'black',
        width: canvas.width,
        height: canvas.height
    };
    sizeValue.value = tool.size;
    sizeSlider.value = tool.size;
    fontName.value = tool.font;
    opacSlider.value = tool.opac * 100;
    opacValue.value = tool.opac * 100;
    borderValue.value = tool.lborder;
    borderSlider.value = tool.lborder;
    colorPicker.value = tool.color;
    colorPickerBorder.value = tool.lcolor;
    checkTool.fillCheck.checked = true;
    checkTool.borderCheck.checked = true;
    
}

function fCheck(event) {
    if (checkTool.fillCheck.checked == true) filled = true;
    else filled = false;
}

function bCheck(event) {
    if (checkTool.borderCheck.checked == true) bordered = true;
    else bordered = false;
}

function boldPress(event) {
    if(tool.fweight == "bold ") {
        tool.fweight = "";
    }
    else tool.fweight = "bold ";
    
}

function italicPress(event) {
    if(tool.fstyle == "italic ") {
        console.log("ita");
        tool.fstyle = "";
    }
    else tool.fstyle = "italic ";
}

function strokePress(event) {
    console.log(tool.fstroke);
    if(tool.fstroke == false) {
        tool.fstroke = true;
        
    }
    else tool.fstroke = false;
}

function loadImage(event) {
    var file = event.target.files[0];
    var inputImg = new Image(); 
	//var file = files[0];
	    if (file.type.match('image.*')) {
            var reader = new FileReader();
            var iheight, iwidth;
	        console.log("miao");
	        reader.readAsDataURL(file);
	    	reader.onload = function(event){
	    	    if (event.target.readyState == FileReader.DONE) {
                    
                    //canvas.height = inputImg.height;
                    //canvas.width = inputImg.width;
                    inputImg.src = event.target.result;
                    inputImg.onload = function() {
                        if (inputImg.height/canvas.height > inputImg.width/canvas.width) {
                            iheight = canvas.height;
                            iwidth = inputImg.width * canvas.height / inputImg.height;
                            canvas.width = iwidth;
                            console.log("cw" + iwidth);
                        }
                        else {
                            console.log(canvas.width + " " + canvas.height + " " +inputImg.height + " " +inputImg.width);
                            iwidth = canvas.width;
                            iheight = inputImg.height * canvas.width / inputImg.width;
                            canvas.height = iheight;
                            console.log("ch" + iheight);
                        }
                        currentStroke = {
                            name: 'loadImage',
                            group: 'loadImage',
                            width: iwidth,
                            height: iheight,
                            img: inputImg
                        };
                    
                        strokes.push(currentStroke);
                        
                        redraw();
                    }
                    
                    
			    }
            }
        } 
        else {
	        alert("not an image");
	    }
}

function edrop(event) {
    show("attributeDropdown");
    //$("#attributeDropdown").show();
}
function show(id) {
    if (document.getElementById) {
      var divid = document.getElementById(id);
      $(divid).fadeIn("fast");
    }
    return false;
}
function hide(id) {
    if (document.getElementById) {
      var divid = document.getElementById(id);
      $(divid).fadeOut("fast");
    }
    return false;
}

function close(event) {
    hide("attributeDropdown");
}
canvas.onclick = function(event) {
    if (texting) {
        
        if (hasInput) {
            document.body.removeChild(input)
            hasInput = false;
        };
        
        addInput(event.clientX, event.clientY);
    }
    
}

function addInput(x, y) {
    
    input = document.createElement('input');
    
    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x-3) + 'px';
    input.style.top = (y +6) + 'px';
    input.style.height = tool.size *3 + 'px';
    input.style.font = "bold " + tool.size *3 + 'px ' + tool.fontName;
    //console.log(input.style.);

    input.onkeydown = handleEnter;
    
    document.body.appendChild(input);

    input.focus();
    
    hasInput = true;
}

function handleEnter(event) {
    var keyCode = event.keyCode;
    if (keyCode === 13) {
        tool.text = this.value;
        inputText(event);
        currentStroke = null;
        redraw();
        //drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
        
        hasInput = false;
    }
}

/*function drawText(txt, x, y, font, color, opacity) {
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = font;
    context.color = color;
    context.opacity = opacity;
    context.fillText(txt, x - 4, y - 4);
}*/

function download() {
    var dt = canvas.toDataURL('image/png');
    this.href = dt;
};
downloadLnk.addEventListener('click', download, false);

function undo(event) {
    undoVar++;
    redraw();
}

function redo(event) {
    if (undoVar > 0){
        undoVar--;
        redraw();
    }
}

function trash(event) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvas.width = window.innerWidth * 9 / 10;
    canvas.height = window.innerHeight * 8 / 10;
    strokes = [];
}

function updateFont(event) {
    tool.font = fontName.value;
    console.log(tool.font);
}


function updateSize(event) {
    sizeValue.value = event.target.value;
    sizeSlider.value = event.target.value;
    tool.size = event.target.value;
    
}
function updateOpac(event) {
    opacValue.value = event.target.value;
    opacSlider.value = event.target.value;
    tool.opac = event.target.value/100;
}

function updateBorder(event) {
    borderValue.value = event.target.value;
    borderSlider.value = event.target.value;
    tool.lborder = event.target.value;
}


function updateColor(event) {
    colorPicker.style.color = event.target.value;
    tool.color = event.target.value;
    console.log("change");
}

function updateColorBorder(event) {
    colorPickerBorder.style.color = event.target.value;
    tool.lcolor = event.target.value;
    console.log("change");
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(); 
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseEvent(event) {
    var mousePos = getMousePos(canvas, event);
    tool.x = mousePos.x;
    tool.y = mousePos.y;
    

    currentStroke.points.push({
        x: tool.x,
        y: tool.y,
    });
    console.log("push");
    redraw();
}

function inputText(event){
   
    currentStroke.text.push(tool.text);

    //redraw();
}

function down(event) {
    console.log("down");
    tool.down = true;
    for(var i = 0; i < undoVar; i++) {
        strokes.pop();
    }
    undoVar = 0;
    currentStroke = {
        name: tool.name,
        group: tool.group,
        color: tool.color,
        opac: tool.opac,
        size: tool.size,
        join: tool.join,
        cap: tool.cap,
        img: tool.img,
        text: [],
        font: tool.font,
        fstyle: tool.fstyle,
        fweight: tool.fweight,
        fstroke: tool.fstroke,
        lborder: tool.lborder,
        lcolor: tool.lcolor,
        cursor: tool.cursor,
        bordered: bordered,
        filled: filled,
        points: [],
    };
    console.log(tool.font +"dd");
    strokes.push(currentStroke);
    /*if (strokes) {
        undo.classList.remove("disabled");
    }
    */
    mouseEvent(event);
    //inputText(event);
    /*press = true;
    lastPoint = { x: event.clientX, y: event.clientY };
    if (newClick == 0) {
        clickPoint = getMousePos(canvas, event);
        newClick = 1;
    }*/
}

function up(event) {
    tool.down = false;
    mouseEvent(event);
    if (!texting) {
        currentStroke = null;
    }
}

function move(event) {
    if (tool.down) mouseEvent(event);  
}



function chooseTool(toolGroup, toolChosen) {
    tool.group = toolGroup; 
    tool.name = toolChosen;
    if(hasInput) {
        document.body.removeChild(input);
        hasInput = false;
    }
    $("#s").show();
    $("#c").show();
    $("#fontGroup").hide();
    $("#borderGroup").show();
    $("#checkGroup").hide();
    texting = false;
    
    if(toolGroup == "penTool") {
        tool.cursor = "pointer"
        if(toolChosen == "brush") {
            $("#borderGroup").hide();
            console.log("choosebrush");
        }
        
    }
    else if (toolGroup == "imgTool") {
        console.log("choosemarker");
        tool.img = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';
        //context.lineJoin = context.lineCap = 'round';
    }
    else if (toolGroup == "shapeTool") {
        tool.cursor = "crosshair";
        $("#checkGroup").show();
        if (toolChosen == "rectangle"){
            $("#s").hide();
            console.log("chooseRec");
        }
            
        else if (toolChosen == "circle"){
            $("#s").hide();
            console.log("chooseCircle");
        }
        
        else if (toolChosen == "triangle"){
            $("#s").hide();
            console.log("chooseTriangle");
        }
        else if (toolChosen == "line") {
            $("#checkGroup").hide();
            $("#borderGroup").hide();
        }
        
    }
    else if (toolChosen == "eraser") {
        tool.cursor = "pointer"
        $("#c").hide();
        $("#borderGroup").hide();
        
        console.log("chooseEraser");
    }
    else if (toolChosen == "text") {
        tool.cursor = "text"
        $("#checkGroup").show();
        $("#fontGroup").show();
        texting = true;
    }
    else{
        tool.cursor = "default"
    }
    canvas.style.cursor = tool.cursor;
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
    for(var i = 0; i < strokes.length-undoVar; i++) {	
        var s = strokes[i];	
        
        context.strokeStyle = s.color;
        context.lineWidth = s.size;
        context.globalAlpha = s.opac;
        context.lineJoin = s.join;
        context.lineCap = s.cap;
        context.font = s.font;
        context.globalCompositeOperation = "source-over";
        if (s.group == "penTool") {
            context.beginPath();
            context.moveTo(s.points[0].x, s.points[0].y);
            for (var j = 0; j < s.points.length; j++) {
                var p = s.points[j];
                context.lineTo(p.x, p.y);
            }
            context.stroke();
        }
        else if (s.group == "imgTool") {
            //var dist = distanceBetween(lastPoint, currentPoint);
            //var dist = distanceBetween(lastPoint, currentPoint);
            img.src = s.img;
            console.log(s.points.length);
            if(s.points.length > 1) {
                for (var j = 0; j < distanceBetween(s.points[j], s.points[s.points.length-1]); j++) {
                    console.log("es");
                    if(j > 0) {
                        var angle = angleBetween(s.points[j-1], s.points[j]);
                    }
                    var p = s.points[j];
                    x = p.x + (Math.sin(angle) * j) - 25;
                    y = p.y + (Math.cos(angle) * j) - 25;
                    context.drawImage(img, x, y);
                }
            }
            
        }
        else if (s.group == "shapeTool") {
            context.fillStyle = s.color;
            context.strokeStyle = s.lcolor;
            context.lineWidth = s.lborder;
            console.log(context.lineWidth);
            if (s.name == "line") {
                context.strokeStyle = s.color;
                context.lineWidth = s.size;
                context.beginPath();
                context.moveTo(s.points[0].x, s.points[0].y);
                context.lineTo(s.points[s.points.length - 1].x, s.points[s.points.length - 1].y);
                context.stroke();
            }
            else if (s.name == "rectangle") {
                var width = s.points[s.points.length - 1].x - s.points[0].x;
                var height = s.points[s.points.length - 1].y - s.points[0].y;
                if (s.bordered)
                context.strokeRect(s.points[0].x, s.points[0].y, width, height);
                if (s.filled)
                context.fillRect(s.points[0].x, s.points[0].y, width, height);
            }
            else if (s.name == "circle") {
                x = s.points[0].x + (s.points[s.points.length - 1].x - s.points[0].x) / 2;
                y = s.points[0].y + (s.points[s.points.length - 1].y - s.points[0].y) / 2;
                r = Math.abs((s.points[s.points.length - 1].x - s.points[0].x) / 2);
                context.beginPath();
                context.arc(x, y, r, 0*Math.PI, 2*Math.PI);
                if (s.bordered) context.stroke();
                if (s.filled) context.fill();
                
            }
            else if (s.name == "triangle") {
                topx = (s.points[0].x + s.points[s.points.length - 1].x)/2;
                topy = s.points[0].y;
                blx = s.points[0].x;
                bly = s.points[s.points.length - 1].y;
                brx = s.points[s.points.length - 1].x;
                bry = s.points[s.points.length - 1].y;
                context.beginPath();
                context.moveTo(topx, topy);
                context.lineTo(blx, bly);
                context.lineTo(brx, bry);
                context.lineTo(topx, topy);
                if (s.bordered) context.stroke();
                if (s.filled) context.fill();
                
            }
            
        }
        else if (s.group == "eraserTool") {
            if(s.name == "eraser") {
                context.strokeStyle = "rgba(0,0,0,s.opac)";
                context.globalCompositeOperation="destination-out";
                context.beginPath();
                context.moveTo(s.points[0].x, s.points[0].y);
                for (var j = 0; j < s.points.length; j++) {
                    var p = s.points[j];
                    context.lineTo(p.x, p.y);
                }
                context.stroke();
            }

            
        }
        else if (s.group == "textTool") {
            context.fillStyle = s.color;
            context.strokeStyle = s.lcolor;
            context.lineWidth = s.lborder;
            
            if(s.name == "text") {
                context.textBaseline = 'top';
                context.textAlign = 'left';
                console.log(s.fweight + " " + s.fstyle + " " + s.size + "px " + s.font);
                context.font = s.fweight + s.fstyle + s.size * 3 + "px " + s.font;
                console.log(context.font);
                context.fillStyle = s.color;
                
                
                if(s.bordered){
                    console.log(s.fstroke);
                    context.lineWidth = s.lborder;
                    context.strokeStyle = s.lcolor;
                    context.strokeText(s.text, s.points[0].x, s.points[0].y);
                }
                if (s.filled){
                    console.log("dsa");
                    
                    context.fillText(s.text, s.points[0].x, s.points[0].y);
                }

                
                //drawText(s.text, s.points[0].x, s.points[0].y);
                
            }

            
        }
        else if (s.group == "loadImage") {
            context.globalAlpha = 1;
            img = s.img;
            context.drawImage(img, 0, 0, s.width, s.height);
            console.log(s.width);
        }
       
    }
}

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}


