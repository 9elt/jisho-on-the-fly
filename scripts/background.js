chrome.runtime.onMessage.addListener((e,r,t)=>{if(e.scrape){try{fetch(e.url).then(e=>e.text()).then(e=>t(e)).catch(e=>console.log(e))}catch(n){t("error")}return!0}});