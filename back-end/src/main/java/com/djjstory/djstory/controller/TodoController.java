package com.djjstory.djstory.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.djjstory.djstory.dto.ResponseDTO;
import com.djjstory.djstory.dto.TodoDTO;
import com.djjstory.djstory.model.TodoEntity;
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
	
	@GetMapping
	public ResponseEntity<?> retrieveTodoList(){
		String temporaryUserId = "temporary-user";
		List<TodoEntity> entities = todoService.retrieve(temporaryUserId);
		List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
		ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	
	@PostMapping
	public ResponseEntity<?> createTodo(@RequestBody TodoDTO dto) throws Exception{
		String temporaryUserId = "temporary-user";
		TodoEntity todoEntity = TodoDTO.todoEntity(dto);
		todoEntity.setId(null);
		todoEntity.setUserId(temporaryUserId);
		List<TodoEntity> entities = todoService.create(todoEntity);
		List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
		ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
		return ResponseEntity.ok().body(response);
	}
	
	@PutMapping
	public void updateTodoList(@RequestBody TodoDTO dto) {
		String temporaryUserId = "temporary-user";
		TodoEntity todoEntity = TodoDTO.todoEntity(dto);
		todoEntity.setUserId(temporaryUserId);
		List<TodoEntity> entities = todoService.update(todoEntity);
	}
	
	@DeleteMapping
	public void deleteTodoList(@RequestBody TodoDTO dto){
		String temporaryUserId = "temporary-user";
		TodoEntity todoEntity = TodoDTO.todoEntity(dto);
		todoEntity.setUserId(temporaryUserId);
		todoService.delete(todoEntity);
	}

}

