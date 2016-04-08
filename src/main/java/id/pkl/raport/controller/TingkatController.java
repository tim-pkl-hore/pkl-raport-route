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

import id.pkl.raport.entity.Tingkat;
import id.pkl.raport.repository.TingkatRepository;

@RestController
@RequestMapping(value="/tingkat")
public class TingkatController {
	@Autowired
	private TingkatRepository kelasRepository;
	
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Tingkat> addTingkat(@Validated @RequestBody Tingkat kelas, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Tingkat>(HttpStatus.BAD_REQUEST);
		}
		
		Tingkat newKelas = kelasRepository.save(kelas);
		return new ResponseEntity<Tingkat>(newKelas, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Tingkat> listTingkat(Pageable pageable){
	
			return kelasRepository.findAll(pageable);
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Tingkat> detailTingkat(@PathVariable Long id){
		if(!kelasRepository.exists(id)){
			return new ResponseEntity<Tingkat>(HttpStatus.NOT_FOUND);
		}
		
		Tingkat kelas = kelasRepository.findOne(id);
		return new ResponseEntity<Tingkat>(kelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Tingkat> updateTingkat(@PathVariable Long id, @RequestBody Tingkat tingkat, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Tingkat>(HttpStatus.BAD_REQUEST);
		}
		
		Tingkat currentKelas = kelasRepository.findOne(id);
		if(currentKelas == null){
			return new ResponseEntity<Tingkat>(HttpStatus.NOT_FOUND);
		}
		
		currentKelas.setTingkat(tingkat.getTingkat());
		
		kelasRepository.save(currentKelas);
		return new ResponseEntity<Tingkat>(currentKelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Tingkat> deleteTingkat(@PathVariable Long id){
		if(!kelasRepository.exists(id)){
			return new ResponseEntity<Tingkat>(HttpStatus.NOT_FOUND);
		}
		kelasRepository.delete(id);
		return new ResponseEntity<Tingkat>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Tingkat> listTingkat(){
		return kelasRepository.findAll();
	}
	
	
}
