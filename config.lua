Config = {}


Config.ServerName = "OskarRP" -- your server name
Config.ShopLogo = ""  -- Logo image of your server please use png for better User Interface
Config.ShopToken = "" -- Your server auth token from your api


Config.CashbillSecretKey = "none"  
Config.CashbillShopId = "none" 


Config.Webhook = true -- sends discord webhook after payment
Config.WebhookLink = "" -- Discord Webhook link



Config.AddItems = true -- set false if you dont want us to add items to player inventory
Config.TriggerType = "client" --  If you have Config.AddItems set to false then select type of your own trigger  to client or server trigger
Config.YourTrigger = "oskarpay:trigger" -- If you have Config.AddItems set to false then your trigger will be triggered with data like this TriggerEvent("oskarpay:trigger", datas.itemName , datas.quantity)



--DISCORD ROLE ADDING SOMETHING LIKE RANG EXAMPLE : Administrator 
Config.GuildID = "none" -- if none discord roles will not work
Config.BotToken = "none"  -- if none discord roles will not work



