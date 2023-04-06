package mx.edu.utez.seda.model.person;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.seda.model.user.User;

import javax.persistence.*;

@Entity
@Table(name = "persons")
@NoArgsConstructor
@Setter
@Getter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;
    @Column(nullable = false, length = 50)
    private String surname;
    @Column(nullable = true, length = 50)
    private String lastname;
    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private String birthday;
    @Column(nullable = false, length = 18)
    private String curp;
    @Column(nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    private User user;

    public Person(Long id, String name, String surname, String lastname, String birthday, String curp, Boolean status, User user) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.curp = curp;
        this.status = status;
        this.user = user;
        this.user.setPerson(this);
    }

}
