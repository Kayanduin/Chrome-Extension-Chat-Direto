 var contextMenuItem = {
    "id": "Chat",
    "title": "Iniciar conversa",
    "contexts": ["selection"]
};

function newChat(clickData) {

    var varNumber = clickData.selectionText.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    var splitedNumber = varNumber.split(/^(\d{1,2})(\d{1,3})(\d{4,10})$/);

    if(splitedNumber[1] != "55")
        varNumber = "55".concat(varNumber);
    
    if(/^[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/gm.test(varNumber) || /^[0-9]?()[0-9](\s|\S)(\d[0-9]{10})$/gm.test(varNumber)) 
        chrome.tabs.create({"url" : ("https://web.whatsapp.com/send?phone="+varNumber)});
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){

    newChat(clickData);
    
});