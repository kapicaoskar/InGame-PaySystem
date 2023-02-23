$('html').hide();
$('body').hide();


let paymentMethod = "none"
let email = "oskar@dev.pl"
let shopLogo = null
let shopName = null
let shopToken = null
let shopBasketItems = null
let price = 0
let itemName = null
let type = null
let customTrigger = null
let customTriggerType = null
let paymentLink = null
let paymentToken = null
let valueofemail = ""
let sendlooop = null

$(document).keyup(function(e) {
    if (e.key === "Escape") { 
        $.post(`http://${GetParentResourceName()}/exitPayment`, JSON.stringify("Exit Payment"))
        $('body').fadeOut('slow');

}
});


window.addEventListener('message', function(event) {
    if (event.data.type == "OPEN_PAYMENT") {
        document.querySelector(".root").innerHTML = '       <div class="payment-form">            <header>                <h1>Podsumowanie płatności</h1>                <div class="logo-server">                <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1058458937722150942/Five_Solutions_15.png" alt="Server Logo" />            </div>            </header>            <div class="items-container">                <h1 id="main-label-desc">Przedmioty</h1>                <div class="icon-fonts">                <i class="fas fa-dumpster" aria-hidden="true" onclick="deleteItems()"></i>            </div>            </div>            <div class="changer-boxes">                <div class="items-box">                    <div class="item-box">    <div class="photo"><img src="https://cdn.discordapp.com/attachments/1057070797996441621/1066056840967884800/wait-coins_400__icon.png" alt="photo" width="100%" height="100%"></div>    <div class="textes-item-boxes">        <p id="header-text">Solutions Coins </p>        <p id="price-box">Cena: <span>70PLN</span></p>        <p id="box-desc">Po zakupie Wait Coins możesz je wykorzystać pod /sklep bezpośrednio w grze!</p>    </div>                    </div>                    <div class="item-box">                        <div class="photo"><img src="https://cdn.discordapp.com/attachments/1057070797996441621/1066057751400288296/limitowany-samochod__icon.png" alt="photo" width="100%" height="100%"></div>                        <div class="textes-item-boxes">                            <p id="header-text">Limitowany samochód </p>                            <p id="price-box">Cena: <span>70PLN</span></p>                            <p id="box-desc">Wybrany model pojazdu z naszego serwera Discord z limitkami trafi do Twojego garażu!</p>                        </div>                    </div>                    <div class="item-box">                        <div class="photo"><img src="https://indrop.gg/assets/img/waitrp/products/ubranie-ekipowe__icon.png?v=41812" alt="photo" width="100%" height="100%"></div>                        <div class="textes-item-boxes">                            <p id="header-text">Ubranie ekipowe </p>                            <p id="price-box">Cena: <span>70PLN</span></p>                            <p id="box-desc">Ubranie dla Twojej ekipy trafi na serwer</p>                        </div>                    </div>                    <div class="item-box">                        <div class="photo"><img src="https://cdn.discordapp.com/attachments/1057070797996441621/1066058049707593758/ranga-moderator__icon.png" alt="photo" width="100%" height="100%"></div>                        <div class="textes-item-boxes">                            <p id="header-text">Ranga Moderator </p>                            <p id="price-box">Cena: <span>70PLN</span></p>                            <p id="box-desc">Zakup rangę i otrzymaj ją natychmiastowo na serwerze!</p>                        </div>                    </div>                    <div class="item-box">                        <div class="photo"><img src="https://cdn.discordapp.com/attachments/1057070797996441621/1066058204796158022/custom-ped__icon.png" alt="photo" width="100%" height="100%"></div>                        <div class="textes-item-boxes">                            <p id="header-text">Custom ped </p>                            <p id="price-box">Cena: <span>70PLN</span></p>                            <p id="box-desc">Zakup i wybierz swojego nowego custom peda!</p>                        </div>                    </div>                </div>                <div class="payment-methods">                <h1>Metody Płatności</h1>                <div class="payment-props">            <div class="paypal-method" onclick="paypal()">            <center> <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1065710489608388728/image.png" alt="photo">            <p>PayPal</p></center>            </div>            <div class="blik-method" onclick="blik()">                <center> <img src="https://seeklogo.com/images/B/blik-logo-A759DC4120-seeklogo.com.png" alt="photo">                <p>Blik</p></center>                        </div>                        <div class="transfer-method" onclick="transfer()">                            <center> <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1065716194142855198/22323232-removebg-preview.png" alt="photo">                            <p>Szybki Przelew</p></center>                                    </div>                                    <div class="psc-method" onclick="psc()">                                        <center> <img src="https://logos-download.com/wp-content/uploads/2019/11/Paysafecard_Logo-700x119.png" alt="photo">                                        <p>PaySafeCard</p></center>                                                </div>                                                    <center>                                                    <input type="email" placeholder="Adres email*" id="email" autocomplete="off">                                                </center>        </div>                <div class="tos">            <p>Klikając przycisk “Zakup” oświadczam, że zapoznałem/-am się z regulaminem serwisu <span>oskar.dev</span> (  <span>https://oskar.dev/tos</span> ) </p>            <p>Klikając przycisk “Zakup” oświadczam, że zapoznałem/-am się, że nie przysługuje mi prawo do odstąpienia od umowy zawartej elektronicznie.</p>        </div>        <footer id="footer">        <center> <p>Lącznie: <span id="price-total">2137.69 PLN</span></p>     <button onclick="validateFirst()">Zakup</button></center>    <h6 id="power">Powered by <span>OskarPay</span></h6>    <h6>Created by <span>OskarDev.net</span></h6>    </footer></div>        </div>';
        shopBasketItems = JSON.parse(event.data.basketItems)
        shopToken = event.data.shopToken
        shopName = event.data.shopName
        shopLogo = event.data.shopLogo
        document.querySelector(".items-box").innerHTML = '';
        price = 0
        renderItems()
        document.querySelector('.logo-server').innerHTML =  '<img src="' + shopLogo + '" alt="photo" width="100%" height="100%">';
        document.querySelector("#price-total").innerText = price + " PLN";
        $('html').show();
        $('body').show();
    } 
})



