package id.pkl.raport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.pkl.raport.entity.KelasSiswa;
import id.pkl.raport.entity.Penilaian;
import id.pkl.raport.repository.PenilaianRepository;

@RestController
@RequestMapping(value="/rapor")
public class RaporController {
	@Autowired
	private PenilaianRepository penilaianRepository;
	
	@RequestMapping(value="/siswa", method=RequestMethod.GET)
	public Page<KelasSiswa> listRapor(@RequestParam(name="search", required = false) String search,
											@RequestParam(name="kelasid", required = true) Long kelasId,
											Pageable pageable){
	
		return penilaianRepository.findByKelasSiswaId(kelasId, pageable);	
	}
	
}
