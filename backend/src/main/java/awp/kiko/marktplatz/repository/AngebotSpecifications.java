package awp.kiko.marktplatz.repository;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;

import awp.kiko.marktplatz.entity.Angebot;
import awp.kiko.marktplatz.entity.BildungsUndEntwicklungsfelder;
import awp.kiko.marktplatz.entity.Regelmaessigkeit;
import awp.kiko.marktplatz.entity.Wochentag;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class AngebotSpecifications {

    public static Specification<Angebot> hasKurstitel(String kurstitel) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("kurstitel"), "%" + kurstitel + "%");
    }

    public static Specification<Angebot> hasKursbeschreibung(String kursbeschreibung) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("kursbeschreibung"),
                "%" + kursbeschreibung + "%");
    }

    public static Specification<Angebot> hasAltersgruppeMin(int altersgruppeMin) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("altersgruppe_min"),
                altersgruppeMin);
    }

    public static Specification<Angebot> hasAltersgruppeMax(int altersgruppeMax) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("altersgruppe_max"),
                altersgruppeMax);
    }

    public static Specification<Angebot> hasAnzahlKinderMin(int anzahlKinderMin) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("anzahlKinder_min"),
                anzahlKinderMin);
    }

    public static Specification<Angebot> hasAnzahlKinderMax(int anzahlKinderMax) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("anzahlKinder_max"),
                anzahlKinderMax);
    }

    public static Specification<Angebot> hasDauer(int dauer) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("dauer"), dauer);
    }

    public static Specification<Angebot> hasWochentag(String wochentag) {
        List<Wochentag> wochentage = Arrays.asList(wochentag.split(",")).stream()
                .map(Wochentag::valueOf).collect(Collectors.toList());

        return (root, query, criteriaBuilder) -> {
            query.distinct(true); // To avoid fetching duplicate rows when using join with collections
            Join<Angebot, Wochentag> wochentagJoin = root.join("wochentag", JoinType.INNER);
            return wochentagJoin.in(wochentage);
        };
    }

    public static Specification<Angebot> hasRegelmaessigkeit(Regelmaessigkeit regelmaessigkeit) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("regelmaessigkeit"), regelmaessigkeit);
    }

    public static Specification<Angebot> hasKosten(BigDecimal kosten) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kosten"), kosten);
    }

    public static Specification<Angebot> hasBildungsUndEntwicklungsfelder(String bildungsUndEntwicklungsfeld) {
        List<BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfelder = Arrays
                .asList(bildungsUndEntwicklungsfeld.split(",")).stream()
                .map(BildungsUndEntwicklungsfelder::valueOf).collect(Collectors.toList());

        return (root, query, criteriaBuilder) -> {
            query.distinct(true); // To avoid fetching duplicate rows when using join with collections
            Join<Angebot, BildungsUndEntwicklungsfelder> bildungsUndEntwicklungsfeldJoin = root
                    .join("bildungsUndEntwicklungsfeld", JoinType.INNER);
            return bildungsUndEntwicklungsfeldJoin.in(bildungsUndEntwicklungsfelder);
        };
    }
}