(function ($) {
    var passField = $("#password");
    var emailField = $("#email");
    var button = $('#verify');
    var errorList = $("#front");
    var correctEmail = false;
    var correctPassword = false;

    //https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
    function hasNumber(s) {
        return /\d/.test(s);
    }

    function noUppercase(s) {
        return s == s.toLowerCase();
    }

    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function checkForm() {
        if (correctEmail && correctPassword) button.prop('type', 'submit');
        else button.prop('type', 'button');
    }

    emailField.keyup(function () {
        var address = emailField.val();
        if (validateEmail(address)) {
            $.post("/signup/email", { email: address }).then(function (responseMessage) {
                correctEmail = responseMessage.ok;
                $("li").remove(".address");
                if (correctEmail) {
                    checkForm();
                }
                else {
                    var node = document.createElement("LI");
                    var textnode = document.createTextNode("Email has already been used");
                    node.appendChild(textnode);
                    node.classList.add("address");
                    errorList.append(node);
                }

            });
        }
        else {
            $("li").remove(".address");
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Email is invalid");
            node.appendChild(textnode);
            node.classList.add("address");
            errorList.append(node);

        }
    });

    passField.keyup(function () {
        $("li").remove(".pass");
        var value = passField.val();
        if (value.length < 7) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Password must be at least 7 characters");
            node.appendChild(textnode);
            node.classList.add("pass");
            errorList.append(node);
        }

        if (noUppercase(value)) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Password must contain a capital letter");
            node.appendChild(textnode);
            node.classList.add("pass");
            errorList.append(node);
        }

        if (!hasNumber(value)) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Password must contain a number");
            node.appendChild(textnode);
            node.classList.add("pass");
            errorList.append(node);
        }
        correctPassword = (errorList.children().length == 0);
        if (correctPassword) checkForm();
    });
})(window.jQuery);
