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

import id.pkl.raport.entity.Sekolah;
import id.pkl.raport.repository.SekolahRepository;

@RestController
@RequestMapping(value="/sekolah")
public class SekolahController {
	@Autowired
	private SekolahRepository sekolahRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Sekolah> addSekolah(@Validated @RequestBody Sekolah sekolah, BindingResult bindingResult)
	{
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Sekolah>(HttpStatus.BAD_REQUEST);
		}
		
		Sekolah newSekolah = sekolahRepository.save(sekolah);
		return new ResponseEntity<Sekolah>(newSekolah, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Sekolah> listSekolah(Pageable pageable)
	{
		return sekolahRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Sekolah> detailSekolah(@PathVariable Integer id){
		if (!sekolahRepository.exists(id)) {
			return new ResponseEntity<Sekolah>(HttpStatus.NOT_FOUND);
		}
		Sekolah sekolah = sekolahRepository.findOne(id);
		return new ResponseEntity<Sekolah>(sekolah, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Sekolah> updateSekolah(@PathVariable Integer id, @RequestBody Sekolah sekolah, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Sekolah>(HttpStatus.BAD_REQUEST);
		}
		
		Sekolah currentSekolah = sekolahRepository.findOne(id);
		if(currentSekolah == null){
			return new ResponseEntity<Sekolah>(HttpStatus.NOT_FOUND);
		}
		
		currentSekolah.setKodeSekolah(sekolah.getKodeSekolah());
		currentSekolah.setNamaSekolah(sekolah.getNamaSekolah());
		currentSekolah.setKodePos(sekolah.getKodePos());
		currentSekolah.setProvinsi(sekolah.getProvinsi());
		currentSekolah.setKabupaten(sekolah.getKabupaten());
		currentSekolah.setKecamatan(sekolah.getKecamatan());
		currentSekolah.setTingkatan(sekolah.getTingkatan());
		
		sekolahRepository.save(currentSekolah);
		return new ResponseEntity<Sekolah>(currentSekolah, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Sekolah> deleteSekolah(@PathVariable Integer id){
		if(!sekolahRepository.exists(id)){
			return new ResponseEntity<Sekolah>(HttpStatus.NOT_FOUND);
		}
		sekolahRepository.delete(id);
		return new ResponseEntity<Sekolah>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Sekolah> listSekolah(){
		return sekolahRepository.findAll();
	}
	
	
}
