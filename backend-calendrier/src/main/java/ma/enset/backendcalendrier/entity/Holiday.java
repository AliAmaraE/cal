package ma.enset.backendcalendrier.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "holidays")

public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("title")
    private String title;

    @Column(name = "start_date")
    @JsonProperty("startDate")
    private LocalDate startDate;

    @Column(name = "end_date")
    @JsonProperty("endDate")
    private LocalDate endDate;

    @Column(name = "tentative", nullable = false)
    @JsonProperty("tentative")
    private boolean tentative;

    @JsonProperty("note")
    private String note;
}
