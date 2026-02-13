package ma.enset.backendcalendrier.controller;

import ma.enset.backendcalendrier.entity.Holiday;
import ma.enset.backendcalendrier.service.HolidayService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    // Example URL: /api/holidays/search?date=2024-05-01
    @GetMapping("/search")
    public List<Holiday> getHolidaysByDate(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return holidayService.getHolidaysByStartDate(localDate);
    }

}
