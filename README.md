# KiKo-App

Das ist das Projektverzeichnis unserer entwicklten KiKo-App welche wir ihm Rahmen des Anwendungsprojekts im WS23/24 an der Hochschule Karlsruhe absolviert haben. Das Projekt ist aufgeteilt in ein Frontend React-Native Framework und Backend Spring-Boot Applikation.

![Alt text](/ui/KiKo/src/assets/logo-kiko.png "KiKo")

# Dosier und wichtige Begriffe
- Eine IDE (Integrated Development Environment) ist eine Softwareanwendung, die verschiedene Tools und Funktionen bereitstellt, um die Entwicklung von Software zu unterstützen. Im Rahmen der Entwicklung empfehlen wir [Visual Studio Code](https://code.visualstudio.com/download).
- Windows PowerShell ist ein plattformübergreifendes Framework von Microsoft zur Automatisierung, Konfiguration und Verwaltung von Systemen, das einen Kommandozeileninterpreter inklusive Skriptsprache bietet. Über die Windows Suche kann nach PowerShell oder CMD gesucht werden. Das Programm muss als Administrator gestartet werden. (Rechtsklick -> Als Administrator starten)
- Ein Tablespace (deutsch Tabellenraum) bezeichnet im Datenbankbereich den Speicherort, in den Tabellen, Indizes und andere Datenobjekte geschrieben werden. 
- Ein Schema, Datenschema oder Relationsschema (Plural Schemata oder Schemas, auch Schemen) ist in der Informatik eine formale Beschreibung der Struktur von Daten.

# Installationsanleitung

Um selbstständig am Projekt zu arbeiten und es lokal herunterzuladen, gelten folgende Voraussetzungen: 

- Eine ausgewählte IDE wie z. B. Visual Studio Code oder IntelliJ IDEA
 - [Java Version 21.0.1](https://jdk.java.net/21/) Die Zip-Datei in einen Ordner der Wahl entpacken. Wir empfehlen das entpacken unter "C:\Program Files\Java"
 - [Git, aktuellste Version](https://git-scm.com/download/win)
 - [NodeJS, letzte LTS Version](https://nodejs.org/en/download)
 - [PostgreSQL 16.1](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (Vorgeschlagene Konfiguration und Installation wählen, Daten wie Passwort aufschreiben/merken! )

## Umgebungsvariablen setzen 

Damit die Installierte Java Version und die PostgreSQL-Umgebung gefunden werden können, müssen vorher die Systemumgebungsvariablen gesetzt werden.

Umgebungsvariablen können so gesetzt werden:
- (auf Windows) 
nach "Systemumgebungsvariablen bearbeiten" suchen und anklicken, wenn Ergebnis angezeigt wird
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables1.png "EnvironmentVariables1")
- im Fenster mit Titel "Systemeigenschaften" auf Button "Umgebungsvariablen..." rechts unten klicken
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables2.png "EnvironmentVariables2")
- im Fenster mit Titel "Umgebungsvariablen" in der unteren Hälfte "Systemvariablen" auf Button "Neu..." klicken
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables3.png "EnvironmentVariables3")
- im Fenster mit Titel "Neue Systemvariable" in Eingabefeld "Name der Variablen:" Text "JAVA_HOME" eintragen
![Alt text](/ui/KiKo/src/assets/Installationsanleitung/environment-variables4.png "EnvironmentVariables4")
- im Fenster mit Titel "Neue Systemvariable" in Eingabefeld "Wert der Variablen:" Pfad vom installierten Java Order eingeben (Bsp: "C:\Program Files\Java\jdk-21.0.1")
- auf Button "OK" klicken
- Damit das Java-Verzeichnis gefunden wird, muss zusätzlich unter der Systemvariable "PATH" der "bin"-Ordner des Java Verzeichnisses hinzugefügt werden
- Finde den bestehenden "PATH"-Eintrag und klicke auf "bearbeiten" ![Alt text](/ui/KiKo/src/assets/Installationsanleitung/path.png "Path")
- Klicke auf "Neu" und füge den Pfad zum Verzeichnis hinzu. Diesen findet man im installierten Java Order. (Bsp:"C:\Program Files\Java\jdk-21.0.1\bin)
- Damit die PostgreSQL-Umgebung gefunden wird, muss im selben Fenster der Eintrag zum "bin"-Ordner von PostgreSQL zur PATH-Variable hinzugefügt werden
- Klicke auf "Neu" und füge den Pfad zum Verzeichnis hinzu. Diesen findet man im installierten PostgreSQL Ordner. Falls die Installation im Standard-Verzeichnis stattgefunden hat, sollte es "C:\Program Files\PostgreSQL\16\bin" sein ![Alt text](/ui/KiKo/src/assets/Installationsanleitung/path_variablen.png "Path_Variables")

- Nach diesen Schritten sollte einmal der Computer neu gestartet werden
- Um zu überprüfen ob alles geklappt hat, kannst du in einer PowerShell einmal "psql --version" und "java --version" ausführen 

## Projekt klonen

In einer PowerShell im ausgewählten Projektordner **git clone https://github.com/GoldHeartsRE/kiko.git** ausführen. Möglicherweise muss man sich in diesem Schritt Authentifizieren. Am einfachsten geht das über den Internet Browser. Die PowerShell weißt einen darauf hin. Folge den Anweisungen auf deinem Bildschirm.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/clone.png "clone")

## PostgreSQL einrichten

Die Datenbank muss zu Beginn einmal vollständig initalisiert werden. Dafür liegt im Pfad "\kiko\backend\\.extras\sql" die setup.sql Datei parat. Diese erstellt eine neue Rolle "kikouser" mit dem Passwort "p", einen Tablespace, die Datenbank und ein neues Schema. 

- Für die nächsten Schritte muss der PostgreSQL-Dienst laufen. Falls die Standard Installation gewählt worden ist, wird dieser automatisch gestartet.
- Zunächst muss im Windows C-Verzeichnis eine neue Ordner Struktur angelegt werden: "C:\kiko\tablespace"
- Öffne eine belibiege PowerShell und führe den Befehl "psql -h localhost -p 5432 -U postgres" aus. Der Port 5432 entspricht dabei dem gewählten Standard-Port.
- Gebe das Passwort ein, dass bei Installation gewählt worden ist
- Führe den Befehl "\i C:/Users/Admin/kiko/backend/.extras/sql.setup.sql" aus. Beachte dabei dass dein Installationspfad der KiKo-App ausgewählt ist und sich im Pfad nur Slashes befinden. (Standard Windows Pfade enthalten Backslashes)

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/setup_database.png "Setup")

Zur Überprüfung kann pgAdmin 4 gestartet werden. Dort loggt man sich mit den bei Installation gewählten Daten an und klappt die Ordner-Struktur aus. 

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/postgres.png "Postgres")


## Backend starten

Je nach IDE muss man hier zusätzlich ein Extension Pack für Java installieren. Die gängigen IDEs weißen einen mit einer Meldung darauf hin. Hier auf "Installieren" klicken. Die IDE macht den Rest.

Falls die Installation nicht automatisch gestartet werden sollte, kann man z.B. in Visual Studio Code über das Menü links die Erweiterung manuell hinzufügen. Dafür sucht man nach "Extension Pack for Java" und wählt im rechten Fenster "Install" aus.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/extensions.png "Erweiterung")

