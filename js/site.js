// Controller
function processUserInput() {
    // Get inputs from the DOM
    let shiftAmount = document.getElementById('shift-input').value;
    let message = document.getElementById('message-input').value;
    let operationType = document.getElementById('operation-select').value;

    // Convert shiftAmount to a number
    shiftAmount = Number.parseInt(shiftAmount);

    // Convert message to lowercase for consistency
    message = message.toLowerCase();

    // Validate inputs

    // -- Shift Amount
    if (Number.isNaN(shiftAmount)) {
        // Error message for invalid shift value
        Swal.fire({
            icon: "error",
            title: "Invalid Shift",
            text: "Please enter a valid numerical shift value.",
        });
        return;
    } else if (shiftAmount > 10 || shiftAmount < -10) {
        // Error message for out-of-range shift value
        Swal.fire({
            icon: "error",
            title: "Invalid Shift Range",
            text: "Shift value must be between -10 and 10.",
        });
        return;
    }

    // -- Message
    if (message.length > 50) {
        // Error message for a message that is too long
        Swal.fire({
            icon: "error",
            title: "Message Too Long",
            text: "The message should not exceed 50 characters.",
        });
        return;
    }

    // -- Operation Type
    if (operationType !== 'Encrypt' && operationType !== 'Decrypt') {
        // Error message for an invalid operation
        Swal.fire({
            icon: "error",
            title: "Invalid Operation",
            text: "Please select a valid operation: Encrypt or Decrypt.",
        });
        return;
    }

    // Cipher Message
    let cipherMessage = '';

    // Encrypt/Decrypt
    if (operationType == 'Encrypt') {
        // Process encryption
        cipherMessage = processEncryption(message, shiftAmount);
    } else if (operationType == 'Decrypt') {
        // Process decryption
        cipherMessage = processDecryption(message, shiftAmount);
    }

    // Display Result
    displayCipherMessage(cipherMessage);
}

// Logic
function processEncryption(message, shiftAmount) {
    // Create an encrypted message 
    let cipherMessage = '';
    // Alphabet to use as a guide
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // Use a loop to change the letters and add them to the cipher message
    for (let i = 0; i < message.length; i++) {
        const currentLetter = message[i];
        let indexInAlphabet = alphabet.indexOf(currentLetter);

        // Add non-alphabetic characters directly to the cipher message
        if (indexInAlphabet == -1) {
            cipherMessage += currentLetter;
            continue;
        }

        // Shift the letter's index based on the shift input
        indexInAlphabet += shiftAmount;

        // Keep the index within the range of 0 - 26
        if (indexInAlphabet > 26) {
            while (indexInAlphabet > 26) {
                indexInAlphabet -= 27;
            }
        } else if (indexInAlphabet < 0) {
            while (indexInAlphabet < 0) {
                indexInAlphabet += 27;
            }
        }

        // Add the encrypted letter to the cipher message
        cipherMessage += alphabet[indexInAlphabet];
    }

    // Return the result
    return cipherMessage;
}

function processDecryption(message, shiftAmount) {
    // Create a decrypted message
    let cipherMessage = '';
    // Alphabet to use as a guide
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // Use a loop to change the letters and add them to the cipher message
    for (let i = 0; i < message.length; i++) {
        const currentLetter = message[i];
        let indexInAlphabet = alphabet.indexOf(currentLetter);

        // Add non-alphabetic characters directly to the cipher message
        if (indexInAlphabet == -1) {
            cipherMessage += currentLetter;
            continue;
        }

        // Shift the letter's index based on the shift input
        indexInAlphabet -= shiftAmount;

        // Keep the index within the range of 0 - 26
        if (indexInAlphabet > 26) {
            while (indexInAlphabet > 26) {
                indexInAlphabet -= 27;
            }
        } else if (indexInAlphabet < 0) {
            while (indexInAlphabet < 0) {
                indexInAlphabet += 27;
            }
        }

        // Add the decrypted letter to the cipher message
        cipherMessage += alphabet[indexInAlphabet];
    }

    // Return the result
    return cipherMessage;
}

// View
function displayCipherMessage(cipherMessage) {
    // Format the results as HTML
    let results = `<span class="text-muted">Cipher Message</span><br>
                   <h1 class="text-primary text-capitalize">${cipherMessage}</h1>`

    // Display to the DOM
    document.getElementById('results').innerHTML = results;
    document.getElementById('resultsContainer').classList.remove('d-none');
}
