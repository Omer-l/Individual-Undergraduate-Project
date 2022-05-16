let loginPrompt = false;
let name = '';
let readingMode = 0;
let quizMode = 1;
//Ensures fields are filled in or the right tab is shown
function parsePageURL() {
    //get URL
    const url = window.location.href;
    const search = url.split('?')[1];
    if(search != null && search.includes("login"))
        loginPrompt = true;
    const urlSearchParams = new URLSearchParams(search);
    const searchParams = Object.fromEntries(urlSearchParams.entries());
    // name = searchParams.login
    if(searchParams.length != 0) {
        if(searchParams.login != null) {
            name = searchParams.login;
        } else if(searchParams.register != null) {
            name = searchParams.register;
        }
    }
}

// Tabbed Menu switching
function openMenu(event, buttonName) {
    let i, x, tablinks;
    $('#LoginDiv').hide();
    $('#RegisterDiv').hide();
    tablinks = document.getElementsByClassName("btn-primary");
    document.getElementById(buttonName).style.display = "block";//show clicked tab
    event.currentTarget.firstElementChild.className += " active";
}

//When preference is selected
function preferenceSelected(preferenceName) {
    let preferenceSelectorId = preferenceName + 'PreferenceSelector';
    let preferenceDivId = '#' + preferenceName + 'PreferencesDiv';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        if (preference.selectedIndex == 1) {
            if(preferenceName == 'Quiz') quizMode = 1;
//    show preferences
            $(preferenceDivId).show();
        } else {
            if(preferenceName == 'Quiz') quizMode = 0;
            $(preferenceDivId).hide();
        }
    }
}

//When reading mode is selected
function readingModeSelected() {
    let preferenceSelectorId = 'ModeSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        if (preference.selectedIndex == 0) {
            readingMode = 0;
        } else {
            readingMode = 1;
        }
    }
}

//When number of words before quiz is selected
function secondsBeforeQuizSelected() {
    console.log("BDOING");
    let preferenceSelectorId = 'NumberOfWordsSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            secondsBeforeQuiz = 0;
        } else if(selected == 1){
            secondsBeforeQuiz = 10;
        } else if(selected == 2){
            secondsBeforeQuiz = 20;
        } else if(selected == 3){
            secondsBeforeQuiz = 30;
        } else if(selected == 4){
            secondsBeforeQuiz = 40;
        } else if(selected == 5){
            secondsBeforeQuiz = 50;
        } else if(selected == 6){
            secondsBeforeQuiz = 60;
        } else if(selected == 7){
            secondsBeforeQuiz = 90;
        }
    }
}

//When highlight color is selected
function highlightColorSelected() {
    console.log("BDOING");
    let preferenceSelectorId = 'NumberOfWordsSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            userSelectedHighlightColor = "Yellow";
        } else if(selected == 1){
            userSelectedHighlightColor = "LightSkyBlue";
        } else if(selected == 2){
            userSelectedHighlightColor = "LightGreen";
        }
    }
}

//When unhighlight color is selected
function unhighlightColorSelected() {
    console.log("BDOING");
    let preferenceSelectorId = 'UnhighlightColorSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            userSelectedUnhighlightColor = "Yellow";
        } else if(selected == 1){
            userSelectedUnhighlightColor = "LightSkyBlue";
        } else if(selected == 2){
            userSelectedUnhighlightColor = "LightGreen";
        }
    }
}

//When color of the background is selected
function backgroundColorSelected() {
    console.log("BDOING");
    let preferenceSelectorId = 'HighlightColorSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            userSelectedBackgroundColor = "White";
        } else if(selected == 1){
            userSelectedBackgroundColor = "RosyBrown";
        } else if(selected == 2){
            userSelectedBackgroundColor = "SkyBlue";
        }
    }
}

//When field of view is selected
function fieldOfViewSelected() {
    let preferenceSelectorId = 'FieldOfViewSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            userSelectedFieldOfView = 1;
        } else if(selected == 1){
            userSelectedFieldOfView = 2;
        } else if(selected == 2){
            userSelectedFieldOfView = 3;
        }
    }
}


//ensures registration or login buttons' are not activated until inputs are made
function activateButton(formName) {
    let userNameId = '#' + formName + "Username";
    let passwordId = '#' + formName + "Password";
    let name = $(userNameId).val();
    let password = $(passwordId).val();

    if(name.length > 0 && password.length > 0)
        document.getElementById(formName + "Button").disabled = false;
    else
        document.getElementById(formName + "Button").disabled = true;
}

//disables a given button id
function disableButton(buttonId) {
    document.getElementById(buttonId + "Button").disabled = true;
}

function signInUser() {
    let name = $('#LoginUsername').val();
    let password = $('#LoginPassword').val();
    loginUser(name, password);
}

