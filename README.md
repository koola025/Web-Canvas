# Software Studio 2018 Spring Assignment 01 Web Canvas

## Web Canvas
<img src="example01.gif" width="700px" height="500px"></img>

## Todo
1. **Fork the repo ,remove fork relationship and change project visibility to public.**
2. Create your own web page with HTML5 canvas element where we can draw somethings.
3. Beautify appearance (CSS).
4. Design user interaction widgets and control tools for custom setting or editing (JavaScript).
5. **Commit to "your" project repository and deploy to Gitlab page.**
6. **Describing the functions of your canvas in REABME.md**

## Scoring (Check detailed requirments via iLMS)

|                       **Item**                   | **Score** |
|:--------------------------------------------:|:-----:|
|               Basic components               |  60%  |
|                 Advance tools                |  35%  |
|            Appearance (subjective)           |   5%  |
| Other useful widgets (**describe on README.md**) | 1~10% |

## Reminder
* Do not make any change to our root project repository.
* Deploy your web page to Gitlab page, and ensure it works correctly.
    * **Your main page should be named as ```index.html```**
    * **URL should be : https://[studentID].gitlab.io/AS_01_WebCanvas**
* You should also upload all source code to iLMS.
    * .html or .htm, .css, .js, etc.
    * source files
* **Deadline: 2018/04/05 23:59 (commit time)**
    * Delay will get 0 point (no reason)
    * Copy will get 0 point
    * "屍體" and 404 is not allowed

## Functions
### Basic Components
* Basic control tools
    * Brush and eraser
        
        Brush with different color, size and opacity.

        <img src="demo/7.png" width="400px">
        
        Eraser with different size and opacity.
        
        <img src="demo/8.png" width="400px">
    * Color selector
    
        User can choose color for fill and color for border from the menu.
        
        <img src="demo/9.png" width="400px">
    * Simple menu 
        
        This dropdown menu includes all kinds of attributes, including fonts, sizes, colors, opacity...etc.
        
        <img src="demo/10.png" width="400px">
* Text input
    * User can type texts on canvas
        
        User can click on the position they like to place their text and enter the letters. After pressing enter, the text will display on canvas.

        <img src="demo/18.png" width="400px">
    * Font menu
        
        User can choose font, size, color, bold or italic, with or without border, with or without fill, border width, border color, opacity from this menu.
        
        <img src="demo/11.png" width="400px">
* Cursor icon
    * The image should change according to the currently used tool
        1. When choosing brush tool or eraser, the cursor changes to "pointer". 
        2. When choosing line, circle, rectangle, triangle tool, the cursor changes to "crosshair".
        3. When choosing text tool, the cursor changes to "text".
    
* Refresh button
    * Reset canvas
        1. The trash can button clears the canvas and sets it to original size.
        2. The reset button resets all attributes on the menu to default value.
        
        <img src="demo/12.png" width="400px">

### Advance Tools
* Different brush shapes
    * Line, circle, rectangle and triangle

        With these four buttons and the choices in the menu, user can draw different shapes with different colors and opacity. Besides, users can also choose to draw it with or without border and color fill.
        
        <img src="demo/13.png" width="400px">
* Un/Re-do button
    * Undo, Redo

        The one on the top is the undo button, and the one on the bottom is redo button.
        
        <img src="demo/14.png" width="100px">
* Image tool
    * Users can upload image and paste it
        
        User can choose image from computer and the canvas will resize to the size of the image while remaining in the border of screen.

        <img src="demo/15.png" width="400px">
        
        <img src="demo/19.png" width="400px">
        
        <img src="demo/20.png" width="400px">
* Download
    * Download current canvas as an image file
        
        Pressing the button below will download current canvas as an image file.        

        <img src="demo/16.png" width="400px">
        
### Others

* Dynamic menu
    
    The menu shows and hides different attributes when different tools are chosen.

* Fill/Border

    User can check whether they want fill and border on the menu for all shapes and text.
    
* Opacity

    User can change the opacity of text, shapes, brushes, eraser.

* Scroll toolbar

    When the screen height is too small, you can still scroll the tool bar too see all attributes.
    
* Put into practice

    All demo pictures in this mackdown file are drawn with this painter.