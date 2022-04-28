var autoEraserOn = false;
var knightMove = false;

var valuesDiv = null;

var calculateValuesTimeout = null;

var oddColours = [];
var evenColours = [];

var highColours = [];
var lowColours = [];

var sameColours = [];

addPencilFillButton();
addAutoEraserButton();
addValuesDisplay();
dobuleClickSetup();
addListener();

function addPencilFillButton() {
    var controls = document.getElementById("controls");
    var aux = controls.getElementsByClassName("controls-aux")[0];

    if(controls) {
        var pencilFill = document.createElement("button");
        pencilFill.setAttribute('id', "auto-eraser");
        pencilFill.setAttribute('title', "Auto Eraser");
        pencilFill.setAttribute('data-control', "auto-eraser");
        
        var icon = document.createElement("div");
        icon.setAttribute("class", "icon");

        pencilFill.appendChild(icon);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.setAttribute('width', "24px");
        svg.setAttribute('height', "24px");
        svg.setAttribute('viewBox', "0 0 24 24");
        icon.appendChild(svg);

        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', "M 17.854 4.146 a 0.5 0.5 0 0 0 -0.707 0 L 15.5 5.793 L 19.207 9.5 l 1.647 -1.646 a 0.5 0.5 0 0 0 0 -0.708 l -3 -3 z m 0.646 6.061 L 14.793 6.5 L 8.293 13 H 8.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.207 l 6.5 -6.5 z m -7.468 7.468 A 0.5 0.5 0 0 1 11 17.5 V 17 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 16 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 15 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 14 h -0.5 a 0.499 0.499 0 0 1 -0.175 -0.032 l -0.179 0.178 a 0.5 0.5 0 0 0 -0.11 0.168 l -2 5 a 0.5 0.5 0 0 0 0.65 0.65 l 5 -2 a 0.5 0.5 0 0 0 0.168 -0.11 l 0.178 -0.178 z");
        svg.appendChild(path);

        pencilFill.onclick = function(){
            pencilMark(true);
        };
        aux.appendChild(pencilFill);  
    } else {
        setTimeout(addPencilFillButton, 500);
    }
}

function addAutoEraserButton() {
    var controls = document.getElementById("controls");
    var aux = controls.getElementsByClassName("controls-aux")[0];
    
    if(controls && typeof CtxMenu != 'undefined') {
        var autoEraser = document.createElement("button");
        autoEraser.setAttribute('id', "auto-eraser");
        autoEraser.setAttribute('title', "Auto Eraser");
        autoEraser.setAttribute('data-control', "auto-eraser");
        
        var icon = document.createElement("div");
        icon.setAttribute("class", "icon");

        autoEraser.appendChild(icon);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.setAttribute('width', "24px");
        svg.setAttribute('height', "24px");
        svg.setAttribute('viewBox', "0 0 24 24");
        icon.appendChild(svg);

        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', "M 13.086 6.207 a 2 2 0 0 1 2.828 0 l 3.879 3.879 a 2 2 0 0 1 0 2.828 l -5.5 5.5 A 2 2 0 0 1 12.879 19 H 10.12 a 2 2 0 0 1 -1.414 -0.586 l -2.5 -2.5 a 2 2 0 0 1 0 -2.828 l 6.879 -6.879 z m 0.66 11.34 L 8.453 12.254 L 6.914 13.793 a 1 1 0 0 0 0 1.414 l 2.5 2.5 a 1 1 0 0 0 0.707 0.293 H 12.88 a 1 1 0 0 0 0.707 -0.293 l 0.16 -0.16 z");
        svg.appendChild(path);
        
        autoEraser.onclick = function(){
            autoEraser.classList.toggle("selectedperm");
            autoEraserOn = !autoEraserOn;
            if(autoEraserOn) {
                main();
            }
        };
        
        var contextMenu = CtxMenu(autoEraser);
        var knightMoveItem = contextMenu.addItem("  Knight Move", function() {
            knightMove = !knightMove;
            if(knightMove) {
                knightMoveItem.textContent = "X Knight Move";
            } else {
                knightMoveItem.textContent = "  Knight Move";   
            }

        });
        aux.appendChild(autoEraser);  
    } else {
        setTimeout(addAutoEraserButton, 500);
    }
}

