/*package id.pkl.raport.controller;

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

import id.pkl.raport.entity.Kkm;
import id.pkl.raport.repository.KkmRepository;

@RestController
@RequestMapping(value="/kkm")
public class KkmController {
	@Autowired
	private KkmRepository kkmRepository;
	
	@RequestMapping(method=RequestMethod.POST)	
	public ResponseEntity<Kkm> addTahunAjaran(@Validated @RequestBody Kkm kkm, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kkm>(HttpStatus.BAD_REQUEST);
		}
		
		Kkm newKkm = kkmRepository.save(kkm);
		return new ResponseEntity<Kkm>(newKkm, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Kkm> listKkm(@RequestParam(name="search", required = false) String search, Pageable pageable)
	{
		if(search.equals("")){
			return kkmRepository.findAll(pageable);
		}
		return kkmRepository.findBySearch(search, pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Kkm> updateKkm(@PathVariable Long id, @RequestBody Kkm kkm,
			BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kkm>(HttpStatus.BAD_REQUEST);
		}
		
		Kkm currentKkm = kkmRepository.findOne(id);
		if (currentKkm == null) {
			return new ResponseEntity<Kkm>(HttpStatus.NOT_FOUND);
		}
		
		currentKkm.setTingkat(kkm.getTingkat());
		currentKkm.setKkm(kkm.getKkm());
		currentKkm.setMataPelajaran(kkm.getMataPelajaran());
		
		kkmRepository.save(currentKkm);
		return new ResponseEntity<Kkm>(currentKkm, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Kkm> detailKkm(@PathVariable Long id){
		if (!kkmRepository.exists(id)) {
			return new ResponseEntity<Kkm>(HttpStatus.NOT_FOUND);
		}
		Kkm kkm = kkmRepository.findOne(id);
		return new ResponseEntity<Kkm>(kkm, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Kkm> deleteKkm(@PathVariable Long id){
		if(!kkmRepository.exists(id)){
			return new ResponseEntity<Kkm>(HttpStatus.NOT_FOUND);
		}
		kkmRepository.delete(id);
		return new ResponseEntity<Kkm>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Kkm> listKkm()
	{
		return kkmRepository.findAll();
	}
}
*/