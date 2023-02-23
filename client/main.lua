local hex = nil
    
    RegisterNetEvent("OskarPay:preparePayment")
    AddEventHandler("OskarPay:preparePayment" , function ()
    ESX.TriggerServerCallback('OskarPay:getHex', function(hex2) 
            hex = hex2
    end)
    Wait(10)
    ESX.TriggerServerCallback('OskarPay:checkBasketItems', function(basketitems)
    if type(next(basketitems)) == "nil" then
        ESX.ShowNotification("Nie posiadasz nic w koszyku!")
    else 
    
        SendNUIMessage({
            type = "OPEN_PAYMENT",
            shopLogo = Config.ShopLogo,
            shopName = Config.ServerName,
            shopToken = Config.ShopToken,
            basketItems = json.encode(basketitems),
        })
    SetNuiFocus(true ,true)
    end
    end, hex)
    end)
    
    
    
    RegisterNUICallback("addItems", function(data)
        ESX.TriggerServerCallback('OskarPay:getHex', function(hex2) 
            hex = hex2
    end)
    Wait(10)
        local datas = {
            itemName = tostring(data.itemName),
            quantity = 1,
            price = data.price,
            type = data.type,
            customTrigger = data.customTrigger,
            customTriggerType  = data.customTriggerType,
            discordroleid = data.discordroleid,
            playerdiscordid = data.playerdiscordid
        }
    
    
    ESX.TriggerServerCallback('OskarPay:deleteBasketItems', function() 
    end, hex)
    ESX.TriggerServerCallback('OskarPay:OskarPayWebhook', function() 
    end, datas.itemName, datas.price, hex)
    
    if datas.discordroleid == "none" and datas.playerdiscordid == "none" and Config.GuildID == "none" and Config.BotToken == "none"  then
    if datas.customTrigger == "none" and datas.customTriggerType == "none" then 
    if datas.type == "item" then
    if Config.Webhook == true then 
    ESX.TriggerServerCallback('OskarPay:sendWebhook', function() 
    end, datas.itemName, datas.price, hex)
    end
    
    if Config.AddItems == true then 
    ESX.TriggerServerCallback('OskarPay:addPlayerItem', function() 
    end, datas.itemName, datas.quantity)
    end
    
    if Config.AddItems == false then 
        if  Config.TriggerType == "client" then 
        TriggerEvent(Config.YourTrigger, datas.itemName , datas.quantity)
        end
        if  Config.TriggerType == "server" then 
            TriggerServerEvent(Config.YourTrigger, datas.itemName , datas.quantity)
            end
    end
    end
    if datas.type == "digital" then 
    ESX.TriggerServerCallback('OskarPay:sendDigitalWebhook', function() 
    end, datas.itemName, datas.price, hex)
    end
    else
        ESX.TriggerServerCallback('OskarPay:OskarPayWebhook', function() 
        end, datas.itemName, datas.price, hex)
        if datas.customTriggerType == "client" then 
        TriggerEvent(datas.customTrigger)
        end
        if datas.customTriggerType == "server" then 
            TriggerServerEvent(datas.customTrigger)
            end
    end
    else
        ESX.TriggerServerCallback('OskarPay:sendWebhook', function() 
        end, datas.itemName, datas.price, hex)
        if datas.type == "discordrole" then
        ESX.TriggerServerCallback('OskarPay:addDiscordRole', function(id) 
            ESX.ShowNotification("Nadano role na discord na ID : " .. id)
        end,  datas.discordroleid, datas.playerdiscordids)
    else
        ESX.ShowNotification("Stworz ticket na discord serwera cos poszlo nie tak")
        ESX.TriggerServerCallback('OskarPay:sendWebhook', function() 
        end, datas.itemName, datas.price, hex)
    end
    end
    end)
    
    
    
    RegisterNUICallback("generatePaymentsLink", function(data)
        
        local datas = {
            price = data.price,
            payMethod = data.payMethod,
            email = data.email
        }
    ESX.TriggerServerCallback('OskarPay:generatePaymentLink', function(link, token)
        SendNUIMessage({
            type = "PAYMENT_LINK",
            paymentLink = link,
            paymentToken = token,
        })
    end, datas.payMethod , datas.price , datas.email )
    end)
    
    
    
    
    RegisterNUICallback("checkPaymentsLink", function(data)
        
        local datas = {
            paymentToken = data.paymentToken,
            shopToken = Config.ShopToken,
            email = data.email,
            playerName = GetPlayerName(PlayerId())
        }
    ESX.TriggerServerCallback('OskarPay:checkPaymentLink', function(isCorrect , token)
        SendNUIMessage({
            type = "TRANSACTION_INFO",
            isCorrect = isCorrect,
            paymentToken = token,
            serverName = Config.ServerName
        })
    end, datas.paymentToken , datas.shopToken, datas.email, datas.playerName , hex )
    end)
    
    
    
    
    

    
RegisterNUICallback("checkPaymentsLoop", function(data)
    
    local datas = {
        paymentToken = data.paymentToken,
        shopToken = Config.ShopToken,
        email = data.email,
        playerName = GetPlayerName(PlayerId())
    }
ESX.TriggerServerCallback('OskarPay:checkPaymentLinkLoop', function(isCorrect , token)
    SendNUIMessage({
        type = "TRANSACTION_INFO",
        isCorrect = isCorrect,
        paymentToken = token,
        serverName = Config.ServerName
    })
end, datas.paymentToken , datas.shopToken, datas.email, datas.playerName , hex )
end)

    
    
    
    
    
    RegisterNUICallback("deleteBasket", function(data) 
        ESX.TriggerServerCallback('OskarPay:getHex', function(hex2) 
            hex = hex2
        end)
        Wait(10)
        ESX.TriggerServerCallback('OskarPay:deleteBasketItems', function() 
        end, hex)
        SetNuiFocus(false,false)
        ESX.ShowNotification('Usunieto Koszyk!')
    end)
    
    
    
    
    RegisterNUICallback("exitPayment", function() 
        SetNuiFocus(false, false)
        ESX.TriggerServerCallback('OskarPay:stopLoop', function() 
        end, hex)
    end)
    
    
    