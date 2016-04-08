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
import id.pkl.raport.repository.GuruMengajarMataPelajaranRepository;
import id.pkl.raport.repository.GuruRepository;

@RestController
@RequestMapping(value="/guru")
public class GuruController {
	@Autowired
	private GuruRepository guruRepository;

	@Autowired
	private GuruMengajarMataPelajaranRepository guruMengajarRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Guru> addGuru(@Validated @RequestBody Guru guru , BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Guru>(HttpStatus.BAD_REQUEST);
		}
		Guru newGuru = guruRepository.save(guru);
		return new ResponseEntity<Guru>(newGuru, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Guru> listGuru(@RequestParam(name="search", required = false) String search, Pageable pageable)
	{
		if(search.equals("")){
			return guruRepository.findAll(pageable);
		}
		return guruRepository.findBySearch(search, pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Guru> updateGuru(@PathVariable Long id, @RequestBody Guru guru, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Guru>(HttpStatus.BAD_REQUEST);
		}
		
		Guru currentGuru = guruRepository.findOne(id);
		if (currentGuru == null) {
			return new ResponseEntity<Guru>(HttpStatus.NOT_FOUND);
		}
		
		currentGuru.setNama(guru.getNama());
		currentGuru.setEmail(guru.getEmail());
		currentGuru.setAlamat(guru.getAlamat());
		
		guruRepository.save(currentGuru);
		return new ResponseEntity<Guru>(currentGuru, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Guru> detailGuru(@PathVariable Long id){
		if (!guruRepository.exists(id)) {
			return new ResponseEntity<Guru>(HttpStatus.NOT_FOUND);
		}
		Guru guru = guruRepository.findOne(id);
		return new ResponseEntity<Guru>(guru, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Guru> deleteGuru(@PathVariable Long id){
		if(!guruRepository.exists(id)){
			return new ResponseEntity<Guru>(HttpStatus.NOT_FOUND);
		}
		guruRepository.delete(id);
		return new ResponseEntity<Guru>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Guru> listGuru()
	{
		return guruRepository.findAll();
	}
	
	@RequestMapping(value="/mengajar", method=RequestMethod.POST)
	public ResponseEntity<GuruMengajarMataPelajaran> saveGuruMengajar(@Validated @RequestBody GuruMengajarMataPelajaran guruMengajarMataPelajaran , 
			BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<GuruMengajarMataPelajaran>(HttpStatus.BAD_REQUEST);
		}
		GuruMengajarMataPelajaran newGuru = guruMengajarRepository.save(guruMengajarMataPelajaran);
		return new ResponseEntity<GuruMengajarMataPelajaran>(newGuru, HttpStatus.OK);
	}
	
	@RequestMapping(value="/mengajar", method=RequestMethod.GET)
	public Page<GuruMengajarMataPelajaran> listGuruMengajar(Pageable pageable)
	{
		return guruMengajarRepository.findAll(pageable);
		//return guruMengajarRepository.findBySearch(search, pageable);
	}
	
	@RequestMapping(value="/mengajar/{id}", method=RequestMethod.PUT)
	public ResponseEntity<GuruMengajarMataPelajaran> updateGuruMengajar(@PathVariable GuruMengajarMataPelajaraId id, @RequestBody GuruMengajarMataPelajaran guruMengajarMataPelajaran, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<GuruMengajarMataPelajaran>(HttpStatus.BAD_REQUEST);
		}
		
		GuruMengajarMataPelajaran currentGuru = guruMengajarRepository.findOne(id);
		if (currentGuru == null) {
			return new ResponseEntity<GuruMengajarMataPelajaran>(HttpStatus.NOT_FOUND);
		}
		
		currentGuru.setGuru(guruMengajarMataPelajaran.getGuru());
		currentGuru.setMataPelajaran(guruMengajarMataPelajaran.getMataPelajaran());
		
		guruMengajarRepository.save(currentGuru);
		return new ResponseEntity<GuruMengajarMataPelajaran>(currentGuru, HttpStatus.OK);
	}
	
	@RequestMapping(value="/mengajar/{id}", method=RequestMethod.GET)
	public ResponseEntity<GuruMengajarMataPelajaran> detailGuruMengajar(@PathVariable GuruMengajarMataPelajaraId id){
		if (!guruMengajarRepository.exists(id)) {
			return new ResponseEntity<GuruMengajarMataPelajaran>(HttpStatus.NOT_FOUND);
		}
		GuruMengajarMataPelajaran guru = guruMengajarRepository.findOne(id);
		return new ResponseEntity<GuruMengajarMataPelajaran>(guru, HttpStatus.OK);
	}
	
	@RequestMapping(value="/mengajar/{idGuru}/{idMatpel}", method=RequestMethod.DELETE)
	public ResponseEntity<GuruMengajarMataPelajaran> deleteGuruMengajar(@PathVariable Long idGuru,
			@PathVariable Long idMatpel){
		
		GuruMengajarMataPelajaraId id = new GuruMengajarMataPelajaraId();
		id.setGuruId(idGuru);
		id.setMataPelajaranId(idMatpel);
		guruMengajarRepository.delete(id);
		return new ResponseEntity<GuruMengajarMataPelajaran>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/mengajar/all", method=RequestMethod.GET)
	public Iterable<GuruMengajarMataPelajaran> listGuruMengajar()
	{
		return guruMengajarRepository.findAll();
	}
	
}
