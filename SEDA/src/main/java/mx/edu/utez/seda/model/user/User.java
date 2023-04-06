package mx.edu.utez.seda.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.person.Person;
import mx.edu.utez.seda.model.role.Role;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,length = 30,unique = true)
    private String username;
    private String password;
    private Boolean status;
    private String lastAccess;
    private Boolean blocked;
    private String token;
    @Column(nullable = true,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String createdAt;

    @OneToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id",unique = true)
    @JsonIgnore
    private Person person;

    /*@ManyToMany
    @JoinTable(
            name = "student_role",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "role_user"))
    Set<Role> role;*/

    /*@ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    Set<Role> role;*/
    @ManyToMany(mappedBy = "linkRole")
    Set<Role> linkUser;


}