//Outputs login and registration prompt to HTML
function outputLoginRegistrationToPage() {
    $("#EyeDocLogo").hide();
    $("#Logo").hide();
    $("#UserDetailsHolder").hide();
    document.getElementById("CheckLoginDiv").innerHTML =
        '<!-- Menu Container -->\n' +
        '<div class="w3-container" id="menu">\n' +
        '    <div class="w3-content" style="max-width:100%">\n' +
        '        <div class="w3-center w3-padding-48">\n' +
        '            <a href="index.html"><img href="index.html" src="EyeDoc.png" width="50" height="50"></a>\n' +
        '            <h1><span class="w3-tag w3-wide">EyeDoc</span></h1>\n' +
        '        </div>\n' +
        '        <div class="w3-row w3-center w3-card w3-padding">\n' +
        '            <button class="btn btn-lg btn-primary" href="javascript:void(0)" onclick="openMenu(event, \'LoginDiv\');" id="LoginTabButton">\n' +
        '                <div class="w3-col tablink">LOGIN</div>\n' +
        '            </button>\n' +
        '            <button class="btn btn-lg btn-primary" href="javascript:void(0)" onclick="openMenu(event, \'RegisterDiv\');" id="RegistrationTabButton">\n' +
        '                <div class="w3-col tablink">REGISTER</div>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '\n' +
        '        <div id="LoginDiv" class="w3-container menu w3-padding-48 w3-card ">\n' +
        '            <form>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="LoginUsername">Username</label>\n' +
        '                    <input type="username" class="form-control" id="LoginUsername" onkeyup="activateButton(\'Login\')">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="LoginPassword">Password</label>\n' +
        '                    <input type="password" class="form-control" id="LoginPassword" onkeyup="activateButton(\'Login\')">\n' +
        '                </div>\n' +
        '                <button type="button" class="btn btn-primary mb-2" id="LoginButton">Login</button>\n' +
        '        </div>\n' +
        '        <div id="RegisterDiv" class="w3-container menu w3-padding-48 w3-card">\n' +
        '            <form>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="RegistrationUsername">Username</label>\n' +
        '                    <input type="username" class="form-control" id="RegistrationUsername" onkeyup="activateButton(\'Registration\')">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="RegistrationPassword">Password</label>\n' +
        '                    <input type="password" class="form-control" id="RegistrationPassword" onkeyup="activateButton(\'Registration\')">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="PreferenceSelector">Preferences</label>\n' +
        '                    <select class="form-control" id="PreferenceSelector" onchange="preferenceSelected(\'\')">\n' +
        '                        <option>Default</option>\n' +
        '                        <option>Custom</option>\n' +
        '                    </select>\n' +
        '                </div>\n' +
        '                <div id="PreferencesDiv">\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="ModeSelector">Choose Mode</label>\n' +
        '                        <select class="form-control" id="ModeSelector" onchange="readingModeSelected()">\n' +
        '                            <option>Paragraph</option>\n' +
        '                            <option>Rapid Serial Visual Presentation</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group" id="QuizPreferencesDiv">\n' +
        '                        <label for="NumberOfWordsSelector">Seconds Before Quiz</label>\n' +
        '                        <select class="form-control" id="NumberOfWordsSelector" onchange="secondsBeforeQuizSelected()">\n' +
        '                            <option>Off</option>\n' +
        '                            <option>10</option>\n' +
        '                            <option>20</option>\n' +
        '                            <option>30</option>\n' +
        '                            <option>40</option>\n' +
        '                            <option>50</option>\n' +
        '                            <option>60</option>\n' +
        '                            <option>90</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group" id="backgroundPreferencesDiv">\n' +
        '                        <label for="BackgroundColorSelector">Background Color</label>\n' +
        '                        <select class="form-control" id="BackgroundColorSelector" onchange="backgroundColorSelected()">\n' +
        '                            <option>White</option>\n' +
        '                            <option>Rosy Brown</option>\n' +
        '                            <option>Sky Blue</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group" id="highlightPreferencesDiv">\n' +
        '                        <label for="HighlightColorSelector">Highlight Color</label>\n' +
        '                        <select class="form-control" id="HighlightColorSelector" onchange="highlightColorSelected()">\n' +
        '                            <option>Yellow</option>\n' +
        '                            <option>Light Sky Blue</option>\n' +
        '                            <option>Light Green</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group" id="unhighlightPreferencesDiv">\n' +
        '                        <label for="UnhighlightColorSelector">Unhighlight Color</label>\n' +
        '                        <select class="form-control" id="UnhighlightColorSelector" onchange="unhighlightColorSelected()">\n' +
        '                            <option>Yellow</option>\n' +
        '                            <option>Light Sky Blue</option>\n' +
        '                            <option>Light Green</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group" id="unhighlightPreferencesDiv">\n' +
        '                        <label for="FieldOfViewSelector">Field Of View</label>\n' +
        '                        <select class="form-control" id="FieldOfViewSelector" onchange="fieldOfViewSelected()">\n' +
        '                            <option>1</option>\n' +
        '                            <option>2</option>\n' +
        '                            <option>3</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </div>\n' +

        '                <button type="button" class="btn btn-primary mb-2" id="RegistrationButton">Register</button>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>\n' +
        '</div>\n' +
        '    <p id="AddUserResult"></p><!-- Feedback about add new user -->';

    // Show tab depending on query
    if(loginPrompt) {
        document.getElementById("LoginTabButton").click();
        let loginInputField = $('#LoginUsername');
        loginInputField.val(name);
    }
    else {
        document.getElementById("RegistrationTabButton").click();
        let registrationInputField = $('#RegistrationUsername');
        registrationInputField.val(name);
    }
//    hide preferences
    $('#PreferencesDiv').hide();
//    Ensures fields are entered
    disableButton('Registration');
    disableButton('Login');
    // to handle sign in button
    $("#RegistrationButton").click(function () {
        addUser();
    });

    // to handle sign up button
    $("#LoginButton").click(function () {
        signInUser();
    });
}