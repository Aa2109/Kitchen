package com.aashif.kitchen.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.config.JwtProvider;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.UserRepo;
import com.aashif.kitchen.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private JwtProvider jwtProvider;
	
	@Override
	public User findUserByJwtToken(String jwt)throws Exception {
		String email = this.jwtProvider.getEmailFromJwtToken(jwt);
		User user = this.finduserByEmail(email);
		if(user == null) throw new Exception("User not found with email: "+email);
		return user;
		
	}

	@Override
	public User finduserByEmail(String email)throws Exception {
		User user = this.userRepo.findByEmail(email);
		if(user == null) throw new Exception("User not found with email: "+email);
		return user;
	}

	@Override
	public List<User> findAllUser() throws Exception {
		List<User> user =  this.userRepo.findAll();
		return user;
	}

	@Override
	public User findSingleUser(Long id) {
		User user = this.userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "userId", id));
		return user;
	}

	@Override
	public User updateUser(User updatedUser, Long id) {
		User user = this.userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "userId", id));
		user.setAddress(updatedUser.getAddress());
		user.setEmail(updatedUser.getEmail());
		user.setFullName(updatedUser.getFullName());
		user.setRole(updatedUser.getRole());
		user.setPassword(updatedUser.getPassword());
		user.setOrders(updatedUser.getOrders());
		user.setFavorites(updatedUser.getFavorites());
		User savedUser = this.userRepo.save(user);
		return savedUser;
	}

	@Override
	public void deleteUser(Long id) {
		User user = this.userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "userId", id));
		//new code from here to 
		// Clear roles or any other necessary relationships
	    user.setRole(null); // If role is a field in User entity

	    // If you have a collection of roles, clear it
	    // user.getRoles().clear();

	    // Ensure the user entity is updated before deletion
	    this.userRepo.save(user);
	    // above this line new code
		this.userRepo.delete(user);
	}

}
