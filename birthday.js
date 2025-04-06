// JavaScript for Wishlist
if (window.location.pathname.includes("page2.html")) {
    // This block of code runs ONLY on the page2.html page
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            
            // Get current data from local storage or initialize empty object
            const sharedData = JSON.parse(localStorage.getItem('sharedCartData')) || {};
            
            // If item is already reserved, show alert
            if (sharedData[itemName] && sharedData[itemName].status === "Reserved") {
                alert("This item has already been chosen by someone else.");
                return;
            }

            // Mark item as reserved
            sharedData[itemName] = { status: "Reserved" };
            localStorage.setItem('sharedCartData', JSON.stringify(sharedData));
            
            // Show confirmation modal or success message
            alert("Thank you for choosing this gift!");
        });
    });
}

// JavaScript for Chat Feature
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    
    if (message) {
        // Generate a random user ID for anonymity
        const userId = 'user_' + Math.random().toString(36).substr(2, 9); // Random string
        const messageData = { user: userId, text: message, time: new Date().toLocaleString() };
        
        // Retrieve existing messages from local storage or initialize empty array
        const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        
        // Add new message to chat array
        chatMessages.push(messageData);
        
        // Store updated messages in local storage
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        
        // Clear input field
        messageInput.value = '';
        
        // Update the chat UI
        displayMessages();
    }
}

function displayMessages() {
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const chatContainer = document.getElementById('chat-messages');
    
    chatContainer.innerHTML = ''; // Clear previous messages
    
    chatMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${message.user}</strong>: ${message.text} <span style="font-size: 0.8rem; color: gray;">${message.time}</span>`;
        chatContainer.appendChild(messageElement);
    });
}

// Initial message display on page load
displayMessages();
