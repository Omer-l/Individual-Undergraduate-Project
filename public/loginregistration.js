// Tabbed Menu
function openMenu(event, buttonName) {
    let i, x, tablinks;
    $('#LoginDiv').hide();
    $('#RegisterDiv').hide();
    tablinks = document.getElementsByClassName("btn-primary");
    document.getElementById(buttonName).style.display = "block";//show clicked tab
    event.currentTarget.firstElementChild.className += " active";
}

//When preference is selected
function preferenceSelected() {
    var preference = document.getElementById('PreferenceSelector');
    if (preference) {
        if (preference.selectedIndex == 1) {
//    show preferences
            $('#PreferencesDiv').show();
        } else {
            $('#PreferencesDiv').hide();
        }
    }
}


//When quiz mode is selected
function quizModeSelected() {
    var preference = document.getElementById('QuizPreferenceSelector');
    if (preference) {
        if (preference.selectedIndex == 1) {
//    shows quiz preferences
            $('#QuizPreferencesDiv').show();
        } else {
            $('#QuizPreferencesDiv').hide();
        }
    }
}

function activateRegistrationButton() {
    let username = $("#RegistrationUsername").val();
    let password = $("#RegistrationPassword").val();

    if(username.length > 0 && password.length > 0)
        document.getElementById("RegisterButton").disabled = false;
    else
        document.getElementById("RegisterButton").disabled = true;
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
        '            <button class="btn btn-lg btn-primary" href="javascript:void(0)" onclick="openMenu(event, \'LoginDiv\');" id="LoginButton">\n' +
        '                <div class="w3-col tablink">LOGIN</div>\n' +
        '            </button>\n' +
        '            <button class="btn btn-lg btn-primary" href="javascript:void(0)" onclick="openMenu(event, \'RegisterDiv\');">\n' +
        '                <div class="w3-col tablink">REGISTER</div>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '\n' +
        '        <div id="LoginDiv" class="w3-container menu w3-padding-48 w3-card">\n' +
        '            <form>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="RegistrationUsername">Username</label>\n' +
        '                    <input type="username" class="form-control" id="RegistrationUsername" onkeyup="activateRegistrationButton()">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="RegistrationPassword">Password</label>\n' +
        '                    <input type="password" class="form-control" id="RegistrationPassword" onkeyup="activateRegistrationButton()">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="PreferenceSelector">Preferences</label>\n' +
        '                    <select class="form-control" id="PreferenceSelector" onchange="preferenceSelected()">\n' +
        '                        <option>Default</option>\n' +
        '                        <option>Custom</option>\n' +
        '                    </select>\n' +
        '                </div>\n' +
        '                <div id="PreferencesDiv">\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="rand">Choose Mode</label>\n' +
        '                        <select class="form-control" id="rand">\n' +
        '                            <option>Paragraph</option>\n' +
        '                            <option>Rapid Serial Visual Presentation</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="QuizPreferenceSelector">Quiz Mode</label>\n' +
        '                        <select class="form-control" id="QuizPreferenceSelector" onchange="quizModeSelected()">\n' +
        '                            <option>Off</option>\n' +
        '                            <option>On</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '\n' +
        '\n' +
        '                    <div class="form-group" id="QuizPreferencesDiv">\n' +
        '                        <label for="QuizPreferenceSelector">Words Before Quiz</label>\n' +
        '                        <select class="form-control" id="rand">\n' +
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
        '                <button type="button" class="btn btn-primary mb-2" id="RegisterButton">Register</button>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '\n' +
        '        <div id="RegisterDiv" class="w3-container menu w3-padding-48 w3-card ">\n' +
        '            Register\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '    <p id="AddUserResult"></p><!-- Feedback about add new user -->';

    // Show only login
    document.getElementById("LoginButton").click();
//    hide preferences
    $('#PreferencesDiv').hide();
    $('#QuizPreferencesDiv').hide();
//    Ensures fields are entered
    document.getElementById("RegisterButton").disabled = true;
    // to handle sign in button
    $("#RegisterButton").click(function () {
        addUser();
    });

    // to handle sign up button
    $("#SignInButton").click(function () {
        // signUpUser();
    });
}