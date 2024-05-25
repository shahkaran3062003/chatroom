document.addEventListener("DOMContentLoaded", (event) => {
  let longPressTimer;
  const longPressDuration = 1000;

  function removeChatItem(chatItem) {
    // chatItem.remove();
    console.log(chatItem);
  }

  function handleLongPressForRemoval(event) {
    const chatItem = event.currentTarget;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        removeChatItem(chatItem);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The chat has been removed.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "The chat is safe.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }

  function openModal(messageId) {
    const messageContent = document.querySelector(
      `.chat-content[data-message-id='${messageId}'] p`
    ).innerText;

    Swal.fire({
      title: "Message Content",
      text: messageContent,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Acknowledged!",
          text: "You have acknowledged the message.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "You have cancelled the action.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }

  // Event delegation for chat items
  document.querySelectorAll(".chat-users-list li").forEach((chatItem) => {
    chatItem.addEventListener("mousedown", function (event) {
      longPressTimer = setTimeout(
        () => handleLongPressForRemoval(event),
        longPressDuration
      );
    });

    chatItem.addEventListener("mouseup", function () {
      clearTimeout(longPressTimer);
    });

    chatItem.addEventListener("mouseleave", function () {
      clearTimeout(longPressTimer);
    });
  });

  // Event delegation for chat content
  document
    .querySelector(".chats")
    .addEventListener("mousedown", function (event) {
      const chatContent = event.target.closest(".chat-content");
      if (chatContent) {
        const messageId = chatContent.getAttribute("data-message-id");
        longPressTimer = setTimeout(() => {
          openModal(messageId);
        }, longPressDuration);
      }
    });

  document
    .querySelector(".chats")
    .addEventListener("mouseup", function (event) {
      const chatContent = event.target.closest(".chat-content");
      if (chatContent) {
        clearTimeout(longPressTimer);
      }
    });

  document
    .querySelector(".chats")
    .addEventListener("mouseleave", function (event) {
      const chatContent = event.target.closest(".chat-content");
      if (chatContent) {
        clearTimeout(longPressTimer);
      }
    });
});