function addValuesDisplay() {
    var controls = document.getElementById("controls");

    if(controls) {
        valuesDiv = document.createElement("div");
        valuesDiv.style.display = 'flex';
        valuesDiv.style.justifyContent = 'center';
        valuesDiv.style.alignItems = 'center';
        controls.appendChild(valuesDiv);
    } else {
        setTimeout(addValuesDisplay, 500);
    }
}

function dobuleClickSetup() {
    var attachedButtons = [...document.querySelectorAll('button')];

    if(attachedButtons && Framework.app && typeof CtxMenu != 'undefined') {
        var digits = attachedButtons.filter(button => button.className == 'digit');
        digits.forEach(digit => {
            digit.addEventListener('dblclick', function () {
                if(Framework.app.puzzle.selectedCells.length == 0) {
                    Framework.app.puzzle.select(Framework.app.puzzle.cells.filter(c => ((!c.given && !c.value) || Framework.app.tool == 'normal' || Framework.app.tool == 'colour') && c.propContains(Framework.app.tool, digit.title)));
                }
            })
        });

        Framework.app.addEventListener('tool-handleToolButton', function(digit) {
            if(Framework.app.puzzle.selectedCells.length > 0) {
                if(Framework.app.tool == 'colour') {
                    if(sameColours.some(colour => colour == digit)) {
                        if(!Framework.app.puzzle.selectedCells.every(cell => cell.colours.includes(digit))) {
                            var values = Framework.app.puzzle.cells.filter(cell => cell.colours.includes(digit) || Framework.app.puzzle.selectedCells.includes(cell)).filter(c => c.candidates.concat(c.givenCentremarks).length > 0).map(c => c.candidates.concat(c.givenCentremarks)).reduce((a, b) => a.filter(c => b.includes(c)), ['1', '2', '3', '4', '5', '6', '7', '8', '9']);
                            for(var val = 1; val <= 9; val++) {
                                var value = val.toString();
                                Framework.app.puzzle.selectedCells.forEach(cell => {
                                    if(values.includes(val.toString())) {
                                        if(!cell.propContains('centre', value)) {
                                            cell.propSet('centre', value);
                                        }
                                    } else {
                                        if(cell.propContains('centre', value)) {
                                            cell.propUnset('centre', value);
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
                else if(Framework.app.tool == 'centre') {
                    sameColours.forEach(colour => {
                        var cells = Framework.app.puzzle.selectedCells.filter(cell => cell.colours.includes(colour));
                        if(cells.length > 0) {
                            var remove = cells.every(cell => cell.candidates.concat(cell.givenCentremarks).includes(digit));
                            Framework.app.puzzle.cells.filter(cell => cell.colours.includes(colour) && !cells.includes(cell)).forEach(cell => {
                                if(remove) {
                                    if(cell.propContains('centre', digit)) {
                                        cell.propUnset('centre', digit);
                                    }
                                } else {
                                    if(!cell.propContains('centre', digit)) {
                                        cell.propSet('centre', digit);
                                    }
                                }
                            });
                        }
                    });
                    
                }
            }
        });

        setupButtonMenus();
        Framework.app.addEventListener('tool-handleToolEnter', function() {
            setupButtonMenus();
        });
    } else {
        setTimeout(dobuleClickSetup, 500);
    }
}

function setupButtonMenus() {
    var attachedButtons = [...document.querySelectorAll('button')];
    var digits = attachedButtons.filter(button => button.className == 'digit');

    var contextMenu = {};
    var oddMenu = {};
    var evenMenu = {};
    var highMenu = {};
    var lowMenu = {};
    var sameMenu = {};
    
    digits.forEach(digit => {
        if(Framework.app.tool == 'colour'){
            contextMenu[digit.title] = CtxMenu(digit);
            oddMenu[digit.title] = contextMenu[digit.title].addItem("  Odd", function() {
                var oddIndex = oddColours.indexOf(digit.title);
                var evenIndex = evenColours.indexOf(digit.title);
                if(oddIndex > -1) {
                    oddColours.splice(oddIndex, 1);
                    oddMenu[digit.title].textContent = "  Odd";
                } else {
                    oddColours.push(digit.title);
                    oddMenu[digit.title].textContent = "X Odd";
                    if(evenIndex > -1) {
                        evenColours.splice(evenIndex, 1);
                        evenMenu[digit.title].textContent = "  Even";
                    }
                }  
                main();  
            });

            evenMenu[digit.title] = contextMenu[digit.title].addItem("  Even", function() {
                var oddIndex = oddColours.indexOf(digit.title);
                var evenIndex = evenColours.indexOf(digit.title);

                if(evenIndex > -1) {
                    evenColours.splice(evenIndex, 1);
                    evenMenu[digit.title].textContent = "  Even";
                } else {
                    evenColours.push(digit.title);
                    evenMenu[digit.title].textContent = "X Even";
                    if(oddIndex > -1) {
                        oddColours.splice(oddIndex, 1);
                        oddMenu[digit.title].textContent = "  Odd";
                    }
                } 
                main();   
            });

            highMenu[digit.title] = contextMenu[digit.title].addItem("  High", function() {
                var highIndex = highColours.indexOf(digit.title);
                var evenIndex = evenColours.indexOf(digit.title);
                if(highIndex > -1) {
                    highColours.splice(highIndex, 1);
                    highMenu[digit.title].textContent = "  High";
                } else {
                    highColours.push(digit.title);
                    highMenu[digit.title].textContent = "X High";
                    if(evenIndex > -1) {
                        evenColours.splice(evenIndex, 1);
                        evenMenu[digit.title].textContent = "  Even";
                    }
                }  
                main();  
            });

            lowMenu[digit.title] = contextMenu[digit.title].addItem("  Low", function() {
                var highIndex = highColours.indexOf(digit.title);
                var lowIndex = lowColours.indexOf(digit.title);

                if(lowIndex > -1) {
                    lowColours.splice(lowIndex, 1);
                    lowMenu[digit.title].textContent = "  Low";
                } else {
                    lowColours.push(digit.title);
                    lowMenu[digit.title].textContent = "X Low";
                    if(highIndex > -1) {
                        highColours.splice(highIndex, 1);
                        highMenu[digit.title].textContent = "  High";
                    }
                } 
                main();   
            });

            sameMenu[digit.title] = contextMenu[digit.title].addItem("  Same", function() {
                var sameIndex = sameColours.indexOf(digit.title);
                if(sameIndex > -1) {
                    sameColours.splice(sameIndex, 1);
                    sameMenu[digit.title].textContent = "  Same";
                } else {
                    sameColours.push(digit.title);
                    sameMenu[digit.title].textContent = "X Same";
                } 
                main();   
            });
        } else {
            ctxMenuManager._ctxMenus.delete(digit);
        }
    });
}

function addListener() {  
    if(Framework && Framework.app.puzzle) {
        Framework.app.addEventListener('act', function() {
            main();
        });

        Framework.app.puzzle.addEventListener('act', function() {
            calculateValues();
        });
    } else {
        setTimeout(addListener, 500);
    }
};

function main() {
    Framework.app.puzzle.cells.forEach(cell => {
        autoColour(cell);
        if(autoEraserOn && (cell.candidates.concat(cell.givenCentremarks).length > 0 || cell.pencilmarks.length > 0)) {
            autoErase(cell);
        }
    });
    if (autoEraserOn) {
        autoEraseKropkis();
        autoEraseXVS();
        autoEraseInequality();
        autoEraseThermos();
        autoEraseArrows();
    }
}

function autoColour(cell, useCandidates) {
    var values = [];
    var value = cell.given || cell.value; 
    if(value) {
        values = [parseInt(value)];
    } else if(useCandidates && cell.candidates.concat(cell.givenCentremarks).length > 0) {
        values = cell.candidates.concat(cell.givenCentremarks).map(candidate => parseInt(candidate));
    }

    if(values.length > 0) {
        if(values.every(value => value % 2 != 0)) {
            oddColours.forEach(colour => {
                if(!cell.propContains('colour', colour)) {
                    cell.propSet('colour', colour);
                }
            });
            evenColours.forEach(colour => {
                if(cell.propContains('colour', colour)) {
                    cell.propUnset('colour', colour);
                }
            });
        }
        if(values.every(value => value % 2 == 0)) {
            evenColours.forEach(colour => {
                if(!cell.propContains('colour', colour)) {
                    cell.propSet('colour', colour);
                }
            });
            oddColours.forEach(colour => {
                if(cell.propContains('colour', colour)) {
                    cell.propUnset('colour', colour);
                }
            });
        }
    }

    if(values.length > 0) {
        if(values.every(value => value > 5)) {
            highColours.forEach(colour => {
                if(!cell.propContains('colour', colour)) {
                    cell.propSet('colour', colour);
                }
            });
            lowColours.forEach(colour => {
                if(cell.propContains('colour', colour)) {
                    cell.propUnset('colour', colour);
                }
            });
        }
        if(values.every(value => value < 5)) {
            lowColours.forEach(colour => {
                if(!cell.propContains('colour', colour)) {
                    cell.propSet('colour', colour);
                }
            });
            highColours.forEach(colour => {
                if(cell.propContains('colour', colour)) {
                    cell.propUnset('colour', colour);
                }
            });
        }
    }
}

function autoErase(cell, useCandidates) {      
    if(oddColours.some(colour => cell.colours.includes(colour))) {
        cell.candidates.concat(cell.givenCentremarks).filter(candidate => parseInt(candidate) % 2 == 0).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(evenColours.some(colour => cell.colours.includes(colour))) {
        cell.candidates.concat(cell.givenCentremarks).filter(candidate => parseInt(candidate) % 2 != 0).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(highColours.some(colour => cell.colours.includes(colour))) {
        cell.candidates.concat(cell.givenCentremarks).filter(candidate => parseInt(candidate) <= 5).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(lowColours.some(colour => cell.colours.includes(colour))) {
        cell.candidates.concat(cell.givenCentremarks).filter(candidate => parseInt(candidate) >= 5).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    Framework.app.currentPuzzle.cages.filter(cage => cage.unique != false).forEach(cage => {
        var cageCells = getCageCells(cage);
        if(cageCells.includes(cell)) {
            cageCells.filter(c => c != cell && (c.given || c.value)).forEach(c => {
                var value = c.given || c.value;
                if(!value && useCandidates && c.candidates.concat(c.givenCentremarks).length == 1) {
                    value = c.candidates.concat(c.givenCentremarks)[0];
                }
                eraseCell(cell, value);
            });
        }
    });

    if(knightMove) {
        var offsets = [ {row: -2, col: -1}, {row: -2, col: 1}, 
                        {row: -1, col: -2}, {row: -1, col: 2}, 
                        {row:  1, col: -2}, {row:  1, col: 2}, 
                        {row:  2, col: -1}, {row:  2, col: 1}];
        Framework.app.puzzle.cells.filter(c => c.given || c.value || useCandidates && c.candidates.concat(c.givenCentremarks).length == 1).forEach(c => {
            var value = c.given || c.value || c.candidates.concat(c.givenCentremarks)[0];

            offsets.forEach(offset => {
                var row = c.row + offset.row;
                var col = c.col + offset.col;  
                if(row >= 0 && row <= 8 && col >= 0 && col <= 8) {
                    eraseRowCol(row, col, value);
                }
            });
        });
    }
}

function autoEraseSame(targetCell, value, useCandidates) {
    if(sameColours.some(colour => targetCell.colours.includes(colour))) {
        sameColours.filter(colour => targetCell.colours.includes(colour)).forEach(colour => {
            var otherCells = Framework.app.puzzle.cells.filter(c => c != targetCell && c.colours.includes(colour));
            if(value) {
                otherCells.forEach(cell => {
                    eraseCell(cell, value, true);
                });
            } else {
                var values = Array.from(Array(9), (_, index) => (index + 1).toString());
                var valueCell = otherCells.find(c => c.given || c.value);
                if(valueCell) {
                    values = [valueCell.given || valueCell.value];
                } else if(useCandidates && otherCells.some(c => c.candidates.concat(c.givenCentremarks).length > 0)) {
                    values = otherCells.filter(c => c.candidates.concat(c.givenCentremarks).length > 0).map(c => c.candidates.concat(c.givenCentremarks)).reduce((a, b) => a.filter(c => b.includes(c)), ['1', '2', '3', '4', '5', '6', '7', '8', '9']);
                }
                targetCell.candidates.concat(targetCell.givenCentremarks).filter(candidate => !values.includes(candidate)).forEach(candidate => {
                    eraseCell(targetCell, candidate);
                });
            }
        });
    }
}

function autoEraseArrows(targetCell, useCandidates) {
    Framework.app.sourcePuzzle.arrows?.filter(arrow => arrow.wayPoints?.length > 1).forEach(arrow => {
        var circleCell;
        var arrowCells = [];
        var row = null, col = null;
        arrow.wayPoints.forEach((point) => {
            while(row != Math.floor(point[0]) || col != Math.floor(point[1])) {
                row += row === null ? Math.floor(point[0]) : Math.sign(Math.floor(point[0]) - row);
                col += col === null ? Math.floor(point[1]) : Math.sign(Math.floor(point[1]) - col);
                if(!circleCell) {
                    circleCell = Framework.app.grid.getCell(row, col);

                } else {
                    arrowCells.push(Framework.app.grid.getCell(row, col));
                }
            }        
        });
        var circleValues = [];
        if(circleCell && arrowCells.length > 0) {
            if(circleCell.given || circleCell.value || useCandidates) {
                circleValues = getAllValues([circleCell], [], true);
            }

            if(!targetCell || arrowCells.includes(targetCell)) {
                arrowCells.filter(c => !c.given && !c.value).forEach(c => {
                    if(!targetCell || targetCell == c) {
                        var otherCells = arrowCells.filter(cell => cell != c);
                        var values = c.candidates.concat(c.givenCentremarks).map(candidate => parseInt(candidate));
                        
                        if(circleValues.length > 0) {
                            values.forEach(value => {
                                if(otherCells.length > 0) {
                                    var otherVals = [];
                                    if(otherCells.length > 0 && (otherCells.every(c => c.given || c.value) || useCandidates)) {
                                        otherVals = calculateValuesInner(arrowCells, c, value, true);
                                        if(otherVals.every(val => !circleValues.includes(val))) {
                                            eraseCell(c, value.toString());
                                        }
                                    }
                                } else if(!circleValues.includes(value)) {
                                    eraseCell(c, value.toString());
                                }
                            });
                        }
                    }
                });
            }

            if(!targetCell || targetCell == circleCell) {
                var values = circleCell.candidates.concat(circleCell.givenCentremarks).map(candidate => parseInt(candidate));
                var arrowVals = [];
                if(arrowCells.every(c => c.given || c.value) || useCandidates) {
                    arrowVals = calculateValuesInner(arrowCells, null, null, true);
                }
                if(arrowVals.length > 0) {
                    values.forEach(value => {
                        if(arrowVals.every(val => value != val)) {
                            eraseCell(circleCell, value.toString());
                        }
                    });
                }
            }
        }
    });
}

function autoEraseThermos(targetCell, useCandidates) {
    var thermos = Framework.app.currentPuzzle.thermos.filter(thermo => isThermo(thermo)).reduce((thermos, thermo) => {
        if(!thermos[thermo.line.wayPoints])
        {
            thermos[thermo.line.wayPoints] = { cells: [], hasTarget: !targetCell};

            var row = null, col = null, min = 0
            thermo.line.wayPoints.forEach((point) => {
                while(row != Math.floor(point[0]) || col != Math.floor(point[1])) {
                    var max = 9;
                    row += row === null ? Math.floor(point[0]) : Math.sign(Math.floor(point[0]) - row);
                    col += col === null ? Math.floor(point[1]) :Math.sign(Math.floor(point[1]) - col);
                    var cell = Framework.app.grid.getCell(row, col);
                    if(cell == targetCell) {
                        thermos[thermo.line.wayPoints].hasTarget = true;
                    }
                    if(useCandidates && cell.candidates.concat(cell.givenCentremarks).length > 0) {
                        min = Math.min.apply(null, cell.candidates.concat(cell.givenCentremarks).map(candidate => parseInt(candidate)).filter(candidate => candidate > min)) - 1;
                        max = Math.max.apply(null, cell.candidates.concat(cell.givenCentremarks).map(candidate => parseInt(candidate)));    
                    }  
                    min = parseInt(cell.given || cell.value || min + 1);
                    max = parseInt(cell.given || cell.value || max);
                    thermos[thermo.line.wayPoints].cells.forEach((cell, index) => {
                        var newMax =  max - thermos[thermo.line.wayPoints].cells.length + index;
                        cell.max = newMax < cell.max ? newMax : cell.max;
                    });
                    thermos[thermo.line.wayPoints].cells.push({cell, min, max});
                }        
            });
        }
        return thermos;
    }, Object.create(null));

    Object.keys(thermos).forEach(key => {
        if(thermos[key].hasTarget) {
            thermos[key].cells.forEach(thermo => { 
                if(!targetCell || thermo.cell == targetCell) {         
                    for(var val = 1; val <= 9; val++) {
                        if(val < thermo.min || val > thermo.max) {
                            eraseCell(thermo.cell, val.toString());
                        }
                    }
                }
            });
        }
    })
}

function isThermo(thermo) {
    return  Framework.app.sourcePuzzle.overlays?.some(lay => lay.backgroundColor.slice(0, 6) == thermo.line.color.slice(0, 6) && lay.center[0] == thermo.line.wayPoints[0][0] && lay.center[1] == thermo.line.wayPoints[0][1] ) || 
            Framework.app.sourcePuzzle.underlays?.some(lay => lay.backgroundColor.slice(0, 6) == thermo.line.color.slice(0, 6) && lay.center[0] == thermo.line.wayPoints[0][0] && lay.center[1] == thermo.line.wayPoints[0][1] );
}

function autoEraseKropkis(targetCell, useCandidates) {
    Framework.app.currentPuzzle.kropkis.filter(kropki => kropki.backgroundColor == "#FFFFFF" || kropki.backgroundColor == "#000000").forEach(kropki => {
        var cells = getCells(kropki.center);
        if(!targetCell || cells.includes(targetCell)) { 
            var values = Array.from(Array(9), (_, index) => index + 1);
            
            cells.filter(cell => !cell.given && !cell.value && cell == targetCell).forEach(cell => {
                var otherCell = cells.find(c => c != cell);
                var value = parseInt(otherCell.given || otherCell.value);
                if(value) {
                    values = [value];
                } else if(useCandidates && otherCell.candidates.concat(otherCell.givenCentremarks).length > 0) {
                    values = otherCell.candidates.concat(otherCell.givenCentremarks).map(candidate => parseInt(candidate));
                }
                for(var val = 1; val <= 9; val++) {
                    if(kropki.backgroundColor == "#FFFFFF" && values.every(value => val != value + 1 && val != value - 1)) {
                        eraseCell(cell, val.toString());
                    }

                    if(kropki.backgroundColor == "#000000" && values.every(value => val != parseInt(value) / 2 && val != parseInt(value) * 2) && val != value) {
                        eraseCell(cell, val.toString());
                    }
                }
            });
        }
    });
}

function autoEraseInequality(targetCell, useCandidates) {
    Framework.app.currentPuzzle.inequality.filter(inequality => inequality.type == "inequality").forEach(inequality => {
        var cells = getCells(inequality.part.center);

        cells.filter(cell => !cell.given && !cell.value && cell == targetCell).forEach(cell => {
            var otherCell = cells.find(c => c != cell);
            var value = parseInt(otherCell.given || otherCell.value);
            if(!value && useCandidates && cell.candidates.concat(cell.givenCentremarks).length > 0) {
                if(inequality.part.text === "<") {
                    value = Math.min.apply(null, otherCell.candidates.concat(otherCell.givenCentremarks).map(candidate => parseInt(candidate)));
                } else {
                    value = Math.max.apply(null, otherCell.candidates.concat(otherCell.givenCentremarks).map(candidate => parseInt(candidate)));    
                }
            }

            if(!targetCell || cell == targetCell) {
                eraseInequality(cell, value, inequality.part.text === "<")
            }
        });
    });
}

function eraseInequality(cell, value, lessThan) {
    if(!value) {
        value = lessThan ? 9 : 1;
    }

    for(var val = 1; val <= 9; val++) {
        var test = lessThan ? val >= parseInt(value) : val <= parseInt(value);
        if(test) {
            eraseCell(cell, val.toString());
        }
    }
}

function autoEraseXVS(targetCell, useCandidates) {
    Framework.app.currentPuzzle.xvs.filter(xvs => xvs.text == "X" || xvs.text == "V").forEach(xvs => {
        var cells = getCells(xvs.center);
        if(!targetCell || cells.includes(targetCell)) {
            var values = Array.from(Array(9), (_, index) => index + 1);
            
            var sum = xvs.text == "X" ? 10 : 5;  
            cells.filter(cell => !cell.given && !cell.value && cell == targetCell).forEach(cell => {
                var otherCell = cells.find(c => c != cell);
                var value = parseInt(otherCell.given || otherCell.value);
                if(value) {
                    values = [value];
                } else if(useCandidates && otherCell.candidates.concat(cell.givenCentremarks).length > 0) {
                    values = otherCell.candidates.concat(otherCell.givenCentremarks).map(candidate => parseInt(candidate));
                }
                for(var val = 1; val <= 9; val++) {
                    if(values.every(v => val != sum - v || val == v)) {
                        eraseCell(cell, val.toString());
                    }
                    
                }
            });
        }
    });
}

function autoEraseCages(targetCell, useCandidates) {
    Framework.app.currentPuzzle.cages.filter(cage => cage.style == "killer" && cage.sum).forEach(cage => {
        var cageCells = getCageCells(cage);
        if(!targetCell || cageCells.includes(targetCell)) {
            cageCells.filter(c => !c.given && !c.value).forEach(c => {
                if(!targetCell || targetCell == c) {
                    var values = c.candidates.concat(c.givenCentremarks).map(candidate => parseInt(candidate));
                    var otherCells = cageCells.filter(cell => cell != c);
                    values.forEach(value => {
                        if(otherCells.length > 0) {
                            var otherCageCellVals = [];
                            if(otherCells.length > 0 && otherCells.every(c => c.given || c.value) || useCandidates) {
                                otherCageCellVals = getAllValues(otherCells, [value], true);
                            }
                            if(otherCageCellVals.every(val => val != cage.sum)) {
                                eraseCell(c, value.toString());
                            }
                        } else if(value != cage.sum) {
                            eraseCell(c, value.toString());
                        }                        
                    });
                }
            });
        }
    });
}

function getCells(center) {
    row = Math.ceil(center[0]) - 1;
    col = Math.ceil(center[1]) - 1;

    var cell1 = Framework.app.grid.getCell(row, col); 
    if(Number.isInteger(center[0])) {           
        row++;
    } else {
        col++;
    }
    var cell2 = Framework.app.grid.getCell(row, col);
        
    return [cell1, cell2];
}

function eraseRowCol(row, col, value) {
    var cell = Framework.app.grid.getCell(row, col);
    eraseCell(cell, value)
}

function eraseCell(cell, value, skipSame) {
    if(cell.propContains('centre', value)) {
        cell.propUnset('centre', value);
    }
    if(cell.propContains('corner', value)) {
        cell.propUnset('corner', value);
    }
    if(!skipSame) {
        autoEraseSame(cell, value);
    }
}

function getCageCells(cage) {
    var cells = [];
    cage.cells.split(',').forEach(cc => {
        if(cc.includes('-')) {
            var row1 = cc.substring(cc.indexOf("r") + 1, cc.indexOf("c"));
            var column1 = cc.substring(cc.indexOf("c") + 1, cc.indexOf("-"));

            var row2 = cc.substring(cc.lastIndexOf("r") + 1, cc.lastIndexOf("c"));
            var column2 = cc.substring(cc.lastIndexOf("c") + 1);

            if(row1 == row2) {
                var row = row1;
                for(var column = Math.min(column1,column2); column <= Math.max(column1,column2); column++) {
                    var c = Framework.app.grid.getCell(row - 1, column - 1);
                    cells.push(c); 
                }
            }
            else if(column1 == column2) {
                var column = column1;
                for(var row = Math.min(row1,row2); row <= Math.max(row1,row2); row++) {
                    var c = Framework.app.grid.getCell(row - 1, column - 1);
                    cells.push(c); 
                }
            }
        }
        else {
            var row = cc.substring(cc.indexOf("r") + 1, cc.lastIndexOf("c"));
            var column = cc.substring(cc.indexOf("c") + 1);
            var c = Framework.app.grid.getCell(row - 1, column - 1);
            cells.push(c); 
        }                
    });
    return cells;
}

function pencilMark(fill = true) {
    if(fill) {
        Framework.app.puzzle.selectedCells.filter(cell => !cell.given && !cell.value && cell.givenCentremarks.length == 0).forEach(cell => {
            for(var value = 1; value <= 9; value++) {
                if(!cell.propContains('centre', value.toString())) {
                    cell.propSet('centre', value.toString());
                }
            }
        });
    }
    Framework.app.puzzle.selectedCells.forEach(cell => {
        autoErase(cell, true);
        
        autoEraseKropkis(cell, true);
        autoEraseXVS(cell, true);
        autoEraseInequality(cell, true);
        autoEraseThermos(cell, true);
        autoEraseCages(cell, true);
        autoEraseArrows(cell, true);
        autoEraseSame(cell, null, true);
        
        autoColour(cell, true);
    });
    if(fill) {
        pencilMark(false);
    }
    calculateValues();
}

function calculateValues() {
    var selectedCells = Framework.app.puzzle.selectedCells.filter(c => c.given || c.value || c.candidates.concat(c.givenCentremarks).length > 0);
    if(selectedCells.length > 0) {
        valuesDiv.textContent = "";
        clearTimeout(calculateValuesTimeout);
        calculateValuesTimeout = setTimeout(displayValues, 1000, selectedCells);
    }
}

function displayValues(selectedCells) {
    var vals = calculateValuesInner(selectedCells);
    if(vals) {
        if(vals.length == 0) {
            valuesDiv.textContent = "Values can not be calculated";
        }
        else if(vals.length <= 10) {
            valuesDiv.textContent = "Values: " + vals.join(", ");
        } else {
            valuesDiv.textContent = "Values: " + vals.slice(0, 5).join(", ") + " ... " + vals.slice(-5).join(", ");
        }
    }
    calculateValuesTimeout = null;
}

function calculateValuesInner(selectedCells, targetCell, targetCandidate) {
    var cellGroups = getCellGroups(selectedCells);

    var usedCells = [];
    var vals = null;
    while(usedCells.length < selectedCells.length) {
        var cells = getNextCellGroup(selectedCells, cellGroups, usedCells);
        var cellGroupVals;
        if(cells.includes(targetCell)) {
            cellGroupVals= getAllValues(cells.filter(c => c != targetCell), [targetCandidate]);
        } else {
            cellGroupVals= getAllValues(cells, []);
        }

        if(vals) {
            var newVals = [];
            vals.forEach(val => {
                cellGroupVals.forEach(cellGroupVal => {
                    newVals.push(val + cellGroupVal);
                });
            });
            vals = newVals.filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a - b);
        } else {
            vals = cellGroupVals;
        }
        usedCells = usedCells.concat(cells);
    }
    return vals;
}

function getCellGroups(selectedCells) {
    var cellGroups = [];
    Framework.app.currentPuzzle.cages.forEach(cage => {
        var cageCells = getCageCells(cage); 
        var cellGroup = [];
        selectedCells.forEach(cell => { 
            if(cageCells.includes(cell)) {
                cellGroup.push(cell);
            }
        });
        if(cellGroup.length > 0) {
            cellGroups.push(cellGroup);
        }
    });
    return cellGroups;
}

function getNextCellGroup(selectedCells, cellGroups, usedCells) {
    return cellGroups.filter(cellGroup => cellGroup.filter(cell => !usedCells.includes(cell)).length > 0).reduce(function(prev, current) {
        var currentCells = current.filter(cell => !usedCells.includes(cell));
        var currentCandidates = currentCells.reduce((a, b) => (b.given || b.value) ? a.concat([b.given || b.value]) : a.concat(b.candidates.concat(b.givenCentremarks)), []).filter((value, index, self) => self.indexOf(value) === index);

        if(selectedCells.filter(cell => !usedCells.includes(cell)).every(cell => currentCells.includes(cell))) {
            return currentCells;
        }

        var prevCells = prev.filter(cell => !usedCells.includes(cell));
        var prevCandidates = prevCells.reduce((a, b) => (b.given || b.value) ? a.concat([b.given || b.value]) : a.concat(b.candidates.concat(b.givenCentremarks)), []).filter((value, index, self) => self.indexOf(value) === index);

        if(selectedCells.filter(cell => !usedCells.includes(cell)).every(cell => prevCells.includes(cell))) {
            return prevCells;
        }

        var currentLength = currentCandidates.length - currentCells.length;
        var prevLength = prevCandidates.length - prevCells.length;
        if(currentLength < prevLength || currentLength == prevLength && currentCandidates.length > prevCandidates.length) {
            return currentCells;
        } else {
            return prevCells;
        }
    });
}

function getAllValues(cells, candidates, blanks) {
    var values = [];

    if(cells.length == 0) {
        return candidates;
    }

    var cell = cells[0];
    var newCells = cells.filter(c => c != cell);

    vals = [];
    var value = cell.given || cell.value;
    if(value) {
        vals.push(parseInt(value));
    } else if(cell.candidates.concat(cell.givenCentremarks).length > 0) {
        vals = cell.candidates.concat(cell.givenCentremarks).map(candidate => parseInt(candidate));
    } else if(blanks) {
        vals = Array.from(Array(9), (_, index) => index + 1);
    }
    vals.filter(val => !candidates.includes(val)).forEach(val => {
        candidates.push(val);
        if(newCells.length > 0) {
            values = values.concat(getAllValues(newCells, candidates, blanks));
        } else {
            values.push(candidates.reduce((v, a) => v + a, 0));
        }
        candidates.pop();
    });

    return values.filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a - b);
}