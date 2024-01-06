# KiKo-App

Das ist das Projektverzeichnis unserer entwicklten KiKo-App welche wir ihm Rahmen des Anwendungsprojekts im WS23/24 an der Hochschule Karlsruhe absolviert haben. Das Projekt ist aufgeteilt in ein Frontend React-Native Framework und Backend Spring-Boot Applikation.

![Alt text](/ui/KiKo/src/assets/logo-kiko.png "KiKo")

# Installationsanleitung

Um selbstständig am Projekt zu arbeiten und es lokal herunterzuladen, gelten folgende Voraussetzungen: 

- Eine ausgewählte IDE wie z. B. Visual Studio Code oder IntelliJ IDEA
 - [Java Version 21.0.1](https://jdk.java.net/21/) (Bei Java muss das setzen der Umgebungsvariabele beachtet werden)
 - [Git, aktuellste Version](https://git-scm.com/download/win)
 - [NodeJS, letzte LTS Version](https://nodejs.org/en/download)
 - [PostgreSQL 16.1](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (Vorgeschlagene Komfiguration wählen)
 

## Projekt klonen

In einer Powershell im ausgewählten Projektordner **git clone https://github.com/GoldHeartsRE/kiko.git** ausführen.

## PostgreSQL einrichten

Sobald PgAdmin gestartet ist, gilt folgende Befehle und Parameter einmalig anzugeben:

**Create Role**  
Navigiere zu Login/Group Roles -> Rechtsklick -> Create
Name: kikouser  
Passwort: p  
- Can Login

**Create Tablespace**
Navigiere zu Tablespace -> -> Rechtsklick -> Create 
Name: ts_kiko  
Owner: kikouser  
Location: C:\kiko\tablespace

**Create Database**
Navigiere zu Databases -> Rechtsklick -> Create Database
Database: kikodb  
Owner: kikouser  
Tablespace: ts_kiko

**Create Schema**  
Navigiere zur kikoDB.Schema -> Rechtsklick -> Create 
Name: kiko_schema  
Owner: kikouser

**Change SearchPath**
Navigiere zu Login/Group Roles -> kikouser -> Rechtsklick -> Properties -> Parameters -> Pluszeichen
kikouser  
Neuer Parameter  
Name: search_path, Value: kiko_schema, Database: kikodb

## Backend starten

Wechsel in deiner ausgewählten IDE zum Ordner **backend\src\main\java\awp\kiko**, dort findest du die **KikoApplication.java**, welche mit einem Rechtsklick -> Run Java gestartet werden kann.

## Frontend einrichten

Wechsel in einem beliebigen Terminal zum Ordner **ui\KiKo** und führe dort den Befehl **npm i** aus, um alle benötigen Erweiterungen runterzuladen, das könnte einige Minuten dauern.

Wenn der Schritt abgeschlossen ist, lässt sich mit dem Befehl **npm start** das Projekt starten.

## Frontend starten

Nach dem das Frontend gestartet wurde, erhält man neben einem **QR-Code** auch die Option im Terminal unteranderem mit den Tasten **W** oder **A** das Projekt entweder als Webapp oder Androidapp zu starten:

 - **W** lässt das Projekt lokal in deinem Browser starten (**Disclaimer**: Manche Komponente könnten fehlerhaft wirken, da alles auf Mobile optimiert ist)
 - **A** lässt das Projekt auf einem Android Emulator starten, falls einer vorhanden ist
 - Mit dem **QR-Code** lässt sich mit der [Expo-App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=de&gl=US) das Projekt auf seinem eigenen Handy starten, vorrausgesetzt man lädt es sich runter.

**Falls das Projekt mit QR-Code oder Android Emulator gestartet wird, gilt im Ordner "ui\KiKo\src\constants" außerdem in der constants.js Datei seine eigene IP anzugeben, um die Verbindung zwischen Backend und Frontend zu ermöglichen!**
## Du bist Startbereit!

Wenn du bis zu diesem Schritt gekommen bist, sollte das Projekt bei dir problemlos laufen!

# Sonstiges
## Frontend Dokumentation
Da die Frontend Dokumentation via jsDoc und DocDash aufgebaut wurde, ist sie selbst generierend.

Wechsel in einem beliebigen Terminal zum Ordner **ui\KiKo** und führe dort den Befehl **npm run generate-docs** aus, wo nach kurzer Zeit der Ordner **/docs** entsteht, in der dortigen **index.html** findet man die Startseite des Docs