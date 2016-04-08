package id.pkl.raport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.pkl.raport.repository.GuruRepository;
import id.pkl.raport.repository.MataPelajaranRepository;

@RestController
@RequestMapping(value="/mengajar")
public class MengajarController {
	@Autowired
	private GuruRepository guruRepository;
	private MataPelajaranRepository mataPelajaranRepository;

}
