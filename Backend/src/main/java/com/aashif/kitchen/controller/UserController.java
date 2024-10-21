package com.aashif.kitchen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.response.ApiResponse;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("api/user/profile")
	public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@GetMapping("api/admin/user/profile/all")
	public ResponseEntity<User> findAllUser(@RequestHeader("Authorization") String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		return new ResponseEntity(this.userService.findAllUser(),HttpStatus.OK);
	}
	
	@GetMapping("api/admin/user/{id}")
	public ResponseEntity<User> getSingleUser(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		return new ResponseEntity(this.userService.findSingleUser(id),HttpStatus.OK);
	}
	
	@PutMapping("api/admin/user/update/{id}")
	public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String jwt, @PathVariable Long id, @RequestBody User user) throws Exception{
		User user1 =this.userService.findUserByJwtToken(jwt);
		return new ResponseEntity(this.userService.updateUser(user, id),HttpStatus.OK);
	}
	
	@DeleteMapping("api/admin/user/delete/{id}")
	public ResponseEntity<ApiResponse> deleteUseing(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
		User user1 =this.userService.findUserByJwtToken(jwt);
		return new ResponseEntity(new ApiResponse("User with "+id +" deleted successfully", true),HttpStatus.OK);
	}
	
	
}