function deleteItems(){
    $.post(`http://${GetParentResourceName()}/deleteBasket`, JSON.stringify("Delete Basket"))
    $('body').fadeOut('slow');
    document.querySelector(".items-box").innerHTML = '';
}

function renderItem(datas){
    const itemsBox = document.createElement("div");
    itemsBox.classList.add("item-box");

    const photo = document.createElement("div");
    photo.classList.add("photo");

    const img = document.createElement("img");
    img.setAttribute("src", datas.itemPhoto);
    img.setAttribute("alt", "photo");
    img.style = "width: 100%; height: 100%;";
    
    photo.appendChild(img);
    itemsBox.appendChild(photo);

    const textesItemsBoxes = document.createElement("div");
    textesItemsBoxes.classList.add("textes-item-boxes");


    const headerText = document.createElement("p");
    headerText.setAttribute("id", "header-text");
    headerText.innerText = datas.previewName

    const priceBox = document.createElement("p");
    priceBox.setAttribute("id", "price-box");
    price = Number(price) + Number(datas.price)
    const pricer = datas.price 
    priceBox.innerHTML = `Cena: <span>${pricer} PLN</span>` 

    const boxDesc = document.createElement("p");
    boxDesc.setAttribute("id", "box-desc");
    boxDesc.innerText = datas.itemDescription


    textesItemsBoxes.appendChild(headerText)
    textesItemsBoxes.appendChild(priceBox)
    textesItemsBoxes.appendChild(boxDesc)

    itemsBox.appendChild(textesItemsBoxes);


    const itemBox = document.querySelector(".items-box")
    itemBox.append(itemsBox);

}



function renderItems(){
    shopBasketItems.forEach(async(shopBasketItems) => {
        renderItem({ itemPhoto: shopBasketItems.itemPhoto, previewName: shopBasketItems.previewName, itemDescription: shopBasketItems.itemDescription,  price: shopBasketItems.price });
    })
}


function blik(){
    $('.blik-method').css('border', '1px solid #6366F1')
    $('.transfer-method').css('border', '0px')
    $('.psc-method').css('border', '0px')
    $('.paypal-method').css('border', '0px')
    paymentMethod = 'blik'
}

