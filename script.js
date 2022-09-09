// genearte random number that will duplicate in three boxes, to ensure at everypoint there are three boxes with same number, 
// and ensure random number is not zero, kn -> key number
a = 0;
do {
    kn = Math.floor(Math.random() * 10)
    if (kn == 0) {
        a++;
    } else {
        a = 0;
    }
} while (a > 0)
// console.log('key number duplicated in three tiles')
// console.log(kn);

// generate 3 random array index loactions numbers where kn will be duplicated
let knpositions = [];
while (knpositions.length < 3) {
    c = Math.floor(Math.random() * 10);
    if (c < 9) { //ensure number is not more than needed max array index position of 8
        if (!knpositions.includes(c)) { //ensure a random number generated before is not pushed to the array, as one tile can't have 2 diff loaction index
            knpositions.push(c);
        }
    }
}
// console.log('array index position of key value')
// console.log(knpositions);

//generate random numbers and store in array
let randomnumbers = []; //array thats stores value
while (randomnumbers.length < 9) {
    e = randomnumbers.length; //index value for current array position a random number want to be assigned
    var i = Math.floor(Math.random() * 10);
    if (i != 0) { //ensure 0 is not assigned to the array
        if (i != kn) { //ensure key number is not assigned to the array again
            if (knpositions.includes(e)) { //assigns key number once array position includes any of the 3 random generated array positions
                randomnumbers.push(kn);
            } else {
                randomnumbers.push(i);
            }
        }
    }
}
// console.log('random numbers generated')
// console.log(randomnumbers);

//reverse arrangement of items in a array
randomnumbersreverse = [];
for (i = 0; i < 9; i++) {
    f = randomnumbers[i];
    randomnumbersreverse.unshift(f);
}
// console.log('reverse of randomnumbers array');
// console.log(randomnumbersreverse);

//onclick function to color all tiles with random number that occured 3 or more times
let tilevalues = document.getElementsByClassName('tilevalue');
let tile = document.getElementsByClassName('tile');
function showtilevalues() {
    //change top display text to play again button
    document.getElementById('headertext').style.display = 'none';
    document.getElementById('predictagain').style.display = 'block';
    document.getElementById('completedoverlay').style.display = 'none'; //remove overlay
    //assign random generated numbers to tiles
    for (i = 0; i < 9; i++) {
        tilevalues[i].innerHTML = randomnumbers[i];
    }

    //determine which numbers in randomnumbers array occur three times or more
    let threeoccurencesvalues = []; //array to store random values that occur three times or more
    function threeoccurences(n) {
        if (!threeoccurencesvalues.includes(n)) { //allows function only run on random numbers that haven't passed the test before
            i = 0;
            occurence = 0;
            while (i < 9) {
                if (n == randomnumbers[i]) {
                    occurence++;
                }
                i++
            }

            if (occurence > 2) {
                threeoccurencesvalues.push(n);
            }
        }
    }
    randomnumbers.forEach(threeoccurences);

    //get tiles with the numbers that ocuurs more than 3 times and give them same color
    for (i = 0; i < 9; i++) {
        var d = Number(tilevalues[i].innerHTML); //covert tile numbers which are in string to number type to match threeoccurencesvalues type
        if (threeoccurencesvalues.includes(d)) {
            tilevalues[i].style.textShadow = '2px 2px 100px #5eff00, -2px -2px 100px #5eff00, -2px 2px 100px #5eff00, 2px -2px 100px #5eff00';
        }
    }
}

//function for action after fourth selection so we can delay it exceution after fourth selections is displayed

// let indexofselectedtiles = {}; //object to store selected tile values and array index as key value pair
// let indexofselectedtiles = new Map(); //map variable to store tile values and array index as key value pair
function afterfourthselection() {
    console.log('selected numbers -> ' + selectedtiles)
    console.log('selected numbers index -> ' + selectedtilesindex)

    //loop items into an object variable - indexofselectedtiles
    // for (i=0; i<4; i++){
    //     indexofselectedtiles[selectedtiles[i]] = selectedtilesindex[i];
    // }
    // console.log(indexofselectedtiles);

    //creating array of arrays to enable you use both key and value items in operations - Object.entries() Method
    // entries = Object.entries(indexofselectedtiles);
    // console.log(entries)

    //loop items into an map variable - indexofselectedtiles
    // for (i=0; i<4; i++){
    //     indexofselectedtiles.set(selectedtiles[i], selectedtilesindex[i]);
    // }
    // console.log(indexofselectedtiles); // result was same with array, taken only last index value for same numbers

    selectedtiles.forEach(selected3occurences);
    if (selectedtiles3occured.length == 3) {
        //get the selected tiles with 3 same occured value and color same color
        for (i = 0; i < 9; i++) {
            var d = Number(tilevalues[i].innerHTML); //covert tile numbers which are in string to number type to match threeoccurencesvalues type
            if (selectedtiles3occured.includes(d)) {
                tilevalues[i].style.textShadow = '2px 2px 100px #5eff00, -2px -2px 100px #5eff00, -2px 2px 100px #5eff00, 2px -2px 100px #5eff00';
            }
        }
        for (i = 0; i < 9; i++) {
            if (!selectedtilesindex.includes(i)) {
                tile[i].onclick = '';
                tile[i].style.cursor = 'default';
                tilevalues[i].style.textShadow = '2px 2px 80px #0048ff, -2px -2px 80px #0048ff, -2px 2px 80px #0048ff, 2px -2px 80px #0048ff';
            }
        }
        setTimeout(successpredict, 100);
    } else {
        for (i = 0; i < 4; i++) {
            tilevalues[selectedtilesindex[i]].style.textShadow = '2px 2px 100px #ff5757, -2px -2px 100px #ff5757, -2px 2px 100px #ff5757, 2px -2px 100px #ff5757';
        }
        for (i = 0; i < 9; i++) {
            if (!selectedtilesindex.includes(i)) {
                tile[i].onclick = '';
                tile[i].style.cursor = 'default';
                tilevalues[i].style.textShadow = '2px 2px 80px #0048ff, -2px -2px 80px #0048ff, -2px 2px 80px #0048ff, 2px -2px 80px #0048ff';
            }
        }
        setTimeout(failedpredict, 100);
    }
}

