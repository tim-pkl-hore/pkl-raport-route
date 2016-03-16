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

import id.pkl.raport.entity.Tingkatan;
import id.pkl.raport.repository.TingkatRepository;

@RestController
@RequestMapping(value="/tingkat")
public class TingkatController {
	@Autowired
	private TingkatRepository tingkatRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Tingkatan> addTingkat(@Validated @RequestBody Tingkatan tingkatan, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Tingkatan>(HttpStatus.BAD_REQUEST);
		}
		
		Tingkatan newTingkat = tingkatRepository.save(tingkatan);
		return new ResponseEntity<Tingkatan>(newTingkat, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Tingkatan> listTingkat(Pageable pageable){
		return tingkatRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Tingkatan> updateProvinsi(@PathVariable Long id, @RequestBody Tingkatan tingkatan, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Tingkatan>(HttpStatus.BAD_REQUEST);
		}
		
		Tingkatan currentTingkat = tingkatRepository.findOne(id);
		if(currentTingkat == null){
			return new ResponseEntity<Tingkatan>(HttpStatus.NOT_FOUND);
		}
		
		currentTingkat.setTingkat(tingkatan.getTingkat());		
		tingkatRepository.save(currentTingkat);
		return new ResponseEntity<Tingkatan>(currentTingkat, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Tingkatan> deleteProvinsi(@PathVariable Long id){
		if(!tingkatRepository.exists(id)){
			return new ResponseEntity<Tingkatan>(HttpStatus.NOT_FOUND);
		}
		tingkatRepository.delete(id);
		return new ResponseEntity<Tingkatan>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Tingkatan> listTingkat() {
		return tingkatRepository.findAll();
	}

}
