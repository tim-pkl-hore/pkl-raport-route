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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.pkl.raport.entity.Guru;
import id.pkl.raport.entity.GuruMengajarMataPelajaraId;
import id.pkl.raport.entity.GuruMengajarMataPelajaran;
import id.pkl.raport.entity.Kelas;
import id.pkl.raport.entity.TahunAjaran;
import id.pkl.raport.repository.KelasRepository;

@RestController
@RequestMapping(value="/kelas")
public class KelasController {
	@Autowired
	private KelasRepository kelasRepository;
	
	@RequestMapping(method=RequestMethod.POST)	
	public ResponseEntity<Kelas> addTahunAjaran(@Validated @RequestBody Kelas kelas, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kelas>(HttpStatus.BAD_REQUEST);
		}
		
		Kelas newKelas = kelasRepository.save(kelas);
		return new ResponseEntity<Kelas>(newKelas, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Kelas> listKelas(Pageable pageable)
	{
			return kelasRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Kelas> updateKelas(@PathVariable Long id, @RequestBody Kelas kelas,
			BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kelas>(HttpStatus.BAD_REQUEST);
		}
		
		Kelas currentKelas = kelasRepository.findOne(id);
		if (currentKelas == null) {
			return new ResponseEntity<Kelas>(HttpStatus.NOT_FOUND);
		}
		
		currentKelas.setTingkat(kelas.getTingkat());
		currentKelas.setGrupKelas(kelas.getGrupKelas());
		currentKelas.setTahunAjaran(kelas.getTahunAjaran());
		currentKelas.setWaliKelas(kelas.getWaliKelas());
		
		kelasRepository.save(currentKelas);
		return new ResponseEntity<Kelas>(currentKelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Kelas> detailKelas(@PathVariable Long id){
		if (!kelasRepository.exists(id)) {
			return new ResponseEntity<Kelas>(HttpStatus.NOT_FOUND);
		}
		Kelas kelas = kelasRepository.findOne(id);
		return new ResponseEntity<Kelas>(kelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Kelas> deleteKelas(@PathVariable Long id){
		if(!kelasRepository.exists(id)){
			return new ResponseEntity<Kelas>(HttpStatus.NOT_FOUND);
		}
		kelasRepository.delete(id);
		return new ResponseEntity<Kelas>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Kelas> listKelas()
	{
		return kelasRepository.findAll();
	}
}