//function for successful prediction
function successpredict() {
    document.getElementById('headertext').innerHTML = 'Congratulations!, you predicted the future';
    document.getElementById('headertext').style.textShadow = '2px 2px 100px #5eff00, -2px -2px 100px #5eff00, -2px 2px 100px #5eff00, 2px -2px 100px #5eff00';
    localStorage.success = Number(localStorage.success) + 1;
    localStorage.attempts = Number(localStorage.attempts) + 1;
    document.getElementById('predictionattempts').innerHTML = localStorage.attempts;
    document.getElementById('predictionsuccess').innerHTML = localStorage.success;
    document.getElementById('completedoverlay').style.display = 'block';
    // alert('YOU PREDICTED THE FUTURE')
}

//function for failed prediction
function failedpredict() {
    document.getElementById('headertext').innerHTML = 'You failed to predict the future';
    document.getElementById('headertext').style.textShadow = '2px 2px 100px #ff5757, -2px -2px 100px #ff5757, -2px 2px 100px #ff5757, 2px -2px 100px #ff5757';
    localStorage.attempts = Number(localStorage.attempts) + 1;
    document.getElementById('predictionattempts').innerHTML = localStorage.attempts;
    document.getElementById('completedoverlay').style.display = 'block';
    // alert('YOU FAILED TO PREDICT THE FUTURE')
}

//function to check if three out of four tiles have same number after fourth tile selection
selectedtiles3occured = []
function selected3occurences(n) {
    let i = 0;
    selectoccurence = 0;
    while (i < 4) {
        if (n == selectedtiles[i]) {
            selectoccurence++;
        }
        i++
    }

    if (selectoccurence > 2) {
        selectedtiles3occured.push(n);
    }
}


//the main engine
let index = 1;
selectedtiles = [];
selectedtilesindex = [];
function tileselect(n) {
    tile[n].onclick = ''; //diable onclick function after click
    tile[n].style.cursor = 'default'; //disbale css pointer effect
    //disable hover effect by seeting color to default tile color
    tilevalues[n].style.textShadow = '2px 2px 80px #0048ff, -2px -2px 80px #0048ff, -2px 2px 80px #0048ff, 2px -2px 80px #0048ff';
    if (index < 4) {
        tilevalues[n].innerHTML = randomnumbers[n];
        selectedtiles.push(randomnumbers[n])
        selectedtilesindex.push(n);
        if (selectedtiles.length == 3) {
            num1 = selectedtiles[0];
            num2 = selectedtiles[1];
            num3 = selectedtiles[2];
            //color all selected tiles green if they are same number
            if (num1 == num2 && num1 == num3) {
                for (i = 0; i < 3; i++) {
                    tilevalues[selectedtilesindex[i]].style.textShadow = '2px 2px 100px #5eff00, -2px -2px 100px #5eff00, -2px 2px 100px #5eff00, 2px -2px 100px #5eff00';
                }
                //deactivate onclick functions on other unselected tiles
                for (i = 0; i < 9; i++) {
                    if (!selectedtilesindex.includes(i)) {
                        tile[i].onclick = '';
                        tile[i].style.cursor = 'default';
                        tilevalues[i].style.textShadow = '2px 2px 80px #0048ff, -2px -2px 80px #0048ff, -2px 2px 80px #0048ff, 2px -2px 80px #0048ff';
                    }
                }
                setTimeout(successpredict, 100);
            }
        }
        index++;
    } else {
        tilevalues[n].innerHTML = randomnumbers[n];
        selectedtiles.push(randomnumbers[n])
        selectedtilesindex.push(n);
        setTimeout(afterfourthselection, 100);
    }
}

//clear all data saved in local storage
function initiateclearprogress() {
    document.getElementById('clearprogressoverlay').style.display = 'block';
}

function dontclearprogress() {
    document.getElementById('clearprogressoverlay').style.display = 'none';
}

function clearprogress() {
    localStorage.clear();
    location.replace('index.html');
}

//display playername
document.getElementById('playernametext').innerHTML = localStorage.playername;
document.getElementById('predictionattempts').innerHTML = localStorage.attempts;
document.getElementById('predictionsuccess').innerHTML = localStorage.success;

//to play again
function predictagain() {
    location.reload();
}

let enlargedgameinfocssstyle = { //create object variable containing CSS attributes i want to change
    transform: 'scale(1,1)'
};
let gameinfocard = document.getElementById('gameinfocard');

function gameinfo() {
    Object.assign(gameinfocard.style, enlargedgameinfocssstyle); //update selected CSS attribute
    document.getElementById('hidegameinfocard').style.display = 'block';
}

let defaultgameinfocssstyle = {
    transform: 'scale(0,0)'
};

function hidegameinfocard() {
    Object.assign(gameinfocard.style, defaultgameinfocssstyle);
    document.getElementById('hidegameinfocard').style.display = 'none';
}
