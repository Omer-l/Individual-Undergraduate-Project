let loginPrompt = false;
let name = '';
let readingMode = 0;
let quizMode = 1;
let numberOfWordsBeforeQuiz = 10;
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
function numberOfWordsBeforeQuizSelected() {
    console.log("BDOING");
    let preferenceSelectorId = 'NumberOfWordsSelector';
    let preference = document.getElementById(preferenceSelectorId);
    if (preference) {
        let selected = preference.selectedIndex;
        if (selected == 0) {
            numberOfWordsBeforeQuiz = 10;
        } else if(selected == 1){
            numberOfWordsBeforeQuiz = 50;
        } else if(selected == 2){
            numberOfWordsBeforeQuiz = 100;
        } else if(selected == 3){
            numberOfWordsBeforeQuiz = 300;
        } else if(selected == 4){
            numberOfWordsBeforeQuiz = 600;
        } else if(selected == 5){
            numberOfWordsBeforeQuiz = 1000;
        } else if(selected == 6){
            numberOfWordsBeforeQuiz = 3000;
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
        '\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="QuizPreferenceSelector">Quiz Mode</label>\n' +
        '                        <select class="form-control" id="QuizPreferenceSelector" onchange="preferenceSelected(\'Quiz\')">\n' +
        '                            <option>Off</option>\n' +
        '                            <option>On</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '\n' +
        '                    <div class="form-group" id="QuizPreferencesDiv">\n' +
        '                        <label for="NumberOfWordsSelector">Words Before Quiz</label>\n' +
        '                        <select class="form-control" id="NumberOfWordsSelector" onchange="numberOfWordsBeforeQuizSelected()">\n' +
        '                            <option>10</option>\n' +
        '                            <option>50</option>\n' +
        '                            <option>100</option>\n' +
        '                            <option>300</option>\n' +
        '                            <option>600</option>\n' +
        '                            <option>1000</option>\n' +
        '                            <option>3000</option>\n' +
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
    $('#QuizPreferencesDiv').hide();
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