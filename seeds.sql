CREATE TABLE IF NOT EXISTS `Users` (`firstName` VARCHAR(255), `lastName` VARCHAR(255), `userName` VARCHAR(255) NOT NULL UNIQUE, `permission` TINYINT(1) DEFAULT false,
`email` VARCHAR(255), `familyId` VARCHAR(255) , `accessId` VARCHAR(255), `password` VARCHAR(255) NOT NULL, `pPts` INTEGER DEFAULT 0, `secondaryAccts` VARCHAR(255),
`createdAt` DATETIME, `updatedAt` DATETIME, PRIMARY KEY (`familyId`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Rewards` (`id` INTEGER NOT NULL auto_increment , `RewardList` VARCHAR(255), `familyId` VARCHAR(255), `favorites` VARCHAR(255), `history` VARCHAR(255),
`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserFamilyId` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), 
FOREIGN KEY (`UserFamilyId`) REFERENCES `Users` (`familyId`) ON DELETE NO ACTION ON UPDATE CASCADE)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Tasks` (`id` INTEGER NOT NULL auto_increment , `taskList` VARCHAR(255), `familyId` VARCHAR(255), `history` VARCHAR(255), `favorites` VARCHAR(255),
`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserFamilyId` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`),
FOREIGN KEY (`UserFamilyId`) REFERENCES `Users` (`familyId`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;