function backBank() {
    $(".payment-form").fadeOut()
    setTimeout(() => {
    setTimeout(() => {
        $(".payment-form").fadeIn()
    }, "400")
    document.querySelector("#main-label-desc").innerHTML = 'Przedmioty';
    document.querySelector(".icon-fonts").innerHTML = '<i class="fas fa-dumpster" aria-hidden="true" onclick="deleteItems()"></i>';
    price = 0
    document.querySelector(".changer-boxes").innerHTML = '            <div class="items-box">                         </div>            <div class="payment-methods">            <h1>Metody Płatności</h1>            <div class="payment-props">        <div class="paypal-method" onclick="paypal()">        <center> <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1065710489608388728/image.png" alt="photo">        <p>PayPal</p></center>        </div>        <div class="blik-method" onclick="blik()">            <center> <img src="https://seeklogo.com/images/B/blik-logo-A759DC4120-seeklogo.com.png" alt="photo">            <p>Blik</p></center>                    </div>                    <div class="transfer-method" onclick="transfer()">                        <center> <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1065716194142855198/22323232-removebg-preview.png" alt="photo">                        <p>Szybki Przelew</p></center>                                </div>                                <div class="psc-method" onclick="psc()">                                    <center> <img src="https://logos-download.com/wp-content/uploads/2019/11/Paysafecard_Logo-700x119.png" alt="photo">                                    <p>PaySafeCard</p></center>                                            </div>                                            <center>                                                <input type="email" placeholder="Adres email*" id="email" autocomplete="off">                                            </center>    </div>    <div class="tos">        <p>Klikając przycisk “Zakup” oświadczam, że zapoznałem/-am się z regulaminem serwisu <span>oskar.dev</span> (  <span>https://oskar.dev/tos</span> ) </p>        <p>Klikając przycisk “Zakup” oświadczam, że zapoznałem/-am się, że nie przysługuje mi prawo do odstąpienia od umowy zawartej elektronicznie.</p>    </div><footer id="footer">      <center> <p>Lącznie: <span id="price-total">2137.69 PLN</span></p>    <button onclick="validateFirst()">Zakup</button></center>   <h6 id="power">Powered by <span>OskarPay</span></h6>   <h6>Created by <span>OskarDev.net</span></h6></footer>';
    renderItems()
    document.querySelector("#price-total").innerText = price + " PLN";
    document.querySelector("#email").value = valueofemail
}, "400")
}



function transfer(){
    valueofemail = $('#email').val()
    $(".payment-form").fadeOut()
    setTimeout(() => {
    setTimeout(() => {
        $(".payment-form").fadeIn()
    }, "400")
    $('.blik-method').css('border', '0px')
    $('.transfer-method').css('border', '1px solid #6366F1')
    $('.psc-method').css('border', '0px')
    $('.paypal-method').css('border', '0px')
    paymentMethod = 'none'
    document.querySelector(".changer-boxes").innerHTML = ' <div class="changer-boxes2">            <div class="bank1" onclick="bank1()">                    <center>                        <img src="https://img.cashbill.pl/neopay/transfer/03/mtransfer.png" alt="photo" width="80px" height="42px">                        <p>mBank</p>                    </center>                </div>                <div class="bank2" onclick="bank2()">                    <center>                        <img src="https://img.cashbill.pl/neopay/transfer/03/place_z_inteligo.png" alt="photo" width="80px" height="42px">                        <p>Inteligo</p>                    </center>                </div>                <div class="bank3" onclick="bank3()">                    <center>                        <img src="https://cdn.discordapp.com/attachments/1057799357186969673/1066158167895052448/place_z_ipko-removebg-preview.png" alt="photo" width="80px" height="42px">                        <p>PKO BP</p>                    </center>                </div>                <div class="bank4" onclick="bank4()">                    <center>                        <img src="https://img.cashbill.pl/neopay/transfer/03/plac_z_ing.png" alt="photo" width="80px" height="42px">                        <p>Płać z ING</p>                    </center>                </div>                <div class="bank5" onclick="bank5()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/pocztowy24.png" alt="photo" width="80px" height="42px">                        <p>Bank Pocztowy</p>                    </center>                </div>                <div class="bank6" onclick="bank6()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/pekao_sa.png" alt="photo" width="80px" height="42px">                        <p>Pekao 24</p>                    </center>                </div>                <div class="bank7" onclick="bank7()">                    <center>                        <img src="https://img.cashbill.pl/neopay/transfer/03/przelew24_wbk.png" alt="photo" width="80px" height="42px">                        <p>Santander Bank</p>                    </center>                </div>                <div class="bank8" onclick="bank8()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/alior_bank.png" alt="photo" width="80px" height="42px">                        <p>Alior Bank</p>                    </center>                </div>                <div class="bank9" onclick="bank9()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/millennium_bank.png" alt="photo" width="80px" height="42px">                        <p>Bank Millennium</p>                    </center>                </div>                <div class="bank10" onclick="bank10()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/exbnpp.png" alt="photo" width="80px" height="42px">                        <p>BNP Paribas</p>                    </center>                </div>                <div class="bank11" onclick="bank11()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/logo_citi.png" alt="photo" width="80px" height="42px">                        <p>Citi Handlowy</p>                    </center>                </div>                <div class="bank12" onclick="bank12()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/cagricolepbl.png" alt="photo" width="80px" height="42px">                        <p>Crédit Agricole</p>                    </center>                </div>                <div class="bank13" onclick="bank13()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/neobank.png" alt="photo" width="80px" height="42px">                        <p>neoBank</p>                    </center>                </div>                <div class="bank14" onclick="bank14()">                    <center>                        <img src="https://img.cashbill.pl/neopay/transfer/03/nest_bank.png" alt="photo" width="80px" height="42px">                        <p>nestPrzelew</p>                    </center>                </div>                <div class="bank15" onclick="bank15()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/pluspbl.png" alt="photo" width="80px" height="42px">                        <p>Plus Bank</p>                    </center>                </div>                <div class="bank16" onclick="bank16()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/getinpbl.png" alt="photo" width="80px" height="42px">                        <p>VeloBank</p>                    </center>                </div>                <div class="bank17" onclick="bank17()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/bospbl.png" alt="photo" width="80px" height="42px">                        <p>BOŚ Bank</p>                    </center>                </div>                <div class="bank18" onclick="bank18()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/toyota_bank.png" alt="photo" width="80px" height="42px">                        <p>Toyota Bank</p>                    </center>                </div>                <div class="bank19" onclick="bank19()" >                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/volkswagen_bank.png" alt="photo" width="80px" height="42px">                        <p>VW Bank</p>                    </center>                </div>                <div class="bank20" onclick="bank20()">                    <center>                        <img src="https://img.cashbill.pl/neopay/bank/03/other_bank.png" alt="photo" width="80px" height="42px">                        <p>Inny bank</p>                    </center>                </div>                    <h6 id="power">Powered by <span>OskarPay</span></h6>                    <h6>Created by <span>OskarDev.net</span></h6> </div>'
    document.querySelector("#main-label-desc").innerHTML = 'Wybierz bank';
    document.querySelector(".icon-fonts").innerHTML = '<i class="fas fa-xmark" aria-hidden="true" onclick="backBank()"></i>';
}, "400")
}

