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

import id.pkl.raport.entity.TahunAjaran;
import id.pkl.raport.repository.TahunAjarRepository;

@RestController
@RequestMapping(value="/tahun-ajaran")
public class TahunAjaranController {
	@Autowired
	private TahunAjarRepository tahunAjarRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<TahunAjaran> addTahunAjaran(@Validated @RequestBody TahunAjaran tahunAjaran, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<TahunAjaran>(HttpStatus.BAD_REQUEST);
		}
		
		TahunAjaran newTahunAjaran = tahunAjarRepository.save(tahunAjaran);
		return new ResponseEntity<TahunAjaran>(newTahunAjaran, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<TahunAjaran> listTahunAjaran(Pageable pageable){
		return tahunAjarRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<TahunAjaran> detailTahunAjaran(@PathVariable Integer id){
		if (!tahunAjarRepository.exists(id)) {
			return new ResponseEntity<TahunAjaran> (HttpStatus.NOT_FOUND);
		}
		
		TahunAjaran tahunAjaran = tahunAjarRepository.findOne(id);
		return new ResponseEntity<TahunAjaran>(tahunAjaran, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<TahunAjaran> updateTahunAjaran(@PathVariable Integer id, @RequestBody TahunAjaran tahunAjaran, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<TahunAjaran>(HttpStatus.BAD_REQUEST);
		}
		
		TahunAjaran currentTahunAjaran = tahunAjarRepository.findOne(id);
		if(currentTahunAjaran == null){
			return new ResponseEntity<TahunAjaran>(HttpStatus.NOT_FOUND);
		}
		
		currentTahunAjaran.setSekolah(tahunAjaran.getSekolah());
		currentTahunAjaran.setTahunAwal(tahunAjaran.getTahunAwal());
		currentTahunAjaran.setTahunAkhir(tahunAjaran.getTahunAkhir());
		
		tahunAjarRepository.save(currentTahunAjaran);
		return new ResponseEntity<TahunAjaran>(currentTahunAjaran, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<TahunAjaran> deleteTahunAjaran(@PathVariable Integer id){
		if(!tahunAjarRepository.exists(id)){
			return new ResponseEntity<TahunAjaran>(HttpStatus.NOT_FOUND);
		}
		tahunAjarRepository.delete(id);
		return new ResponseEntity<TahunAjaran>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<TahunAjaran> listTahunAjaran(){
		return tahunAjarRepository.findAll();
	}
}
