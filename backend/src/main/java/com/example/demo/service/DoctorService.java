public DoctorProfile updateDoctor(DoctorProfile doctor) {
    return drepo.save(doctor);
}