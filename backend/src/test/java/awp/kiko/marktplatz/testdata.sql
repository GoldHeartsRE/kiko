--Nutzer anlegen--
INSERT INTO kiko_schema.kiko_user (user_id, email, password, user_type, email_confirmed, verified, role) 
                VALUES (100011, 'partnerax@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, true, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100021, 'partnerbx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, true, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100031,'partnercx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, false, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100041,'partnerdx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', false, false, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100051, 'kitaax@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, true, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100061, 'kitabx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, true, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100071, 'kitacx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, false, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (100081, 'kitadx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', false, false, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (200001, 'adminx@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'admin', true, true, 'ADMIN');
---------------------------------------------------------------------------------------------------------------------------------------------------
--Adressen anlegen--
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(100011, 12345, '1a', 'Ahausen', 'Astrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(100021, 12345, '1b', 'Bhausen', 'Bstrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(100051, 12345, '2a', 'Ahausen', 'Astrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(100061, 12345, '2a', 'Bhausen', 'Bstrasse');
--Partner Profile anlegen
INSERT INTO kiko_schema.partner_profil (id, adresse_id, anrede, beschreibung, geschlecht, nachname, vorname, taetigkeit, telefon)
                VALUES(100011, 100011, 'Herr', 'Ich bin A und komme aus A Hausen, in meiner Freizeit beschäftige ich mich gerne mit A', 'M', 'Apartner', 'Apartner', 'Ataetigkeit', '0172111111');
INSERT INTO kiko_schema.partner_profil (id, adresse_id, anrede, beschreibung, geschlecht, nachname, vorname, taetigkeit, telefon)
                VALUES(100021, 100021, 'Frau', 'Ich bin B und komme aus B Hausen, in meiner Freizeit beschäftige ich mich gerne mit B', 'W', 'Bpartnerin', 'Bpartnerin', 'Btaetigkeit', '017222222');
--Kita Profile anlegen--
INSERT INTO kiko_schema.kita_profil (id, adresse_id, anrede_ansprechperson, nachname_ansprechperson, vorname_ansprechperson, name_kita)
                VALUES(100051, 100051, 'Herr', 'Akitaleiter', 'Akitaleiter', 'Kita A');
INSERT INTO kiko_schema.kita_profil (id, adresse_id, anrede_ansprechperson, nachname_ansprechperson, vorname_ansprechperson, name_kita)
                VALUES(100061, 100061, 'Frau', 'Bkitaleiterin', 'Bkitaleiterin', 'Kita B');
--Verknüpfung erstellen
INSERT INTO kiko_schema.partner (user_id, profil_id)
                VALUES(100011, 100011);   
INSERT INTO kiko_schema.partner (user_id, profil_id)
                VALUES(100021, 100021);               
INSERT INTO kiko_schema.kita (user_id, profil_id)
                VALUES(100051, 100051);   
INSERT INTO kiko_schema.kita (user_id, profil_id)
                VALUES(100061, 100061);
--Angebot--
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200011, 100011, 'Lesepate', 'Lesen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200021, 100011, 'Yogakurs', 'Yoga mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200031, 100011, 'Waldspaziergang', 'Spazieren mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200041, 100021, 'Lesepatin', 'Lesen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200051, 100021, 'Sprachkurs', 'Sprechen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(200061, 100021, 'Informationstag', 'Informationen zur Jobwahl', 10, 4, 15, 0, 5, 0.00);