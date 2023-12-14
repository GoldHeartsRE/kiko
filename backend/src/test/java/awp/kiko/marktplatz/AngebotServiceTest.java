package awp.kiko.marktplatz;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import awp.kiko.marktplatz.repository.AngebotRepository;
import awp.kiko.marktplatz.rest.exceptions.AngebotNotFoundException;
import awp.kiko.marktplatz.service.AngebotService;
import awp.kiko.nutzerverwaltung.entity.Partner;

@ExtendWith(MockitoExtension.class)
public class AngebotServiceTest {

    @Mock
    private AngebotRepository angebotRepositoryMock;

    @InjectMocks
    private AngebotService angebotService;

    @Test
    public void getAngebotSuccess() {
        // given
        Angebot mockAngebot = new Angebot("Lesestunde", "Lesestunde",
                4, 7, 10, 20, 45, Wochentag.Dienstag, Regelmaessigkeit.einmalig, new BigDecimal(20),
                BildungsUndEntwicklungsfelder.Sinne);
        mockAngebot.setId(1);

        when(angebotRepositoryMock.findById(1)).thenReturn(Optional.of(mockAngebot));

        // when
        Angebot result = angebotService.getAngebot(1);

        // then
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Lesestunde", result.getKurstitel());
        assertEquals("Lesestunde", result.getKursbeschreibung());
        assertEquals(4, result.getAltersgruppe_min());
        assertEquals(7, result.getAltersgruppe_max());
        assertEquals(10, result.getAnzahlKinder_min());
        assertEquals(20, result.getAnzahlKinder_max());
        assertEquals(45, result.getDauer());
        assertEquals(Wochentag.Dienstag, result.getWochentag());
        assertEquals(Regelmaessigkeit.einmalig, result.getRegelmaessigkeit());
        assertEquals(new BigDecimal(20), result.getKosten());
        assertEquals(BildungsUndEntwicklungsfelder.Sinne, result.getBildungsUndEntwicklungsfelder());
    }

    @Test
    public void getAngebotNotFound() {
        // given
        when(angebotRepositoryMock.findById(2)).thenReturn(Optional.empty());

        // when and then
        Exception exception = assertThrows(AngebotNotFoundException.class, () -> {
            angebotService.getAngebot(2);
        });

        // assert
        assertThat(exception.getMessage()).isNotEmpty();
    }

    @Test
    public void getAngeboteSuccess() {
        // given
        Angebot angebot1 = new Angebot("Lesestunde", "Lesestunde",
                4, 7, 10, 20, 45, Wochentag.Dienstag, Regelmaessigkeit.einmalig, new BigDecimal(20),
                BildungsUndEntwicklungsfelder.Sinne);
        angebot1.setId(1);

        Angebot angebot2 = new Angebot("Musikunterricht", "Musikunterricht",
                6, 10, 8, 15, 60, Wochentag.Mittwoch, Regelmaessigkeit.woechentlich, new BigDecimal(30),
                BildungsUndEntwicklungsfelder.Koerper);
        angebot2.setId(2);

        List<Angebot> mockAngebote = Arrays.asList(angebot1, angebot2);

        when(angebotRepositoryMock.findAll()).thenReturn(mockAngebote);

        // when
        List<Angebot> result = angebotService.getAngebote();

        // then
        assertNotNull(result);
        assertEquals(2, result.size());

        // Überprüfe die Details des ersten Angebots
        assertEquals(1, result.get(0).getId());
        assertEquals("Lesestunde", result.get(0).getKurstitel());
        assertEquals("Lesestunde", result.get(0).getKursbeschreibung());
        assertEquals(4, result.get(0).getAltersgruppe_min());
        assertEquals(7, result.get(0).getAltersgruppe_max());
        assertEquals(10, result.get(0).getAnzahlKinder_min());
        assertEquals(20, result.get(0).getAnzahlKinder_max());
        assertEquals(45, result.get(0).getDauer());
        assertEquals(Wochentag.Dienstag, result.get(0).getWochentag());
        assertEquals(Regelmaessigkeit.einmalig, result.get(0).getRegelmaessigkeit());
        assertEquals(new BigDecimal(20), result.get(0).getKosten());
        assertEquals(BildungsUndEntwicklungsfelder.Sinne, result.get(0).getBildungsUndEntwicklungsfelder());

        // Überprüfe die Details des zweiten Angebots
        assertEquals(2, result.get(1).getId());
        assertEquals("Musikunterricht", result.get(1).getKurstitel());
        assertEquals("Musikunterricht", result.get(1).getKursbeschreibung());
        assertEquals(6, result.get(1).getAltersgruppe_min());
        assertEquals(10, result.get(1).getAltersgruppe_max());
        assertEquals(8, result.get(1).getAnzahlKinder_min());
        assertEquals(15, result.get(1).getAnzahlKinder_max());
        assertEquals(60, result.get(1).getDauer());
        assertEquals(Wochentag.Mittwoch, result.get(1).getWochentag());
        assertEquals(Regelmaessigkeit.woechentlich, result.get(1).getRegelmaessigkeit());
        assertEquals(new BigDecimal(30), result.get(1).getKosten());
        assertEquals(BildungsUndEntwicklungsfelder.Koerper, result.get(1).getBildungsUndEntwicklungsfelder());
    }

