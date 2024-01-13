--Nutzer anlegen--
INSERT INTO kiko_schema.kiko_user (user_id, email, password, user_type, email_confirmed, verified, role) 
                VALUES (10001, 'partnera@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, true, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10002, 'partnerb@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, true, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10003,'partnerc@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', true, false, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10004,'partnerd@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'partner', false, false, 'PARTNER');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10005, 'kitaa@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, true, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10006, 'kitab@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, true, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10007, 'kitac@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', true, false, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (10008, 'kitad@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'kita', false, false, 'KITA');
INSERT INTO kiko_schema.kiko_user (user_id,email, password, user_type, email_confirmed, verified, role) 
                VALUES (20000, 'admin@test.de', '$2a$10$5ytxDBjs7HXGgxBByUGrKOikniWO96jXzkgpoh.DZ5BSz6XBmSqYa', 'admin', true, true, 'ADMIN');
---------------------------------------------------------------------------------------------------------------------------------------------------
--Adressen anlegen--
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(10001, 12345, '1a', 'Ahausen', 'Astrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(10002, 12345, '1b', 'Bhausen', 'Bstrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(10005, 12345, '2a', 'Ahausen', 'Astrasse');
INSERT INTO kiko_schema.adresse (adresse_id, plz, nr, ort, strasse) 
                VALUES(10006, 12345, '2a', 'Bhausen', 'Bstrasse');
--Partner Profile anlegen
INSERT INTO kiko_schema.partner_profil (id, adresse_id, anrede, beschreibung, geschlecht, nachname, vorname, taetigkeit, telefon)
                VALUES(10001, 10001, 'Herr', 'Ich bin A und komme aus A Hausen, in meiner Freizeit beschäftige ich mich gerne mit A', 'M', 'Apartner', 'Apartner', 'Ataetigkeit', '0172111111');
INSERT INTO kiko_schema.partner_profil (id, adresse_id, anrede, beschreibung, geschlecht, nachname, vorname, taetigkeit, telefon)
                VALUES(10002, 10002, 'Frau', 'Ich bin B und komme aus B Hausen, in meiner Freizeit beschäftige ich mich gerne mit B', 'W', 'Bpartnerin', 'Bpartnerin', 'Btaetigkeit', '017222222');
--Kita Profile anlegen--
INSERT INTO kiko_schema.kita_profil (id, adresse_id, anrede_ansprechperson, nachname_ansprechperson, vorname_ansprechperson, name_kita)
                VALUES(10005, 10005, 'Herr', 'Akitaleiter', 'Akitaleiter', 'Kita A');
INSERT INTO kiko_schema.kita_profil (id, adresse_id, anrede_ansprechperson, nachname_ansprechperson, vorname_ansprechperson, name_kita)
                VALUES(10006, 10006, 'Frau', 'Bkitaleiterin', 'Bkitaleiterin', 'Kita B');
--Verknüpfung erstellen
INSERT INTO kiko_schema.partner (user_id, profil_id)
                VALUES(10001, 10001);   
INSERT INTO kiko_schema.partner (user_id, profil_id)
                VALUES(10002, 10002);               
INSERT INTO kiko_schema.kita (user_id, profil_id)
                VALUES(10005, 10005);   
INSERT INTO kiko_schema.kita (user_id, profil_id)
                VALUES(10006, 10006);
--Angebot--
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20001, 10001, 'Lesepate', 'Lesen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20002, 10001, 'Yogakurs', 'Yoga mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20003, 10001, 'Waldspaziergang', 'Spazieren mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20004, 10002, 'Lesepatin', 'Lesen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20005, 10002, 'Sprachkurs', 'Sprechen mit den Kids', 10, 4, 15, 0, 5, 0.00);
INSERT INTO kiko_schema.angebot (id, partner_id, kurstitel, kursbeschreibung, altersgruppe_max, altersgruppe_min, anzahl_kinder_max, anzahl_kinder_min, dauer, kosten)
                VALUES(20006, 10002, 'Informationstag', 'Informationen zur Jobwahl', 10, 4, 15, 0, 5, 0.00);



