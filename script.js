// variables and html elemnts
const menuPortal = document.querySelector(".menu-portal");
const chatPortal = document.querySelector(".chat-portal");
const DataSection = chatPortal.querySelector(".data-section");
const profileImages = document.querySelectorAll(".profile-pic img");
const applicationTittle = document.querySelector(".application-tittle");
const SendIcon = document.getElementById("send-icon");
let inputMessage = document.querySelector(
  ".chat-portal .typing-section div input"
);
let contacts = document.querySelectorAll(".contact");
let headerProfileImg = document.querySelector(
  "header .active-contact-profile img"
);
let headerProfileImgSrc = "";
const backBtn = document.getElementById("back");
let isMessagesObjectCreated;
let isMessagesPresent;

let messages = {
  jeff: ["hello"],
  Tom: [],
  Thomas: [],
  Mickel: [],
};

let activeContact;
let messagesToDisplay = [];



// logical functions

function createMessage(text) {
  let message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = `
  <img src="assets/profile-pic.png">
  <p class = "sended-message">${text}</p>
  `;
  DataSection.appendChild(message);
}


function creteMessageStorageObjects() {
    //todo : write a script which can add key value pairs of names and messages in message object
  
		localStorage.setItem('messages',JSON.stringify(messages));
}


function updateMessagesStorageObjects() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function showMessgesOnDtatSection() {
  let noOfMessges;
  if (messagesToDisplay !== undefined) {
    noOfMessges = messagesToDisplay.length;
  } else {
    noOfMessges = 0;
  }
  for (let i = 0; i < noOfMessges; i++) {
    createMessage(messagesToDisplay[i]);
  }
}

function getMessages(name) {
  let nam = name;
  let msgs = localStorage.getItem("messages");
  msgs = JSON.parse(msgs);
  messagesToDisplay = msgs[nam];
}

// events and functtions

// load all the profile images when window dom contain will be loaded.
window.onload = function () {
  // check if the localstorage contains messages object
  if(localStorage.getItem('messages') == null){
    creteMessageStorageObjects();
  }else{
    showMessgesOnDtatSection();
  }

    
  for (let i = 0; i <= 10; i++) {
    profileImages[i].src = `assets/${i}.png`;
  }
};

// adjust application portls when window changes its size.
window.addEventListener("resize", () => {
  contacts = Array.from(contacts);
  if (window.innerWidth >= 1030) {
    menuPortal.style.display = "block";
    chatPortal.style.display = "block";
  } else if (window.innerWidth <= 1030) {
    menuPortal.style.display = "block";
    chatPortal.style.display = "none";
  }
});

// open chat portal when click on any of the contact
contacts.forEach((contact) => {
  contact.addEventListener("click", (e) => {
    function resetContactsStyle() {
      contacts.forEach((contact) => {
        contact.style.background = "#fff";
      });
      DataSection.innerHTML = "";
      headerProfileImgSrc = contact.firstElementChild.firstElementChild.src;
    }
    resetContactsStyle();
    if (e.target.classList.contains("contact")) {
      activeContact = e.target.children[1].innerText;
      e.target.style.background = "rgb(0,0,255)";
      headerProfileImg.style.display = "block";
      applicationTittle.style.left = "10%";
      headerProfileImg.src = headerProfileImgSrc;
      // get tittle
      let tittle;
      if (e.target.classList.contains("contact")) {
        tittle = e.target.children[1].innerText;
      } else if (e.target.classList.contains("contact-name")) {
        tittle = e.target.innerText;
      }
      // set tittle
      applicationTittle.innerText = tittle;

      getMessages(tittle);
      showMessgesOnDtatSection();

      if (window.innerWidth <= 1030) {
        menuPortal.style.display = "none";
        chatPortal.style.display = "block";
        chatPortal.style.width = "100%";
        applicationTittle.style.left = "35%";
        backBtn.style.display = "block";
      }
    } else if (e.target.classList.contains("contact-name")) {
      activeContact = e.target.innerText;
      e.target.parentElement.style.background = "rgb(0,0,255)";
      headerProfileImg.src = headerProfileImgSrc;
      showMessgesOnDtatSection();

      if (window.innerWidth <= 1030) {
        menuPortal.style.display = "none";
        chatPortal.style.display = "block";
        chatPortal.style.width = "100%";
        backBtn.style.display = "block";
      }
    }
  });
});

// backbtn to go back in the contacts menu section (form chat portal)
backBtn.addEventListener("click", () => {
  if (window.innerWidth <= 1030) {
    chatPortal.style.display = "none";
    menuPortal.style.display = "block";
    backBtn.style.display = "none";
    contacts.forEach((contact) => {
      contact.style.background = "#fff";
    });
    applicationTittle.innerHTML = "Chat Application";
    headerProfileImg.style.display = "none";
    applicationTittle.style.left = "10px";
  }
});

// send icon click function
SendIcon.addEventListener("click", () => {
  if (inputMessage.value !== "") {
    let contactMsgs = localStorage.getItem("messages");
    contactMsgs = JSON.parse(contactMsgs);
    contactMsgs[activeContact].push(inputMessage.value);
    localStorage.setItem("messages", JSON.stringify(contactMsgs));
    createMessage(inputMessage.value);
    inputMessage.value = "";
  }
});

// add eventlitner to the input bar of message and when ever enter is preeses run createmessage function.
inputMessage.addEventListener("focus", () => {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      if (inputMessage.value !== "") {
        let contactMsgs = localStorage.getItem("messages");
        contactMsgs = JSON.parse(contactMsgs);
        contactMsgs[activeContact].push(inputMessage.value);
        localStorage.setItem("messages", JSON.stringify(contactMsgs));
        createMessage(inputMessage.value);
        inputMessage.value = "";
      }
    }
  });
});
