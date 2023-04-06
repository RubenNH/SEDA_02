package mx.edu.utez.seda.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import mx.edu.utez.seda.model.person.Person;
import mx.edu.utez.seda.model.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AuthUser implements UserDetails{
    private String username;
    @JsonIgnore
    private String password;
    private Person person;
    public Collection<? extends GrantedAuthority> authorities;

    public AuthUser(String username, String password, Person person, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.person = person;
        this.authorities = authorities;
    }

    public static AuthUser build(User user){
        List<GrantedAuthority> authorities =
                user.getLinkUser()
                        .stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList());
        return new AuthUser(user.getUsername(), user.getPassword(),user.getPerson(),authorities);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
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

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}