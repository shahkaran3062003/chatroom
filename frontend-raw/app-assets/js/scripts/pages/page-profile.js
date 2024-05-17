$(function () {
  'use strict';

  // variables
  var blockElement = $('.block-element');

  //  block Examples
  if (blockElement.length) {
    blockElement.on('click', function () {
      var block_ele = $(this);
      $(block_ele).block({
        message: '<div class="spinner-border text-primary font-medium-3"></div>',
        timeout: 2000, //unblock after 2 seconds
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8,
          cursor: 'wait'
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      });
    });
  }

  
  // variables
  var form = $('.validate-form'),
    accountUploadImg = $('#account-upload-img'),
    accountUploadBtn = $('#account-upload'),
    accountUserImage = $('.uploadedAvatar'),
    accountResetBtn = $('#account-reset'),
    accountNumberMask = $('.account-number-mask'),
    deactivateAcc = document.querySelector('#formAccountDeactivation'),
    deactivateButton = deactivateAcc.querySelector('.deactivate-account');

  // Update user photo on click of button

  if (accountUserImage) {
    var resetImage = accountUserImage.attr('src');
    accountUploadBtn.on('change', function (e) {
      var reader = new FileReader(),
        files = e.target.files;
      reader.onload = function () {
        if (accountUploadImg) {
          accountUploadImg.attr('src', reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    });

    accountResetBtn.on('click', function () {
      accountUserImage.attr('src', resetImage);
    });
  }

  // jQuery Validation for all forms
  // --------------------------------------------------------------------
  if (form.length) {
    form.each(function () {
      var $this = $(this);

      $this.validate({
        rules: {
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          email: {
            required: true
          },
          phoneNumber: {
            required: true,
            minlength: 10
          },
          accountActivation: {
            required: true
          },
          password: {
            required: true
          },
          'new-password': {
            required: true,
            minlength: 8
          },
          'confirm-new-password': {
            required: true,
            minlength: 8,
            equalTo: '#account-new-password'
          },
          apiKeyName: {
            required: true
          }
        },messages: {
          email: {
            required: 'Please enter email',
          },
          phoneNumber: {
            required: 'Please enter phone number',
            minlength: 'Enter at least 10 numbers'
          },
          'new-password': {
            required: 'Enter new password',
            minlength: 'Enter at least 8 characters'
          },
          'confirm-new-password': {
            required: 'Please confirm new password',
            minlength: 'Enter at least 8 characters',
            equalTo: 'The password and its confirm are not the same'
          }
        }
      });
      $this.on('submit', function (e) {
        e.preventDefault();
      });
    });
  }

  // disabled submit button on checkbox unselect
  if (deactivateAcc) {
    $(document).on('click', '#accountActivation', function () {
      if (accountActivation.checked == true) {
        deactivateButton.removeAttribute('disabled');
      } else {
        deactivateButton.setAttribute('disabled', 'disabled');
      }
    });
  }

  // Deactivate account alert
  const accountActivation = document.querySelector('#accountActivation');

  // Alert With Functional Confirm Button
  if (deactivateButton) {
    deactivateButton.onclick = function () {
      if (accountActivation.checked == true) {
        Swal.fire({
          text: 'Are you sure you would like to deactivate your account?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-2'
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Cancelled',
              text: 'Deactivation Cancelled!!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          }
        });
      }
    };
  }

  //phone
  if (accountNumberMask.length) {
    accountNumberMask.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
});
