package awp.kiko.nutzerverwaltung.entity;

import java.util.Collection;
import java.util.List;

import awp.kiko.config.ErrorMessages;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;

/**
 * Entity-Klasse für Benutzer.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "KIKO_USER")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Column(unique = true)
    @NotNull(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    private String email;

    @NotNull(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    protected String password;

    @Enumerated(EnumType.STRING)
    @NotNull(message = ErrorMessages.ROLE_NULL)
    protected Role role;

    private boolean emailConfirmed = false;

    private boolean verified = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        // email in our case
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean getEmailConfirmed() {
        return this.emailConfirmed;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public boolean getVerified() {
        return this.verified;
    }
}