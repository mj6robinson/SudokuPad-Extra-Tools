var working = false;
var autoEraserOn = false;

var valuesDiv = null;

var calculateValuesTimeout = null;

var oddColours = [];
var evenColours = [];

var highColours = [];
var lowColours = [];
var smallColours = [];
var mediumColours = [];
var largeColours = [];

var sameColours = [];
var friendlyColours = [];


setup();

function setup(){
    if(typeof Framework === 'function' && typeof Framework.app === 'object') {
        addSettings();
        addPencilFillButton();
        addAutoEraserButton();
        addValuesDisplay();
        dobuleClickSetup();
        addListener();
    } else {
        setTimeout(setup, 100);
    } 
}

function addSettings() {
    Framework.addSettings([
        {tag: 'toggle', group: 'Extra Tools', name: 'auto-fill', content: 'Auto Fill'},

        {tag: 'toggle', group: 'Extra Tools', name: 'knight-move', content: 'Knight Move'},
        {tag: 'toggle', group: 'Extra Tools', name: 'king-move', content: 'King Move'},
        {tag: 'toggle', group: 'Extra Tools', name: 'unique-box', content: 'Unique Box'},
        {tag: 'toggle', group: 'Extra Tools', name: 'nonconsecutive', content: 'Nonconsecutive'},
        
        {tag: 'toggle', group: 'Extra Tools', name: 'cages', content: 'Cages'},
		{tag: 'toggle', group: 'Extra Tools', name: 'kropkis', content: 'Kropkis Dots'},
        {tag: 'toggle', group: 'Extra Tools', name: 'xvs', content: 'X/V'},
        {tag: 'toggle', group: 'Extra Tools', name: 'inequality', content: 'Inequality'},
        {tag: 'toggle', group: 'Extra Tools', name: 'thermos', content: 'Thermos'},
        {tag: 'toggle', group: 'Extra Tools', name: 'arrows', content: 'Arrows'},
        {tag: 'toggle', group: 'Extra Tools', name: 'german-whisper', content: 'German Whisper Lines'},
        {tag: 'toggle', group: 'Extra Tools', name: 'renban', content: 'Renban Lines'},
	]);

    Framework.settings['auto-fill'] = true;
    Framework.settings['cages'] = true;
    Framework.settings['kropkis'] = true;
    Framework.settings['xvs'] = true;
    Framework.settings['inequality'] = true;
    Framework.settings['thermos'] = true;
    Framework.settings['arrows'] = true;
    Framework.settings['german-whisper'] = true;
    Framework.settings['renban'] = true;
}

function addPencilFillButton() {
    Framework.addToolButtons([{
        name: 'pencil-mark', title: 'Pencil Mark',
        content: `<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 17.854 4.146 a 0.5 0.5 0 0 0 -0.707 0 L 15.5 5.793 L 19.207 9.5 l 1.647 -1.646 a 0.5 0.5 0 0 0 0 -0.708 l -3 -3 z m 0.646 6.061 L 14.793 6.5 L 8.293 13 H 8.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.5 h 0.5 a 0.5 0.5 0 0 1 0.5 0.5 v 0.207 l 6.5 -6.5 z m -7.468 7.468 A 0.5 0.5 0 0 1 11 17.5 V 17 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 16 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 15 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5 V 14 h -0.5 a 0.499 0.499 0 0 1 -0.175 -0.032 l -0.179 0.178 a 0.5 0.5 0 0 0 -0.11 0.168 l -2 5 a 0.5 0.5 0 0 0 0.65 0.65 l 5 -2 a 0.5 0.5 0 0 0 0.168 -0.11 l 0.178 -0.178 z"/></svg></div>`,
    }]);
    Framework.app.refreshControls();

    addDownEventHandler('#control-pencil-mark', pencilMark, {passive: false});
}

function addAutoEraserButton() {    
    Framework.addToolButtons([{
        name: 'auto-eraser', title: 'Auto Eraser',
        content: `<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 13.086 6.207 a 2 2 0 0 1 2.828 0 l 3.879 3.879 a 2 2 0 0 1 0 2.828 l -5.5 5.5 A 2 2 0 0 1 12.879 19 H 10.12 a 2 2 0 0 1 -1.414 -0.586 l -2.5 -2.5 a 2 2 0 0 1 0 -2.828 l 6.879 -6.879 z m 0.66 11.34 L 8.453 12.254 L 6.914 13.793 a 1 1 0 0 0 0 1.414 l 2.5 2.5 a 1 1 0 0 0 0.707 0.293 H 12.88 a 1 1 0 0 0 0.707 -0.293 l 0.16 -0.16 z"/></svg></div>`,
    }]);
    Framework.app.refreshControls();

    addDownEventHandler('#control-auto-eraser', autoEraserToggle, {passive: false});
}

