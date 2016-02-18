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

import id.pkl.raport.entity.HariLibur;
import id.pkl.raport.repository.HariLiburRepository;

@RestController
@RequestMapping(value="/hari-libur")
public class HariLiburController {
	@Autowired
	private HariLiburRepository hariLiburRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<HariLibur> addHariLibur(@Validated @RequestBody HariLibur hariLibur, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<HariLibur>(HttpStatus.BAD_REQUEST);
		}
		
		HariLibur newHariLibur = hariLiburRepository.save(hariLibur);
		return new ResponseEntity<HariLibur>(newHariLibur, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<HariLibur> listHariLibur(Pageable pageable){
		return hariLiburRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<HariLibur> detailHariLibur(@PathVariable Long id){
		if(!hariLiburRepository.exists(id)){
			return new ResponseEntity<HariLibur>(HttpStatus.NOT_FOUND);
		}
		
		HariLibur hariLibur = hariLiburRepository.findOne(id);
		return new ResponseEntity<HariLibur>(hariLibur, HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<HariLibur> listHariLibur(){
		return hariLiburRepository.findAll();
	}
}
