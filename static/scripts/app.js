/**
 * Application of Principles of Programming
 * Assignment Template 2021 - Javascript
 * @author Tim Orman
 */

/**
 * event handlers can go here
 */
//global Function handlers
getJournalEntries();
getThoughtEntries();
getRandomThought();

//onload handler
window.onload = function () {
    const journal = document.querySelector('#listEntries li');
    journal.setAttribute("class", "active");
    document.getElementById("idEntry").setAttribute("value", journal.getAttribute("id"));
    document.getElementById("namEntry").setAttribute("value", journal.getAttribute("name"));
    document.getElementById("dateEntry").setAttribute("value", journal.getAttribute("date"));
    document.getElementById("txtNote").value = journal.getAttribute("note");

    const thought = document.querySelector('#thoughtEntries li');
    thought.setAttribute("class", "active");
    document.getElementById("thoughtEntry").value = thought.getAttribute("value");

    const moveTo = document.getElementById("moveTop");
    moveTo.style.display = "none";

    const currentTime = new Date();
    const dateTime = currentTime.getDate() + "/" + (currentTime.getMonth() + 1) + "/" + currentTime.getFullYear();
    document.getElementById("dateAdd").setAttribute("value", dateTime);

};

//calculator event handlers - one for each button
document.getElementById("btnAddAPI").addEventListener("click", addNumbersAPI);

document.getElementById("btnSubtract").addEventListener("click", subtractNumbers);
document.getElementById("btnSubtractAPI").addEventListener("click", subtractNumbersAPI);

document.getElementById("btnMultiply").addEventListener("click", multiplyNumbers);
document.getElementById("btnMultiplyAPI").addEventListener("click", multiplyNumbersAPI);

document.getElementById("btnDivide").addEventListener("click", divideNumbers);
document.getElementById("btnDivideAPI").addEventListener("click", divideNumbersAPI);

//calculator blocked input handlers
document.getElementById("inputAdd").disabled = true;
document.getElementById("inputSubtract").disabled = true;
document.getElementById("inputMultiply").disabled = true;
document.getElementById("inputDivide").disabled = true;

//selected-journal blocked input handlers
document.getElementById("idEntry").disabled = true;
document.getElementById("namEntry").disabled = true;
document.getElementById("dateEntry").disabled = true;
document.getElementById("txtNote").disabled = true;

//add-journal blocked input handler
document.getElementById("dateAdd").disabled = true;

//selected-thought blocked input handler
document.getElementById("thoughtEntry").disabled = true;

//journal event handlers
document.getElementById("btnDeleteEntry").addEventListener("click", deleteJournal);
document.getElementById("btnAddEntry").addEventListener("click", addJournal);

document.getElementById("btnUploadJournal1").addEventListener("click", uploadJournal);
document.getElementById("btnUploadJournal2").addEventListener("click", uploadJournal);

//thought event handlers
document.querySelector("#btnRefreshThoughts").addEventListener("click", getRandomThought);

document.querySelector("#btnEditThoughts").addEventListener("click", toggleModal);
document.querySelector(".modalClose").addEventListener("click", toggleModal);

window.onclick = function(event) {
    const modal = document.getElementById("toggleModal");

    if (event.target === modal) {
        let moveTo = document.getElementById("moveTop");
        moveTo.style.display = "none";
        toggleModal();
    }
};

document.getElementById("btnThoughtRemove").addEventListener("click", deleteThought);
document.getElementById("btnThoughtAdd").addEventListener("click", addThought);
document.getElementById("btnUploadThought1").addEventListener("click", uploadThought);
document.getElementById("btnUploadThought2").addEventListener("click", uploadThought);

//scroll top handler
window.onscroll = function() {
    scrollHandler();
};
document.getElementById("moveTop").addEventListener("click", scrollBack);
window.onscroll = function() {
    scrollHandler();
};
document.getElementById("moveTop").addEventListener("click", scrollBack);

//send user to JSON format
/**
 * callAPI()
 *
 * This function uses the built-in (to the browser) XMLHttpRequest object to request data from a server
 * The responseText property returns the response from the server as a string.
 *
 * @param {String} url The URL is requested from the Arithmetic sections with the contents that get sent to the back-end
 * @param {String} elResponse This gets the ID that the arithmetic value should be housed in
 */

