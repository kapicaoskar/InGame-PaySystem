


local token = Config.ShopToken
local adresip = nil
local looper = true
local currentHex = nil

Wyslij_zapytanie = PerformHttpRequest
PerformHttpRequest = nil









ESX.RegisterServerCallback("OskarPay:getHex", function (source , cb)
local xPlayer = ESX.GetPlayerFromId(source)
local hexIden = xPlayer.getIdentifier()
cb(hexIden)
end)



-- Przyklad wykorzystania ESX.TriggerServerCallback('OskarPay:addBasketItem',function() end, "fivecase_premium", "Skrzynka FiveCase", 2 , "steam:00000000", 20 , "item" )
ESX.RegisterServerCallback("OskarPay:addBasketItem", function (source , cb , itemName, itemPreviewName, itemPrice , type , itemPhoto, itemDescription , customTrigger, customTriggerType, discordroleid, playerdiscordid)
local xPlayer = ESX.GetPlayerFromId(source)
local hexIden = xPlayer.getIdentifier()
Wait(10)
    MySQL.insert.await('INSERT INTO OskarPay_basket (player, item , previewName, price , type, itemPhoto , itemDescription , customTrigger, customTriggerType, discordroleid, playerdiscordid) VALUES (?,?,?,?,?,?,?,?,?,?,?)', {
        hexIden,
        itemName,
        itemPreviewName,
        itemPrice,
        type,
        itemPhoto,
        itemDescription,
        customTrigger,
        customTriggerType,
        discordroleid,
        playerdiscordid
    })
end)








ESX.RegisterServerCallback("OskarPay:checkBasketItems", function (source , cb )
    local xPlayer = ESX.GetPlayerFromId(source)
    local hexIden = xPlayer.getIdentifier()
    local basketitems = {}

    MySQL.Async.fetchAll(
                "SELECT * FROM OskarPay_basket WHERE player = @player",
                {
                    ["@player"] = hexIden
                },
                function(info)
                    for _, v in ipairs(info) do
    
                        table.insert(
                            basketitems, {
                                item = v.item,
                                previewName = v.previewName,
                                price = v.price,
                                type = v.type,
                                itemPhoto = v.itemPhoto,
                                itemDescription = v.itemDescription,
                                customTrigger = v.customTrigger,
                                customTriggerType = v.customTriggerType,
                                playerdiscordid = v.playerdiscordid,
                                discordroleid = v.discordroleid
                            }
                        )
    
                    end
                    
                    cb(basketitems)
                end
            )
end)

ESX.RegisterServerCallback("OskarPay:addPlayerItem", function(source ,cb , item , quantity)
local xPlayer = ESX.GetPlayerFromId(source)
xPlayer.addInventoryItem(tostring(item), quantity)
end)




ESX.RegisterServerCallback("OskarPay:sendWebhook", function(source ,cb , item , price , identifier)
    local nazwa = 'OskarPay - Platnosc'
    local webhook = Config.WebhookLink
    function DiscordHook(hook,message,color)
        local embeds = {
                    {
                ["title"] = message,
                ["type"] = "rich",
                ["color"] = color,
                ["footer"] = {
                                    ["text"] = 'OskarPay | Logi'
                        },
                    }
                }
        if message == nil or message == '' then return FALSE end
        Wyslij_zapytanie(webhook, function(err, text, headers) end, 'POST', json.encode({ username = nazwa,embeds = embeds}), { ['Content-Type'] = 'application/json' })
    end
    DiscordHook('Nowa Platnosc', "Nowa płatność w serwisie OskarPay zakupiono : " .. "\n Nazwa itemu: " .. tostring(item)  .. " \n Jego identifier to : " .. identifier .. " \n Kwota zakupu to : " .. tostring(price) .. " PLN" , 1669329)
    end)




    ESX.RegisterServerCallback("OskarPay:sendDigitalWebhook", function(source ,cb , item , price , identifier)
        local nazwa = 'OskarPay - Platnosc'
        local webhook = Config.WebhookLink
        function DiscordHook(hook,message,color)
            local embeds = {
                        {
                    ["title"] = message,
                    ["type"] = "rich",
                    ["color"] = color,
                    ["footer"] = {
                                        ["text"] = 'OskarPay | Logi Zakupu Manualnego'
                            },
                        }
                    }
            if message == nil or message == '' then return FALSE end
            Wyslij_zapytanie(webhook, function(err, text, headers) end, 'POST', json.encode({ username = nazwa,embeds = embeds}), { ['Content-Type'] = 'application/json' })
        end
        DiscordHook('Nowa Platnosc', "Nowa płatność w serwisie OskarPay zakupiono coś co trzeba nadać manualnie : " .. "\n Nazwa itemu: " .. tostring(item)   .. " \n Jego identifier to : " .. identifier .. " \n Kwota zakupu to : " .. tostring(price) .. " PLN", 1669329)
        end)


        ESX.RegisterServerCallback("OskarPay:deleteBasketItems", function (source , cb , hex)
            local xPlayer = ESX.GetPlayerFromId(source)
            local hexIden = xPlayer.getIdentifier()
            local hexer = hex
            MySQL.query.await('DELETE FROM OskarPay_basket WHERE player = ?', {hexIden})
        end)








