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

import id.pkl.raport.entity.Users;
import id.pkl.raport.repository.UsersRepository;

@RestController
@RequestMapping(value="/pengguna")
public class UsersController {
	@Autowired
	private UsersRepository usersRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Users> addUser(@Validated @RequestBody Users users, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Users>(HttpStatus.BAD_REQUEST);
		}
		
		Users newUser = usersRepository.save(users);
		return new ResponseEntity<Users>(newUser, HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Users> updateUser(@PathVariable Integer id, @RequestBody Users users, BindingResult bindingResult){
		if(bindingResult.hasErrors()){
			return new ResponseEntity<Users>(HttpStatus.BAD_REQUEST);
		}
		
		Users currentUser = usersRepository.findOne(id);
		if (currentUser == null) {
			return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
		}
		
		currentUser.setUsername(users.getUsername());
		currentUser.setPassword(users.getPassword());
		
		usersRepository.save(currentUser);
		return new ResponseEntity<Users>(currentUser, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Page<Users> listUsers(Pageable pageable){
		return usersRepository.findAll(pageable);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Users> detailUsers(@PathVariable Integer id){
		if (!usersRepository.exists(id)) {
			return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
		}
		
		Users users = usersRepository.findOne(id);
		return new ResponseEntity<Users>(users, HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public Iterable<Users> listUsers(){
		return usersRepository.findAll();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Users> deleteUser(@PathVariable Integer id){
		if(!usersRepository.exists(id)){
			return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
		}
		usersRepository.delete(id);
		return new ResponseEntity<Users>(HttpStatus.OK);
	}
	
	
	
	
}