function callAPI(url, elResponse) {
    let xmlHttp = new XMLHttpRequest();
    let response = "";

    xmlHttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            response = JSON.parse(this.responseText);
            document.getElementById(elResponse).setAttribute("value", response.result);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

/**
 * Calculator Stuff
 */
/**
 * addNumbers()
 *
 * This Function performs a basic front-end calculation using the + operator, thus, 3+2=5 when called.
 */

function addNumbers(){
    let num1 = Number(document.getElementById("add1").value);
    let num2 = Number(document.getElementById("add2").value);
    let result = num1 + num2;

    document.getElementById("inputAdd").setAttribute("value", result);
}

/**
 * addNumbersAPI()
 *
 * This Function performs a back-end calculation. By doing so, the functions uses callAPI() function
 * to send the URL and the designated location for the addition when called.
 *
 * The request houses the operation type, thus, api/add...
 */

function addNumbersAPI(){
    let num1 = Number(document.getElementById("add1").value);
    let num2 = Number(document.getElementById("add2").value);
    let request = `api/add?num1=${num1}&num2=${num2}`;

    callAPI(request, "inputAdd");
}

/**
 * subtractNumbers()
 *
 * This Function performs a basic front-end calculation using the - operator, thus, 3-2=1 when called.
 */

function subtractNumbers(){
    let num1 = Number(document.getElementById("sub1").value);
    let num2 = Number(document.getElementById("sub2").value);
    let result = num1 - num2;

    document.getElementById("inputSubtract").setAttribute("value", result);
}

/**
 * subtractNumbersAPI()
 *
 * This Function performs a back-end calculation. By doing so, the functions uses callAPI() function
 * to send the URL and the designated location for the subtraction when called.
 *
 * The request houses the operation type, thus, api/subtract...
 */

function subtractNumbersAPI(){
    let num1 = Number(document.getElementById("sub1").value);
    let num2 = Number(document.getElementById("sub2").value);
    let request = `api/subtract?num1=${num1}&num2=${num2}`;

    callAPI(request, "inputSubtract");
}

/**
 * multiplyNumbers()
 * This function should perform the calculation in the app.py file
 *
 * This Function performs a basic front-end calculation using the * operator, thus, 3*2=6 when called.
 */

function multiplyNumbers(){
    let num1 = Number(document.getElementById("multi1").value);
    let num2 = Number(document.getElementById("multi2").value);
    let result = num1 * num2;

    document.getElementById("inputMultiply").setAttribute("value", result);
}

/**
 * multiplyNumbersAPI()
 *
 * This Function performs a back-end calculation. By doing so, the functions uses callAPI() function
 * to send the URL and the designated location for the multiplication when called.
 *
 * The request houses the operation type, thus, api/multiply...
 */

function multiplyNumbersAPI(){
    let num1 = Number(document.getElementById("multi1").value);
    let num2 = Number(document.getElementById("multi2").value);
    let request = `api/multiply?num1=${num1}&num2=${num2}`;

    callAPI(request, "inputMultiply");
}

/**
 * divideNumbers()
 *
 * This Function performs a basic front-end calculation using the + operator, thus, 3%2=1.5 when called.
 *
 * Alongside the arithmetic calculation, the divideNumbers will also get the denominator if it is 0, and
 * then return #DIV/0 which is used in many software's to tell the user that the 0 needs to be replaced.
 */

function divideNumbers(){
    let num1 = Number(document.getElementById("divi1").value);
    let num2 = Number(document.getElementById("divi2").value);
    let result = "";

    if (num2 !== 0) {
        result = num1 / num2;
    } else {
        result = "#DIV/0";
    }

    document.getElementById("inputDivide").setAttribute("value", result);
}

/**
 * divideNumbersAPI()
 *
 * This Function performs a back-end calculation. By doing so, the functions uses callAPI() function
 * to send the URL and the designated location for the division when called.
 *
 * The request houses the operation type, thus, api/divide...
 */

function divideNumbersAPI(){
    let num1 = Number(document.getElementById("divi1").value);
    let num2 = Number(document.getElementById("divi2").value);
    let request = `api/divide?num1=${num1}&num2=${num2}`;

    callAPI(request, "inputDivide");
}

/**
 * Journal Stuff
 */
/**
 * getJournalEntries() - Get list of journal entries
 *
 * This function retrieves the JSON file of the journal entries, from the window load. This then sends a request to the
 * flask server, which responds with the stringified data,then outputs then is the correct order, based on their value,
 * the for statement first checks for an ID, then it checks if ID already exist, thus, if an ID already
 * exist it will then append the else statement, rather than giving it a default counter value.
 *
 */
function getJournalEntries() {
    let url = "/api/journal";
    let xmlHttp = new XMLHttpRequest();
    let response = "";
    let result = "";
    let element = "";

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            response = JSON.parse(this.responseText);
            result = JSON.parse(JSON.stringify(response.result));

            result.journals.forEach((journal, index) => {
                if (journal.id === undefined) {
                    if (journal.id !== index) {
                        element += "<li onclick='populateJournal(this)' value='" + index +
                            "'id='" + index +
                            "'date='" + journal.date +
                            "'name='" + journal.name +
                            "'note='" + journal.note +
                            "'temp='" + String("temp") + "'>" +
                                String(journal.name + " (" + journal.date + ")") +
                            "</li>";
                    }
                } else {
                    element += "<li onclick='populateJournal(this)' value='" + journal.id +
                        "'id='" + journal.id +
                        "'date='" + journal.date +
                        "'name='" + journal.name +
                        "'note='" + journal.note + "'>" +
                        String(journal.name + " (" + journal.date + ")") +
                        "</li>";
                }
            });
            document.getElementById("listEntries").innerHTML = element;
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

/**
 * populateJournal(item)
 *
 * Get the data from a selected journal entry from item parameter, then passes the data into the select journal inputs,
 * alongside creating a active toggle on click of a entry, so that the users can understand the current selection.
 *
 * @param {Object} item Item consists of a variety of different properties which is displayed to the user
 */
function populateJournal(item) {
    document.querySelectorAll('#listEntries li.active').forEach(function (entry) {
        entry.removeAttribute("class");
    });
    item.setAttribute("class", "active");
    document.getElementById("idEntry").setAttribute("value", item.getAttribute("id"));
    document.getElementById("dateEntry").setAttribute("value", item.getAttribute("date"));
    document.getElementById("namEntry").setAttribute("value", item.getAttribute("name"));
    document.getElementById("txtNote").value = item.getAttribute("note");

    let wordCount = item.getAttribute("note").split(" ");
    document.getElementById("wordCount").innerHTML = `Notes: Words( ${wordCount.length} )`;
}


/**
 * addJournal() - add a journal entry
 *
 * Gets the DATA inputted in the journalAdd section, then created a new element with all the attributes given from the
 * user, whilst doing so, this sets up the upload function with the correct values locally, so that pre-existin ID's
 * don't get wiped on upload, therefore, retaining their value.
 */


function addJournal(){
    let newJournal = {
        id: document.getElementById("idAdd").value,
        name: document.getElementById("nameAdd").value,
        date: document.getElementById("dateAdd").value,
        note: document.getElementById("txtAdd").value
    };
    let element = document.createElement("LI");

    let date = newJournal.date.split(`-`);
    date.reverse();
    date = date.join(`/`);
    console.log(date);

    if (document.getElementById("idAdd").value.length === 0) {
        element.setAttribute("name", newJournal.name);
        element.setAttribute("date", date);
        element.setAttribute("note", newJournal.note);
        element.setAttribute("temp", "temp");
    } else {
        element.setAttribute("value", newJournal.id);
        element.setAttribute("id", newJournal.id);
        element.setAttribute("name", newJournal.name);
        element.setAttribute("date", date);
        element.setAttribute("note", newJournal.note);
    }

    element.onclick = function () {
        document.getElementById("idEntry").setAttribute("value", newJournal.id);
        document.getElementById("namEntry").setAttribute("value", newJournal.name);
        document.getElementById("dateEntry").setAttribute("value", date);
        document.getElementById("txtNote").value = newJournal.note;
    };

    let item = document.createTextNode(`${newJournal.name} (${date})`);
    element.appendChild(item);

    document.getElementById("listEntries").appendChild(element);
}

/**
 * deleteJournal()
 *
 * Deletes the selected entry locally, which can then be uploaded with the uploadJournal Section
 */

function deleteJournal(){
    let journal = document.getElementById("idEntry").getAttribute("value");
    document.querySelectorAll("#listEntries li[id='"+journal+"']")[0].remove();
}


/**
 * uploadJournal()
 *
 * Gets each of the list elements, stores them in an array, slices the tag element from them, then appends the pushed
 * data onto an array, which then gets stringify'd and sent to the JSON journal/put controller
 */

function uploadJournal(){
    let url = "/api/journal/post";
    let xmlHttp = new XMLHttpRequest();
    let ol = document.getElementById("listEntries");
    let journalEntry = Array.prototype.slice.call(ol.getElementsByTagName("li"), 0);
    let journalList = [];

    journalEntry.forEach((item) => {
        if (item.getAttribute("temp") === "temp") {
            journalList.push({
                name: item.getAttribute("name"),
                date: item.getAttribute("date"),
                note: item.getAttribute("note")
            });
        } else {
            journalList.push({
                id: item.getAttribute("id"),
                name: item.getAttribute("name"),
                date: item.getAttribute("date"),
                note: item.getAttribute("note")
            });
        }
    });
    journalList = JSON.stringify(journalList);

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            getJournalEntries();
        }
    };

    xmlHttp.open("PUT", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(journalList);
}

/**
 * Thoughts Stuff
 */
/**
 * getThoughtEntries() - Get list of thought entries
 *
 * This function retrieves the JSON file of the thought entries, from the window load. This then sends a request to the
 * flask server, which responds with the stringified data, and sets each to a unordered element.
 *
 */

function getThoughtEntries() {
    let url = "/api/thoughts";
    let xmlHttp = new XMLHttpRequest();
    let response = "";
    let result = "";
    let element = "";

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            response = JSON.parse(this.responseText);
            result = JSON.parse(JSON.stringify(response.result));

            result.thoughts.forEach((thought) => {
                element += "<li onclick='populateThoughts(this)' value='" + thought +"'>" +
                    String(`${thought}`) +
                "</li>";
            });
            document.getElementById("thoughtEntries").innerHTML = element;
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

/**
 * getThoughtEntries() - Get random thought
 *
 * This function retrieves the JSON file then uses a random function, to get a random entry from the JSON, and, thus,
 * drawing new text to the thought section each time.
 *
 */

function getRandomThought() {
    let url = "/api/thoughts";
    let xmlHttp = new XMLHttpRequest();
    let response = "";
    let result = "";


    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            response = JSON.parse(this.responseText);
            result = JSON.parse(JSON.stringify(response.result));

            let random = Math.floor(Math.random() * Object.keys(result.thoughts).length);

            document.getElementById("thoughtOfTheDay").innerHTML = result.thoughts[random];
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

/**
 * populateThought(item)
 *
 * Get the data from a selected thought entry from item parameter, then passes the data into the select thought inputs,
 * alongside creating a active toggle on click of a entry, so that the users can understand the current selection.
 *
 * @param {Object} item Item consists of a variety of different properties which is displayed to the user
 */

function populateThoughts(item) {
    document.querySelectorAll('#thoughtEntries li.active').forEach(function (entry) {
        entry.removeAttribute("class");
    });
    item.setAttribute("class", "active");
    document.getElementById("thoughtEntry").value = item.getAttribute("value");
}

/**
 * addThoughts() - add a thought entry
 *
 * Gets the DATA inputted in the thoughtAdd section, then created a new element with all the attributes given from the
 * user, whilst doing so, this sets up the upload function with the correct value being the thought.
 */

function addThought(){

    let thought = document.getElementById("thoughtAdd").value;

    let element = document.createElement("LI");
    element.onclick = function () {
        document.getElementById("thoughtEntry").value = thought;
    };

    let item = document.createTextNode(`${thought}`);
    element.setAttribute("value", thought);
    element.appendChild(item);

    document.getElementById("thoughtEntries").appendChild(element);
}

/**
 * deleteThought()
 *
 * Deletes the selected entry locally, which can then be uploaded with the uploadThought Section
 */

function deleteThought() {
    let thought = document.getElementById("thoughtEntry").value;
    document.querySelectorAll("#thoughtEntries li[value='"+thought+"']")[0].remove();
}

/**
 * uploadThought()
 *
 * Gets each of the list elements, stores them in an array, slices the tag element from them, then appends the pushed
 * data onto an array, which then gets stringify'd and sent to the JSON journal/put controller
 */

function uploadThought() {
    let url = "/api/thought/post";
    let xmlHttp = new XMLHttpRequest();
    let ol = document.getElementById("thoughtEntries");
    let thoughtEntry = Array.prototype.slice.call(ol.getElementsByTagName("li"), 0);
    let thoughtList = [];
    let index = 0;

    thoughtEntry.forEach((item) => {
        thoughtList.push(item.getAttribute("value"));
        index++;
    });

    thoughtList = JSON.stringify(thoughtList);

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            getThoughtEntries();
        }
    };

    xmlHttp.open("PUT", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(thoughtList);
}

/**
 * toggleModal()
 *
 * Creates a toggle for the Journal Modal, and by doing so disables scroll in the background, so that the div has
 * freedom to move with they user being distracted by the background moving alongside
 */

function toggleModal() {
    const modal = document.getElementById("toggleModal");

    if (modal.getAttribute("class") === "modalHidden") {
        modal.classList.replace("modalHidden", "modal");
        document.body.style.overflow = "hidden";
        window.scroll(0, 0);
    } else {
        modal.classList.replace("modal", "modalHidden");
        document.body.style.overflow = null;
    }

}

/**
 * Move top Stuff
 */

function scrollHandler() {
    let moveTo = document.getElementById("moveTop");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        moveTo.style.display = "block";
    } else {
        moveTo.style.display = "none";
    }
}

function scrollBack() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

/**
 * Utils
 */

async function copyText(output, id) {
    const copyText = document.getElementById(output).value;
    await navigator.clipboard.writeText(copyText);

    const original = document.getElementById(id).innerHTML;
    const idCSS = document.getElementById(id);

    document.getElementById(id).innerHTML = "Copied...";
    document.getElementById(id).disabled = true;
    idCSS.style.pointerEvents = "none";

    wait(3000).then(() => {
        document.getElementById(id).innerHTML = original;
        document.getElementById(id).disabled = false;
        idCSS.style.pointerEvents = "auto";
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}