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
import id.pkl.raport.entity.Penilaian;
import id.pkl.raport.repository.KelasSiswaRepository;
import id.pkl.raport.repository.PenilaianRepository;

@RestController
@RequestMapping(value="/penilaian")
public class PenilaianController {
	@Autowired
	private PenilaianRepository penilaianRepository;

	@Autowired
	private KelasSiswaRepository kelasSiswaRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	ResponseEntity<Penilaian> addPenilaian(@Validated @RequestBody Penilaian penilaian, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Penilaian>(HttpStatus.BAD_REQUEST);
		}
		
		Integer kkm = penilaian.getKkm();
		
		String keterangan = "Terlampaui";
		if(penilaian.getNilai() < kkm){
			keterangan = "Belum Tercapai";
		}
		
		if (penilaian.getNilai() > kkm) {
			keterangan = "Terlampaui";
		} 
	
		
		penilaian.setKeterangan(keterangan);
		Penilaian newPenilaian = penilaianRepository.save(penilaian);
			
		return new ResponseEntity<Penilaian>(newPenilaian, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Penilaian> listPenilaian(Pageable pageable){
			return penilaianRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Penilaian> updatePenilaian(@PathVariable Long id, @RequestBody Penilaian penilaian, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Penilaian>(HttpStatus.BAD_REQUEST);
		}
		
		Penilaian currentPenilaian = penilaianRepository.findOne(id);
		if (currentPenilaian == null) {
			return new ResponseEntity<Penilaian>(HttpStatus.NOT_FOUND);
		}
		
		currentPenilaian.setNilai(penilaian.getNilai());
		
		penilaianRepository.save(currentPenilaian);
		return new ResponseEntity<Penilaian>(currentPenilaian, HttpStatus.OK);
	}

	
	@RequestMapping(value="/detail", method=RequestMethod.GET)
	public Page<KelasSiswa> listPenilaianKelas(@RequestParam(name="search", required = false) String search,
												@RequestParam(name="kelasid", required = true) Long kelasId,
											Pageable pageable){
			return penilaianRepository.findByKelasSiswaId(kelasId, pageable);
		
	}
	
	@RequestMapping(value="/detail/siswa/{kelasSiswaId}", method=RequestMethod.GET)
	public Page<Penilaian> listPenilaianSiswa(@RequestParam(name="kelassiswaid", required = true) Long kelasSiswaId,
											Pageable pageable){
		return penilaianRepository.findBySiswaId(kelasSiswaId, pageable);
	}
	
	@RequestMapping(value="/detail/nilai/{matpel}", method=RequestMethod.GET)
	Iterable<Penilaian> listNilai(@RequestParam(name="matpel", required = true) Long matpel){
		return penilaianRepository.listNilaiByMatpel(matpel);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Penilaian> deletePenilaian(@PathVariable Long id){
		if(!penilaianRepository.exists(id)){
			return new ResponseEntity<Penilaian>(HttpStatus.NOT_FOUND);
		}
		penilaianRepository.delete(id);
		return new ResponseEntity<Penilaian>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Penilaian> listPenilaian()
	{
		return penilaianRepository.findAll();
	}
	
}
