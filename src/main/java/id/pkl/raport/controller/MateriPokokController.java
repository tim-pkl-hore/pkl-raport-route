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

import id.pkl.raport.entity.MateriPokok;
import id.pkl.raport.repository.MateriPokokRepository;

@RestController
@RequestMapping(value="/materi-pokok")
public class MateriPokokController {
	@Autowired
	private MateriPokokRepository materiPokokRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<MateriPokok> addMateriPokok(@Validated @RequestBody MateriPokok materiPokok, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<MateriPokok>(HttpStatus.OK);
		}
		
		MateriPokok newMateriPokok = materiPokokRepository.save(materiPokok);
		return new ResponseEntity<MateriPokok> (newMateriPokok, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<MateriPokok> listMateriPokok(Pageable pageable){
		return materiPokokRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<MateriPokok> detailMateriPokok(@PathVariable Integer id){
		if (!materiPokokRepository.exists(id)) {
			return new ResponseEntity<MateriPokok>(HttpStatus.NOT_FOUND);
		}
		
		MateriPokok materiPokok = materiPokokRepository.findOne(id);
		return new ResponseEntity<MateriPokok>(materiPokok, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<MateriPokok> updateMateriPokok(@PathVariable Integer id, @RequestBody MateriPokok materiPokok, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<MateriPokok>(HttpStatus.BAD_REQUEST);
		}
		
		MateriPokok currentMateriPokok = materiPokokRepository.findOne(id);
		if(currentMateriPokok == null){
			return new ResponseEntity<MateriPokok>(HttpStatus.NOT_FOUND);
		}
		
		currentMateriPokok.setIndikator(materiPokok.getIndikator());
		currentMateriPokok.setKompetensiDasar(materiPokok.getKompetensiDasar());
		
		materiPokokRepository.save(currentMateriPokok);
		return new ResponseEntity<MateriPokok>(currentMateriPokok, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<MateriPokok> deleteMateriPokok(@PathVariable Integer id){
		if(!materiPokokRepository.exists(id)){
			return new ResponseEntity<MateriPokok>(HttpStatus.NOT_FOUND);
		}
		materiPokokRepository.delete(id);
		return new ResponseEntity<MateriPokok>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<MateriPokok> listMateriPokok(){
		return materiPokokRepository.findAll();
	}
}
