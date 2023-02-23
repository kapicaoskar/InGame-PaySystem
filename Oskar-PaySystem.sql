
CREATE TABLE IF NOT EXISTS `OskarPay_basket` (
  `player` varchar(100) DEFAULT NULL,
  `item` varchar(100) DEFAULT NULL,
  `itemDescription` varchar(100) DEFAULT NULL,
  `itemPhoto` varchar(1000) DEFAULT NULL,
  `previewName` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `customTrigger` varchar(50) DEFAULT 'none',
  `customTriggerType` varchar(50) DEFAULT 'none',
  `discordroleid` varchar(50) DEFAULT 'none',
  `playerdiscordid` varchar(50) DEFAULT 'none'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

