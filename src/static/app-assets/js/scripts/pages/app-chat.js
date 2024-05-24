/*=========================================================================================
    File Name: app-chat.js
    Description: Chat app js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

"use strict";
var sidebarToggle = $(".sidebar-toggle"),
  overlay = $(".body-content-overlay"),
  sidebarContent = $(".sidebar-content");

var channelId = channelName;

// Chat sidebar toggle
function sidebarToggleFunction() {
  if (sidebarToggle.length) {
    sidebarToggle.on("click", function () {
      sidebarContent.addClass("show");
      overlay.addClass("show");
    });
  }
}
$(function () {
  var chatUsersListWrapper = $(".chat-application .chat-user-list-wrapper"),
    mainmenucontent = $(".main-menu-content"),
    profileSidebar = $(".chat-application .chat-profile-sidebar"),
    profileSidebarArea = $(".chat-application .profile-sidebar-area"),
    profileToggle = $(".chat-application .sidebar-profile-toggle"),
    userProfileToggle = $(".user-profile-toggle"),
    userProfileSidebar = $(".user-profile-sidebar"),
    statusRadio = $(
      ".chat-application .user-status input:radio[name=userStatus]"
    ),
    userChats = $(".user-chats"),
    chatsUserList = $(".chat-users-list"),
    navigation = $(".navigation-main"),
    chatList = $(".chat-list"),
    contactList = $(".contact-list"),
    closeIcon = $(".chat-application .close-icon"),
    sidebarCloseIcon = $(".chat-application .sidebar-close-icon"),
    menuToggle = $(".chat-application .menu-toggle"),
    speechToText = $(".speech-to-text"),
    chatSearch = $(".chat-application #chat-search");

  // init ps if it is not touch device
  if (!$.app.menu.is_touch_device()) {
    // Chat user list
    if (chatUsersListWrapper.length > 0) {
      var chatUserList = new PerfectScrollbar(chatUsersListWrapper[0]);
    }

    // Admin profile left
    if (userProfileSidebar.find(".user-profile-sidebar-area").length > 0) {
      // var userScrollArea = new PerfectScrollbar(
      //   userProfileSidebar.find(".user-profile-sidebar-area")[0]
      // );

      for (let i = 0; i < userProfileSidebar.length; i++) {
        new PerfectScrollbar(userProfileSidebar[i], {
          wheelPropagation: false,
        });
      }
    }

    // Chat area
    if (userChats.length > 0) {
      // var temp = new PerfectScrollbar(userChats[0], {
      //   wheelPropagation: false,
      // });
      for (let i = 0; i < userChats.length; i++) {
        new PerfectScrollbar(userChats[i], {
          wheelPropagation: false,
        });
      }
    }

    // User profile right area
    if (profileSidebarArea.length > 0) {
      var user_profile = new PerfectScrollbar(profileSidebarArea[0]);
    }
  } else {
    chatUsersListWrapper.css("overflow", "scroll");
    userProfileSidebar
      .find(".user-profile-sidebar-area")
      .css("overflow", "scroll");
    userChats.css("overflow", "scroll");
    profileSidebarArea.css("overflow", "scroll");

    // on user click sidebar close in touch devices
    $(chatsUserList)
      .find("li")
      .on("click", function () {
        $(sidebarContent).removeClass("show");
        $(overlay).removeClass("show");
      });

    $(navigation)
      .find("li")
      .on("click", function () {
        $(sidebarContent).removeClass("show");
        $(overlay).removeClass("show");
      });
  }

  // Chat Profile sidebar & overlay toggle
  if (profileToggle.length) {
    profileToggle.on("click", function () {
      profileSidebar.addClass("show");
      overlay.addClass("show");
    });
  }

  // Update status by clicking on Radio
  if (statusRadio.length) {
    statusRadio.on("change", function () {
      var $className = "avatar-status-" + this.value,
        profileHeaderAvatar = $(".header-profile-sidebar .avatar span");
      profileHeaderAvatar.removeClass();
      profileToggle.find(".avatar span").removeClass();
      profileHeaderAvatar.addClass($className + " avatar-status-lg");
      profileToggle.find(".avatar span").addClass($className);
    });
  }

  // On Profile close click
  if (closeIcon.length) {
    closeIcon.on("click", function () {
      profileSidebar.removeClass("show");
      userProfileSidebar.removeClass("show");
      if (!sidebarContent.hasClass("show")) {
        overlay.removeClass("show");
      }
    });
  }

  // On sidebar close click
  if (sidebarCloseIcon.length) {
    sidebarCloseIcon.on("click", function () {
      sidebarContent.removeClass("show");
      overlay.removeClass("show");
    });
  }

  // User Profile sidebar toggle
  if (userProfileToggle.length) {
    userProfileToggle.on("click", function () {
      userProfileSidebar.addClass("show");
      overlay.addClass("show");
    });
  }

  // On overlay click
  if (overlay.length) {
    overlay.on("click", function () {
      sidebarContent.removeClass("show");
      overlay.removeClass("show");
      profileSidebar.removeClass("show");
      userProfileSidebar.removeClass("show");
    });
  }

  // Add class active on click of Chat users list
  if (chatUsersListWrapper.find("ul li").length) {
    chatUsersListWrapper.find("ul li").on("click", function () {
      var $this = $(this),
        temp = chatUsersListWrapper.find();
      (startArea = $(".start-chat-area")),
        (activeChat = $(".active-chat")),
        (chId = $(this).attr("id")),
        (activeChat = $(`.active-chat.${chId}`));

      if (chatUsersListWrapper.find("ul li").hasClass("active")) {
        chatUsersListWrapper.find("ul li").removeClass("active");
      }

      $this.addClass("active");
      $this.find(".badge").remove();

      if (chatUsersListWrapper.find("ul li").hasClass("active")) {
        startArea.addClass("d-none");
        activeChat.removeClass("d-none");
        activeChat.addClass(channelId);
        console.log("karanfjslkad");
      } else {
        startArea.removeClass("d-none");
        activeChat.addClass("d-none");
      }
    });
  }

  if (mainmenucontent.find("ul li").length) {
    console.log("karn");
    mainmenucontent.find("ul li").on("click", function () {
      var $this = $(this),
        temp = mainmenucontent.find("ul li"),
        startArea = $(".start-chat-area"),
        channelId = $(this).attr("id"),
        allActiveChat = $(".active-chat"),
        activeChat = $(`.active-chat.${channelId}`);

      if (mainmenucontent.find("ul li").hasClass("active")) {
        console.log("karn");
        mainmenucontent.find("ul li").removeClass("active");
      }

      $this.addClass("active");
      $this.find(".badge").remove();

      if (mainmenucontent.find("ul li").hasClass("active")) {
        startArea.addClass("d-none");
        allActiveChat.addClass("d-none");
        activeChat.removeClass("d-none");
        activeChat.addClass(chId);
      } else {
        startArea.removeClass("d-none");
        activeChat.addClass("d-none");
      }
    });
  }

  // auto scroll to bottom of Chat area
  chatsUserList.find("li").on("click", function () {
    userChats.animate({ scrollTop: userChats[0].scrollHeight }, 400);
  });
  navigation.find("li").on("click", function () {
    userChats.animate({ scrollTop: userChats[0].scrollHeight }, 400);
  });

  // Main menu toggle should hide app menu
  if (menuToggle.length) {
    menuToggle.on("click", function (e) {
      sidebarContent.removeClass("show");
      overlay.removeClass("show");
      profileSidebar.removeClass("show");
      userProfileSidebar.removeClass("show");
    });
  }

  if ($(window).width() < 992) {
    sidebarToggleFunction();
  }

  // Filter
  if (chatSearch.length) {
    chatSearch.on("keyup", function () {
      var value = $(this).val().toLowerCase();
      if (value !== "") {
        // filter chat list
        chatList.find("li:not(.no-results)").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
        // filter contact list
        contactList.find("li:not(.no-results)").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
        var chat_tbl_row = chatList.find("li:not(.no-results):visible").length,
          contact_tbl_row = contactList.find(
            "li:not(.no-results):visible"
          ).length;

        // check if chat row available
        if (chat_tbl_row == 0) {
          chatList.find(".no-results").addClass("show");
        } else {
          if (chatList.find(".no-results").hasClass("show")) {
            chatList.find(".no-results").removeClass("show");
          }
        }

        // check if contact row available
        if (contact_tbl_row == 0) {
          contactList.find(".no-results").addClass("show");
        } else {
          if (contactList.find(".no-results").hasClass("show")) {
            contactList.find(".no-results").removeClass("show");
          }
        }
      } else {
        // If filter box is empty
        chatsUserList.find("li").show();
        navigation.find("li").show();

        if (chatUsersListWrapper.find(".no-results").hasClass("show")) {
          chatUsersListWrapper.find(".no-results").removeClass("show");
        }
      }
    });
  }

  if (speechToText.length) {
    // Speech To Text
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
      var recognition = new SpeechRecognition(),
        listening = false;
      speechToText.on("click", function () {
        var $this = $(this);
        recognition.onspeechstart = function () {
          listening = true;
        };
        if (listening === false) {
          recognition.start();
        }
        recognition.onerror = function (event) {
          listening = false;
        };
        recognition.onresult = function (event) {
          $this
            .closest(".form-send-message")
            .find(".message")
            .val(event.results[0][0].transcript);
        };
        recognition.onspeechend = function (event) {
          listening = false;
          recognition.stop();
        };
      });
    }
  }
});
// Window Resize
$(window).on("resize", function () {
  sidebarToggleFunction();
  if ($(window).width() > 992) {
    if ($(".chat-application .body-content-overlay").hasClass("show")) {
      $(".app-content .sidebar-left").removeClass("show");
      $(".chat-application .body-content-overlay").removeClass("show");
    }
  }

  // Chat sidebar toggle
  if ($(window).width() < 991) {
    if (
      !$(".chat-application .chat-profile-sidebar").hasClass("show") ||
      !$(".chat-application .sidebar-content").hasClass("show")
    ) {
      $(".sidebar-content").removeClass("show");
      $(".body-content-overlay").removeClass("show");
    }
  }
});

// Add message to chat - function call on form submit
function enterChat(source) {
  var message = $(".message").val();
  if (/\S/.test(message)) {
    // var html =
    //   '<div class="chat-content">' + "<p>" + message + "</p>" + "</div>";
    // $(".chat:last-child .chat-body").append(html);
    // $(".message").val("");
    // $(".user-chats").scrollTop($(".user-chats > .chats").height());

    // const messageInputDom = document.querySelector("#chat-message-input");
    // const message = messageInputDom.value;
    chatSocket.send(
      JSON.stringify({
        message: message,
        command: "new_message",
        from: userName,
      })
    );
    // console.log("userName" + userName);
    // messageInputDom.value = "";
  }
}

function addChat(data) {
  var message = data["message"];
  var author = message["message"].author;

  var chats = $(".chats");
  var lastChild = $(".chat:last-child");
  var len = lastChild[0].classList.length;
  if (userName == author) {
    if (len == 2) {
      var html2 =
        '<div class="chat"><div class="chat-avatar"><svg x="0" y="0" class="icon_ae0b42" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="36"height="36  " fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd"d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"clip-rule="evenodd" class=""></path></svg></div><div class="chat-body"></div></div>';
      chats.append(html2);
    }
  } else {
    var html2 =
      '<div class="chat chat-left"><div class="chat-avatar"><svg x="0" y="0" class="icon_ae0b42" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="36"height="36  " fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd"d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"clip-rule="evenodd" class=""></path></svg></div><div class="chat-body"></div></div>';
    chats.append(html2);
  }
  var html =
    '<div class="chat-content">' +
    "<p>" +
    message["message"].content +
    "</p>" +
    "</div>";

  $(".chat:last-child .chat-body").append(html);
  $(".message").val("");
  $(".user-chats").scrollTop($(".user-chats > .chats").height());
}
