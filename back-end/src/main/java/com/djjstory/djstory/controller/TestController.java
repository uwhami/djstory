package com.djjstory.djstory.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.djjstory.djstory.dto.ResponseDTO;
import com.djjstory.djstory.dto.TestRequestBodyDTO;

@RestController
@RequestMapping("test")
public class TestController {

	@GetMapping("/testGetMapping")
	public String testController() {
		return "Hello World! testGetMapping";
	}
	
	//public String testControllerWithPathVariables(@PathVariable(required = false) int id) {
	@GetMapping("/{id}")
	public String testControllerWithPathVariables(int id) {
		return "Hello World! ID /" + id;
	}
	
	@GetMapping("/testRequestParam")
	public String testControllerRequestParam(@RequestParam(required = false) int id) {
		return "Hello World! id?" + id;
	}
	
	@GetMapping("/testRequestBody")
	public String testControllerRequestBody(@RequestBody TestRequestBodyDTO testRequestBodyDTO) {
		return "Hello World! testRequestBody id : " + testRequestBodyDTO.getId() + ", message : " + testRequestBodyDTO.getMessage();
	}
	
	@GetMapping("/testResponseBody")
	public ResponseDTO<String> testControllerResponseBody(){
		List<String> list = new ArrayList<>();
		list.add("Hellow World! testResponseBody");
		ResponseDTO<String> responseDTO = ResponseDTO.<String>builder().data(list).build();
		return responseDTO;
	}
	
	@GetMapping("/testResponseEntity")
	public ResponseEntity<?> testControllerResponseEntity(){
		List<String> list = new ArrayList<>();
		list.add("Hello world! I'am a ResponseEntity.And you got 400!");
		ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
		return ResponseEntity.badRequest().body(response);
		//return ResponseEntity.ok().body(response);
	}
	
}