    @Test
    public void getAngeboteEmptyList() {
        // given
        when(angebotRepositoryMock.findAll()).thenReturn(List.of());

        // when
        List<Angebot> result = angebotService.getAngebote();

        // then
        assertThat(result).isEmpty();
    }

    @Test
    public void createAngebotSuccess() {
        // given
        Partner mockPartner = new Partner();
        mockPartner.setUser_id(1);

        Angebot mockAngebot = new Angebot("Lesestunde", "Lesestunde",
                4, 7, 10, 20, 45, Wochentag.Dienstag, Regelmaessigkeit.einmalig, new BigDecimal(20),
                BildungsUndEntwicklungsfelder.Sinne);
        mockAngebot.setId(1);
        mockAngebot.setPartner(mockPartner);

        when(angebotRepositoryMock.save(any(Angebot.class))).thenReturn(mockAngebot);

        // when
        Angebot result = angebotService.createAngebot(mockAngebot);

        // then
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Lesestunde", result.getKurstitel());
        assertEquals("Lesestunde", result.getKursbeschreibung());
        assertEquals(4, result.getAltersgruppe_min());
        assertEquals(7, result.getAltersgruppe_max());
        assertEquals(10, result.getAnzahlKinder_min());
        assertEquals(20, result.getAnzahlKinder_max());
        assertEquals(45, result.getDauer());
        assertEquals(Wochentag.Dienstag, result.getWochentag());
        assertEquals(Regelmaessigkeit.einmalig, result.getRegelmaessigkeit());
        assertEquals(new BigDecimal(20), result.getKosten());
        assertEquals(BildungsUndEntwicklungsfelder.Sinne, result.getBildungsUndEntwicklungsfelder());
        assertEquals(mockPartner, result.getPartner());

        // Überprüfe ob die save Methode mit dem richtigen Argument aufgerufen wurde
        verify(angebotRepositoryMock).save(any(Angebot.class));
    }