function autoEraserToggle() {
    autoEraserOn = !autoEraserOn;
    document.querySelector('#control-auto-eraser').classList.toggle('selectedperm', this.selectMode);
    if(autoEraserOn) {
        main();
    }
}

function addValuesDisplay() {
    var controls = document.getElementById("controls");

    if(controls) {
        valuesDiv = document.createElement("div");
        valuesDiv.style.display = 'flex';
        valuesDiv.style.justifyContent = 'center';
        valuesDiv.style.alignItems = 'center';
        valuesDiv.textContent = "Values: ";
        controls.appendChild(valuesDiv);
        Framework.app.refreshControls();
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

    var oddMenu = {array: oddColours};
    var evenMenu = {array: evenColours};

    var highMenu = {array: highColours};
    var lowMenu = {array: lowColours};
    var smallMenu = {array: smallColours};
    var mediumMenu = {array: mediumColours};
    var largeMenu = {array: largeColours};

    var sameMenu = {array: sameColours};
    var friendlyMenu = {array: friendlyColours};
     
    digits.forEach(digit => {
        if(Framework.app.tool == 'colour'){
            contextMenu[digit.title] = CtxMenu(digit);

            addMenuItem(digit, contextMenu, "Odd", oddMenu, [evenMenu]);
            addMenuItem(digit, contextMenu, "Even", evenMenu, [oddMenu]);
            contextMenu[digit.title].addSeparator();

            addMenuItem(digit, contextMenu, "Low (1,2,3,4)", lowMenu, [highMenu, smallMenu, mediumMenu, largeMenu]);
            addMenuItem(digit, contextMenu, "High (6,7,8,9)", highMenu, [lowMenu, smallMenu, mediumMenu, largeMenu]);
            addMenuItem(digit, contextMenu, "Small (1,2,3)", smallMenu, [highMenu, lowMenu, mediumMenu, largeMenu]);
            addMenuItem(digit, contextMenu, "Medium (4,5,6)", mediumMenu, [highMenu, lowMenu, smallMenu, largeMenu]);
            addMenuItem(digit, contextMenu, "Large (7,8,9)", largeMenu, [highMenu, lowMenu, smallMenu, mediumMenu]);
            contextMenu[digit.title].addSeparator();

            addMenuItem(digit, contextMenu, "Same", sameMenu);
            contextMenu[digit.title].addSeparator();

            addMenuItem(digit, contextMenu, "Friendly", friendlyMenu);
        } else {
            ctxMenuManager._ctxMenus.delete(digit);
        }
    });
}

function addMenuItem(digit, contextMenu, title, menu, menusRemove = []) {
    var menuItem = contextMenu[digit.title].addItem("  " + title, function() {
        var addIndex = menu.array.indexOf(digit.title);
        if(addIndex > -1) {
            menu.array.splice(addIndex, 1);
            menuItem.textContent = "  " + title;
        } else {
            menu.array.push(digit.title);
            menuItem.textContent = "X " + title;
            menusRemove.forEach(removeMenu => {
                    var removeIndex = removeMenu.array.indexOf(digit.title);
                    if(removeIndex > -1) {
                        removeMenu.array.splice(removeIndex, 1);
                        removeMenu[digit.title].textContent = removeMenu[digit.title].textContent.replace("X ", "  ");
                    }
                });
            }
        main();   
    });
    menu[digit.title] = menuItem;
}

function addListener() {  
    if(Framework && Framework.app) {
        var handleToolButton = function(value) {
            if(!working) {
                if(this.name == 'normal' && Framework.app.puzzle.selectedCells.every(cell => cell.value == value)) {
                    return false;
                } else {
                    main(this.name, value);
                }
                return true;
            }
        };

        Framework.app.tools.centre["handleToolButton"] = handleToolButton;
        Framework.app.tools.corner["handleToolButton"] = handleToolButton;
        Framework.app.tools.colour["handleToolButton"] = handleToolButton;
        Framework.app.tools.normal["handleToolButton"] = handleToolButton;
        Framework.app.puzzle.addEventListener('act', function() {
            if(!working) {
                calculateValues();
            }
        });
    } else {
        setTimeout(addListener, 500);
    }
};

function main(tool, value) {
    working = true; 

    var remove = tool && value && Framework.app.puzzle.selectedCells.every(cell => {
        if(tool == 'centre') {
            return cell.candidates.concat(cell.givenCentremarks).includes(value);
        } else if(tool == 'corner') {
            return cell.pencilmarks.concat(cell.givenCornermarks).includes(value);
        } else if(tool == 'colour') {
            return cell.colours.includes(value) || (value == 0 && cell.colours.length > 0);
        }
    });
    Framework.app.puzzle.cells.forEach(cell => {
        if(cell.given || cell.value) {
            cell.centres = [cell.given || cell.value];
            cell.corners = [cell.given || cell.value];
        } else {
            cell.centres = cell.candidates.concat(cell.givenCentremarks);
            cell.corners = cell.pencilmarks.concat(cell.givenCornermarks);
        }
        cell.colors = cell.colours.map(x => x);
        cell.normal = cell.given || cell.value;
        if(tool && value && Framework.app.puzzle.selectedCells.includes(cell)) {
            if(tool == 'centre') {
                remove ? removeFrom(cell.centres, value) : addTo(cell.centres, value);
                sameColours.filter(sameColour => cell.colors.includes(sameColour)).forEach(sameColour => {
                    var allCells = Framework.app.puzzle.cells.filter(c => c != cell && c.colours.includes(sameColour));        
                    allCells.forEach(c => {
                        remove ? removeFrom(c.centres, value) : addTo(c.centres, value);
                    });
                });
            } else if(tool == 'corner') {
                remove ? removeFrom(cell.corners, value) : addTo(cell.corners, value);
            } else if(tool == 'normal') {
                cell.normal = value;
            } else if(tool == 'colour') {
                if(value == 0) {
                    cell.colors = [];
                } else {
                    remove ? removeFrom(cell.colors, value) : addTo(cell.colors, value);
                }
            }
        }
    });
    if (autoEraserOn) {
        Framework.app.puzzle.cells.filter(cell => cell.centres.length > 0 || cell.corners.length > 0).forEach(cell => {
            autoErase(cell, false, false);
        });
        autoEraseKropkis();
        autoEraseXVS();
        autoEraseInequality();
        autoEraseThermos();
        autoEraseArrows();
        autoEraseGermanWhisper();
        autoEraseRenban();
    }
    if(tool && value && !remove && Framework.app.puzzle.selectedCells.every(cell => {
        if(tool == 'centre') {
            return (!cell.centres.includes(value) && !cell.candidates.concat(cell.givenCentremarks).includes(value)) ||
                   (cell.centres.includes(value) && cell.candidates.concat(cell.givenCentremarks).includes(value));
        } else if(tool == 'corner') {
            return (!cell.corners.includes(value) && !cell.pencilmarks.concat(cell.givenCornermarks).includes(value)) ||
                   (cell.corners.includes(value) && cell.pencilmarks.concat(cell.givenCornermarks).includes(value));
        } else if(tool == 'colour') {
            return (!cell.colours.includes(value) && !cell.colors.includes(value)) ||
                   (cell.colours.includes(value) && cell.colors.includes(value));
        }
    })) {
        Framework.app.puzzle.selectedCells.forEach(cell => {
            if(tool == 'centre') {
                removeFrom(cell.centres, value);
            } else if(tool == 'corner') {
                removeFrom(cell.corners, value);
            } else if(tool == 'colour') {
                if(value == 0) {
                    cell.colors = [];
                } else {
                    removeFrom(cell.colors, value);
                }
            }
        });
    }
    autoColour();
    autoFill();
    working = false;
    calculateValues();
}

function autoColour(targetCell, useCandidates) {
    Framework.app.puzzle.cells.filter(cell => !targetCell || cell == targetCell).forEach(cell => {
        var values = [];
        var value = cell.given || cell.value || cell.normal; 
        if(value) {
            values = [parseInt(value)];
        } else if(useCandidates && cell.centres.length > 0) {
            values = cell.centres.map(candidate => parseInt(candidate));
        }

        sameColours.filter(sameColour => cell.colors.includes(sameColour)).forEach(sameColour => {
            var allCells = Framework.app.puzzle.cells.filter(c => c.colours.includes(sameColour));
            var arrays = allCells.filter(c => c.given || c.value || c.normal || c.centres.length > 0).map(c => c.given || c.value || c.normal ? [c.given || c.value || c.normal] : c.centres);
            if(arrays.length > 0) {
                var centres = arrays.shift().filter(function(v) {
                    return arrays.every(function(a) {
                        return a.indexOf(v) !== -1; 
                    });
                });            
                allCells.forEach(c => {
                    c.centres = centres;
                });
            }
        });

        if(values.length > 0) {
            if(values.every(value => value % 2 != 0)) {
                oddColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });
                evenColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }
            if(values.every(value => value % 2 == 0)) {
                evenColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });
                oddColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }

            if(values.every(value => value <= 4)) {
                lowColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });
                highColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }

            if(values.every(value => value >= 6)) {
                highColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });
                lowColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }

            if(values.every(value => value <= 3)) {
                smallColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });

                mediumColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
                largeColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }

            if(values.every(value => value >= 4 && value <= 6)) {
                mediumColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });

                smallColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
                largeColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
            }

            if(values.every(value => value >= 7)) {
                largeColours.forEach(colour => {
                    addTo(cell.colors, colour);
                });

                smallColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });
                mediumColours.forEach(colour => {
                    removeFrom(cell.colors, colour);
                });  
            }
        }
    });
}

