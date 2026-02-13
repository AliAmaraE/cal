package ma.enset.backendcalendrier.service;

import ma.enset.backendcalendrier.entity.Holiday;
import ma.enset.backendcalendrier.repository.HolidayRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public HolidayService(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public List<Holiday> getHolidaysByStartDate(LocalDate date) {
        return holidayRepository.findByStartDate(date);
    }

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

}
