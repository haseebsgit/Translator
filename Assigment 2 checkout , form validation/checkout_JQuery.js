$(document).ready(function() {

    const $form = $('#checkout-form');
    const $placeOrderBtn = $('#place-order-btn');
    const $termsCheck = $('#terms-checkbox');
    const $creditCardFields = $('#payment-card-fields');
    const $paymentRadios = $('input[name="paymentMethod"]');
    const $creditRadio = $('#credit');

    function setValid($field) {
        $field.removeClass('is-invalid').addClass('is-valid');
        $field.siblings('.invalid-feedback').text(''); 
    }

    function setInvalid($field, message) {
        $field.removeClass('is-valid').addClass('is-invalid');
        $field.siblings('.invalid-feedback').text(message); 
    }

    function validateName() {
        const $field = $('#fullName');
        const val = $field.val().trim();
        if (val.length === 0) {
            setInvalid($field, 'Valid full name is required.');
            return false;
        } else if (val.length < 3) {
            setInvalid($field, 'Full name must be at least 3 characters.');
            return false;
        } else {
            setValid($field);
            return true;
        }
    }
    
    function validateEmail() {
        const $field = $('#email');
        const val = $field.val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val.length === 0) {
            setInvalid($field, 'Please enter a valid email address.');
            return false;
        } else if (!emailRegex.test(val)) {
            setInvalid($field, 'Please enter a valid email address (e.g., name@example.com).');
            return false;
        } else {
            setValid($field);
            return true;
        }
    }
    
    function validatePhone() {
        const $field = $('#phone');
        const val = $field.val().trim().replace(/\D/g, '');
        const phoneRegex = /^\d{10,}$/; // 
        if (val.length === 0) {
            setInvalid($field, 'Please enter a valid phone number.');
            return false;
        } else if (!phoneRegex.test(val)) {
            setInvalid($field, 'Phone must be at least 10 digits.');
            return false;
        } else {
            setValid($field);
            return true;
        }
    }

    function validateRequired($field, msg) {
        const val = $field.val().trim();
        if (val === "" || val === null) {
            setInvalid($field, msg);
            return false;
        } else {
            setValid($field);
            return true;
        }
    }

    function validateZip() {
        const $field = $('#zip');
        const val = $field.val().trim();
        const zipRegex = /^\d{4,6}$/; // 4-6 digits
         if (val.length === 0) {
            setInvalid($field, 'Zip code required.');
            return false;
        } else if (!zipRegex.test(val)) {
            setInvalid($field, 'Postal code must be 4-6 digits.');
            return false;
        } else {
            setValid($field);
            return true;
        }
    }
    
    function validateCardFields() {
        let isCardValid = true;

        if ($creditRadio.is(':checked')) {
            if (!validateRequired($('#cc-name'), 'Name on card is required')) isCardValid = false;
   
            const $ccNum = $('#cc-number');
            const ccNumVal = $ccNum.val().replace(/\D/g, ''); // Remove spaces/dashes
            if (ccNumVal.length < 15 || ccNumVal.length > 16) {
                setInvalid($ccNum, 'Must be a valid 15-16 digit card number.');
                isCardValid = false;
            } else {
                setValid($ccNum);
            }

            const $ccExp = $('#cc-expiration');
            const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expRegex.test($ccExp.val().trim())) {
                setInvalid($ccExp, 'Must be in MM/YY format.');
                isCardValid = false;
            } else {
                setValid($ccExp);
            }
            
            const $ccCvv = $('#cc-cvv');
            const cvvRegex = /^\d{3,4}$/;
            if (!cvvRegex.test($ccCvv.val().trim())) {
                setInvalid($ccCvv, 'Must be 3 or 4 digits.');
                isCardValid = false;
            } else {
                setValid($ccCvv);
            }
        }
        return isCardValid;
    }

    $termsCheck.on('change', function() {
        $placeOrderBtn.prop('disabled', !this.checked);

        if(this.checked) {
            $termsCheck.removeClass('is-invalid');
            $termsCheck.siblings('.invalid-feedback').text('');
        } else {
            setInvalid($termsCheck, 'You must agree before placing order.');
        }
    });

    $paymentRadios.on('change', function() {
        if ($creditRadio.is(':checked')) {
            $creditCardFields.slideDown();

            $creditCardFields.find('input').prop('required', true);
        } else {
            $creditCardFields.slideUp();

            $creditCardFields.find('input').prop('required', false)
                .removeClass('is-valid is-invalid')
                .siblings('.invalid-feedback').text('');
        }
    });
    
    $('#fullName').on('blur', validateName);
    $('#email').on('blur', validateEmail);
    $('#phone').on('blur', validatePhone);
    $('#address').on('blur', () => validateRequired($('#address'), 'Please enter your shipping address.'));
    $('#city').on('blur', () => validateRequired($('#city'), 'City required.'));
    $('#country').on('blur', () => validateRequired($('#country'), 'Please select a valid country.'));
    $('#zip').on('blur', validateZip);
    
    $creditCardFields.on('blur', 'input', validateCardFields);

    $form.on('submit', function(event) {
        // Run all validations one last time
        let isFormValid = true;
        
        if (!validateName()) isFormValid = false;
        if (!validateEmail()) isFormValid = false;
        if (!validatePhone()) isFormValid = false;
        if (!validateRequired($('#address'), 'Please enter your shipping address.')) isFormValid = false;
        if (!validateRequired($('#city'), 'City required.')) isFormValid = false;
        if (!validateRequired($('#country'), 'Please select a valid country.')) isFormValid = false;
        if (!validateZip()) isFormValid = false;
        if (!validateCardFields()) isFormValid = false; 
        
        if (!$termsCheck.is(':checked')) {
            setInvalid($termsCheck, 'You must agree before placing order.');
            isFormValid = false;
        } else {
            $termsCheck.removeClass('is-invalid'); 
        }

        if (!isFormValid) {
            event.preventDefault(); 

            const $firstError = $form.find('.is-invalid').first();
            if ($firstError.length > 0) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 100 // 
                }, 500);
            }
        } else {

            event.preventDefault(); 
            alert('Form is valid and would be submitted!');
        }
    });
    
    $paymentRadios.trigger('change');
    
});