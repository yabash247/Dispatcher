

const extractBtn = document.querySelector('#extractBtn');


extractBtn.addEventListener("click", async () => {
    
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {action : 'download'});
        console.log(response);
    
});