ESX.RegisterServerCallback("OskarPay:generatePaymentLink", function (source , cb , paymentChannel , price , mail )
    local link = {}
        local token = {}
            if Config.CashbillSecretKey == "none" and Config.CashbillShopId == "none" then
            Wyslij_zapytanie("https://api.oskar.dev/stores/" .. Config.ShopToken .. "/payments/public/?email=" .. mail .. "&paymentChannel=" .. paymentChannel .. "&price=" .. price, function (statusCode, resultData, resultHeaders)
        if(statusCode == 200) then
                local _data = json.decode(resultData)
                link = _data.redirectUrl
                token = _data.tokenPayment
        cb(link , token)
            else
            print("Wystąpił błąd poczas łączenia się z API OskarPay")
    end
    end)
else
    Wyslij_zapytanie("https://api.oskar.dev/stores/" .. Config.ShopToken .. "/payments/public/?email=" .. mail .. "&paymentChannel=" .. paymentChannel .. "&price=" .. price, function (statusCode, resultData, resultHeaders)
        if(statusCode == 200) then
                local _data = json.decode(resultData)
                link = _data.redirectUrl
                token = _data.tokenPayment
        cb(link , token)
            else
            print("Wystąpił błąd poczas łączenia się z API OskarPay")
            
    end
    end)
end
        end)








        ESX.RegisterServerCallback("OskarPay:checkPaymentLink", function (source , cb , paymentToken , shopToken , playerMail , playerName ,playerIden )
            --DO DOROBIENIA MAIL GRACZA
            if Config.CashbillSecretKey == "none" and Config.CashbillShopId == "none" then
                local namerPlay = playerName.gsub(playerName,"%s+", "")
                Wyslij_zapytanie("https://api.oskar.dev/stores/" .. Config.ShopToken .. "/payments/public/checkout/?email=" .. playerMail .. "&paymentToken=" .. paymentToken .. "&customerName=" .. namerPlay .. "&customerIdentifier=" .. playerIden, function (statusCode, resultData, resultHeaders)
                if(statusCode == 200) then
                        local _data = json.decode(resultData)
                        if(_data.isCorrect == true) then
                            cb(_data.isCorrect , token)
                        else 
                            cb(_data.isCorrect , token)
                        end
                    else
                    print("Wystąpił błąd poczas łączenia się z API")

            end
            end)
        else 

                        --DO DOROBIENIA MAIL GRACZA
                        Wyslij_zapytanie("https://api.oskar.dev/stores/" .. Config.ShopToken .. "/payments/public/checkout/?email=" .. playerMail .. "&paymentToken=" .. paymentToken .. "&customerName=" .. playerName .. "&customerIdentifier=" .. playerIden, function (statusCode, resultData, resultHeaders)
                            if(statusCode == 200) then
                                    local _data = json.decode(resultData)
                                    if(_data.isCorrect == true) then
                                        cb(_data.isCorrect , token)
                                    else 
                                        cb(_data.isCorrect , token)
                                    end
                                else
                                print("Wystąpił błąd poczas łączenia się z API")
            end
            end)
        end
                end)








                    ESX.RegisterServerCallback("OskarPay:addDiscordRole", function (source , cb , discordroleid , playerdiscordid)
                        PerformHttpRequest("https://discordapp.com/api/guilds/"..Config.GuildID.."/members/".. playerdiscordid .."/roles/"..discordroleid, function(errorCode, resultData, resultHeaders)
                            print("OskarPay: "..(errorCode and errorCode == 204 and "Nadano range dla: " .. playerdiscordid or "Nie udalo sie nadac rangi! dla : " .. playerdiscordid).."") 
                            cb(playerdiscordid)
                        end, "PUT", "", {["Content-Type"] = "application/json", ["Content-Length"] = '0', ["Authorization"] = "Bot "..Config.BotToken})
                    end)






                    ESX.RegisterServerCallback("OskarPay:stopLoop", function (source , cb , hex)
                    looper = false
                    end)




                    ESX.RegisterServerCallback("OskarPay:checkPaymentLinkLoop", function (source , cb , paymentToken , shopToken , playerMail , playerName ,playerIden )
                        local xPlayer = ESX.GetPlayerFromId(source)
                        currentHex = xPlayer.getIdentifier()
                        looper = true
                        while looper do
                            Wait(3000)
                            local namerPlay = playerName.gsub(playerName,"%s+", "")
                            Wyslij_zapytanie("https://api.oskar.dev/stores/" .. Config.ShopToken .. "/payments/public/checkout/?email=" .. playerMail .. "&paymentToken=" .. paymentToken .. "&customerName=" .. namerPlay .. "&customerIdentifier=" .. playerIden, function (statusCode, resultData, resultHeaders)
                            if(statusCode == 200) then
                                    local _data = json.decode(resultData)
                                    if(_data.isCorrect == true) then
                                        cb(_data.isCorrect , token)
                                    end
                                else
                                print("Wystąpił błąd poczas łączenia się z API")
                        end
                        end)
                    end
                            end)


                            AddEventHandler('playerDropped', function ()
                            local xPlayer = ESX.GetPlayerFromId(source)
                            local hexIden = xPlayer.getIdentifier()
                            if hexIden == currentHex then
                            looper = false
                            currentHex = nil
                            end
                            end)




                            ESX.RegisterServerCallback("OskarPay:checkPromoCode", function (source , cb , promoCode)
                                print("uzyto kodu :" .. promoCode)
                                cb("none")
                            end)