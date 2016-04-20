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

import id.pkl.raport.entity.UserRole;
import id.pkl.raport.repository.UserRoleRepository;

@RestController
@RequestMapping(value="/user/role")
public class UserRoleController {
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<UserRole> addRole(@Validated @RequestBody UserRole userRole, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<UserRole>(HttpStatus.BAD_REQUEST);
		}
		
		UserRole newUserRole = userRoleRepository.save(userRole);
		return new ResponseEntity<UserRole>(newUserRole, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<UserRole> listUserRole(Pageable pageable){
		return userRoleRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<UserRole> updateRole(@PathVariable Long id, @RequestBody UserRole userRole, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<UserRole>(HttpStatus.BAD_REQUEST);
		}
		
		UserRole currentRole = userRoleRepository.findOne(id);
		if (currentRole == null) {
			return new ResponseEntity<UserRole>(HttpStatus.NOT_FOUND);
		}
		
		currentRole.setRole(userRole.getRole());
		currentRole.setUsers(userRole.getUsers());
		
		userRoleRepository.save(currentRole);
		return new ResponseEntity<UserRole>(currentRole, HttpStatus.OK);
	}
	
	@RequestMapping(value="{/id}", method=RequestMethod.GET)
	public ResponseEntity<UserRole> detailRole(@PathVariable Long id){
		if (!userRoleRepository.exists(id)) {
			return new ResponseEntity<UserRole>(HttpStatus.NOT_FOUND);
		}
		
		UserRole userRole = userRoleRepository.findOne(id);
		return new ResponseEntity<UserRole>(userRole, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<UserRole> deleteRole(@PathVariable Long id){
		if(!userRoleRepository.exists(id)){
			return new ResponseEntity<UserRole>(HttpStatus.NOT_FOUND);
		}
		userRoleRepository.delete(id);
		return new ResponseEntity<UserRole>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<UserRole> listUserRole(){
		return userRoleRepository.findAll();
	}
	
	
}