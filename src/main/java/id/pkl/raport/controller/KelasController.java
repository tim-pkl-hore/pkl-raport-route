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

import id.pkl.raport.entity.Kelas;
import id.pkl.raport.repository.KelasRepository;

@RestController
@RequestMapping(value="/kelas")
public class KelasController {
	@Autowired
	private KelasRepository kelasRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Kelas> addKelas(@Validated @RequestBody Kelas kelas, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Kelas>(HttpStatus.BAD_REQUEST);
		}
		
		Kelas newKelas = kelasRepository.save(kelas);
		return new ResponseEntity<Kelas>(newKelas, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Kelas> listKelas(Pageable pageable){
		return kelasRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Kelas> detailKelas(@PathVariable Long id){
		if(!kelasRepository.exists(id)){
			return new ResponseEntity<Kelas>(HttpStatus.NOT_FOUND);
		}
		
		Kelas kelas = kelasRepository.findOne(id);
		return new ResponseEntity<Kelas>(kelas, HttpStatus.OK);
	}
}
