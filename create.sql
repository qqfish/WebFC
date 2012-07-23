<<<<<<< HEAD
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `WebFc` DEFAULT CHARACTER SET utf8 ;
USE `WebFc` ;

-- -----------------------------------------------------
-- Table `WebFc`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`User` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`User` (
  `email` VARCHAR(45) NOT NULL ,
  `Usercol` VARCHAR(45) NULL ,
  PRIMARY KEY (`email`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`Room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`Room` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`Room` (
  `idRoom` INT NOT NULL ,
  `doodleOfTable` MEDIUMBLOB NULL ,
  `roomname` VARCHAR(45) NOT NULL ,
  `roomOwner` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`idRoom`) ,
  INDEX `fk_Room_User` (`roomOwner` ASC) ,
  CONSTRAINT `fk_Room_User`
    FOREIGN KEY (`roomOwner` )
    REFERENCES `WebFc`.`User` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`File`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`File` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`File` (
  `idFile` INT NOT NULL ,
  `fileData` MEDIUMBLOB NOT NULL ,
  `onTable` TINYINT(1)  NOT NULL DEFAULT false ,
  `xFile` INT NULL ,
  `yFile` INT NULL ,
  `fileOwner` VARCHAR(45) NOT NULL ,
  `fileOwner` VARCHAR(45) NOT NULL ,
  `Room_idRoom` INT NOT NULL ,
  PRIMARY KEY (`idFile`) ,
  INDEX `fk_File_User1` (`fileOwner` ASC) ,
  INDEX `fk_File_Room1` (`Room_idRoom` ASC) ,
  CONSTRAINT `fk_File_User1`
    FOREIGN KEY (`fileOwner` )
    REFERENCES `WebFc`.`User` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_File_Room1`
    FOREIGN KEY (`Room_idRoom` )
    REFERENCES `WebFc`.`Room` (`idRoom` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`RoomNote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`RoomNote` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`RoomNote` (
  `idRoomNote` INT NOT NULL ,
  `noteContext` VARCHAR(45) NOT NULL ,
  `xFile` INT NOT NULL ,
  `yFile` INT NOT NULL ,
  `idRoom` INT NOT NULL ,
  PRIMARY KEY (`idRoomNote`) ,
  INDEX `fk_RoomNote_Room1` (`idRoom` ASC) ,
  CONSTRAINT `fk_RoomNote_Room1`
    FOREIGN KEY (`idRoom` )
    REFERENCES `WebFc`.`Room` (`idRoom` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`FileNote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`FileNote` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`FileNote` (
  `idFileNote` INT NOT NULL ,
  `noteContext` VARCHAR(45) NOT NULL ,
  `x` INT NOT NULL ,
  `y` INT NOT NULL ,
  `idFile` INT NOT NULL ,
  PRIMARY KEY (`idFileNote`) ,
  INDEX `fk_FileNote_File1` (`idFile` ASC) ,
  CONSTRAINT `fk_FileNote_File1`
    FOREIGN KEY (`idFile` )
    REFERENCES `WebFc`.`File` (`idFile` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
=======
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `WebFc` DEFAULT CHARACTER SET utf8 ;
USE `WebFc` ;

-- -----------------------------------------------------
-- Table `WebFc`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`User` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`User` (
  `email` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`email`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`Room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`Room` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`Room` (
  `idRoom` INT NOT NULL AUTO_INCREMENT ,
  `doodleOfTable` MEDIUMBLOB NULL ,
  `roomName` VARCHAR(45) NOT NULL ,
  `roomOwner` VARCHAR(45) NOT NULL ,
  `lastTime` DATETIME NOT NULL ,
  PRIMARY KEY (`idRoom`) ,
  INDEX `fk_Room_User` (`roomOwner` ASC) ,
  CONSTRAINT `fk_Room_User`
    FOREIGN KEY (`roomOwner` )
    REFERENCES `WebFc`.`User` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`File`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`File` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`File` (
  `idFile` INT NOT NULL AUTO_INCREMENT ,
  `fileData` MEDIUMBLOB NOT NULL ,
  `onTable` TINYINT(1)  NOT NULL DEFAULT false ,
  `xFile` INT NULL ,
  `yFile` INT NULL ,
  `fileOwner` VARCHAR(45) NOT NULL ,
  `idRoom` INT NOT NULL ,
  `fileName` VARCHAR(45) NOT NULL ,
  `fileType` VARCHAR(45) NOT NULL ,
  `rotate` INT NOT NULL DEFAULT 0 ,
  `preview` MEDIUMBLOB NULL ,
  `editTime` DATETIME NOT NULL ,
  PRIMARY KEY (`idFile`) ,
  INDEX `fk_File_User1` (`fileOwner` ASC) ,
  INDEX `fk_File_Room1` (`idRoom` ASC) ,
  CONSTRAINT `fk_File_User1`
    FOREIGN KEY (`fileOwner` )
    REFERENCES `WebFc`.`User` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_File_Room1`
    FOREIGN KEY (`idRoom` )
    REFERENCES `WebFc`.`Room` (`idRoom` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`RoomNote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`RoomNote` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`RoomNote` (
  `idRoomNote` INT NOT NULL AUTO_INCREMENT ,
  `noteContext` VARCHAR(45) NOT NULL ,
  `x` INT NOT NULL ,
  `y` INT NOT NULL ,
  `idRoom` INT NOT NULL ,
  PRIMARY KEY (`idRoomNote`) ,
  INDEX `fk_RoomNote_Room1` (`idRoom` ASC) ,
  CONSTRAINT `fk_RoomNote_Room1`
    FOREIGN KEY (`idRoom` )
    REFERENCES `WebFc`.`Room` (`idRoom` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebFc`.`FileNote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WebFc`.`FileNote` ;

CREATE  TABLE IF NOT EXISTS `WebFc`.`FileNote` (
  `idFileNote` INT NOT NULL AUTO_INCREMENT ,
  `noteContext` VARCHAR(45) NOT NULL ,
  `x` INT NOT NULL ,
  `y` INT NOT NULL ,
  `idFile` INT NOT NULL ,
  PRIMARY KEY (`idFileNote`) ,
  INDEX `fk_FileNote_File1` (`idFile` ASC) ,
  CONSTRAINT `fk_FileNote_File1`
    FOREIGN KEY (`idFile` )
    REFERENCES `WebFc`.`File` (`idFile` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
>>>>>>> upstream/master
