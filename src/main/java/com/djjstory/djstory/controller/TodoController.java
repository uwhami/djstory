package com.djjstory.djstory.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.djjstory.djstory.dto.ResponseDTO;
import com.djjstory.djstory.service.TodoService;

@RestController
@RequestMapping("todo")
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	@GetMapping("/test")
	public ResponseEntity<?> testTodo(){
		String str = todoService.testService();
		List<String> list = new ArrayList<>();
		list.add(str);
		ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
		return ResponseEntity.ok(response);
		//return ResponseEntity.ok().body(response);
	}
	
	

}