    @Test
    public void createAngebotInvalidInput() {
        // given
        Angebot invalidAngebot = null; // ungültige Eingabe

        // when and then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            angebotService.createAngebot(invalidAngebot);
        });

        // verify that save method was not called
        verify(angebotRepositoryMock, never()).save(any(Angebot.class));
        assertThat(exception.getMessage()).isNotEmpty();
    }

    @Test
    public void updateAngebotSuccess() {
        // given
        Angebot initialAngebot = new Angebot("Lesestunde", "Lesestunde",
                4, 7, 10, 20, 45, Wochentag.Dienstag, Regelmaessigkeit.einmalig, BigDecimal.valueOf(20),
                BildungsUndEntwicklungsfelder.Sinne);
        initialAngebot.setId(1);

        Angebot currentAngebot = new Angebot(initialAngebot);

        Angebot newAngebot = new Angebot(null, null,
                3, 6, 8, 15, null, Wochentag.Mittwoch, null, BigDecimal.valueOf(15),
                BildungsUndEntwicklungsfelder.Koerper);

        Angebot updatedAngebot = updateCurrentAngebot(currentAngebot, newAngebot);

        when(angebotRepositoryMock.findById(1)).thenReturn(Optional.of(currentAngebot));
        when(angebotRepositoryMock.save(any(Angebot.class))).thenReturn(updatedAngebot);

        // when
        updatedAngebot = angebotService.updateAngebot(newAngebot, 1);

        // then
        verify(angebotRepositoryMock).save(any(Angebot.class));
        assertEquals(initialAngebot.getId(), updatedAngebot.getId());
        assertEquals(initialAngebot.getKurstitel(), updatedAngebot.getKurstitel());
        assertEquals(initialAngebot.getKursbeschreibung(), updatedAngebot.getKursbeschreibung());
        assertEquals(newAngebot.getAltersgruppe_min(), updatedAngebot.getAltersgruppe_min());
        assertEquals(newAngebot.getAltersgruppe_max(), updatedAngebot.getAltersgruppe_max());
        assertEquals(newAngebot.getAnzahlKinder_min(), updatedAngebot.getAnzahlKinder_min());
        assertEquals(newAngebot.getAnzahlKinder_max(), updatedAngebot.getAnzahlKinder_max());
        assertEquals(initialAngebot.getDauer(), updatedAngebot.getDauer());
        assertEquals(newAngebot.getWochentag(), updatedAngebot.getWochentag());
        assertEquals(initialAngebot.getRegelmaessigkeit(), updatedAngebot.getRegelmaessigkeit());
        assertEquals(newAngebot.getKosten(), updatedAngebot.getKosten());
        assertEquals(newAngebot.getBildungsUndEntwicklungsfelder(), updatedAngebot.getBildungsUndEntwicklungsfelder());
    }

    @Test
    public void updateAngebotNotFound() {
        // given
        Angebot newAngebot = new Angebot("Malstunde", "Malstunde",
                3, 6, 8, 15, 60, Wochentag.Mittwoch, Regelmaessigkeit.zweiwoechentlich, BigDecimal.valueOf(15),
                BildungsUndEntwicklungsfelder.Koerper);

        when(angebotRepositoryMock.findById(1)).thenReturn(Optional.empty());

        // when
        assertThrows(AngebotNotFoundException.class, () -> {
            angebotService.updateAngebot(newAngebot, 1);
        });

        // then
        verify(angebotRepositoryMock, never()).save(any(Angebot.class));
    }

    private Angebot updateCurrentAngebot(Angebot currentAngebot, Angebot newAngebot) {

        if (newAngebot.getKurstitel() != null) {
            currentAngebot.setKurstitel(newAngebot.getKurstitel());
        }

        if (newAngebot.getKursbeschreibung() != null) {
            currentAngebot.setKursbeschreibung(newAngebot.getKursbeschreibung());
        }

        if (newAngebot.getAltersgruppe_min() != null) {
            currentAngebot.setAltersgruppe_min(newAngebot.getAltersgruppe_min());
        }

        if (newAngebot.getAltersgruppe_max() != null) {
            currentAngebot.setAltersgruppe_max(newAngebot.getAltersgruppe_max());
        }

        if (newAngebot.getAnzahlKinder_min() != null) {
            currentAngebot.setAnzahlKinder_min(newAngebot.getAnzahlKinder_min());
        }

        if (newAngebot.getAnzahlKinder_max() != null) {
            currentAngebot.setAnzahlKinder_max(newAngebot.getAnzahlKinder_max());
        }

        if (newAngebot.getDauer() != null) {
            currentAngebot.setDauer(newAngebot.getDauer());
        }

        if (newAngebot.getWochentag() != null) {
            currentAngebot.setWochentag(newAngebot.getWochentag());
        }

        if (newAngebot.getRegelmaessigkeit() != null) {
            currentAngebot.setRegelmaessigkeit(newAngebot.getRegelmaessigkeit());
        }

        if (newAngebot.getKosten() != null) {
            currentAngebot.setKosten(newAngebot.getKosten());
        }

        if (newAngebot.getBildungsUndEntwicklungsfelder() != null) {
            currentAngebot.setBildungsUndEntwicklungsfelder(newAngebot.getBildungsUndEntwicklungsfelder());
        }

        return currentAngebot;
    }
}
