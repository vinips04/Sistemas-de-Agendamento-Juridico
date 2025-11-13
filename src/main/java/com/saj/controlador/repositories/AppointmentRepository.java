package com.saj.controlador.repositories;

import com.saj.controlador.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByLawyerId(Long lawyerId);

    @Query("SELECT a FROM Appointment a WHERE a.lawyer.id = :lawyerId AND " +
           "((a.dateTime BETWEEN :start AND :end) OR " +
           "(FUNCTION('ADDTIME', a.dateTime, a.durationMinutes * 60) BETWEEN :start AND :end) OR " +
           "(:start BETWEEN a.dateTime AND FUNCTION('ADDTIME', a.dateTime, a.durationMinutes * 60)))")
    Optional<Appointment> findConflictingAppointment(
            @Param("lawyerId") Long lawyerId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);
}