function psc(){
    $('.blik-method').css('border', '0px')
    $('.transfer-method').css('border', '0px')
    $('.psc-method').css('border', '1px solid #6366F1')
    $('.paypal-method').css('border', '0px')
    paymentMethod = 'paysafecard'
}

function paypal(){
    $('.blik-method').css('border', '0px')
    $('.transfer-method').css('border', '0px')
    $('.psc-method').css('border', '0px')
    $('.paypal-method').css('border', '1px solid #6366F1')
    paymentMethod = 'paypal'
}


function validateFirst() {
if (paymentMethod === 'none' || $('#email').val() === "" || $('#email').val().includes("@") == false || $('#email').val().includes(".") == false){
        $('#textError').hide()
        const para = document.createElement("H2");
        para.setAttribute("id", "textError")
    const node = document.createTextNode("Upewnij się że wypełniłeś wszystkie pola!");
    para.appendChild(node);
    footerDoc = document.querySelector("#footer")
    footerDoc.appendChild(para);
    } else {
        $('#textError').hide()
        email = $('#email').val()

    const informations = {
        "price": price,
        "payMethod": paymentMethod,
        "email": email
    }
    $.post(`http://${GetParentResourceName()}/generatePaymentsLink`, JSON.stringify(informations))
    }
}


function cancelPaymen() {
    $.post(`http://${GetParentResourceName()}/exitPayment`, JSON.stringify("Exit Payment"))
    $('body').fadeOut('slow');
}

function cancelPaymen2() {
    $.post(`http://${GetParentResourceName()}/exitPayment`, JSON.stringify("Exit Payment"))
    $('body').fadeOut('slow');
}


function giveItems(){
    shopBasketItems.forEach(async(shopBasketItems) => {
        const informations = {
            "price": shopBasketItems.price,
            "type": shopBasketItems.type,
            "customTrigger": shopBasketItems.customTrigger,
            "customTriggerType": shopBasketItems.customTriggerType,
            "itemName": shopBasketItems.item,
            "discordroleid" : shopBasketItems.discordroleid,
            "playerdiscordid": shopBasketItems.playerdiscordid
        }
        $.post(`http://${GetParentResourceName()}/addItems`, JSON.stringify(informations))
    })
}



