# KiKo-App

Das ist das Projektverzeichnis unserer entwicklten KiKo-App welche wir ihm Rahmen des Anwendungsprojekts im WS23/24 an der Hochschule Karlsruhe absolviert haben. Das Projekt ist aufgeteilt in ein Frontend React-Native Framework und Backend Spring-Boot Applikation.

![Alt text](/ui/KiKo/src/assets/logo-kiko.png "KiKo")

# Installationsanleitung

Um selbstständig am Projekt zu arbeiten und es lokal herunterzuladen, gelten folgende Voraussetzungen: 

- Eine ausgewählte IDE wie z. B. Visual Studio Code oder IntelliJ IDEA
 - [Java Version 21.0.1](https://jdk.java.net/21/)
 - [Git, aktuellste Version](https://git-scm.com/download/win)
 - [NodeJS, letzte LTS Version](https://nodejs.org/en/download)
 - [PostgreSQL 16.1](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (Vorgeschlagene Konfiguration und Installation wählen, Daten wie Passwort aufschreiben/merken!)

## Umgebungsvariablen setzen 

Umgebungsvariablen können so gesetzt werden:
- (auf Windows) nach "Systemumgebungsvariablen bearbeiten" suchen und anklicken, wenn Ergebnis angezeigt wird
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables1.png "EnvironmentVariables1")
- im Fenster mit Titel "Systemeigenschaften" auf Button "Umgebungsvariablen..." rechts unten klicken
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables2.png "EnvironmentVariables2")
- im Fenster mit Titel "Umgebungsvariablen" in der unteren Hälfte "Systemvariablen" auf Button "Neu..." klicken
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables3.png "EnvironmentVariables3")
- im Fenster mit Titel "Neue Systemvariable" in Eingabefeld "Name der Variablen:" Text "JAVA_HOME" eintragen
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables4.png "EnvironmentVariables4")
- im Fenster mit Titel "Neue Systemvariable" in Eingabefeld "Wert der Variablen:" Pfad vom installierten Java Order eingeben (Bsp: "C:\Downloads\jdk")
- auf Button "OK" klicken
- Schritte 2 bis 5 wiederholen mit Variablen "GIT_HOME" und Pfad vom installierten Git Ordner 

## Projekt klonen

In einer Powershell im ausgewählten Projektordner **git clone https://github.com/GoldHeartsRE/kiko.git** ausführen.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/clone.png "clone")

## PostgreSQL einrichten

Sobald PgAdmin gestartet ist und man sich einloggt, gilt folgende Befehle und Parameter einmalig anzugeben:

**Create Role**  

Navigiere zu Login/Group Roles -> Rechtsklick -> Create

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/Create-role1.png "Role1")

Name: kikouser  
Passwort: p  
- Can Login

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-role2.png "Role2")


**Create Tablespace**

Navigiere zu Tablespace -> Rechtsklick -> Create

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-tablespace1.png  "Tablespace1")

Name: ts_kiko  
Owner: kikouser  
Location: C:\kiko\tablespace

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-tablespace2.png  "Tablespace2")


**Create Database**

Navigiere zu Databases -> Rechtsklick -> Create Database

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-database1.png "Database1")

Database: kikodb  
Owner: kikouser  
Tablespace: ts_kiko

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-database2.png "Database1")


**Create Schema**  

Navigiere zur kikoDB.Schema -> Rechtsklick -> Create

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-schema1.png "Schema1")

Name: kiko_schema  
Owner: kikouser

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/create-schema2.png "Schema2")

**Change SearchPath**

Navigiere zu Login/Group Roles -> kikouser -> Rechtsklick -> Properties -> Parameters -> Pluszeichen

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/change-searchpath1.png "Path1")
  
Neuer Parameter  
Name: search_path, Value: kiko_schema, Database: kikodb

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/change-searchpath2.png "Path2")


## Backend starten

Wechsel in deiner ausgewählten IDE zum Ordner **backend\src\main\java\awp\kiko**, dort findest du die **KikoApplication.java**, welche mit einem Rechtsklick -> Run Java gestartet werden kann.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/backend1.png "backend")


## Frontend einrichten

Wechsel in einem beliebigen Terminal zum Ordner **ui\KiKo** und führe dort den Befehl **npm i** aus, um alle benötigen Erweiterungen runterzuladen, das könnte einige Minuten dauern.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/npm-i.png "npm1")

Wenn der Schritt abgeschlossen ist, lässt sich mit dem Befehl **npm start** das Projekt starten.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/npm-start.png "npm2")

## Frontend starten

Nach dem das Frontend gestartet wurde, erhält man neben einem **QR-Code** auch die Option im Terminal unteranderem mit den Tasten **W** oder **A** das Projekt entweder als Webapp oder Androidapp zu starten:

 - **W** lässt das Projekt lokal in deinem Browser starten (**Disclaimer**: Manche Komponente könnten fehlerhaft wirken, da alles auf Mobile optimiert ist)
 - **A** lässt das Projekt auf einem Android Emulator starten, falls einer vorhanden ist
 - Mit dem **QR-Code** lässt sich mit der [Expo-App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=de&gl=US) das Projekt auf seinem eigenen Handy starten, vorrausgesetzt man lädt es sich runter.

 ![Alt text](/ui/KiKo/src/assets/Installationsanleitung/expostart.png "expo") 


**Falls das Projekt mit QR-Code oder Android Emulator gestartet wird, gilt im Ordner "ui\KiKo\src\constants" außerdem in der constants.js Datei seine eigene IP anzugeben, um die Verbindung zwischen Backend und Frontend zu ermöglichen!**
## Du bist Startbereit!

Wenn du bis zu diesem Schritt gekommen bist, sollte das Projekt bei dir problemlos laufen!

# Sonstiges
## Frontend Dokumentation
Da die Frontend Dokumentation via jsDoc und DocDash aufgebaut wurde, ist sie selbst generierend.

Wechsel in einem beliebigen Terminal zum Ordner **ui\KiKo** und führe dort den Befehl **npm run generate-docs** aus, wo nach kurzer Zeit der Ordner **/docs** entsteht, in der dortigen **index.html** findet man die Startseite des Docs