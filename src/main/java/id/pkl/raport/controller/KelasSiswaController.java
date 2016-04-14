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

import id.pkl.raport.entity.KelasSiswa;
import id.pkl.raport.repository.KelasSiswaRepository;

@RestController
@RequestMapping(value="/kelas/siswa")
public class KelasSiswaController {
	@Autowired
	private KelasSiswaRepository kelasSiswaRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<KelasSiswa> addKelasSiswa(@Validated @RequestBody KelasSiswa kelasSiswa, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<KelasSiswa>(HttpStatus.BAD_REQUEST);
		}
		
		KelasSiswa newKelasSiswa = kelasSiswaRepository.save(kelasSiswa);
		return new ResponseEntity<KelasSiswa>(newKelasSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<KelasSiswa> listKelasSiswa(@RequestParam(name="search", required=false) String search, Pageable pageable)
	{
		if(search.equals("")){
			return kelasSiswaRepository.findAll(pageable);
		}
		
		return kelasSiswaRepository.findBySearch(search, pageable);
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<KelasSiswa> detailKelasSiswa(@PathVariable Long id){
		if (!kelasSiswaRepository.exists(id)) {
			return new ResponseEntity<KelasSiswa>(HttpStatus.NOT_FOUND);
		}
		
		KelasSiswa kelasSiswa = kelasSiswaRepository.findOne(id);
		return new ResponseEntity<KelasSiswa>(kelasSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<KelasSiswa> updateKelasSiswa(@PathVariable Long id, @RequestBody KelasSiswa kelasSiswa, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<KelasSiswa>(HttpStatus.BAD_REQUEST);
		}
		
		KelasSiswa currentKelasSiswa = kelasSiswaRepository.findOne(id);
		if (currentKelasSiswa == null) {
			return new ResponseEntity<KelasSiswa>(HttpStatus.NOT_FOUND);
		}
		
		currentKelasSiswa.setKelas(kelasSiswa.getKelas());
		currentKelasSiswa.setSiswa(kelasSiswa.getSiswa());
		
		kelasSiswaRepository.save(currentKelasSiswa);
		return new ResponseEntity<KelasSiswa>(currentKelasSiswa, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<KelasSiswa> deleteKelasSiswa(@PathVariable Long id){
		if(!kelasSiswaRepository.exists(id)){
			return new ResponseEntity<KelasSiswa>(HttpStatus.NOT_FOUND);
		}
		kelasSiswaRepository.delete(id);
		return new ResponseEntity<KelasSiswa>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<KelasSiswa> listAllKelasSiswa()
	{
		return kelasSiswaRepository.findAll();
	}
	
	@RequestMapping(value="/all/{idKelas}", method=RequestMethod.GET)
	public Iterable<KelasSiswa> listAllSiswaByIdKelas(@PathVariable Long idKelas)
	{
		return kelasSiswaRepository.findByKelasId(idKelas);
	}
}