function autoErase(cell, useCandidates) {      
    if(oddColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) % 2 == 0).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(evenColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) % 2 != 0).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(lowColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) > 4).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(highColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) < 6).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(smallColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) > 3).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(mediumColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) < 4 || parseInt(candidate) > 6).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }
    
    if(largeColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => parseInt(candidate) < 7).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    if(friendlyColours.some(colour => cell.colors.includes(colour))) {
        cell.centres.filter(candidate => {
            var val = parseInt(candidate);
            var box = (Math.floor(cell.row / 3) * 3) + Math.floor(cell.col / 3) + 1;

            return val != cell.row + 1 && val != cell.col + 1 && val != box;
        }).forEach(candidate => {
            eraseCell(cell, candidate);
        })
    }

    Framework.app.currentPuzzle.cages.filter(cage => cage.unique != false && (Framework.settings['cages'] || cage.style != 'killer')).forEach(cage => {
        var cageCells = Framework.app.puzzle.parseCells(cage.cells);
        if(cageCells.includes(cell)) {
            cageCells.filter(c => c != cell && (c.given || c.value || c.normal || c.centres.length == 1)).forEach(c => {
                var value = c.given || c.value || c.normal;
                if(!value && useCandidates && c.centres.length == 1) {
                    value = c.centres[0];
                }
                if(value) {
                    eraseCell(cell, value);
                }
            });

            if(useCandidates) {
                var group = findGroup(cageCells.filter(c => c != cell));
                if(group != null) {
                    group.forEach(value => {
                        eraseCell(cell, value);
                    });
                }
            }
        }
    });

    if(Framework.settings['knight-move']) {
        var offsets = [ {row: -2, col: -1}, {row: -2, col: 1}, 
                        {row: -1, col: -2}, {row: -1, col: 2}, 
                        {row:  1, col: -2}, {row:  1, col: 2}, 
                        {row:  2, col: -1}, {row:  2, col: 1}];
        Framework.app.puzzle.cells.filter(c => c.given || c.value|| c.normal || useCandidates && c.centres.length == 1).forEach(c => {
            var value = c.given || c.value || c.normal || c.centres[0];

            offsets.forEach(offset => {
                var row = c.row + offset.row;
                var col = c.col + offset.col;  
                if(row >= 0 && row <= 8 && col >= 0 && col <= 8) {
                    eraseRowCol(row, col, value);
                }
            });
        });
    }

    if(Framework.settings['king-move']) {
        var offsets = [ {row: -1, col: -1}, 
                        {row: -1, col: 1}, 
                        {row:  1, col: -1}, 
                        {row:  1, col: 1} ];
        Framework.app.puzzle.cells.filter(c => c.given || c.value || c.normal || useCandidates && c.centres.length == 1).forEach(c => {
            var value = c.given || c.value || c.normal || c.centres[0];

            offsets.forEach(offset => {
                var row = c.row + offset.row;
                var col = c.col + offset.col;  
                if(row >= 0 && row <= 8 && col >= 0 && col <= 8) {
                    eraseRowCol(row, col, value);
                }
            });
        });
    }

    if(Framework.settings['unique-box']) {
        var offsets = [ {row: 0, col: 0},  {row: 0, col: 3}, {row: 0, col: 6}, 
                        {row: 3, col: 0},  {row: 3, col: 3}, {row: 3, col: 6},
                        {row: 6, col: 0},  {row: 6, col: 3}, {row: 6, col: 6}];
        Framework.app.puzzle.cells.filter(c => c.given || c.value || c.normal || useCandidates && c.centres.length == 1).forEach(c => {
            var value = c.given || c.value || c.normal || c.centres[0];

            offsets.forEach(offset => {
                var row = c.row + offset.row;
                var col = c.col + offset.col;  
                if(row > 8) {
                    row -= 9;
                }
                if(col > 8) {
                    col -= 9;
                }
                eraseRowCol(row, col, value);
            });
        });
    }

    if(Framework.settings['nonconsecutive']) {
        var offsets = [ {row: -1, col: 0}, {row: 1, col: 0}, 
                        {row: 0, col: -1}, {row: 0, col: 1}];
        Framework.app.puzzle.cells.filter(c => c.given || c.value || c.normal || useCandidates && c.centres.length == 1).forEach(c => {
            var value = parseInt(c.given || c.value || c.normal || c.centres[0]);

            offsets.forEach(offset => {
                var row = c.row + offset.row;
                var col = c.col + offset.col;  
                if(row >= 0 && row <= 8 && col >= 0 && col <= 8) {
                    eraseRowCol(row, col, (value - 1).toString());
                    eraseRowCol(row, col, (value + 1).toString());
                }
            });
        });
    }
}

