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

import id.pkl.raport.entity.Kecamatan;
import id.pkl.raport.repository.KecamatanRepository;

@RestController
@RequestMapping(value="/kecamatan")
public class KecamatanController {
	@Autowired
	private KecamatanRepository kecamatanRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Kecamatan> addKecamatan(@Validated @RequestBody Kecamatan kecamatan, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Kecamatan>(HttpStatus.BAD_REQUEST);
		}
		Kecamatan newKecamatan = kecamatanRepository.save(kecamatan);
		return new ResponseEntity<Kecamatan>(newKecamatan, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Kecamatan> listKecamatan(Pageable pageable)
	{
		return kecamatanRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Kecamatan> detailKecamatan(@PathVariable Integer id){
		if (!kecamatanRepository.exists(id)) {
			return new ResponseEntity<Kecamatan>(HttpStatus.NOT_FOUND);
		}
		Kecamatan kecamatan = kecamatanRepository.findOne(id);
		return new ResponseEntity<Kecamatan>(kecamatan, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Kecamatan> updateKecamatan(@PathVariable Integer id, @RequestBody Kecamatan kecamatan, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Kecamatan>(HttpStatus.BAD_REQUEST);
		}
		
		Kecamatan currentKecamatan = kecamatanRepository.findOne(id);
		if(currentKecamatan == null){
			return new ResponseEntity<Kecamatan>(HttpStatus.NOT_FOUND);
		}
		
		currentKecamatan.setKodeKecamatan(kecamatan.getKodeKecamatan());
		currentKecamatan.setNamaKecamatan(kecamatan.getNamaKecamatan());
		currentKecamatan.setKabupaten(kecamatan.getKabupaten());
		
		kecamatanRepository.save(currentKecamatan);
		return new ResponseEntity<Kecamatan>(currentKecamatan, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Kecamatan> deleteKecamatan(@PathVariable Integer id){
		if(!kecamatanRepository.exists(id)){
			return new ResponseEntity<Kecamatan>(HttpStatus.NOT_FOUND);
		}
		kecamatanRepository.delete(id);
		return new ResponseEntity<Kecamatan>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Kecamatan> listKecamatan(){
		return kecamatanRepository.findAll();
	}
	
	
}