Wechsel in deiner ausgewählten IDE zum Ordner **backend\src\main\java\awp\kiko**, dort findest du die **KikoApplication.java**, welche mit einem Rechtsklick -> Run Java gestartet werden kann.

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/backend1.png "backend")


## Frontend einrichten

Wechsel in einer PowerShell zum Ordner **ui\KiKo** und führe dort den Befehl **npm i** aus, um alle benötigen Erweiterungen runterzuladen, das könnte einige Minuten dauern.

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

Finden der IP: Um deine eigene IP-Adresse zu finden, kannst du in einer PowerShell den Befehl "ipconfig" ausführen. 

![Alt text](/ui/KiKo/src/assets/Installationsanleitung/ip.png "expo")

## Du bist Startbereit!

Wenn du bis zu diesem Schritt gekommen bist, sollte das Projekt bei dir problemlos laufen!

# Sonstiges
## Frontend Dokumentation
Da die Frontend Dokumentation via jsDoc und DocDash aufgebaut wurde, ist sie selbst generierend.

Wechsel in einer beliebigen PowerShell zum Ordner **ui\KiKo** und führe dort den Befehl **npm run generate-docs** aus, wo nach kurzer Zeit der Ordner **/docs** entsteht, in der dortigen **index.html** findet man die Startseite des Docs