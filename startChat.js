var contextMenuItem = {
    "id": "Chat",
    "title": "Iniciar conversa",
    "contexts": ["selection"]
};
/**
 * 
 * @param {*} selectedData 
 */
function newChat(selectedData) {

    var telephoneNumber = selectedData.selectionText.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    var splitedTelephoneNumber = telephoneNumber.split(/^(\d{1,2})(\d{1,3})(\d{4,10})$/);

    if (splitedTelephoneNumber[1] != "55") {
        telephoneNumber = "55".concat(telephoneNumber);
    }

    if (/^[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/gm.test(telephoneNumber) || /^[0-9]?()[0-9](\s|\S)(\d[0-9]{10})$/gm.test(telephoneNumber)) {
        chrome.tabs.query({ url: 'https://web.whatsapp.com/' }, function (tabs) {
            if (Array.isArray(tabs) && tabs.length !== 0) {
                var tabId = tabs[0].id;
                chrome.tabs.update(tabId, {
                    url: 'https://web.whatsapp.com/send?phone=' + telephoneNumber
                });
            } else {
                chrome.tabs.create({ url: 'https://web.whatsapp.com/send?phone=' + telephoneNumber });
            }
        });
    }
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (selectedData) {
    newChat(selectedData);
});