function findGroup(cells) {
    var cellGroups = [];
    for (var i = 0; i < Math.pow(2, cells.length); i++) {
        var cellGroup = [];
        cells.forEach((cell, index) => {
            if ((i & Math.pow(2, index))) {
                cellGroup.push(cell);
            }
        })
        if (cellGroup.length > 0) {
            cellGroups.push(cellGroup);
        }
    }
    cellGroups =  cellGroups
        .filter(cellGroup => cellGroup.every(c => {
            var length = c.centres.length;
            return length > 0 && length <= cellGroup.length;
        }))
        .sort((a, b) => a.length - b.length);

    var candidates = null;
    cellGroups.forEach(cellGroup => {   
        var testCandidates = [].concat.apply([], cellGroup.map(otherCell => {
            var otherCandidates = otherCell.centres
            if(otherCandidates.length == 0) {
                return Array.from(Array(9), (_, index) => (index + 1).toString());
            }
            return otherCandidates;
        })).filter((value, index, self) => self.indexOf(value) === index);

        if(cellGroup.length == testCandidates.length) {
            candidates = testCandidates;
            return;
        }
    });
    return candidates;
}

function autoEraseArrows(targetCell, useCandidates) {
    if(!Framework.settings['arrows']) return;

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
        var circleValues = Array.from(Array(9), (_, index) => (index + 1));
        if(circleCell && arrowCells.length > 0) {
            if(circleCell.given || circleCell.value || circleCell.normal || useCandidates) {
                circleValues = getAllValues([circleCell], [], true);
            }

            if(!targetCell || arrowCells.includes(targetCell)) {
                arrowCells.filter(c => !c.given && !c.value && !c.normal).forEach(c => {
                    if(!targetCell || targetCell == c) {
                        var otherCells = arrowCells.filter(cell => cell != c);
                        var values = c.centres.map(candidate => parseInt(candidate));
                        
                        if(circleValues.length > 0) {
                            values.forEach(value => {
                                if(otherCells.length > 0) {
                                    var otherVals = Array.from(Array(9), (_, index) => (index + 1));
                                    if(otherCells.length > 0 && (otherCells.every(c => c.given || c.value || c.normal) || useCandidates)) {
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
                var values = circleCell.centres.map(candidate => parseInt(candidate));
                var arrowVals = [];
                if(arrowCells.every(c => c.given || c.value || c.normal) || useCandidates) {
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

function autoEraseGermanWhisper(targetCell, useCandidates) {
    if(!Framework.settings['german-whisper']) return;

    Framework.app.sourcePuzzle.lines?.filter(line => {
        var rgb = hexToRGBA(line.color);
        return rgb[1] - rgb[0] - rgb[2] > 0;
    }).forEach(line => {
        var lineCells = [];
        var row = null, col = null;
        line.wayPoints.forEach((point) => {
            while(row != Math.floor(point[0]) || col != Math.floor(point[1])) {
                row += row === null ? Math.floor(point[0]) : Math.sign(Math.floor(point[0]) - row);
                col += col === null ? Math.floor(point[1]) : Math.sign(Math.floor(point[1]) - col);
                lineCells.push(Framework.app.grid.getCell(row, col));
            }        
        });

        if(!targetCell || lineCells.includes(targetCell)) {
            lineCells.filter(c => !c.given && !c.value && !c.normal).forEach(c => {
                if(!targetCell || targetCell == c) {
                    var index = lineCells.indexOf(c);
                    var otherCells = lineCells.slice(Math.max(0, index - 1), index + 2).filter(cell => c != cell);
                    var values = c.centres.map(candidate => parseInt(candidate));
                    values.forEach(value => {
                        otherCells.forEach(otherCell => {
                            var otherVals = Array.from(Array(9), (_, index) => (index + 1).toString());
                            var otherValue = parseInt(otherCell.given || otherCell.value || otherCell.normal);
                            if(otherValue) {
                                otherVals = [otherValue];
                            } else if(useCandidates && otherCell.centres.length > 0) {
                                otherVals = otherCell.centres.map(candidate => parseInt(candidate));
                            }
                            if(otherVals.length > 0 && otherVals.every(v => Math.abs(value - v) < 5 )) {
                                eraseCell(c, value.toString());
                            }
                        });
                    });
                }
            });
        }
    });
}

function autoEraseRenban(targetCell, useCandidates) {
    if(!Framework.settings['renban']) return;

    Framework.app.sourcePuzzle.lines?.filter(line => {
        var rgb = hexToRGBA(line.color);
        return rgb[1] < 150 && rgb[0] > 220 && rgb[2] > 220;
    }).forEach(line => {
        var lineCells = [];
        var row = null, col = null;
        line.wayPoints.forEach((point) => {
            while(row != Math.floor(point[0]) || col != Math.floor(point[1])) {
                row += row === null ? Math.floor(point[0]) : Math.sign(Math.floor(point[0]) - row);
                col += col === null ? Math.floor(point[1]) : Math.sign(Math.floor(point[1]) - col);
                lineCells.push(Framework.app.grid.getCell(row, col));
            }        
        });

        if(!targetCell || lineCells.includes(targetCell)) {
            var lineMin = 1;
            var lineMax = 9;
            var givens = [];
            var group = findGroup(lineCells) || [];
            group = group.map(value => parseInt(value));

            lineCells.forEach(lineCell => {
                var min = 1;
                var max = 9;

                if(useCandidates && lineCell.centres.length > 0) {
                    min = Math.min.apply(null, lineCell.centres.map(candidate => parseInt(candidate)).filter(candidate => candidate > min)) - 1;
                    max = Math.max.apply(null, lineCell.centres.map(candidate => parseInt(candidate)));    
                }  
                min = parseInt(lineCell.given || lineCell.value || lineCell.normal || min);
                max = parseInt(lineCell.given || lineCell.value || lineCell.normal || max);

                if(lineCell.given || lineCell.value) {
                    givens.push(lineCell.given || lineCell.value || lineCell.normal);
                }

                lineMin = Math.max(lineMin, min - lineCells.length + 1);
                lineMax = Math.min(lineMax, max + lineCells.length - 1);
            });

            if(givens.length > 0 || group.length > 0) {
                lineMin = Math.max(lineMin, Math.max.apply(null, givens.concat(group)) - lineCells.length + 1);
                lineMax = Math.min(lineMax, Math.min.apply(null, givens.concat(group)) + lineCells.length - 1);
            }

            lineCells.filter(c => !c.given && !c.value && !c.normal).forEach(c => {
                group = findGroup(lineCells.filter(cell => c != cell)) || [];
                group = group.map(value => parseInt(value));
                if(!targetCell || targetCell == c) {
                    var values = c.centres.map(candidate => parseInt(candidate));
                    values.forEach(value => { 
                        if(value < lineMin || value > lineMax || givens.includes(value) || group.includes(value) ) {
                            eraseCell(c, value.toString());
                        }
                    });
                }
            });
        }
    });
}

function autoEraseThermos(targetCell, useCandidates) {
    if(!Framework.settings['thermos']) return;

    var thermos = Framework.app.currentPuzzle.thermos.filter(thermo => isThermo(thermo)).reduce((thermos, thermo) => {
        if(!thermos[thermo.line.wayPoints])
        {
            thermos[thermo.line.wayPoints] = { cells: [], hasTarget: !targetCell};

            var row = null, col = null, min = 0
            thermo.line.wayPoints.forEach((point) => {
                while(row != Math.floor(point[0]) || col != Math.floor(point[1])) {
                    var max = 9;
                    row += row === null ? Math.floor(point[0]) : Math.sign(Math.floor(point[0]) - row);
                    col += col === null ? Math.floor(point[1]) : Math.sign(Math.floor(point[1]) - col);
                    var cell = Framework.app.grid.getCell(row, col);
                    if(cell == targetCell) {
                        thermos[thermo.line.wayPoints].hasTarget = true;
                    }
                    if(useCandidates && cell.centres.length > 0) {
                        min = Math.min.apply(null, cell.centres.map(candidate => parseInt(candidate)).filter(candidate => candidate > min)) - 1;
                        max = Math.max.apply(null, cell.centres.map(candidate => parseInt(candidate)));    
                    }  
                    min = parseInt(cell.given || cell.value || cell.normal || min + 1);
                    max = parseInt(cell.given || cell.value || cell.normal || max);
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
    return  Framework.app.sourcePuzzle.overlays?.filter(lay => lay.rounded && lay.height >= 0.65 && lay.width >= 0.65).some(lay => lay.backgroundColor?.slice(0, 6) == thermo.line.color.slice(0, 6) && lay.center[0] == thermo.line.wayPoints[0][0] && lay.center[1] == thermo.line.wayPoints[0][1] ) || 
            Framework.app.sourcePuzzle.underlays?.filter(lay => lay.rounded && lay.height >= 0.65 && lay.width >= 0.65).some(lay => lay.backgroundColor?.slice(0, 6) == thermo.line.color.slice(0, 6) && lay.center[0] == thermo.line.wayPoints[0][0] && lay.center[1] == thermo.line.wayPoints[0][1] );
}

function autoEraseKropkis(targetCell, useCandidates) {
    if(!Framework.settings['kropkis']) return;

    Framework.app.currentPuzzle.kropkis.filter(kropki => kropki.backgroundColor == "#FFFFFF" || kropki.backgroundColor == "#000000").forEach(kropki => {
        var cells = getCells(kropki.center);
        if(!targetCell || cells.includes(targetCell)) { 
            var values = Array.from(Array(9), (_, index) => index + 1);
            
            cells.filter(cell => !cell.given && !cell.value && !cell.normal && (cell == targetCell || !targetCell)).forEach(cell => {
                var otherCell = cells.find(c => c != cell);
                var value = parseInt(otherCell.given || otherCell.value || otherCell.normal);
                if(value) {
                    values = [value];
                } else if(useCandidates && otherCell.centres.length > 0) {
                    values = otherCell.centres.map(candidate => parseInt(candidate));
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
    if(!Framework.settings['inequality']) return;
    
    Framework.app.currentPuzzle.inequality.filter(inequality => inequality.type == "inequality").forEach(inequality => {
        var cells = getCells(inequality.part.center);

        cells.filter(cell => !cell.given && !cell.value && !cell.normal && cell == targetCell).forEach(cell => {
            var otherCell = cells.find(c => c != cell);
            var value = parseInt(otherCell.given || otherCell.value || otherCell.normal);
            if(!value && useCandidates && cell.centres.length > 0) {
                if(inequality.part.text === "<") {
                    value = Math.min.apply(null, otherCell.centres.map(candidate => parseInt(candidate)));
                } else {
                    value = Math.max.apply(null, otherCell.centres.map(candidate => parseInt(candidate)));    
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
    if(!Framework.settings['xvs']) return;

    Framework.app.currentPuzzle.xvs.filter(xvs => xvs.text == "X" || xvs.text == "V").forEach(xvs => {
        var cells = getCells(xvs.center);
        if(!targetCell || cells.includes(targetCell)) {
            var values = Array.from(Array(9), (_, index) => index + 1);
            
            var sum = xvs.text == "X" ? 10 : 5;  
            cells.filter(cell => !cell.given && !cell.value && !cell.normal && cell == targetCell).forEach(cell => {
                var otherCell = cells.find(c => c != cell);
                var value = parseInt(otherCell.given || otherCell.value || otherCell.normal);
                if(value) {
                    values = [value];
                } else if(useCandidates && otherCell.centres.length > 0) {
                    values = otherCell.centres.map(candidate => parseInt(candidate));
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
    if(!Framework.settings['cages']) return;
    
    Framework.app.currentPuzzle.cages.filter(cage => cage.style == "killer" && cage.sum).forEach(cage => {
        var cageCells = Framework.app.puzzle.parseCells(cage.cells);
        if(!targetCell || cageCells.includes(targetCell)) {
            cageCells.filter(c => !c.given && !c.value && !c.normal).forEach(c => {
                if(!targetCell || targetCell == c) {
                    var values = c.centres.map(candidate => parseInt(candidate));
                    var otherCells = cageCells.filter(cell => cell != c);
                    values.forEach(value => {
                        if(otherCells.length > 0) {
                            var otherCageCellVals = [];
                            if(otherCells.length > 0 && otherCells.every(c => c.given || c.value || c.normal) || useCandidates) {
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

function eraseCell(cell, value) {
    removeFrom(cell.centres, value);
    removeFrom(cell.corners, value);
    autoColour(cell);
}

function addTo(array, value) {
    var index = array.indexOf(value);
    if (index == -1) {
        array.push(value);
    }
}

function removeFrom(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function toggle(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    } else {
        array.push(value);
    }
}

function pencilMark(fill = true) {
    working = true;
    var cells = Framework.app.puzzle.selectedCells.length > 0 ? Framework.app.puzzle.selectedCells : Framework.app.puzzle.cells;
    if(fill) {
        Framework.app.puzzle.cells.forEach(cell => {
            if(cell.given || cell.value) {
                cell.centres = [cell.given || cell.value];
                cell.corners = [cell.given || cell.value];
            } else {
                if(cell.givenCentremarks.length == 0) {
                    cell.centres = cells.includes(cell) ? Array.from(Array(9), (_, index) => (index + 1).toString()) : cell.candidates.map(x => x);
                } else {
                    cell.centres = cell.givenCentremarks.map(x => x);
                }
                if(cell.givenCornermarks.length == 0) {
                    cell.corners = cell.pencilmarks.map(x => x);
                } else {
                    cell.corners = cell.givenCentremarks.map(x => x);
                }
            }
            cell.normal = null;
            cell.colors = cell.colours.map(x => x);
        });
    }
    cells.forEach(cell => {
        autoErase(cell, true);
        
        autoEraseKropkis(cell, true);
        autoEraseXVS(cell, true);
        autoEraseInequality(cell, true);
        autoEraseThermos(cell, true);
        autoEraseCages(cell, true);
        autoEraseArrows(cell, true);
        autoEraseGermanWhisper(cell, true);
        autoEraseRenban(cell, true);
        
        autoErase(cell, true);
        autoColour(cell, true);
        if(Framework.settings['auto-fill'] && !cell.given && !cell.value && cell.centres.length == 1) {
            cell.normal = cell.centres[0];
        }
    });
    if(fill) {
        pencilMark(false);
        return;
    } 
    autoFill();
    main();
    working = false;
}

function autoFill() {
    var selectedCells = Framework.app.puzzle.selectedCells.map(c => c);
    var prevTool =  Framework.app.tool;

    var changes = false;
    for(var value = 1; value <= 9; value++) {
        var targetCells = Framework.app.puzzle.cells.filter(cell => !cell.given && !cell.value && !cell.normal &&
            ((cell.candidates.concat(cell.givenCentremarks).includes(value.toString()) && !cell.centres.includes(value.toString())) || 
             (!cell.candidates.concat(cell.givenCentremarks).includes(value.toString()) && cell.centres.includes(value.toString()))
            ));
        if(targetCells.length > 0) {
            if(Framework.app.tool != 'centre') {
                Framework.app.changeTool('centre');
            }
            if(Framework.app.puzzle.selectedCells != targetCells) {
                Framework.app.deselect(Framework.app.puzzle.selectedCells);
                Framework.app.select(targetCells);
            }
            Framework.app.doPressDigit(value.toString());
            changes = true;
        }
        targetCells = Framework.app.puzzle.cells.filter(cell => !cell.given && !cell.value && !cell.normal &&
            ((cell.pencilmarks.concat(cell.givenCentremarks).includes(value.toString()) && !cell.corners.includes(value.toString())) || 
             (!cell.pencilmarks.concat(cell.givenCentremarks).includes(value.toString()) && cell.corners.includes(value.toString()))
            ));
        if(targetCells.length > 0) {
            if(Framework.app.tool != 'corner') {
                Framework.app.changeTool('corner');
            }
            if(Framework.app.puzzle.selectedCells != targetCells) {
                Framework.app.deselect(Framework.app.puzzle.selectedCells);
                Framework.app.select(targetCells);
            }
            Framework.app.doPressDigit(value.toString());
            changes = true;
        }

        targetCells = Framework.app.puzzle.cells.filter(cell => 
            ((cell.colours.includes(value.toString()) && !cell.colors.includes(value.toString())) || 
             (!cell.colours.includes(value.toString()) && cell.colors.includes(value.toString()))
            ));
        if(targetCells.length > 0) {
            if(Framework.app.tool != 'colour') {
                Framework.app.changeTool('colour');
            }
            if(Framework.app.puzzle.selectedCells != targetCells) {
                Framework.app.deselect(Framework.app.puzzle.selectedCells);
                Framework.app.select(targetCells);
            }
            Framework.app.doPressDigit(value.toString());
            changes = true;
        }

        targetCells = Framework.app.puzzle.cells.filter(cell => !cell.given && !cell.value && cell.normal == value.toString());
        if(targetCells.length > 0) {
            if(Framework.app.tool != 'normal') {
                Framework.app.changeTool('normal');
            }
            if(Framework.app.puzzle.selectedCells != targetCells) {
                Framework.app.deselect(Framework.app.puzzle.selectedCells);
                Framework.app.select(targetCells);
            }
            Framework.app.doPressDigit(value.toString());
            changes = true;
        }
    }

    if(changes) {
        if(Framework.app.puzzle.selectedCells != targetCells) {
            Framework.app.deselect(Framework.app.puzzle.selectedCells);
            Framework.app.select(selectedCells);
        }
        if(Framework.app.tool != prevTool) {
            Framework.app.changeTool(prevTool);
        }     
    }
}

function calculateValues() {
    var selectedCells = Framework.app.puzzle.selectedCells.filter(c => c.given || c.value || c.normal || c.centres?.length > 0);
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

function calculateValuesInner(selectedCells, targetCell, targetCandidate, blanks) {
    var cellGroups = getCellGroups(selectedCells);

    var usedCells = [];
    var vals = null;
    while(usedCells.length < selectedCells.length) {
        var cells = getNextCellGroup(selectedCells, cellGroups, usedCells);
        var cellGroupVals;
        if(cells.includes(targetCell)) {
            cellGroupVals= getAllValues(cells.filter(c => c != targetCell), [targetCandidate], blanks);
        } else {
            cellGroupVals= getAllValues(cells, [], blanks);
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
        var cageCells = Framework.app.puzzle.parseCells(cage.cells); 
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
        var currentCandidates = currentCells.reduce((a, b) => (b.given || b.value || b.normal) ? a.concat([b.given || b.value || b.normal]) : a.concat(b.centres), []).filter((value, index, self) => self.indexOf(value) === index);

        if(selectedCells.filter(cell => !usedCells.includes(cell)).every(cell => currentCells.includes(cell))) {
            return currentCells;
        }

        var prevCells = prev.filter(cell => !usedCells.includes(cell));
        var prevCandidates = prevCells.reduce((a, b) => (b.given || b.value || b.normal) ? a.concat([b.given || b.value || b.normal]) : a.concat(b.centres), []).filter((value, index, self) => self.indexOf(value) === index);

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
    var value = cell.given || cell.value || cell.normal;
    if(value) {
        vals.push(parseInt(value));
    } else if(cell.centres.length > 0) {
        vals = cell.centres.map(candidate => parseInt(candidate));
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

function hexToRGBA(hex) {
    var len = hex.length - 1;
    return hex.replace('#', '').match(new RegExp('(.{' + 2 + '})', 'g')).map(l => { return parseInt(len%2 ? l+l : l, 16) });
}