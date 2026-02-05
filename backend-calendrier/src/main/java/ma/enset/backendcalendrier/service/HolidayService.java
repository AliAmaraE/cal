package ma.enset.backendcalendrier.service;

import ma.enset.backendcalendrier.entity.Holiday;
import ma.enset.backendcalendrier.repository.HolidayRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public HolidayService(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public Holiday saveHoliday(Holiday holiday) {
        return holidayRepository.save(holiday);
    }

    // ✅ UPDATE
    public Holiday updateHoliday(Long id, Holiday holiday) {
        Holiday existing = holidayRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday not found"));

        existing.setTitle(holiday.getTitle());
        existing.setStartDate(holiday.getStartDate());
        existing.setEndDate(holiday.getEndDate());
        existing.setTentative(holiday.isTentative());
        existing.setNote(holiday.getNote());

        return holidayRepository.save(existing);
    }

    // ✅ DELETE
    public void deleteHoliday(Long id) {
        holidayRepository.deleteById(id);
    }
}
