package ma.enset.backendcalendrier.controller;

import ma.enset.backendcalendrier.entity.Holiday;
import ma.enset.backendcalendrier.service.HolidayService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holidays")
@CrossOrigin(origins = "*")
public class HolidayController {

    private final HolidayService holidayService;

    public HolidayController(HolidayService holidayService) {
        this.holidayService = holidayService;
    }

    @GetMapping
    public List<Holiday> getAllHolidays() {
        return holidayService.getAllHolidays();
    }

    @PostMapping
    public Holiday saveHoliday(@RequestBody Holiday holiday) {
        return holidayService.saveHoliday(holiday);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Holiday updateHoliday(
            @PathVariable Long id,
            @RequestBody Holiday holiday
    ) {
        return holidayService.updateHoliday(id, holiday);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteHoliday(@PathVariable Long id) {
        holidayService.deleteHoliday(id);
    }
}
