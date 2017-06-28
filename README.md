# Studentenportal-Beuth
1) siehe "Zusammenfassung_MEAN_V2.pdf"
    Vorher evtl. in der node_pfad bash "npm install --save" ausführen, um notwendige Pakete zu installieren.
2) GitHub starten und Repository nach "C:\nodeprojects\" clonen

## Datenbankeinträge prüfen unter mongo.exe:

- GitBash starten

- In die Beuthportal-DB wechseln mit dem Befehl "use beuthportal"

- User anzeigen mit "db.users.find()"

- Bewertungen anzeigen mit "db.bewertungs.find()" (bewertungs mit s, nicht bewertung)

## Testing (erste Version):

- Tests definieren im Unterordner test

- in der node_pfad bash : mocha, chai und chai-http installieren mit "npm install mocha chai chai-http --save-dev"

- "npm install mocha -g" ausführen

- Testen mit "npm run test -s"

- siehe https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

- siehe https://www.youtube.com/watch?v=MLTRHc5dk6s

- Achtung: unterschiedliche Syntax, je nachdem ob man mit "assert", "should" oder "expect" testet!
