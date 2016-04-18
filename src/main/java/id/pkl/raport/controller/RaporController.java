/*package id.pkl.raport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.pkl.raport.entity.KelasSiswa;
import id.pkl.raport.entity.Kkm;
import id.pkl.raport.entity.Penilaian;
import id.pkl.raport.entity.Rapor;
import id.pkl.raport.repository.KelasSiswaRepository;
import id.pkl.raport.repository.PenilaianRepository;
import id.pkl.raport.repository.RaporRepository;

@RestController
@RequestMapping(value="/rapor")
public class RaporController {
	@Autowired
	private PenilaianRepository penilaianRepository;
	
	@Autowired
	private RaporRepository raporRepository;
	
	@Autowired
	private KelasSiswaRepository kelasSiswaRepository;
	
	@RequestMapping(value="/siswa", method=RequestMethod.GET)
	public Page<KelasSiswa> listRapor(@RequestParam(name="search", required = false) String search,
											@RequestParam(name="kelasid", required = true) Long kelasId,
											Pageable pageable){
	
		return penilaianRepository.findByKelasSiswaId(kelasId, pageable);	
	}
	
	@RequestMapping(method=RequestMethod.POST)
	ResponseEntity<Rapor> addPenilaian(@Validated @RequestBody Rapor rapor, Penilaian penilaian, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Rapor>(HttpStatus.BAD_REQUEST);
		}
		
		KelasSiswa kelasSiswa = kelasSiswaRepository.findOne(penilaian.getKelasSiswa().getId());
		Kkm kkm = penilaianRepository.findByIdMatpelAndTingkat(penilaian.getMataPelajaran().getId(), kelasSiswa.getKelas().getTingkat().getId());
		
		String keteranganRapor = "Terlampaui";
		if(penilaian.getNilai() < kkm.getKkm()){
			keteranganRapor = "Belum Tercapai";
		}
		
		if (penilaian.getNilai() > kkm.getKkm()) {
			keteranganRapor = "Terlampaui";
		} 
	
		
		penilaian.setKeterangan(keterangan);
		Penilaian newPenilaian = penilaianRepository.save(penilaian);
			
		return new ResponseEntity<Penilaian>(newPenilaian, HttpStatus.OK);
		
		
	}
	
}
*/
