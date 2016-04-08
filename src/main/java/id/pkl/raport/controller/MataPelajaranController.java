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

import id.pkl.raport.entity.MataPelajaran;
import id.pkl.raport.repository.MataPelajaranRepository;

@RestController
@RequestMapping(value="/mata/pelajaran")
public class MataPelajaranController {
	@Autowired
	private MataPelajaranRepository mataPelajaranRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<MataPelajaran> addMataPelajaran(@Validated @RequestBody MataPelajaran mataPelajaran, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<MataPelajaran> (HttpStatus.BAD_REQUEST);
		}
		
		MataPelajaran newMatpel = mataPelajaranRepository.save(mataPelajaran);
		return new ResponseEntity<MataPelajaran>(newMatpel, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<MataPelajaran> detailMatpel(@PathVariable Long id){
		if (!mataPelajaranRepository.exists(id)) {
			return new ResponseEntity<MataPelajaran>(HttpStatus.NOT_FOUND);
		}
		MataPelajaran matapelajaran = mataPelajaranRepository.findOne(id);
		return new ResponseEntity<MataPelajaran>(matapelajaran, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<MataPelajaran> updateMataPelajaran(@PathVariable Long id, @RequestBody MataPelajaran mataPelajaran, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<MataPelajaran>(HttpStatus.BAD_REQUEST);
		}
		
		MataPelajaran currentMataPelajaran = mataPelajaranRepository.findOne(id);
		if (currentMataPelajaran == null) {
			return new ResponseEntity<MataPelajaran>(HttpStatus.NOT_FOUND);
		}
		
		currentMataPelajaran.setNamaMatpel(mataPelajaran.getNamaMatpel());
		
		mataPelajaranRepository.save(currentMataPelajaran);
		return new ResponseEntity<MataPelajaran>(currentMataPelajaran, HttpStatus.OK);
	}
	
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<MataPelajaran> listMatpel(@RequestParam(name="search") String search, Pageable pageable)
	{
		if(search.equals("")){
			return mataPelajaranRepository.findAll(pageable);
		}
		return mataPelajaranRepository.findBySearch(search, pageable);
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<MataPelajaran> deleteMataPelajaran(@PathVariable Long id){
		if(!mataPelajaranRepository.exists(id)){
			return new ResponseEntity<MataPelajaran>(HttpStatus.NOT_FOUND);
		}
		mataPelajaranRepository.delete(id);
		return new ResponseEntity<MataPelajaran>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<MataPelajaran> listMatpel(){
		return mataPelajaranRepository.findAll();
	}
	
	
}
