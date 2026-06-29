@PutMapping("/profile")
@PreAuthorize("hasRole('DOCTOR')")
public ResponseEntity<DoctorProfile> update(@AuthenticationPrincipal UserDetails user, @RequestBody DoctorProfile data) {
    return ResponseEntity.ok(doctorService.updateDoctorProfileByEmail(user.getUsername(), data));
}