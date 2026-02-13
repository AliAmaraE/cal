package ma.enset.backendcalendrier.repository;


import ma.enset.backendcalendrier.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    // Finds holidays that start on a specific date
    List<Holiday> findByStartDate(LocalDate startDate);

    // Better for calendars: Finds holidays within a specific month range
    List<Holiday> findByStartDateBetween(LocalDate start, LocalDate end);
}