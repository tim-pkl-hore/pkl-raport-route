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

import id.pkl.raport.entity.KompetensiInti;
import id.pkl.raport.entity.TahunAjaran;
import id.pkl.raport.repository.KompetensiIntiRepository;
import id.pkl.raport.repository.TahunAjarRepository;

@RestController
@RequestMapping(value="/kompetensi-inti")
public class KompetensiIntiController {
	@Autowired
	private KompetensiIntiRepository kompetensiIntiRepository;
	@Autowired
	private TahunAjarRepository tahunAjarRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<KompetensiInti> addKompetensiInti(@Validated @RequestBody KompetensiInti kompetensiInti, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<KompetensiInti>(HttpStatus.BAD_REQUEST);
		}
		TahunAjaran tahunAjaran = tahunAjarRepository
				.findOne(kompetensiInti.getTahunAjaran().getId());
		kompetensiInti.setTahunAjaran(tahunAjaran);
		KompetensiInti newKompetensiInti = kompetensiIntiRepository.save(kompetensiInti);
		return new ResponseEntity<KompetensiInti>(newKompetensiInti, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<KompetensiInti> listKompetensiInti(Pageable pageable){
		return kompetensiIntiRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<KompetensiInti> detailProvinsi(@PathVariable Long id){
		if (!kompetensiIntiRepository.exists(id)) {
			return new ResponseEntity<KompetensiInti>(HttpStatus.NOT_FOUND);
		}
		KompetensiInti kompetensiInti = kompetensiIntiRepository.findOne(id);
		return new ResponseEntity<KompetensiInti>(kompetensiInti, HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<KompetensiInti> listKompetensiInti(){
		return kompetensiIntiRepository.findAll();
	}
}
