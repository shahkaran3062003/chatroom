$(function () {
  const editChannelForm = $('#editchannelForm')
  // Edit user form validation
  if (editChannelForm.length) {
    editChannelForm.validate({
      rules: {
        
        modalEditChannelName: {
          required: true,
          minlength: 6,
          maxlength: 30
        }
      },
      messages: {
        modalEditChannelName: {
          required: 'Please enter your channel name',
          minlength: 'The name must be more than 6 and less than 30 characters long',
          maxlength: 'The name must be more than 6 and less than 30 characters long'
        }
      }
    });
  }
});