window.addEventListener('message', function(event) {
    if (event.data.type == "PAYMENT_LINK") {
    paymentLink = event.data.paymentLink
    paymentToken = event.data.paymentToken
    window.invokeNative("openUrl", event.data.paymentLink);
    const informations = {
        "paymentToken": paymentToken,
        "email": email
    }
    $.post(`http://${GetParentResourceName()}/checkPaymentsLoop`, JSON.stringify(informations))
    $(".payment-form").fadeOut()
    setTimeout(() => {
    setTimeout(() => {
        $(".payment-form").fadeIn()
    }, "400")
    document.querySelector(".payment-form").innerHTML = '            <header>                <h1>Oczekiwanie na płatność</h1>                <div class="logo-server">                <img src="https://cdn.discordapp.com/attachments/1057070797996441621/1058458937722150942/Five_Solutions_15.png" alt="Server Logo" />            </div>            </header>            <div class="items-container">                <h1 id="main-label-desc" style="font-size: 19px;">Twoje zamówienie jest gotowe do opłacenia jeśli nie   otworzyła ci się przegladarka wejdź w link poniżej                    po opłaceniu zamówienia kliknij przycisk Sprawdź status zamowienia.</h1>                </div>     <div class="ring"></div>          <p id="paymentToks">Token Płatności: <span id="paymentToker">frfmoor43e</span></p>                <input type="text" autocomplete="off" id="linktopays" readonly>                 <button id="canceltras" onclick="cancelPaymen()">Anuluj transakcje</button>                <footer id="footer2">                        <center> <p>Lącznie: <span id="price-total">2137.69 PLN</span></p>                     <button onclick="checkOrder()">Sprawdź status zamówienia</button></center>                    <h6 id="power">Powered by <span>OskarPay</span></h6>                    <h6>Created by <span>OskarDev.net</span></h6>                    </footer>'
    document.getElementById("paymentToker").innerText = paymentToken;
    document.getElementById("linktopays").value = paymentLink;
    document.getElementById("price-total").innerText = price + " PLN";
}, "400")
    } 
})





function checkOrder() {
    const informations = {
        "paymentToken": paymentToken,
        "email": email
    }
    $.post(`http://${GetParentResourceName()}/checkPaymentsLink`, JSON.stringify(informations))
}






window.addEventListener('message', function(event) {
    if (event.data.type == "TRANSACTION_INFO") { 
        if (event.data.isCorrect == true){
            $(".payment-form").fadeOut()
            setTimeout(() => {
        giveItems()
        document.querySelector(".root").innerHTML = 'Dziękujemy za płatność na rzecz naszego serwera! <center><p>Pozdrawiamy ' + event.data.serverName +  '</p> <button id="end-button" onclick="cancelPaymen2()">Wróć do gry</button> </center>'
        }, "400")
        
        }else {
            $('#textError2').hide()
            const para = document.createElement("H2");
            para.setAttribute("id", "textError2")
        const node = document.createTextNode("Upewnij się że opłaciłeś swoje zamówienie!");
        para.appendChild(node);
        footerDoc = document.querySelector("#footer2")
        footerDoc.appendChild(para);
        }
    } 
})





function bank1(){
    paymentMethod = "mbank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}

function bank2(){
    paymentMethod = "pko_bp_inteligo"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank3(){
    paymentMethod = "pko_bp"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}

function bank4(){
    paymentMethod = "ing_bs"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank5(){
    paymentMethod = "bank_pocztowy"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank6(){
    paymentMethod = "pekao_sa"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank7(){
    paymentMethod = "bz_wbk"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}

function bank8(){
    paymentMethod = "alior_bank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank9(){
    paymentMethod = "millennium"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank10(){
    paymentMethod = "fortis"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}

function bank11(){
    paymentMethod = "citi_pbl"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank12(){
    paymentMethod = "lukas_bank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank13(){
    paymentMethod = "neobank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank14(){
    paymentMethod = "nesbank_pbl"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank15(){
    paymentMethod = "investbank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank16(){
    paymentMethod = "getin_noble_bank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank17(){
    paymentMethod = "bosbank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}

function bank18(){
    paymentMethod = "toyotabank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank19(){
    paymentMethod = "vwbank"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}


function bank20(){
    paymentMethod = "other"
    backBank()
    setTimeout(() => {
        $('.transfer-method').css('border', '1px solid #6366F1')
    }, "400")
}