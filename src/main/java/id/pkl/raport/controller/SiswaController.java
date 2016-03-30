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

import id.pkl.raport.entity.Siswa;
import id.pkl.raport.repository.SiswaRepository;

@RestController
@RequestMapping(value="/siswa")
public class SiswaController {
	@Autowired
	private SiswaRepository siswaRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Siswa> addSiswa(@Validated @RequestBody Siswa siswa, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Siswa>(HttpStatus.BAD_REQUEST);
		}
		
		Siswa newSiswa = siswaRepository.save(siswa);
		return new ResponseEntity<Siswa>(newSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Siswa> detailSiswa(@PathVariable Long id){
		if (!siswaRepository.exists(id)) {
			return new ResponseEntity<Siswa>(HttpStatus.NOT_FOUND);
		}
		Siswa siswa = siswaRepository.findOne(id);
		return new ResponseEntity<Siswa>(siswa, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Siswa> listSiswa(Pageable pageable)
	{
		return siswaRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Siswa> updateSiswa(@PathVariable Long id, Siswa siswa, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Siswa>(HttpStatus.BAD_REQUEST);
		}
		
		Siswa currentSiswa = siswaRepository.findOne(id);
		if(currentSiswa == null){
			return new ResponseEntity<Siswa>(HttpStatus.NOT_FOUND);
		}
		
		currentSiswa.setNamaSiswa(siswa.getNamaSiswa());
		currentSiswa.setJenisKelamin(siswa.getJenisKelamin());
		currentSiswa.setSekolah(siswa.getSekolah());
		currentSiswa.setNamaIbu(siswa.getNamaIbu());
		currentSiswa.setEmailIbu(siswa.getEmailBapak());
		currentSiswa.setNamaBapak(siswa.getNamaBapak());
		currentSiswa.setEmailBapak(siswa.getEmailBapak());
		currentSiswa.setDiterimaSejak(siswa.getDiterimaSejak());
		currentSiswa.setTanggalLahir(siswa.getTanggalLahir());
		
		siswaRepository.save(currentSiswa);
		return new ResponseEntity<Siswa>(currentSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Siswa> deleteSiswa(@PathVariable Long id){
		if(!siswaRepository.exists(id)){
			return new ResponseEntity<Siswa>(HttpStatus.NOT_FOUND);
		}
		siswaRepository.delete(id);
		return new ResponseEntity<Siswa>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Siswa> listAllSiswa(){
		return siswaRepository.findAll();
	}
	
}
