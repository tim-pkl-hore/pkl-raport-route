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

import id.pkl.raport.entity.GrupKelas;
import id.pkl.raport.repository.GrupKelasRepository;

@RestController
@RequestMapping(value="/grup/kelas")
public class GrupKelasController {
	@Autowired
	private GrupKelasRepository grupKelasRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<GrupKelas> addGrupKelas(@Validated @RequestBody GrupKelas grupKelas, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<GrupKelas>(HttpStatus.BAD_REQUEST);
		}
		
		GrupKelas newGrupKelas = grupKelasRepository.save(grupKelas);
		
		return new ResponseEntity<GrupKelas>(newGrupKelas, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<GrupKelas> listGrupKelas(Pageable pageable){
			return grupKelasRepository.findAll(pageable);
	
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<GrupKelas> detailKelas(@PathVariable Long id){
		if(!grupKelasRepository.exists(id)){
			return new ResponseEntity<GrupKelas>(HttpStatus.NOT_FOUND);
		}
		
		GrupKelas grupKelas = grupKelasRepository.findOne(id);
		return new ResponseEntity<GrupKelas>(grupKelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<GrupKelas> updateGrupKelas(@PathVariable Long id, @RequestBody GrupKelas grupKelas, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<GrupKelas>(HttpStatus.BAD_REQUEST);
		}
		
		GrupKelas currentGrupKelas = grupKelasRepository.findOne(id);
		if(currentGrupKelas == null){
			return new ResponseEntity<GrupKelas>(HttpStatus.NOT_FOUND);
		}
		
		currentGrupKelas.setGrupKelas(grupKelas.getGrupKelas());
	
		
		grupKelasRepository.save(currentGrupKelas);
		return new ResponseEntity<GrupKelas>(currentGrupKelas, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<GrupKelas> deleteGrupKelas(@PathVariable Long id){
		if(!grupKelasRepository.exists(id)){
			return new ResponseEntity<GrupKelas>(HttpStatus.NOT_FOUND);
		}
		grupKelasRepository.delete(id);
		return new ResponseEntity<GrupKelas>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<GrupKelas> listGrupKelas(){
		return grupKelasRepository.findAll();
	}	
}
