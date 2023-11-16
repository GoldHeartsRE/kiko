package awp.kiko.entity;

import java.util.Collection;
import java.util.List;

import awp.kiko.config.ErrorMessages;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity-Klasse für Benutzer.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "KIKO_USER")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotNull(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.EMAIL_NULL_OR_EMPTY)
    private String email;

    @NotNull(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    @NotEmpty(message = ErrorMessages.PASSWORD_NULL_OR_EMPTY)
    private String password;

    @Enumerated(EnumType.STRING)
    @NotNull(message = ErrorMessages.ROLE_NULL)
    private Role role;

    @Builder.Default
    private boolean emailConfirmed = false;

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
}