package com.djjstory.djstory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.djjstory.djstory.dto.ResponseDTO;
import com.djjstory.djstory.dto.UserDTO;
import com.djjstory.djstory.model.UserEntity;
import com.djjstory.djstory.security.TokenProvider;
import com.djjstory.djstory.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
		try {
			UserEntity user = UserEntity.builder().email(userDTO.getEmail())
											      .username(userDTO.getUsername())
											      .password(userDTO.getPassword())
											      .build();
			UserEntity registerUser = userService.create(user);
			UserDTO responseDTO = UserDTO.builder().email(registerUser.getEmail())
										           .id(registerUser.getId())
										           .username(registerUser.getUsername())
										           .build();
			return ResponseEntity.ok().body(responseDTO);										           
		} catch (Exception e) {
			ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
			return ResponseEntity.badRequest().body(responseDTO);
		}
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO){
		UserEntity user = userService.getByCredentials(userDTO.getEmail(), userDTO.getPassword());
		
		final String token = tokenProvider.create(user);
		
		if(user != null) {
			final UserDTO responseUserDTO = UserDTO.builder().email(user.getEmail())
															 .id(user.getId())
															 .username(user.getUsername())
															 .token(token)
															 .build();
			return ResponseEntity.ok(responseUserDTO);
		}else {
			ResponseDTO responseDTO = ResponseDTO.builder().error("Login failed").build();
			return ResponseEntity.badRequest().body(responseDTO);
		}
	}
	
}
