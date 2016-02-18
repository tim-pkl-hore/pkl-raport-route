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

import id.pkl.raport.entity.Provinsi;
import id.pkl.raport.repository.ProvinsiRepository;

@RestController
@RequestMapping(value="/provinsi")
public class ProvinsiController {
	@Autowired
	private ProvinsiRepository provinsiRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Provinsi> addProvinsi(@Validated @RequestBody Provinsi provinsi, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Provinsi> (HttpStatus.BAD_REQUEST);
		}
		
		Provinsi newProvinsi = provinsiRepository.save(provinsi);
		return new ResponseEntity<Provinsi>(newProvinsi, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Provinsi> listProvinsi(Pageable pageable)
	{
		return provinsiRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Provinsi> detailProvinsi(@PathVariable Integer id){
		if (!provinsiRepository.exists(id)) {
			return new ResponseEntity<Provinsi>(HttpStatus.NOT_FOUND);
		}
		Provinsi provinsi = provinsiRepository.findOne(id);
		return new ResponseEntity<Provinsi>(provinsi, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Provinsi> updateProvinsi(@PathVariable Integer id, @RequestBody Provinsi provinsi, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Provinsi>(HttpStatus.BAD_REQUEST);
		}
		
		Provinsi currentProvince = provinsiRepository.findOne(id);
		if(currentProvince == null){
			return new ResponseEntity<Provinsi>(HttpStatus.NOT_FOUND);
		}
		
		currentProvince.setNamaProvinsi(provinsi.getNamaProvinsi());
		currentProvince.setKodeProvinsi(provinsi.getKodeProvinsi());
		
		provinsiRepository.save(currentProvince);
		return new ResponseEntity<Provinsi>(currentProvince, HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Provinsi> listProvinsi() {
		return provinsiRepository.findAll();
	}
}
