package id.pkl.raport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import id.pkl.raport.entity.AbsensiSiswa;
import id.pkl.raport.repository.AbsensiSiswaRepository;

@RestController
@RequestMapping(value="/absensi-siswa")
public class AbsensiSiswaController {
	@Autowired
	private AbsensiSiswaRepository absensiSiswaRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<AbsensiSiswa> addAbsensiSiswa(@Validated @RequestBody AbsensiSiswa absensiSiswa, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<AbsensiSiswa>(HttpStatus.BAD_REQUEST);
		}
		
		AbsensiSiswa newAbsensiSiswa = absensiSiswaRepository.save(absensiSiswa);
		return new ResponseEntity<AbsensiSiswa>(newAbsensiSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<AbsensiSiswa> listAbsensiSiswa(Pageable pageable){
		return absensiSiswaRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<AbsensiSiswa> detailAbsensiSiswa(@PathVariable Long id){
		if (!absensiSiswaRepository.exists(id)) {
			return new ResponseEntity<AbsensiSiswa>(HttpStatus.NOT_FOUND);
		}
		
		AbsensiSiswa absensiSiswa = absensiSiswaRepository.findOne(id);
		return new ResponseEntity<AbsensiSiswa>(absensiSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<AbsensiSiswa> updateAbsensi(@PathVariable Long id, @RequestBody AbsensiSiswa absensiSiswa, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<AbsensiSiswa>(HttpStatus.BAD_REQUEST);
		}
		
		AbsensiSiswa currentAbsensiSiswa = absensiSiswaRepository.findOne(id);
		if(currentAbsensiSiswa ==  null){
			return new ResponseEntity<AbsensiSiswa>(HttpStatus.NOT_FOUND);
		}
		
		currentAbsensiSiswa.setJenisAbsensi(absensiSiswa.getJenisAbsensi());
		currentAbsensiSiswa.setAlasan(absensiSiswa.getAlasan());
		currentAbsensiSiswa.setTanggal(absensiSiswa.getTanggal());
		currentAbsensiSiswa.setTahunAjaran(absensiSiswa.getTahunAjaran());
		currentAbsensiSiswa.setSekolah(absensiSiswa.getSekolah());
		
		absensiSiswaRepository.save(currentAbsensiSiswa);
		return new ResponseEntity<AbsensiSiswa>(currentAbsensiSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<AbsensiSiswa> deleteAbsensiSiswa(@PathVariable Long id){
		if(!absensiSiswaRepository.exists(id)){
			return new ResponseEntity<AbsensiSiswa>(HttpStatus.NOT_FOUND);
		}
		absensiSiswaRepository.delete(id);
		return new ResponseEntity<AbsensiSiswa>(HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<AbsensiSiswa> listAbsensiSiswa(){
		return absensiSiswaRepository.findAll();
	}
	
}
