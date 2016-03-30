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

import id.pkl.raport.entity.KompetensiDasar;
import id.pkl.raport.repository.KompetensiDasarRepository;

@RestController
@RequestMapping(value="/kompetensi-dasar")
public class KompetensiDasarController {
	@Autowired
	private KompetensiDasarRepository kompetensiDasarRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<KompetensiDasar> addKompetensiDasar(@Validated @RequestBody KompetensiDasar kompetensiDasar, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<KompetensiDasar>(HttpStatus.BAD_REQUEST);
		}
		
		KompetensiDasar newKompetensiDasar = kompetensiDasarRepository.save(kompetensiDasar);
		return new ResponseEntity<KompetensiDasar>(newKompetensiDasar, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<KompetensiDasar> listKompetensiDasar(Pageable pageable){
		return kompetensiDasarRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<KompetensiDasar> detailKompetensiDasar(@PathVariable Long id){
		if(!kompetensiDasarRepository.exists(id)){
			return new ResponseEntity<KompetensiDasar>(HttpStatus.NOT_FOUND);
		}
		
		KompetensiDasar kompetensiDasar = kompetensiDasarRepository.findOne(id);
		return new ResponseEntity<KompetensiDasar>(kompetensiDasar, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<KompetensiDasar> updateKompetensiDasar(@PathVariable Long id, @RequestBody KompetensiDasar kompetensiDasar, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<KompetensiDasar>(HttpStatus.BAD_REQUEST);
		}
		
		KompetensiDasar currentKompetensiDasar = kompetensiDasarRepository.findOne(id);
		if(currentKompetensiDasar == null){
			return new ResponseEntity<KompetensiDasar>(HttpStatus.NOT_FOUND);
		}
		
		currentKompetensiDasar.setDescription(kompetensiDasar.getDescription());
		currentKompetensiDasar.setOrderIndex(kompetensiDasar.getOrderIndex());
		currentKompetensiDasar.setKompetensiInti(kompetensiDasar.getKompetensiInti());
		currentKompetensiDasar.setMataPelajaran(kompetensiDasar.getMataPelajaran());
		
		kompetensiDasarRepository.save(currentKompetensiDasar);
		return new ResponseEntity<KompetensiDasar>(currentKompetensiDasar, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<KompetensiDasar> deleteKompetensiDasar(@PathVariable Long id){
		if(!kompetensiDasarRepository.exists(id)){
			return new ResponseEntity<KompetensiDasar>(HttpStatus.NOT_FOUND);
		}
		kompetensiDasarRepository.delete(id);
		return new ResponseEntity<KompetensiDasar>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<KompetensiDasar> listKompetensiDasar(){
		return kompetensiDasarRepository.findAll();
	}
}
