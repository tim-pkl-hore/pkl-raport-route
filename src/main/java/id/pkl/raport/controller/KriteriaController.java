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

import id.pkl.raport.entity.Kriteria;
import id.pkl.raport.repository.KriteriaRepository;

@RestController
@RequestMapping(value="/kriteria")
public class KriteriaController {
	@Autowired
	private KriteriaRepository kriteriaRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Kriteria> addKriteria(@Validated @RequestBody Kriteria kriteria, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kriteria> (HttpStatus.BAD_REQUEST);
		}
		
		Kriteria newKriteria = kriteriaRepository.save(kriteria);
		return new ResponseEntity<Kriteria>(newKriteria, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Kriteria> detailKriteria(@PathVariable Long id){
		if (!kriteriaRepository.exists(id)) {
			return new ResponseEntity<Kriteria>(HttpStatus.NOT_FOUND);
		}
		Kriteria kriteria = kriteriaRepository.findOne(id);
		return new ResponseEntity<Kriteria>(kriteria, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Kriteria> updateKriteria(@PathVariable Long id, @RequestBody Kriteria kriteria, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kriteria>(HttpStatus.BAD_REQUEST);
		}
		
		Kriteria currentKriteria = kriteriaRepository.findOne(id);
		if (currentKriteria == null) {
			return new ResponseEntity<Kriteria>(HttpStatus.NOT_FOUND);
		}
		
		currentKriteria.setNamaKriteria(kriteria.getNamaKriteria());
		
		kriteriaRepository.save(currentKriteria);
		return new ResponseEntity<Kriteria>(currentKriteria, HttpStatus.OK);
	}
	
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Kriteria> listKriteria(@RequestParam(name="search") String search, Pageable pageable)
	{
		if(search.equals("")){
			return kriteriaRepository.findAll(pageable);
		}
		return kriteriaRepository.findBySearch(search, pageable);
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Kriteria> deleteKriteria(@PathVariable Long id){
		if(!kriteriaRepository.exists(id)){
			return new ResponseEntity<Kriteria>(HttpStatus.NOT_FOUND);
		}
		kriteriaRepository.delete(id);
		return new ResponseEntity<Kriteria>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Kriteria> listKriteria(){
		return kriteriaRepository.findAll();
	}
	
}
